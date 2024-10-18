import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private apiUrl = 'http://localhost:3000/contactos'; 

  constructor(private http: HttpClient) {}

  // Obtener los contactos del usuario autenticado
  getContactosByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
  

  // Agregar un nuevo contacto
  addContacto(contacto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contacto);
  }

  // Actualizar un contacto
  updateContacto(contacto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${contacto.id}`, contacto);
  }

  // Eliminar un contacto
  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
