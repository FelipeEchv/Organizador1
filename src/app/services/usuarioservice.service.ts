import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { IndexedDBService } from './indexeddb.service';
import { SqliteService } from './sqlite.service';
import { ConnectivityService } from './connectivity.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private isWeb: boolean;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private sqliteService: SqliteService,
    private indexedDBService: IndexedDBService,
    private connectivityService: ConnectivityService
  ) {
    this.isWeb = this.platform.is('desktop') || this.platform.is('mobileweb');
  }

  async agregarUsuario(usuario: { nombre: string, password: string, correo: string, edad: number, sexo: string }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.post(this.apiUrl, usuario).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.addUser(usuario);
    } else {
      return this.sqliteService.addUser(usuario.nombre, usuario.correo, usuario.password, usuario.edad, usuario.sexo);
    }
  }

  async obtenerUsuarios() {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.get<any[]>(this.apiUrl).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.getUsers();
    } else {
      return this.sqliteService.getUsers();
    }
  }

  async actualizarUsuario(id: number, usuario: { nombre: string, password: string, correo: string, edad: number, sexo: string }) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.put(`${this.apiUrl}/${id}`, usuario).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.updateUser(id, usuario);
    } else {
      return this.sqliteService.updateUser(id, usuario.nombre, usuario.correo, usuario.password, usuario.edad, usuario.sexo);
    }
  }

  async eliminarUsuario(id: number) {
    const tieneConexion = await this.connectivityService.tieneConexionConServer();

    if (tieneConexion) {
      return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } else if (this.isWeb) {
      return this.indexedDBService.deleteUser(id);
    } else {
      return this.sqliteService.deleteUser(id);
    }
  }
}
