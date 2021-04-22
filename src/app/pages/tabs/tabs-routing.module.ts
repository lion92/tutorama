import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = 
[
    {
      path: 'tabs',
      component: TabsPage,
      children: 
      [
        {
          path: 'home',
          children: [
            {
              path:'',
              loadChildren: () => 
                import('../../pages/home/home.module').then( m => m.HomePageModule)
            }
          ]
        },
        {
          path: 'cart',
          children: [
            {
              path: '',
              loadChildren: () => 
                import('../../pages/cart/cart.module').then( m => m.CartPageModule)
            }
          ]
        },
        {
          path: 'paiement',
          children: [
            {
              path: '',
              loadChildren: () => 
                import('../../pages/paiement/paiement.module').then( m => m.PaiementPageModule)
            }
          ]
        },
        {
          path: 'profile',
          children: [
            {
              path: '',
              loadChildren: () => 
                import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
            }
          ]
        },
        {
          path: 'catalog',
          children: [
            {
              path: '',
              loadChildren: () => 
                import('../../pages/catalog/catalog.module').then( m => m.CatalogPageModule)
            }
          ]
        }, 
        {
          path: 'tuto',
          children: [
            {
              path: '',
              loadChildren: () => 
                import('../../pages/tuto/tuto.module').then( m => m.TutoPageModule)
            }
          ]
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        }, 
      ],
    },
    {
      path: '',
      redirectTo: 'tabs/home',
      pathMatch: 'full'
    },   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}