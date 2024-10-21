import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-nota-modal',
  templateUrl: './nota-modal.page.html',
  styleUrls: ['./nota-modal.page.scss'],
})
export class NotaModalPage {
  @Input() modo?: string;
  @Input() nota: any = {};

  titulo: string = '';
  contenido: string = '';
  fecha: string = '';

  constructor(
    private modalController: ModalController,
    private notaService: NotasService
  ) {}

  ngOnInit() {
    if (this.modo === 'editar' && this.nota) {
      this.titulo = this.nota.titulo;
      this.contenido = this.nota.contenido;
      this.fecha = this.nota.fecha;
    }
  }

  async guardar() {
    if (this.modo === 'agregar') {
      // Cambiar de 4 argumentos a 3, eliminando 'autor'
      await this.notaService.agregarNota({ titulo: this.titulo, contenido: this.contenido, fecha: this.fecha });
    } else {
      // Cambiar de 5 argumentos a 3, eliminando 'autor'
      await this.notaService.actualizarNota(this.nota.id, { titulo: this.titulo, contenido: this.contenido, fecha: this.fecha });
    }
    this.modalController.dismiss();
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
