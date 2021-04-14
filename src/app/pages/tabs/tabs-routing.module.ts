import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = 
[
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => 
                import('../../pages/home/home.module').then( m => m.HomePageModule)
              },
            {
                path: 'register',
                loadChildren: () => 
                import('../../pages/register/register.module').then( m => m.RegisterPageModule)
              },
              {
                path: 'login',
                loadChildren: () => 
                import('../../pages/login/login.module').then( m => m.LoginPageModule)
              },
              {
                path: 'cart',
                loadChildren: () => 
                import('../../pages/cart/cart.module').then( m => m.CartPageModule)
              },
              {
                path: 'profile',
                loadChildren: () => 
                import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
              },
              {
                path: 'catalog',
                loadChildren: () => import('../../pages/catalog/catalog.module').then( m => m.CatalogPageModule)
              },
              {
                path: 'tuto',
                loadChildren: () => 
                import('../../pages/tuto/tuto.module').then( m => m.TutoPageModule)
              },
              {
                path: '',
                redirectTo: '/tabs/login',
                pathMatch: 'full'
              },
              
        ],
      },
        {
          path: '',
          redirectTo: '/tabs/login',
          pathMatch: 'full'
        },
        
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}