import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-tarea-modal',
  templateUrl: './tarea-modal.page.html',
  styleUrls: ['./tarea-modal.page.scss'],
})
export class TareaModalPage {
  @Input() modo?: string;
  @Input() tarea: any = {};

  titulo: string = '';
  descripcion: string = '';
  fecha: string = '';
  prioridad: number = 1;

  constructor(
    private modalController: ModalController,
    private tareaService: TareasService
  ) {}

  ngOnInit() {
    if (this.modo === 'editar' && this.tarea) {
      this.titulo = this.tarea.titulo;
      this.descripcion = this.tarea.descripcion;
      this.fecha = this.tarea.fecha;
      this.prioridad = this.tarea.prioridad;
    }
  }

  async guardar() {
    if (this.modo === 'agregar') {
      // Pasamos todas las propiedades requeridas
      await this.tareaService.agregarTarea({ titulo: this.titulo, descripcion: this.descripcion, fecha: this.fecha, prioridad: this.prioridad });
    } else {
      // Pasamos todas las propiedades requeridas para la actualización
      await this.tareaService.actualizarTarea(this.tarea.id, { titulo: this.titulo, descripcion: this.descripcion, fecha: this.fecha, prioridad: this.prioridad });
    }
    this.modalController.dismiss();
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
