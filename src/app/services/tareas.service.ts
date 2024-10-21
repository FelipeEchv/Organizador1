import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { IndexedDBService } from './indexeddb.service';
import { SqliteService } from './sqlite.service';
import { ConnectivityService } from './connectivity.service';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/tareas';
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

  async agregarTarea(tarea: { titulo: string, descripcion: string, fecha: string, prioridad: number }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.post(this.apiUrl, tarea).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.addTask(tarea);
    } else {
      return this.sqliteService.addTask(tarea.titulo, tarea.descripcion, tarea.fecha, tarea.prioridad);
    }
  }

  async obtenerTareas() {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.get<any[]>(this.apiUrl).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.getTasks();
    } else {
      return this.sqliteService.getTasks();
    }
  }
 
  async actualizarTarea(id: number, tarea: { titulo: string, descripcion: string, fecha: string, prioridad: number }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.put(`${this.apiUrl}/${id}`, tarea).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.updateTask(id, tarea);
    } else {
      return this.sqliteService.updateTask(id, tarea.titulo, tarea.descripcion, tarea.fecha, tarea.prioridad);
    }
  }

  async eliminarTarea(id: number) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.deleteTask(id);
    } else {
      return this.sqliteService.deleteTask(id);
    }
  }
}
