import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { IndexedDBService } from './indexeddb.service';
import { SqliteService } from './sqlite.service';
import { ConnectivityService } from './connectivity.service';
 
@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl = 'http://localhost:3000/notas';
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

  async agregarNota(nota: { titulo: string, contenido: string, fecha: string }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.post(this.apiUrl, nota).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.addNote(nota);
    } else {
      return this.sqliteService.addNote(nota.titulo, nota.contenido, nota.fecha);
    }
  }

  async obtenerNotas() {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.get<any[]>(this.apiUrl).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.getNotes();
    } else {
      return this.sqliteService.getNotes();
    }
  }

  async actualizarNota(id: number, nota: { titulo: string, contenido: string, fecha: string }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.put(`${this.apiUrl}/${id}`, nota).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.updateNote(id, nota);
    } else {
      return this.sqliteService.updateNote(id, nota.titulo, nota.contenido, nota.fecha);
    }
  }

  async eliminarNota(id: number) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.deleteNote(id);
    } else {
      return this.sqliteService.deleteNote(id);
    }
  }
}
