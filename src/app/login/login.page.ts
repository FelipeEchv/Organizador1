import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { UsuarioService } from '../services/usuarioservice.service';  // Cambiado a 'UsuarioService'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  password: string = '';
  rating: number = 0;
  hoveredRating: number = 0;
  mensajeVisible: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private modalController: ModalController, private usuarioService: UsuarioService) {}  // Cambiado a 'UsuarioService'

  async iniciarSesion() {
    this.isLoading = true;
    const usuarios = await this.usuarioService.obtenerUsuarios();
    const usuarioEncontrado = usuarios.find((u: any) => u.nombre === this.nombre && u.password === this.password);

    if (usuarioEncontrado) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
      setTimeout(() => {
        this.router.navigate(['/bienvenida']);
      }, 500);
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
    this.isLoading = false;
  }

  openRecuperarPassword() {
    this.modalController.create({
      component: RecuperarPasswordComponent
    }).then(modal => modal.present());
  }

  openRegistro() {
    this.router.navigate(['/registro']);
  }

  rate(stars: number) {
    this.rating = stars;
    this.mensajeVisible = true;

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
}
