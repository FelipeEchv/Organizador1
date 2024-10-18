import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Verifica si el usuario está autenticado verificando el localStorage
    const isAuthenticated = localStorage.getItem('usuario'); 
    
    if (isAuthenticated) {
      return true; // Permite el acceso si el usuario está autenticado
    } else {
      // Redirige al login si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
