import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../services/contactos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  contactos: any[] = [];
  nuevoContacto = { nombre: '', telefono: '', email: '' };

  constructor(
    private contactosService: ContactosService,
    private alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');  // Obtén el usuario del localStorage
    if (usuario) {
      const usuarioData = JSON.parse(usuario);  // Parsear el valor de 'usuario'
      this.contactosService.getContactosByUserId(usuarioData.id).subscribe(contactos => {
        this.contactos = contactos;  // Filtrar y obtener los contactos del usuario autenticado
      });
    }
  }
  

  agregarContacto() {
    this.contactosService.addContacto(this.nuevoContacto).subscribe(data => {
      this.contactos.push(data);
      this.nuevoContacto = { nombre: '', telefono: '', email: '' }; // Resetea el formulario
    });
  }

  async editarContacto(contacto: any) {
    const alert = await this.alertController.create({
      header: 'Editar Contacto',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: contacto.nombre
        },
        {
          name: 'telefono',
          type: 'text',
          placeholder: 'Teléfono',
          value: contacto.telefono
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: contacto.email
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
            const contactoEditado = {
              id: contacto.id,
              nombre: data.nombre,
              telefono: data.telefono,
              email: data.email
            };
            this.contactosService.updateContacto(contactoEditado).subscribe(() => {
              const index = this.contactos.findIndex(c => c.id === contacto.id);
              if (index > -1) {
                this.contactos[index] = contactoEditado;
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarContacto(id: number) {
    this.contactosService.deleteContacto(id).subscribe(() => {
      this.contactos = this.contactos.filter(contacto => contacto.id !== id);
    });
  }

  volverInicio() {
    this.router.navigate(['/bienvenida']); // Cambia la ruta si es diferente
  }

}
