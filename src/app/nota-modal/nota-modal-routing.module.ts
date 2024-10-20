import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaModalPage } from './nota-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NotaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaModalPageRoutingModule {}
