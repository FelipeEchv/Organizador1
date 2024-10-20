import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactoService } from '../services/contactos.service';

@Component({
  selector: 'app-contacto-modal',
  templateUrl: './contacto-modal.page.html',
  styleUrls: ['./contacto-modal.page.scss'],
})
export class ContactoModalPage {
  @Input() modo?: string;  // 'agregar' o 'editar'
  @Input() contacto: any = {};  // Si es edición, se pasa el contacto a editar
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';

  constructor(
    private modalController: ModalController,
    private contactoService: ContactoService
  ) {}

  ngOnInit() {
    if (this.modo === 'editar' && this.contacto) {
      this.nombre = this.contacto.nombre;
      this.telefono = this.contacto.telefono;
      this.direccion = this.contacto.direccion;
    }
  }

  async guardar() {
    if (this.modo === 'agregar') {
      await this.contactoService.agregarContacto(this.nombre, this.telefono, this.direccion);
    } else {
      await this.contactoService.actualizarContacto(this.contacto.id, this.nombre, this.telefono, this.direccion);
    }
    this.modalController.dismiss();  // Cierra el modal después de guardar
  }

  cerrar() {
    this.modalController.dismiss();  // Cierra el modal sin hacer nada
  }
}
