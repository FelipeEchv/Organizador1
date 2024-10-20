import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoModalPageRoutingModule } from './contacto-modal-routing.module';

import { ContactoModalPage } from './contacto-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoModalPageRoutingModule
  ],
  declarations: [ContactoModalPage]
})
export class ContactoModalPageModule {}
