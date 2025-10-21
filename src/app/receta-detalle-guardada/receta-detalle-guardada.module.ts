import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetaDetalleGuardadaPageRoutingModule } from './receta-detalle-guardada-routing.module';

import { RecetaDetalleGuardadaPage } from './receta-detalle-guardada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetaDetalleGuardadaPageRoutingModule
  ],
  declarations: [RecetaDetalleGuardadaPage]
})
export class RecetaDetalleGuardadaPageModule {}
