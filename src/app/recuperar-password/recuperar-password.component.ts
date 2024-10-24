import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

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

  recuperar() {
    // Verificar si el email pertenece a un usuario registrado
    const user = this.usuarioService.buscarUsuarioPorCorreo(this.email);
    if (user) {
      alert('Se ha enviado un enlace para recuperar la contraseña a ' + this.email);
      this.close();
    } else {
      alert('Correo no registrado. Por favor, introduzca un correo electrónico válido.');
    }
  }

  emailValido(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    return regex.test(this.email);
  }
}
