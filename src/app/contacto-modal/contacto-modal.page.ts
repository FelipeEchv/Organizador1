import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactosService } from '../services/contactos.service';

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
  email: string = ''; // Agregar el campo email

  constructor(
    private modalController: ModalController,
    private contactoService: ContactosService
  ) {}

  ngOnInit() {
    if (this.modo === 'editar' && this.contacto) {
      this.nombre = this.contacto.nombre;
      this.telefono = this.contacto.telefono;
      this.email = this.contacto.email || ''; // Agregar email, si existe
    }
  }

  async guardar() {
    if (this.modo === 'agregar') {
      // Añadimos el email al objeto
      await this.contactoService.agregarContacto({ nombre: this.nombre, telefono: this.telefono, email: this.email });
    } else {
      // En edición, también debe incluir email
      await this.contactoService.actualizarContacto(this.contacto.id, { nombre: this.nombre, telefono: this.telefono, email: this.email });
    }
    this.modalController.dismiss();  // Cierra el modal después de guardar
  }

  cerrar() {
    this.modalController.dismiss();  // Cierra el modal sin hacer nada
  }
}
