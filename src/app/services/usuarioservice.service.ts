import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://192.168.100.9:3000/usuarios'; 
  constructor(private http: HttpClient, private sqliteService: SqliteService) {}

  // Agregar usuario
  async agregarUsuario(usuario: { nombre: string, password: string, correo: string, edad: number, sexo: string }) {
    if (this.tieneConexion()) {
      // Enviar el objeto usuario completo al json-server
      return this.http.post(this.apiUrl, usuario).toPromise();
    } else {
      // Guardar en SQLite
      return this.sqliteService.addUser(usuario.nombre, usuario.correo);
    }
  }

  // Obtener usuarios
  async obtenerUsuarios(): Promise<any[]> {
    if (this.tieneConexion()) {
      const usuarios = await this.http.get<any[]>(this.apiUrl).toPromise();
      return usuarios || [];
    } else {
      const usuarios = await this.sqliteService.getUsers();
      return usuarios || [];
    }
  }

  // Actualizar usuario
  async actualizarUsuario(id: number, usuario: { nombre: string, correo: string }) {
    if (this.tieneConexion()) {
      // Enviar actualización al json-server
      return this.http.put(`${this.apiUrl}/${id}`, usuario).toPromise();
    } else {
      // Actualizar en SQLite
      return this.sqliteService.updateUser(id, usuario.nombre, usuario.correo);
    }
  }

  // Eliminar usuario
  async eliminarUsuario(id: number) {
    if (this.tieneConexion()) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else {
      return this.sqliteService.deleteUser(id);
    }
  }

  // Verificar si hay conexión a internet
  tieneConexion(): boolean {
    return window.navigator.onLine;
  }
}
