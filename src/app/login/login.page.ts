import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  rating: number = 0; // Calificación seleccionada
  hoveredRating: number = 0; // Calificación mientras se pasa el mouse
  mensajeVisible: boolean = false; // Mostrar mensaje de agradecimiento por 3 segundos
  isLoading: boolean = false; // Controla la visibilidad de la barra de progreso
  usuario: string = ''; // Campo para el nombre de usuario
  password: string = ''; // Campo para la contraseña

  constructor(
    private router: Router,
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private toastController: ToastController // Para mostrar mensajes toast
  ) {}


  // Método para autenticar al usuario
  async login() {
    this.isLoading = true;
    this.usuarioService.login(this.usuario, this.password).subscribe({
      next: async (usuarios) => {
        this.isLoading = false;
        if (usuarios.length > 0) {
          localStorage.setItem('usuario', this.usuario);
          await this.presentToast('Inicio de sesión exitoso', 'success');
          this.router.navigate(['/bienvenida']);
        } else {
          await this.presentToast('Credenciales incorrectas', 'danger');
        }
      },
      error: async () => {
        this.isLoading = false;
        await this.presentToast('Error al iniciar sesión', 'danger');
      },
    });
  }


  validarPassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]{4})(?=.*[a-zA-Z]{3}).{8}$/;
    return regex.test(password);
  }

  async openRecuperarPassword() {
    const modal = await this.modalController.create({
      component: RecuperarPasswordComponent,
    });
    return await modal.present();
  }

  // Métodos para la calificación
  rate(stars: number) {
    this.rating = stars;
    this.mensajeVisible = true; // Mostrar mensaje de agradecimiento

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeVisible = false;
    }, 3000);
  }

  setHoveredRating(stars: number) {
    this.hoveredRating = stars;
  }

  resetHoveredRating() {
    this.hoveredRating = 0;
  }

  openRegistro() {
    this.router.navigate(['/registro']);
  }

  // Método para mostrar mensajes tipo toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // El mensaje aparece por 2 segundos
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
