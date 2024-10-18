import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private apiUrl = 'http://localhost:3000/notas'; // Ruta del json-server

  constructor(private http: HttpClient) {}

  // Obtener todas las notas
  getNotas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar una nueva nota
  addNota(nota: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nota);
  }

  // Actualizar una nota existente
  updateNota(nota: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${nota.id}`, nota);
  }

  // Eliminar una nota por ID
  deleteNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
