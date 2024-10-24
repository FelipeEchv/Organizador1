import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiURL = 'http://localhost:3000/notas';

  constructor(private http: HttpClient) { }

  // Obtener todas las notas
  getNotas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  // Agregar una nueva nota
  agregarNota(nota: any): Observable<any> {
    return this.http.post(this.apiURL, nota);
  }

  // Editar una nota existente
  editarNota(id: number, nota: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, nota);
  }

  // Eliminar una nota
  eliminarNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
