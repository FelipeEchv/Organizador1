import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarios = [
    { usuario: 'FelipeE', password: 'Duoc2024' },
    { usuario: 'IgnacioM', password: 'Duoc2024' }
  ];

  constructor() { }

  login(usuario: string, password: string): boolean {
    const user = this.usuarios.find(u => u.usuario === usuario && u.password === password);
    if (user) {
      localStorage.setItem('usuario', usuario); // Almacena al usuario en localStorage
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario');
  }
}
