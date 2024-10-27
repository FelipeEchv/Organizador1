import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombreUsuario: string = '';
  password: string = '';
  edad: number = 0;
  correo: string = '';
  sexo: string = '';

  // Variables para mensajes de error
  errorNombre: string = '';
  errorPassword: string = '';
  errorEdad: string = '';
  errorCorreo: string = '';
  errorSexo: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toastController: ToastController
  ) {}

  registrar() {
    if (this.validarFormulario()) {
      const nuevoUsuario = {
        nombreUsuario: this.nombreUsuario,
        password: this.password,
        edad: this.edad,
        correo: this.correo,
        sexo: this.sexo,
      };

      this.usuarioService.registrarUsuario(nuevoUsuario).subscribe({
        next: async () => {
          await this.presentToast('Registro exitoso. Se ha enviado un correo de confirmación', 'success');
          this.router.navigate(['/login']);
        },
        error: async () => {
          await this.presentToast('Error al registrar usuario', 'danger');
        },
      });
    } else {
      this.presentToast('Por favor, completa todos los campos correctamente', 'danger');
    }
  }

  validarFormulario(): boolean {
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const edadValida = this.edad !== null && this.edad >= 1 && this.edad <= 99;
    
    // Reiniciar mensajes de error
    this.errorNombre = '';
    this.errorPassword = '';
    this.errorEdad = '';
    this.errorCorreo = '';
    this.errorSexo = '';

    let esValido = true;

    // Validación del nombre
    if (!nombreRegex.test(this.nombreUsuario)) {
      this.errorNombre = 'El nombre solo debe contener letras y espacios.';
      esValido = false;
    }

    // Validación de la contraseña
    if (this.password.length < 8) {
      this.errorPassword = 'La contraseña debe tener al menos 8 caracteres.';
      esValido = false;
    }

    // Validación de la edad
    if (!edadValida) {
      this.errorEdad = 'La edad debe ser un número entre 1 y 99.';
      esValido = false;
    }

    // Validación del correo
    if (!emailRegex.test(this.correo)) {
      this.errorCorreo = 'Introduce un correo electrónico válido.';
      esValido = false;
    }

    // Validación del sexo
    if (!this.sexo) {
      this.errorSexo = 'Selecciona un género.';
      esValido = false;
    }

    return esValido;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
