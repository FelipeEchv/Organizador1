import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'bienvenida', loadChildren: () => import('./bienvenida/bienvenida.module').then(m => m.BienvenidaPageModule), canActivate: [AuthGuard]   },
  { path: 'tareas', loadChildren: () => import('./tareas/tareas.module').then(m => m.TareasPageModule), canActivate: [AuthGuard] },
  { path: 'notas', loadChildren: () => import('./notas/notas.module').then(m => m.NotasPageModule), canActivate: [AuthGuard] },
  { path: 'contactos', loadChildren: () => import('./contactos/contactos.module').then(m => m.ContactosPageModule), canActivate: [AuthGuard] },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },  {
    path: 'contacto-modal',
    loadChildren: () => import('./contacto-modal/contacto-modal.module').then( m => m.ContactoModalPageModule)
  },
  {
    path: 'nota-modal',
    loadChildren: () => import('./nota-modal/nota-modal.module').then( m => m.NotaModalPageModule)
  },
  {
    path: 'tarea-modal',
    loadChildren: () => import('./tarea-modal/tarea-modal.module').then( m => m.TareaModalPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
