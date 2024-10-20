import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TareaService } from '../services/tareas.service';

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
    private tareaService: TareaService
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
      await this.tareaService.agregarTarea(this.titulo, this.descripcion, this.fecha, this.prioridad);
    } else {
      await this.tareaService.actualizarTarea(this.tarea.id, this.titulo, this.descripcion, this.fecha, this.prioridad);
    }
    this.modalController.dismiss();
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
