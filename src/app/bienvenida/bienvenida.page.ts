import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  nombreUsuario: string = 'Invitado';

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtiene el nombre del usuario desde localStorage
    this.nombreUsuario = localStorage.getItem('usuario') || 'Invitado';
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
