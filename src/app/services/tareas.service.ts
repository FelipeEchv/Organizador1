import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private apiUrl = 'http://localhost:3000/tareas'; // Ruta del json-server

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar una nueva tarea
  addTarea(tarea: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  // Actualizar una tarea existente
  updateTarea(tarea: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tarea.id}`, tarea);
  }

  // Eliminar una tarea por ID
  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
