import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage {
  tareas: any[] = [];

  constructor(private alertController: AlertController, private tareaService: TareaService) {
    this.cargarTareas();
  }

  // Cargar todas las tareas
  cargarTareas() {
    this.tareaService.getTareas().subscribe(tareas => {
      this.tareas = tareas;
    });
  }

  // Agregar una nueva tarea
  async agregarTarea() {
    const alert = await this.alertController.create({
      header: 'Nueva Tarea',
      inputs: [
        { name: 'titulo', type: 'text', placeholder: 'Título' },
        { name: 'contenido', type: 'text', placeholder: 'Contenido' },
        { name: 'fecha', type: 'date', placeholder: 'Fecha' },
        { name: 'prioridad', type: 'number', placeholder: 'Prioridad' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Agregar', handler: (data) => {
            const nuevaTarea = {
              titulo: data.titulo,
              contenido: data.contenido,
              fecha: data.fecha,
              prioridad: data.prioridad
            };
            this.tareaService.agregarTarea(nuevaTarea).subscribe(() => {
              this.cargarTareas(); // Recargar las tareas
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Editar una tarea existente
  async editarTarea(tarea: any) {
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        { name: 'titulo', type: 'text', value: tarea.titulo, placeholder: 'Título' },
        { name: 'contenido', type: 'text', value: tarea.contenido, placeholder: 'Contenido' },
        { name: 'fecha', type: 'date', value: tarea.fecha, placeholder: 'Fecha' },
        { name: 'prioridad', type: 'number', value: tarea.prioridad, placeholder: 'Prioridad' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', handler: (data) => {
            const tareaActualizada = {
              ...tarea,
              titulo: data.titulo,
              contenido: data.contenido,
              fecha: data.fecha,
              prioridad: data.prioridad
            };
            this.tareaService.editarTarea(tarea.id, tareaActualizada).subscribe(() => {
              this.cargarTareas(); // Recargar las tareas
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Eliminar una tarea
  eliminarTarea(tarea: any) {
    this.tareaService.eliminarTarea(tarea.id).subscribe(() => {
      this.cargarTareas(); // Recargar las tareas
    });
  }
}
