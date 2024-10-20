import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaModalPageRoutingModule } from './nota-modal-routing.module';

import { NotaModalPage } from './nota-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaModalPageRoutingModule
  ],
  declarations: [NotaModalPage]
})
export class NotaModalPageModule {}
