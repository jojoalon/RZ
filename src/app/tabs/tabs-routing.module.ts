import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'busqueda',
        loadChildren: () =>
          import('./busqueda/busqueda.module').then(
            (m) => m.BusquedaPageModule
          ),
      },
      {
        path: 'favoritos',
        loadChildren: () =>
          import('./favoritos/favoritos.module').then(
            (m) => m.FavoritosPageModule
          ),
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('./logout/logout.module').then((m) => m.LogoutPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
