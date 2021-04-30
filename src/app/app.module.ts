import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ​​HttpClientModule​​ } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreenComponent } from "./splash-screen/splash-screen.component";
import { PayPal } from '@ionic-native/paypal/ngx';
import { CartPage } from './pages/cart/cart.page';


@NgModule({
  declarations: [AppComponent, SplashScreenComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ​​HttpClientModule​​],
  
providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativeStorage, PayPal, CartPage, NavParams],
  bootstrap: [AppComponent],
})
export class AppModule {}
