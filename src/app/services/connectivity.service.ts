import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private serverUrl = 'http://localhost:3000';  // URL de tu json-server

  constructor(private http: HttpClient) {}

  async tieneConexionConServer(): Promise<boolean> {
    try {
      const response = await this.http.get(`${this.serverUrl}/ping`).pipe(
        catchError(() => of(false))  // Si falla, devolvemos `false`
      ).toPromise();
      return !!response;  // Si el servidor responde, devolvemos `true`
    } catch (error) {
      return false;  // Si hay un error, asumimos que no hay conexión
    }
  }
}
