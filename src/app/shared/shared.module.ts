// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas de importación de tus componentes...
import { LogoComponent } from './components/logo/logo.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';

const components = [HeaderComponent, LogoComponent, CustomInputComponent];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    CommonModule,
    IonicModule, 
    ReactiveFormsModule,
    ...components
  ]
})
export class SharedModule { }
