import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOutPage } from './logOut.page';

const routes: Routes = [
  {
    path: '',
    component: LogOutPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogOutPageRoutingModule {}
