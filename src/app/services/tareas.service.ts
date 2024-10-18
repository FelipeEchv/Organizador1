import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/tareas'; // Asegúrate de que esta URL sea la correcta para tu json-server

  constructor(private http: HttpClient) {}

  // Obtener las tareas del usuario autenticado
  getTareasByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
  

  // Agregar una nueva tarea
  addTarea(tarea: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  // Actualizar una tarea
  updateTarea(tarea: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tarea.id}`, tarea);
  }

  // Eliminar una tarea
  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
