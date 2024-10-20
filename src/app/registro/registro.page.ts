import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuarioservice.service';  // Nota: Mayúscula inicial en UsuarioService
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  password: string = '';
  correo: string = '';
  edad: number = 0;
  sexo: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}  // Uso de UsuarioService

  async registrar() {
    const nuevoUsuario = {
      nombre: this.nombre,
      password: this.password,
      correo: this.correo,
      edad: this.edad,
      sexo: this.sexo
    };

    try {
      await this.usuarioService.agregarUsuario(nuevoUsuario);  // Uso del método agregarUsuario del servicio
      alert('Usuario registrado exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar el usuario. Inténtalo nuevamente.');
    }
  }
}
