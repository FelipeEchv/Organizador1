import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage {
  notas: any[] = [];

  // Variables para mensajes de error
  errorTitulo: string = '';
  errorContenido: string = '';

  constructor(
    private alertController: AlertController,
    private notaService: NotaService,
    private toastController: ToastController
  ) {
    this.cargarNotas();
  }

  cargarNotas() {
    this.notaService.getNotas().subscribe({
      next: (notas) => (this.notas = notas),
      error: () => this.presentToast('Error al cargar notas', 'danger'),
    });
  }

  async agregarNota() {
    const alert = await this.alertController.create({
      header: 'Nueva Nota',
      inputs: [
        { name: 'titulo', type: 'text', placeholder: 'Título', attributes: { minlength: 3, required: true } },
        { name: 'contenido', type: 'textarea', placeholder: 'Contenido', attributes: { required: true } }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (this.validateNota(data)) {
              const nuevaNota = { titulo: data.titulo, contenido: data.contenido, fecha: new Date() };
              this.notaService.agregarNota(nuevaNota).subscribe({
                next: () => {
                  this.presentToast('Nota agregada exitosamente', 'success');
                  this.cargarNotas();
                },
                error: () => this.presentToast('Error al agregar nota', 'danger'),
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

  async editarNota(nota: any) {
    const alert = await this.alertController.create({
      header: 'Editar Nota',
      inputs: [
        { name: 'titulo', type: 'text', value: nota.titulo, placeholder: 'Título', attributes: { minlength: 3, required: true } },
        { name: 'contenido', type: 'textarea', value: nota.contenido, placeholder: 'Contenido', attributes: { required: true } }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.validateNota(data)) {
              const notaActualizada = { ...nota, titulo: data.titulo, contenido: data.contenido };
              this.notaService.editarNota(nota.id, notaActualizada).subscribe({
                next: () => {
                  this.presentToast('Nota actualizada', 'success');
                  this.cargarNotas();
                },
                error: () => this.presentToast('Error al actualizar nota', 'danger'),
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

  eliminarNota(nota: any) {
    this.notaService.eliminarNota(nota.id).subscribe({
      next: () => {
        this.presentToast('Nota eliminada', 'success');
        this.cargarNotas();
      },
      error: () => this.presentToast('Error al eliminar nota', 'danger'),
    });
  }

  private validateNota(data: any): boolean {
    // Reiniciar mensajes de error
    this.errorTitulo = '';
    this.errorContenido = '';

    let esValido = true;

    if (!data.titulo || data.titulo.length < 3) {
      this.errorTitulo = 'El título debe tener al menos 3 caracteres.';
      esValido = false;
    }

    if (!data.contenido) {
      this.errorContenido = 'El contenido no puede estar vacío.';
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
