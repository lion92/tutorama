import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SplashScreenComponent } from "../../splash-screen/splash-screen.component";
import { NavigationExtras, Router } from '@angular/router';
import { Product, CartService } from '../../services/cart.service';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Cour } from '../../interfaces/cour';
import { CoursService } from 'src/app/services/cours.service';
import { PaypalMobilePage } from '../paypal-mobile/paypal-mobile.page';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild('paypal-mobile', {static: false, read: ElementRef})fab: ElementRef;

  cart: Cour[] = [];
  cour: Cour[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private courService: CoursService,
		private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams
    ) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cour = await this.courService.getData();
    
  }

  async decreaseCartItem(product){
    await this.cartService.decreaseProduct(product);
  }

  async increaseCartItem(product){
    await this.cartService.addProduct(product);
  }

  async removeCartItem(product){
    await this.cartService.removeProduct(product);
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.prix * j.amount, 0).toString();
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout() {
    this.close();
    // const modal = await this.modalCtrl.create({
    //   component: PaypalMobilePage,
    //   cssClass: ''
    // })
    // modal.present();
    // this.navCtrl.navigateForward('/paypal-mobile', )
    // this.router.navigate(['/paypal-mobile'])
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: this.getTotal()
      }
    };

    this.router.navigate(['/paypal-mobile'], navigationExtras);
  }
}
