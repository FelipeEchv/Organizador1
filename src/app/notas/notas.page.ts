import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage {
  notas: any[] = [];

  constructor(private alertController: AlertController, private notaService: NotaService, private navCtrl: NavController) {
    this.cargarNotas();
  }

  // Cargar todas las notas
  cargarNotas() {
    this.notaService.getNotas().subscribe(notas => {
      this.notas = notas;
    });
  }

  // Agregar una nueva nota
  async agregarNota() {
    const alert = await this.alertController.create({
      header: 'Nueva Nota',
      inputs: [
        { name: 'titulo', type: 'text', placeholder: 'Título' },
        { name: 'contenido', type: 'textarea', placeholder: 'Contenido' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Agregar', handler: (data: any) => {
            const nuevaNota = {
              titulo: data.titulo,
              contenido: data.contenido,
              fecha: new Date() // Fecha actual
            };
            this.notaService.agregarNota(nuevaNota).subscribe(() => {
              this.cargarNotas(); // Recargar las notas
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Editar una nota existente
  async editarNota(nota: any) {
    const alert = await this.alertController.create({
      header: 'Editar Nota',
      inputs: [
        { name: 'titulo', type: 'text', value: nota.titulo, placeholder: 'Título' },
        { name: 'contenido', type: 'textarea', value: nota.contenido, placeholder: 'Contenido' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', handler: (data: any) => {
            const notaActualizada = {
              ...nota,
              titulo: data.titulo,
              contenido: data.contenido
            };
            this.notaService.editarNota(nota.id, notaActualizada).subscribe(() => {
              this.cargarNotas(); // Recargar las notas
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Eliminar una nota
  eliminarNota(nota: any) {
    this.notaService.eliminarNota(nota.id).subscribe(() => {
      this.cargarNotas(); // Recargar las notas
    });
  }


  volverInicio() {
    this.navCtrl.navigateBack('/bienvenida');  // Redirigir a la página de inicio
  }
}
