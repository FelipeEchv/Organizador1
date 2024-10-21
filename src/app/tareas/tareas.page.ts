import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TareaModalPage } from '../tarea-modal/tarea-modal.page';  // Importar el modal

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareas: any[] = [];

  constructor(
    private tareaService: TareasService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    this.tareas = await this.tareaService.obtenerTareas();
  }

  async eliminarTarea(id: number) {
    await this.tareaService.eliminarTarea(id);
    this.obtenerTareas();  // Refrescar la lista de tareas
  }

  async abrirModalAgregar() {
    const modal = await this.modalController.create({
      component: TareaModalPage,  // Referencia al componente del modal
      componentProps: { modo: 'agregar' }
    });
    modal.onDidDismiss().then(() => {
      this.obtenerTareas();
    });
    return await modal.present();
  }

  async abrirModalEditar(tarea: any) {
    const modal = await this.modalController.create({
      component: TareaModalPage,  // Referencia al componente del modal
      componentProps: { modo: 'editar', tarea }
    });
    modal.onDidDismiss().then(() => {
      this.obtenerTareas();
    });
    return await modal.present();
  }

  volverInicio() {
    this.router.navigate(['/bienvenida']);
  }
}
