import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})

export class IndexedDBService {
  private db: any;

  constructor() {
    // Definir la base de datos y las tablas
    this.db = new Dexie('OrganizadorDB');
    this.db.version(1).stores({
      usuarios: '++id,nombre,password,correo,edad,sexo',
      tareas: '++id,nombre,descripcion,fecha',
      notas: '++id,titulo,contenido,fecha',
      contactos: '++id,nombre,telefono,email'
    });
  }

  // CRUD para Usuarios
  async addUser(user: { nombre: string, password: string, correo: string, edad: number, sexo: string }) {
    return this.db.usuarios.add(user);
  }

  async getUsers() {
    return this.db.usuarios.toArray();
  }

  async updateUser(id: number, updatedUser: any) {
    return this.db.usuarios.update(id, updatedUser);
  }

  async deleteUser(id: number) {
    return this.db.usuarios.delete(id);
  }

  // CRUD para Tareas
  async addTask(task: { titulo: string, descripcion: string, fecha: string, prioridad: number }) {
    return this.db.tareas.add(task); // Elimina 'etiqueta'
  }

  async getTasks() {
    return this.db.tareas.toArray();
  }

  async updateTask(id: number, updatedTask: { titulo: string, descripcion: string, fecha: string, prioridad: number }) {
    return this.db.tareas.update(id, updatedTask); // Elimina 'etiqueta'
  }

  async deleteTask(id: number) {
    return this.db.tareas.delete(id);
  }

  // CRUD para Notas
  async addNote(note: { titulo: string, contenido: string, fecha: string }) {
    return this.db.notas.add(note);  // Elimina 'autor'
  }

  async getNotes() {
    return this.db.notas.toArray();
  }

  async updateNote(id: number, updatedNote: { titulo: string, contenido: string, fecha: string }) {
    return this.db.notas.update(id, updatedNote); // Elimina 'autor'
  }

  async deleteNote(id: number) {
    return this.db.notas.delete(id);
  }

  // CRUD para Contactos
  async addContact(contact: { nombre: string, telefono: string }) {
    return this.db.contactos.add(contact); // Elimina 'email'
  }

  async getContacts() {
    return this.db.contactos.toArray();
  }

  async updateContact(id: number, updatedContact: { nombre: string, telefono: string }) {
    return this.db.contactos.update(id, updatedContact); // Elimina 'email'
  }

  async deleteContact(id: number) {
    return this.db.contactos.delete(id);
  }
}
