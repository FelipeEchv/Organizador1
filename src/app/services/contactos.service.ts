import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://192.168.100.9:3000/contactos'; 

  constructor(private http: HttpClient, private sqliteService: SqliteService) {}

  // Agregar contacto
  async agregarContacto(nombre: string, telefono: string, direccion: string) {
    if (this.tieneConexion()) {
      return this.http.post(this.apiUrl, { nombre, telefono, direccion }).toPromise();
    } else {
      return this.sqliteService.addContact(nombre, telefono, direccion);
    }
  }

  // Obtener contactos
  async obtenerContactos(): Promise<any[]> {
    if (this.tieneConexion()) {
      const contactos = await this.http.get<any[]>(this.apiUrl).toPromise();
      return contactos || [];
    } else {
      const contactos = await this.sqliteService.getContacts();
      return contactos || [];
    }
  }

  // Actualizar contacto
  async actualizarContacto(id: number, nombre: string, telefono: string, direccion: string) {
    if (this.tieneConexion()) {
      return this.http.put(`${this.apiUrl}/${id}`, { nombre, telefono, direccion }).toPromise();
    } else {
      return this.sqliteService.updateContact(id, nombre, telefono, direccion);
    }
  }

  // Eliminar contacto
  async eliminarContacto(id: number) {
    if (this.tieneConexion()) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else {
      return this.sqliteService.deleteContact(id);
    }
  }

  // Verificar si hay conexión a internet
  tieneConexion(): boolean {
    return window.navigator.onLine;
  }
}
