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
    // Obtiene el usuario desde localStorage y lo parsea
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioData = JSON.parse(usuario); // Parsear la cadena JSON
      this.nombreUsuario = usuarioData.nombre || 'Invitado'; // Extraer solo el nombre
    } else {
      this.nombreUsuario = 'Invitado';
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
