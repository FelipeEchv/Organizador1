import { Component} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombreUsuario: string = '';
  password: string ='' ;
  edad: number = 0;
  correo: string = '';
  sexo: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) {}


  

  registrar() {
    // Crear el objeto usuario con los valores del formulario
    const nuevoUsuario = {
      nombreUsuario: this.nombreUsuario,
      password: this.password,
      edad: this.edad,
      correo: this.correo,
      sexo: this.sexo
    };

    // Registrar el nuevo usuario
    this.usuarioService.registrarUsuario(nuevoUsuario).subscribe(
      response => {
        alert('Registro exitoso, se te ha enviado un correo de confirmación.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error al registrar el usuario:', error);
      }
    );
  
    
    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }
}
