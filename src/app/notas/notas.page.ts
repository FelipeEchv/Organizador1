import { Component, OnInit } from '@angular/core';
import { NotasService } from '../services/notas.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotaModalPage } from '../nota-modal/nota-modal.page'; 

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {
  notas: any[] = [];

  constructor(
    private notaService: NotasService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerNotas();
  }

  async obtenerNotas() {
    this.notas = await this.notaService.obtenerNotas();
  }

  async eliminarNota(id: number) {
    await this.notaService.eliminarNota(id);
    this.obtenerNotas();  // Refrescar la lista de notas
  }

  async abrirModalAgregar() {
    const modal = await this.modalController.create({
      component: NotaModalPage,  // Referencia al componente del modal
      componentProps: { modo: 'agregar' }
    });
    modal.onDidDismiss().then(() => {
      this.obtenerNotas();
    });
    return await modal.present();
  }

  async abrirModalEditar(nota: any) {
    const modal = await this.modalController.create({
      component: NotaModalPage,  // Referencia al componente del modal
      componentProps: { modo: 'editar', nota }
    });
    modal.onDidDismiss().then(() => {
      this.obtenerNotas();
    });
    return await modal.present();
  }

  volverInicio() {
    this.router.navigate(['/bienvenida']);
  }
}
