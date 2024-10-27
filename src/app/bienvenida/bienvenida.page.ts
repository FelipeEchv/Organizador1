import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  nombreUsuario: string = 'Invitado';
  mapa: any;;


  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('usuario') || 'Invitado';
  }

  
    

  



  async logout() {
    try {
      localStorage.removeItem('usuario');
      await this.router.navigate(['/login']);
      this.presentToast('Sesión cerrada correctamente', 'success');
    } catch (error) {
      this.presentToast('Error al cerrar sesión', 'danger');
    }
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
