import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {


  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(
    private router: Router,
    private cartService: CartService, 
    private modalCtrl: ModalController
    ) {}

  async ngOnInit(){
    this.products = await this.cartService.getProducts();
    this.cart = await this.cartService.getCart();
    this.cartItemCount = await this.cartService.getCartItemCount();
   
    console.log(this.products)
  }

  addToCart(product){
    this.cartService.addProduct(product);
  }

  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
  }
}
