import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { IndexedDBService } from './indexeddb.service';
import { SqliteService } from './sqlite.service';
import { ConnectivityService } from './connectivity.service';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private apiUrl = 'http://localhost:3000/contactos';
  private isWeb: boolean;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private sqliteService: SqliteService,
    private indexedDBService: IndexedDBService,
    private connectivityService: ConnectivityService
  ) {
    this.isWeb = this.platform.is('desktop') || this.platform.is('mobileweb');
  }

  async agregarContacto(contacto: { nombre: string, telefono: string, email: string }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.post(this.apiUrl, contacto).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.addContact(contacto);
    } else {
      return this.sqliteService.addContact(contacto.nombre, contacto.telefono, contacto.email);
    }
  }

  async obtenerContactos() {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.get<any[]>(this.apiUrl).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.getContacts();
    } else {
      return this.sqliteService.getContacts();
    }
  }

  async actualizarContacto(id: number, contacto: { nombre: string, telefono: string, email: string }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.put(`${this.apiUrl}/${id}`, contacto).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.updateContact(id, contacto);
    } else {
      return this.sqliteService.updateContact(id, contacto.nombre, contacto.telefono, contacto.email);
    }
  }

  async eliminarContacto(id: number) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.deleteContact(id);
    } else {
      return this.sqliteService.deleteContact(id);
    }
  }
}
