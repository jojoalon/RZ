import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpPageRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    SignUpPageRoutingModule
  ]
})
export class SignUpPageModule {}
