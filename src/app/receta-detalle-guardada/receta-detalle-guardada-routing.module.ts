import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetaDetalleGuardadaPage } from './receta-detalle-guardada.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaDetalleGuardadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetaDetalleGuardadaPageRoutingModule {}
