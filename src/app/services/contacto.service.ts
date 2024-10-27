import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiURL = 'http://192.168.100.9:3000/contactos';

  constructor(private http: HttpClient) { }

  // Obtener todos los contactos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar un nuevo contacto
  agregarContacto(contacto: any): Observable<any> {
    if (!this.validateContacto(contacto)) {
      return throwError('Datos de contacto inválidos');
    }
    return this.http.post(this.apiURL, contacto).pipe(
      map(() => 'Contacto agregado exitosamente'),
      catchError(this.handleError)
    );
  }

  // Editar un contacto existente
  editarContacto(id: number, contacto: any): Observable<any> {
    if (!this.validateContacto(contacto)) {
      return throwError('Datos de contacto inválidos');
    }
    return this.http.put(`${this.apiURL}/${id}`, contacto).pipe(
      map(() => 'Contacto actualizado exitosamente'),
      catchError(this.handleError)
    );
  }

  // Eliminar un contacto
  eliminarContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      map(() => 'Contacto eliminado exitosamente'),
      catchError(this.handleError)
    );
  }

  // Validación de datos de contacto
  private validateContacto(contacto: any): boolean {
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const telefonoRegex = /^[0-9]{8,10}$/; // Por ejemplo, 8-10 dígitos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return nombreRegex.test(contacto.nombre) &&
           telefonoRegex.test(contacto.telefono) &&
           emailRegex.test(contacto.correo) &&
           contacto.direccion;
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
