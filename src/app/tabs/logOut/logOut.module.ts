import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogOutPage } from './logOut.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { LogOutPageRoutingModule } from './logOut-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LogOutPageRoutingModule
  ],
  declarations: [LogOutPage]
})
export class Tab4PageModule {}
