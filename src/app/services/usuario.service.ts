import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = 'http://192.168.100.9:3000/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un usuario por correo
  buscarUsuarioPorCorreo(correo: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}?correo=${correo}`).pipe(
      catchError(this.handleError)
    );
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: { nombreUsuario: string; password: string; edad: number; correo: string; sexo: string }): Observable<any> {
    if (!this.validateUsuario(usuario)) {
      return throwError('Datos del usuario inválidos');
    }
    return this.http.post(this.apiURL, usuario).pipe(
      map(() => 'Usuario registrado exitosamente'),
      catchError(this.handleError)
    );
  }

  // Editar un usuario existente
  editarUsuario(id: number, usuario: any): Observable<any> {
    if (!this.validateUsuario(usuario)) {
      return throwError('Datos del usuario inválidos');
    }
    return this.http.put(`${this.apiURL}/${id}`, usuario).pipe(
      map(() => 'Usuario actualizado exitosamente'),
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      map(() => 'Usuario eliminado exitosamente'),
      catchError(this.handleError)
    );
  }

  // Iniciar sesión
  login(nombreUsuario: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}?nombreUsuario=${nombreUsuario}&password=${password}`).pipe(
      map((usuarios) => {
        if (usuarios.length > 0) {
          return 'Inicio de sesión exitoso';
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Validación de datos del usuario
  private validateUsuario(usuario: any): boolean {
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const edadValida = usuario.edad >= 1 && usuario.edad <= 99;
    const passwordValida = usuario.password && usuario.password.length >= 8;

    return (
      nombreRegex.test(usuario.nombreUsuario) &&
      emailRegex.test(usuario.correo) &&
      edadValida &&
      passwordValida &&
      usuario.sexo
    );
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
