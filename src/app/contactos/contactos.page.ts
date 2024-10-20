import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../services/contactos.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContactoModalPage } from '../contacto-modal/contacto-modal.page';  

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  contactos: any[] = [];

  constructor(
    private contactoService: ContactoService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerContactos();
  }

  async obtenerContactos() {
    this.contactos = await this.contactoService.obtenerContactos();
  }

  async eliminarContacto(id: number) {
    await this.contactoService.eliminarContacto(id);
    this.obtenerContactos();  // Refrescar la lista de contactos
  }

  async abrirModalAgregar() {
    const modal = await this.modalController.create({
      component: ContactoModalPage,  // Referencia al componente del modal
      componentProps: { modo: 'agregar' }
    });
    modal.onDidDismiss().then(() => {
      this.obtenerContactos();
    });
    return await modal.present();
  }

  async abrirModalEditar(contacto: any) {
    const modal = await this.modalController.create({
      component: ContactoModalPage,  // Referencia al componente del modal
      componentProps: { modo: 'editar', contacto }
    });
    modal.onDidDismiss().then(() => {
      this.obtenerContactos();
    });
    return await modal.present();
  }

  volverInicio() {
    this.router.navigate(['/bienvenida']);
  }
}
