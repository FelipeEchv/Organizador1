import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage {
  tareas: any[] = [];

  // Variables para mensajes de error
  errorTitulo: string = '';
  errorContenido: string = '';
  errorFecha: string = '';
  errorPrioridad: string = '';

  constructor(
    private alertController: AlertController,
    private tareaService: TareaService,
    private toastController: ToastController
  ) {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareaService.getTareas().subscribe({
      next: (tareas) => (this.tareas = tareas),
      error: () => this.presentToast('Error al cargar tareas', 'danger'),
    });
  }

  async agregarTarea() {
    const alert = await this.alertController.create({
      header: 'Nueva Tarea',
      inputs: [
        { name: 'titulo', type: 'text', placeholder: 'Título', attributes: { minlength: 3, required: true } },
        { name: 'contenido', type: 'text', placeholder: 'Contenido', attributes: { required: true } },
        { name: 'fecha', type: 'date', placeholder: 'Fecha', attributes: { required: true } },
        { name: 'prioridad', type: 'number', placeholder: 'Prioridad (1-5)', attributes: { min: 1, max: 5, required: true } }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (this.validateTarea(data)) {
              const nuevaTarea = { titulo: data.titulo, contenido: data.contenido, fecha: data.fecha, prioridad: data.prioridad };
              this.tareaService.agregarTarea(nuevaTarea).subscribe({
                next: () => {
                  this.presentToast('Tarea agregada exitosamente', 'success');
                  this.cargarTareas();
                },
                error: () => this.presentToast('Error al agregar tarea', 'danger'),
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

  async editarTarea(tarea: any) {
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        { name: 'titulo', type: 'text', value: tarea.titulo, placeholder: 'Título', attributes: { minlength: 3, required: true } },
        { name: 'contenido', type: 'text', value: tarea.contenido, placeholder: 'Contenido', attributes: { required: true } },
        { name: 'fecha', type: 'date', value: tarea.fecha, placeholder: 'Fecha', attributes: { required: true } },
        { name: 'prioridad', type: 'number', value: tarea.prioridad, placeholder: 'Prioridad (1-5)', attributes: { min: 1, max: 5, required: true } }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.validateTarea(data)) {
              const tareaActualizada = { ...tarea, titulo: data.titulo, contenido: data.contenido, fecha: data.fecha, prioridad: data.prioridad };
              this.tareaService.editarTarea(tarea.id, tareaActualizada).subscribe({
                next: () => {
                  this.presentToast('Tarea actualizada', 'success');
                  this.cargarTareas();
                },
                error: () => this.presentToast('Error al actualizar tarea', 'danger'),
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

  eliminarTarea(tarea: any) {
    this.tareaService.eliminarTarea(tarea.id).subscribe({
      next: () => {
        this.presentToast('Tarea eliminada', 'success');
        this.cargarTareas();
      },
      error: () => this.presentToast('Error al eliminar tarea', 'danger'),
    });
  }

  private validateTarea(data: any): boolean {
    // Reiniciar mensajes de error
    this.errorTitulo = '';
    this.errorContenido = '';
    this.errorFecha = '';
    this.errorPrioridad = '';

    let esValido = true;

    if (!data.titulo || data.titulo.length < 3) {
      this.errorTitulo = 'El título debe tener al menos 3 caracteres.';
      esValido = false;
    }

    if (!data.contenido) {
      this.errorContenido = 'El contenido no puede estar vacío.';
      esValido = false;
    }

    if (!data.fecha) {
      this.errorFecha = 'La fecha es obligatoria.';
      esValido = false;
    }

    if (!data.prioridad || data.prioridad < 1 || data.prioridad > 5) {
      this.errorPrioridad = 'La prioridad debe ser un número entre 1 y 5.';
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
