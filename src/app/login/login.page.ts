import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { Usuarioservice } from '../services/usuarioservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  password: string = '';
  rating: number = 0; // Calificación seleccionada
  hoveredRating: number = 0; // Calificación mientras se pasa el mouse
  mensajeVisible: boolean = false; // Mostrar mensaje de agradecimiento por 3 segundos
  isLoading: boolean = false; // Controla la visibilidad de la barra de progreso

  constructor(private router: Router, private modalController: ModalController, private usuarioService: Usuarioservice) {}

  iniciarSesion() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      const usuarioEncontrado = usuarios.find(u => u.nombre === this.nombre && u.password === this.password);
      if (usuarioEncontrado) {
        alert('Inicio de sesión exitoso');
        // Guardar el usuario en localStorage para que el AuthGuard lo reconozca como autenticado
        localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
        
        // Agregar un ligero retraso para mostrar el mensaje antes de la navegación
        setTimeout(() => {
          this.router.navigate(['/bienvenida']); // Navegar a la página de bienvenida
        }, 500);
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    });
  }

  validarPassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]{4})(?=.*[a-zA-Z]{3}).{8}$/;
    return regex.test(password);
  }

  async openRecuperarPassword() {
    const modal = await this.modalController.create({
      component: RecuperarPasswordComponent
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
}
