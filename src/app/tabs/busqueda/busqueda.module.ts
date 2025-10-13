import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaPage } from './busqueda.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { BusquedaPageRoutingModule } from './busqueda-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BusquedaPageRoutingModule
  ],
  declarations: [BusquedaPage]
})
export class Tab2PageModule {}
