import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{

    path: '', 
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'paiement',
    loadChildren: () => import('./pages/paiement/paiement.module').then( m => m.PaiementPageModule)
  },
  {
    path: 'paypal-mobile',
    loadChildren: () => import('./pages/paypal-mobile/paypal-mobile.module').then( m => m.PaypalMobilePageModule)
  },

  
  


  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }