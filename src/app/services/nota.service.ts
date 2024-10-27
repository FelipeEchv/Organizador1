import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiURL = 'http://192.168.100.9:3000/notas';

  constructor(private http: HttpClient) { }

  // Obtener todas las notas
  getNotas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar una nueva nota
  agregarNota(nota: any): Observable<any> {
    if (!this.validateNota(nota)) {
      return throwError('Datos de la nota inválidos');
    }
    return this.http.post(this.apiURL, nota).pipe(
      map(() => 'Nota agregada exitosamente'),
      catchError(this.handleError)
    );
  }

  // Editar una nota existente
  editarNota(id: number, nota: any): Observable<any> {
    if (!this.validateNota(nota)) {
      return throwError('Datos de la nota inválidos');
    }
    return this.http.put(`${this.apiURL}/${id}`, nota).pipe(
      map(() => 'Nota actualizada exitosamente'),
      catchError(this.handleError)
    );
  }

  // Eliminar una nota
  eliminarNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      map(() => 'Nota eliminada exitosamente'),
      catchError(this.handleError)
    );
  }

  // Validación de datos de la nota
  private validateNota(nota: any): boolean {
    return nota.titulo && nota.titulo.length >= 3 && nota.contenido;
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
