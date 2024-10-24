import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiURL = 'http://localhost:3000/tareas';

  constructor(private http: HttpClient) { }

  // Obtener todas las tareas
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  // Agregar una nueva tarea
  agregarTarea(tarea: any): Observable<any> {
    return this.http.post(this.apiURL, tarea);
  }

  // Editar una tarea existente
  editarTarea(id: number, tarea: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, tarea);
  }

  // Eliminar una tarea
  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}