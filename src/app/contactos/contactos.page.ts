import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage {
  contactos: any[] = [];

  // Variables para mensajes de error
  errorNombre: string = '';
  errorTelefono: string = '';
  errorDireccion: string = '';
  errorCorreo: string = '';

  constructor(
    private alertController: AlertController,
    private contactoService: ContactoService,
    private toastController: ToastController
  ) {
    this.cargarContactos();
  }

  cargarContactos() {
    this.contactoService.getContactos().subscribe({
      next: (contactos) => (this.contactos = contactos),
      error: () => this.presentToast('Error al cargar contactos', 'danger'),
    });
  }

  async agregarContacto() {
    const alert = await this.alertController.create({
      header: 'Nuevo Contacto',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', attributes: { pattern: '^[a-zA-Z ]+$' } },
        { name: 'telefono', type: 'text', placeholder: 'Teléfono', attributes: { pattern: '^[0-9]+$', maxlength: 10 } },
        { name: 'direccion', type: 'text', placeholder: 'Dirección' },
        { name: 'correo', type: 'email', placeholder: 'Correo Electrónico' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (this.validateContacto(data)) {
              this.contactoService.agregarContacto(data).subscribe({
                next: () => {
                  this.presentToast('Contacto agregado exitosamente', 'success');
                  this.cargarContactos();
                },
                error: () => this.presentToast('Error al agregar contacto', 'danger'),
              });
              return true;
            } else {
              this.presentToast('Por favor, completa todos los campos correctamente.', 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editarContacto(contacto: any) {
    const alert = await this.alertController.create({
      header: 'Editar Contacto',
      inputs: [
        { name: 'nombre', type: 'text', value: contacto.nombre, placeholder: 'Nombre', attributes: { pattern: '^[a-zA-Z ]+$' } },
        { name: 'telefono', type: 'text', value: contacto.telefono, placeholder: 'Teléfono', attributes: { pattern: '^[0-9]+$', maxlength: 10 } },
        { name: 'direccion', type: 'text', value: contacto.direccion, placeholder: 'Dirección' },
        { name: 'correo', type: 'email', value: contacto.correo, placeholder: 'Correo Electrónico' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.validateContacto(data)) {
              this.contactoService.editarContacto(contacto.id, data).subscribe({
                next: () => {
                  this.presentToast('Contacto actualizado', 'success');
                  this.cargarContactos();
                },
                error: () => this.presentToast('Error al actualizar contacto', 'danger'),
              });
              return true;
            } else {
              this.presentToast('Por favor, completa todos los campos correctamente.', 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarContacto(contacto: any) {
    this.contactoService.eliminarContacto(contacto.id).subscribe({
      next: () => {
        this.presentToast('Contacto eliminado', 'success');
        this.cargarContactos();
      },
      error: () => this.presentToast('Error al eliminar contacto', 'danger'),
    });
  }

  // Validación de datos de contacto
  private validateContacto(data: any): boolean {
    const nombreRegex = /^[a-zA-Z ]+$/;
    const telefonoRegex = /^[0-9]+$/; // Permitir solo números
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación básica de correo electrónico

    // Reiniciar mensajes de error
    this.errorNombre = '';
    this.errorTelefono = '';
    this.errorDireccion = '';
    this.errorCorreo = '';

    let esValido = true;

    if (!nombreRegex.test(data.nombre)) {
      this.errorNombre = 'El nombre solo debe contener letras y espacios.';
      esValido = false;
    }

    if (!telefonoRegex.test(data.telefono) || data.telefono.length > 10) {
      this.errorTelefono = 'El teléfono debe contener solo números y tener mínimo 8 y máximo 10 dígitos.';
      esValido = false;
    }

    if (!data.direccion) {
      this.errorDireccion = 'La dirección es requerida.';
      esValido = false;
    }

    if (!emailRegex.test(data.correo)) {
      this.errorCorreo = 'Introduce un correo electrónico válido.';
      esValido = false;
    }

    return esValido;
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
