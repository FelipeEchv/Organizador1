import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoModalPage } from './contacto-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoModalPageRoutingModule {}
