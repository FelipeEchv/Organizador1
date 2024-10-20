import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = 'http://192.168.100.9:3000/notas'; 

  constructor(private http: HttpClient, private sqliteService: SqliteService) {}

  // Agregar nota
  async agregarNota(titulo: string, contenido: string, fecha: string) {
    if (this.tieneConexion()) {
      return this.http.post(this.apiUrl, { titulo, contenido, fecha }).toPromise();
    } else {
      return this.sqliteService.addNote(titulo, contenido, fecha);
    }
  }

  // Obtener notas
  async obtenerNotas(): Promise<any[]> {
    if (this.tieneConexion()) {
      const notas = await this.http.get<any[]>(this.apiUrl).toPromise();
      return notas || [];
    } else {
      const notas = await this.sqliteService.getNotes();
      return notas || [];
    }
  }

  // Actualizar nota
  async actualizarNota(id: number, titulo: string, contenido: string, fecha: string) {
    if (this.tieneConexion()) {
      return this.http.put(`${this.apiUrl}/${id}`, { titulo, contenido, fecha }).toPromise();
    } else {
      return this.sqliteService.updateNote(id, titulo, contenido, fecha);
    }
  }

  // Eliminar nota
  async eliminarNota(id: number) {
    if (this.tieneConexion()) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else {
      return this.sqliteService.deleteNote(id);
    }
  }

  // Verificar si hay conexión a internet
  tieneConexion(): boolean {
    return window.navigator.onLine;
  }
}
