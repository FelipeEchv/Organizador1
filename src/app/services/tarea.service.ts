import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiURL = 'http://192.168.100.9:3000/tareas';

  constructor(private http: HttpClient) { }

  // Obtener todas las tareas
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar una nueva tarea
  agregarTarea(tarea: any): Observable<any> {
    if (!this.validateTarea(tarea)) {
      return throwError('Datos de la tarea inválidos');
    }
    return this.http.post(this.apiURL, tarea).pipe(
      map(() => 'Tarea agregada exitosamente'),
      catchError(this.handleError)
    );
  }

  // Editar una tarea existente
  editarTarea(id: number, tarea: any): Observable<any> {
    if (!this.validateTarea(tarea)) {
      return throwError('Datos de la tarea inválidos');
    }
    return this.http.put(`${this.apiURL}/${id}`, tarea).pipe(
      map(() => 'Tarea actualizada exitosamente'),
      catchError(this.handleError)
    );
  }

  // Eliminar una tarea
  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      map(() => 'Tarea eliminada exitosamente'),
      catchError(this.handleError)
    );
  }

  // Validación de datos de la tarea
  private validateTarea(tarea: any): boolean {
    const prioridadValida = tarea.prioridad >= 1 && tarea.prioridad <= 5;
    return tarea.titulo && tarea.titulo.length >= 3 && tarea.contenido && prioridadValida && tarea.fecha;
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
