import { Component, OnInit } from '@angular/core';
import { SplashScreenComponent } from "../../splash-screen/splash-screen.component";
import { Router } from '@angular/router';
import { Product, CartService } from '../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { Cour } from '../../interfaces/cour';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Cour[] = [];
  cour: Cour[] = [];
  constructor(
    private router: Router,
    private cartService: CartService,
    private courService: CoursService,
		private modalCtrl: ModalController
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
    return this.cart.reduce((i, j) => i + j.prix * j.amount, 0);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout() {
    this.close();
   
    this.router.navigate(['/stripe'])
  }
}
