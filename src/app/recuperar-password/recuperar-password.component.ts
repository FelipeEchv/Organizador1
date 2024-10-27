import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent {
  usuario: string = '';
  email: string = '';

  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private toastController: ToastController
  ) {}

  close() {
    this.modalController.dismiss();
  }

  async recuperar() {
    if (this.validarFormulario()) {
      this.usuarioService.buscarUsuarioPorCorreo(this.email).subscribe({
        next: async (usuarios) => {
          if (usuarios.length > 0) {
            await this.presentToast(`Se ha enviado un enlace a ${this.email}`, 'success');
            this.close();
          } else {
            await this.presentToast('Correo no registrado', 'danger');
          }
        },
        error: async () => {
          await this.presentToast('Error al buscar usuario', 'danger');
        },
      });
    } else {
      await this.presentToast('Completa todos los campos correctamente', 'danger');
    }
  }

  emailValido(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  validarFormulario(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usuarioValido = this.usuario.trim().length > 0;
    const emailValido = emailRegex.test(this.email);
    return usuarioValido && emailValido;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
