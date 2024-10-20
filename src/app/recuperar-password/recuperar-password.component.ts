import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuarioservice.service'; 

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent {
  usuario: string = '';
  email: string = '';

  constructor(private modalController: ModalController, private usuarioService: UsuarioService) {}

  close() {
    this.modalController.dismiss();
  }

  async recuperar() {
    if (!this.emailValido()) {
      alert('Por favor, introduzca un correo electrónico válido.');
      return;
    }

    try {
      const usuarios = await this.usuarioService.obtenerUsuarios();
      const usuarioEncontrado = usuarios.find(u => u.nombre === this.usuario && u.correo === this.email);

      if (usuarioEncontrado) {
        alert('Se ha enviado un enlace para recuperar la contraseña a ' + this.email);
        this.close();
      } else {
        alert('No se ha encontrado el usuario o correo proporcionado.');
      }
    } catch (error) {
      console.error('Error al consultar la base de datos', error);
      alert('Hubo un error al intentar recuperar la contraseña. Inténtelo más tarde.');
    }
  }

  emailValido(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }
}
