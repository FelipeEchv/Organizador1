import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqliteConnection: SQLiteConnection | null = null; // Nueva referencia a la conexión de SQLite
  private db: SQLiteDBConnection | null = null;  // Referencia a la base de datos

  constructor() {}

  // Verificar la disponibilidad de jeep-sqlite en el DOM
  private async ensureJeepSqliteIsAvailable(): Promise<void> {
    return new Promise((resolve, reject) => {
      const checkJeepSqliteInterval = setInterval(() => {
        const jeepSqlite = document.querySelector('jeep-sqlite');
        if (jeepSqlite) {
          clearInterval(checkJeepSqliteInterval);  // Detener el chequeo cuando esté disponible
          resolve();
        }
      }, 100);  // Revisar cada 100ms

      // Rechazar si no se encuentra en 5 segundos
      setTimeout(() => {
        clearInterval(checkJeepSqliteInterval);
        reject(new Error('El elemento jeep-sqlite no está presente en el DOM'));
      }, 5000);
    });
  }

  // Inicializar la base de datos
  async initializeDatabase(): Promise<void> {
    try {
      // Verificar si jeep-sqlite está disponible en el DOM antes de continuar
      await this.ensureJeepSqliteIsAvailable();

      // Crea una instancia de SQLiteConnection
      this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);

      if (!this.db && this.sqliteConnection) {
        // Crear una conexión a la base de datos con 5 argumentos
        this.db = await this.sqliteConnection.createConnection('app.db', false, 'no-encryption', 1, false);

        if (this.db) {
          // Abrir la base de datos
          await this.db.open();
          console.log('Base de datos SQLite inicializada correctamente');
          await this.createTables();
        } else {
          throw new Error('No se pudo crear la conexión con la base de datos');
        }
      }
    } catch (error) {
      console.error('Error al inicializar la base de datos SQLite:', error);
    }
  }

  // Crear las tablas necesarias
  private async createTables(): Promise<void> {
    if (this.db) {
      const createUserTable = `
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT,
    age INTEGER,
    sex TEXT
  ); 
`;
      const createContactTable = `
        CREATE TABLE IF NOT EXISTS contact (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          telefono TEXT,
          direccion TEXT
        );
      `;
      const createNoteTable = `
        CREATE TABLE IF NOT EXISTS note (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          contenido TEXT,
          fecha TEXT
        );
      `;
      const createTaskTable = `
        CREATE TABLE IF NOT EXISTS task (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          descripcion TEXT,
          fecha TEXT,
          prioridad INTEGER
        );
      `;

      try {
        // Ejecutar las consultas SQL para crear tablas
        await this.db.execute(createUserTable);
        await this.db.execute(createContactTable);
        await this.db.execute(createNoteTable);
        await this.db.execute(createTaskTable);
        console.log('Tablas creadas con éxito');
      } catch (error) {
        console.error('Error al crear las tablas:', error);
      }
    }
  }

  // Asegurar que la base de datos está abierta
  private async ensureDbIsOpen(): Promise<void> {
    if (!this.db) {
      await this.initializeDatabase();
    }
  }

  // CRUD para Usuarios
  async addUser(name: string, email: string, password: string, edad: number, sexo: string): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `INSERT INTO user (name, email, password, edad, sexo) VALUES (?, ?, ?. ?, ?)`;
    try {
      await this.db?.run(query, [name, email, password, edad, sexo]);
      console.log('Usuario agregado con éxito');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  async getUsers(): Promise<any[]> {
    await this.ensureDbIsOpen();
    const query = `SELECT * FROM user`;
    try {
      const result = await this.db?.query(query);
      return result?.values || [];
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  async updateUser(id: number, name: string, email: string, password: string, edad: number, sexo: string): Promise<void> {
    const query = `UPDATE user SET name = ?, email = ?, password = ?, edad = ?, sexo = ?, WHERE id = ?`;
    await this.db?.run(query, [name, email, id, password, edad, sexo]);
  }

  async deleteUser(id: number): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `DELETE FROM user WHERE id = ?`;
    try {
      await this.db?.run(query, [id]);
      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  // CRUD para Contactos
  async addContact(nombre: string, telefono: string, direccion: string): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `INSERT INTO contact (nombre, telefono, direccion) VALUES (?, ?, ?)`;
    try {
      await this.db?.run(query, [nombre, telefono, direccion]);
      console.log('Contacto agregado con éxito');
    } catch (error) {
      console.error('Error al agregar contacto:', error);
    }
  }

  async getContacts(): Promise<any[]> {
    await this.ensureDbIsOpen();
    const query = `SELECT * FROM contact`;
    try {
      const result = await this.db?.query(query);
      return result?.values || [];
    } catch (error) {
      console.error('Error al obtener contactos:', error);
      return [];
    }
  }

  async updateContact(id: number, nombre: string, telefono: string, direccion: string): Promise<void> {
    const query = `UPDATE contact SET nombre = ?, telefono = ?, direccion = ? WHERE id = ?`;
    await this.db?.run(query, [nombre, telefono, direccion, id]);
  }

  async deleteContact(id: number): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `DELETE FROM contact WHERE id = ?`;
    try {
      await this.db?.run(query, [id]);
      console.log('Contacto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  }

  // CRUD para Notas
  async addNote(titulo: string, contenido: string, fecha: string): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `INSERT INTO note (titulo, contenido, fecha) VALUES (?, ?, ?)`;
    try {
      await this.db?.run(query, [titulo, contenido, fecha]);
      console.log('Nota agregada con éxito');
    } catch (error) {
      console.error('Error al agregar nota:', error);
    }
  }

  async getNotes(): Promise<any[]> {
    await this.ensureDbIsOpen();
    const query = `SELECT * FROM note`;
    try {
      const result = await this.db?.query(query);
      return result?.values || [];
    } catch (error) {
      console.error('Error al obtener notas:', error);
      return [];
    }
  }

  async updateNote(id: number, titulo: string, contenido: string, fecha: string): Promise<void> {
    const query = `UPDATE note SET titulo = ?, contenido = ?, fecha = ? WHERE id = ?`;
    await this.db?.run(query, [titulo, contenido, fecha, id]);
  }
  

  async deleteNote(id: number): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `DELETE FROM note WHERE id = ?`;
    try {
      await this.db?.run(query, [id]);
      console.log('Nota eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar nota:', error);
    }
  }

  // CRUD para Tareas
  async addTask(titulo: string, descripcion: string, fecha: string, prioridad: number): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `INSERT INTO task (titulo, descripcion, fecha, prioridad) VALUES (?, ?, ?, ?)`;
    try {
      await this.db?.run(query, [titulo, descripcion, fecha, prioridad]);
      console.log('Tarea agregada con éxito');
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  }

  async getTasks(): Promise<any[]> {
    await this.ensureDbIsOpen();
    const query = `SELECT * FROM task`;
    try {
      const result = await this.db?.query(query);
      return result?.values || [];
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      return [];
    }
  }

  async updateTask(id: number, titulo: string, descripcion: string, fecha: string, prioridad: number): Promise<void> {
    const query = `UPDATE task SET titulo = ?, descripcion = ?, fecha = ?, prioridad = ? WHERE id = ?`;
    await this.db?.run(query, [titulo, descripcion, fecha, prioridad, id]);
  }

  async deleteTask(id: number): Promise<void> {
    await this.ensureDbIsOpen();
    const query = `DELETE FROM task WHERE id = ?`;
    try {
      await this.db?.run(query, [id]);
      console.log('Tarea eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  }
}
