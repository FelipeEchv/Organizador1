import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent {
  usuario: string = '';
  email: string = '';

  constructor(private modalController: ModalController, private http: HttpClient) {}

  close() {
    this.modalController.dismiss();
  }

  recuperar() {
    if (!this.emailValido()) {
      alert('Por favor, introduzca un correo electrónico válido.');
      return;
    }

    // Realizar la consulta a la base de datos (db.json)
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(usuarios => {
      const usuarioEncontrado = usuarios.find(u => u.nombre === this.usuario && u.correo === this.email);

      if (usuarioEncontrado) {
        // Si se encuentra el usuario y correo
        alert('Se ha enviado un enlace para recuperar la contraseña a ' + this.email);
        this.close();
      } else {
        // Si no se encuentran los datos
        alert('No se ha encontrado el usuario o correo proporcionado.');
      }
    }, error => {
      console.error('Error al consultar la base de datos', error);
      alert('Hubo un error al intentar recuperar la contraseña. Inténtelo más tarde.');
    });
  }

  emailValido(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    return regex.test(this.email);
  }
}
