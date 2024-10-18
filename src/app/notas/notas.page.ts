import { Component, OnInit } from '@angular/core';
import { NotasService } from '../services/notas.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {
  notas: any[] = [];
  nuevaNota = { titulo: '', contenido: '', fecha: '' };

  constructor(
    private notasService: NotasService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.notasService.getNotas().subscribe(data => {
      this.notas = data;
    });
  }

  agregarNota() {
    this.notasService.addNota(this.nuevaNota).subscribe(data => {
      this.notas.push(data);
      this.nuevaNota = { titulo: '', contenido: '', fecha: '' }; // Resetea el formulario
    });
  }

  async editarNota(nota: any) {
    const alert = await this.alertController.create({
      header: 'Editar Nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título',
          value: nota.titulo
        },
        {
          name: 'contenido',
          type: 'textarea',
          placeholder: 'Contenido',
          value: nota.contenido
        },
        {
          name: 'fecha',
          type: 'date',
          value: nota.fecha
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const notaEditada = {
              id: nota.id,
              titulo: data.titulo,
              contenido: data.contenido,
              fecha: data.fecha
            };
            this.notasService.updateNota(notaEditada).subscribe(() => {
              const index = this.notas.findIndex(n => n.id === nota.id);
              if (index > -1) {
                this.notas[index] = notaEditada;
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarNota(id: number) {
    this.notasService.deleteNota(id).subscribe(() => {
      this.notas = this.notas.filter(nota => nota.id !== id);
    });
  }

  volverInicio() {
    this.router.navigate(['/bienvenida']);
  }
}
