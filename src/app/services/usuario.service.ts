import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  // Obtener un usuario por correo
  buscarUsuarioPorCorreo(correo: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}?correo=${correo}`);
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: { nombreUsuario: string; password: string; edad: number; correo: string; sexo: string }): Observable<any> {
    return this.http.post(this.apiURL, usuario);
  }
  

  // Editar un usuario existente
  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  // Iniciar sesión
  login(nombreUsuario: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}?nombreUsuario=${nombreUsuario}&password=${password}`);
  }
}
