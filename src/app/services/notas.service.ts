import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl = 'http://localhost:3000/notas'; 

  constructor(private http: HttpClient) {}

  // Obtener las notas del usuario autenticado
  getNotasByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
  

  // Agregar una nueva nota
  addNota(nota: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nota);
  }

  // Actualizar una nota
  updateNota(nota: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${nota.id}`, nota);
  }

  // Eliminar una nota
  deleteNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
