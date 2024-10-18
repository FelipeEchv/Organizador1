import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareas: any[] = [];
  nuevaTarea = { titulo: '', descripcion: '', fecha: '', prioridad: 1 };

  constructor(
    private tareasService: TareasService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');  // Obtén el usuario del localStorage
    if (usuario) {
      const usuarioData = JSON.parse(usuario);  // Parsear el valor de 'usuario' para obtener el objeto
      this.tareasService.getTareasByUserId(usuarioData.id).subscribe(tareas => {
        this.tareas = tareas;  // Filtrar y obtener las tareas del usuario autenticado
      });
    }
  }
  

  agregarTarea() {
    this.tareasService.addTarea(this.nuevaTarea).subscribe(data => {
      this.tareas.push(data);
      this.nuevaTarea = { titulo: '', descripcion: '', fecha: '', prioridad: 1 }; // Resetea el formulario
    });
  }

  async editarTarea(tarea: any) {
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título',
          value: tarea.titulo
        },
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Descripción',
          value: tarea.descripcion
        },
        {
          name: 'fecha',
          type: 'date',
          placeholder: 'fecha',
          value: tarea.fecha
        },
        {
          name: 'prioridad',
          type: 'number',
          placeholder: 'Prioridad',
          value: tarea.prioridad
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
            const tareaEditada = {
              id: tarea.id,
              titulo: data.titulo,
              descripcion: data.descripcion,
              fecha: data.fecha,
              prioridad: data.prioridad
            };
            this.tareasService.updateTarea(tareaEditada).subscribe(() => {
              const index = this.tareas.findIndex(t => t.id === tarea.id);
              if (index > -1) {
                this.tareas[index] = tareaEditada;
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarTarea(id: number) {
    this.tareasService.deleteTarea(id).subscribe(() => {
      this.tareas = this.tareas.filter(tarea => tarea.id !== id); // Elimina correctamente la tarea
    });
  }

  volverInicio() {
    this.router.navigate(['/bienvenida']); // Cambia la ruta si es diferente
  }
}
