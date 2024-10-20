import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://192.168.100.9:3000/tareas';  

  constructor(private http: HttpClient, private sqliteService: SqliteService) {}

  // Agregar tarea
  async agregarTarea(titulo: string, descripcion: string, fecha: string, prioridad: number) {
    if (this.tieneConexion()) {
      return this.http.post(this.apiUrl, { titulo, descripcion, fecha, prioridad }).toPromise();
    } else {
      return this.sqliteService.addTask(titulo, descripcion, fecha, prioridad);
    }
  }

  // Obtener tareas
  async obtenerTareas(): Promise<any[]> {
    if (this.tieneConexion()) {
      const tareas = await this.http.get<any[]>(this.apiUrl).toPromise();
      return tareas || [];
    } else {
      const tareas = await this.sqliteService.getTasks();
      return tareas || [];
    }
  }

  // Actualizar tarea
  async actualizarTarea(id: number, titulo: string, descripcion: string, fecha: string, prioridad: number) {
    if (this.tieneConexion()) {
      return this.http.put(`${this.apiUrl}/${id}`, { titulo, descripcion, fecha, prioridad }).toPromise();
    } else {
      return this.sqliteService.updateTask(id, titulo, descripcion, fecha, prioridad);
    }
  }

  // Eliminar tarea
  async eliminarTarea(id: number) {
    if (this.tieneConexion()) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else {
      return this.sqliteService.deleteTask(id);
    }
  }

  // Verificar si hay conexión a internet
  tieneConexion(): boolean {
    return window.navigator.onLine;
  }
}
