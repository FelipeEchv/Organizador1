import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotaService } from '../services/notas.service';

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
    private notaService: NotaService
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
      await this.notaService.agregarNota(this.titulo, this.contenido, this.fecha);
    } else {
      await this.notaService.actualizarNota(this.nota.id, this.titulo, this.contenido, this.fecha);
    }
    this.modalController.dismiss();
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
