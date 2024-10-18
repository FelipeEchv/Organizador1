import { Component } from '@angular/core';
import { Usuarioservice } from '../services/usuarioservice.service';
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

  constructor(private usuarioService: Usuarioservice, private router: Router) {}

  registrar() {
    const nuevoUsuario = {
      nombre: this.nombre,
      password: this.password, // Asegúrate de que la contraseña esté incluida
      correo: this.correo,
      edad: this.edad,
      sexo: this.sexo
    };

    this.usuarioService.addUsuario(nuevoUsuario).subscribe(response => {
      alert('Usuario registrado exitosamente');
      this.router.navigate(['/login']);
    });
  }
}
