import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage {
  contactos: any[] = [];

  constructor(private alertController: AlertController, private contactoService: ContactoService) {
    this.cargarContactos();
  }

  // Cargar todos los contactos
  cargarContactos() {
    this.contactoService.getContactos().subscribe(contactos => {
      this.contactos = contactos;
    });
  }

  // Agregar un nuevo contacto
  async agregarContacto() {
    const alert = await this.alertController.create({
      header: 'Nuevo Contacto',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'telefono', type: 'text', placeholder: 'Teléfono' },
        { name: 'direccion', type: 'text', placeholder: 'Dirección' },
        { name: 'correo', type: 'email', placeholder: 'Correo Electrónico' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Agregar', handler: (data: any) => {
            const nuevoContacto = {
              nombre: data.nombre,
              telefono: data.telefono,
              direccion: data.direccion,
              correo: data.correo
            };
            this.contactoService.agregarContacto(nuevoContacto).subscribe(() => {
              this.cargarContactos(); // Recargar los contactos
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Editar un contacto existente
  async editarContacto(contacto: any) {
    const alert = await this.alertController.create({
      header: 'Editar Contacto',
      inputs: [
        { name: 'nombre', type: 'text', value: contacto.nombre, placeholder: 'Nombre' },
        { name: 'telefono', type: 'text', value: contacto.telefono, placeholder: 'Teléfono' },
        { name: 'direccion', type: 'text', value: contacto.direccion, placeholder: 'Dirección' },
        { name: 'correo', type: 'email', value: contacto.correo, placeholder: 'Correo Electrónico' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', handler: (data: any) => {
            const contactoActualizado = {
              ...contacto,
              nombre: data.nombre,
              telefono: data.telefono,
              direccion: data.direccion,
              correo: data.correo
            };
            this.contactoService.editarContacto(contacto.id, contactoActualizado).subscribe(() => {
              this.cargarContactos(); // Recargar los contactos
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Eliminar un contacto
  eliminarContacto(contacto: any) {
    this.contactoService.eliminarContacto(contacto.id).subscribe(() => {
      this.cargarContactos(); // Recargar los contactos
    });
  }
}
