import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
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
  amountProduct: number;
  Cours: any;
  constructor(
    private router: Router,
    private cartService: CartService, 
    private modalCtrl: ModalController,
    private toast: ToastController,
    private platform: Platform,
    private storage: NativeStorage
    ) {}

  async ngOnInit(){
    this.products = await this.cartService.getProducts();
    this.cart = await this.cartService.getCart();
    this.cartItemCount = await this.cartService.getCartItemCount();

    this.Cours = await JSON.parse(localStorage.getItem('cartItem'));
    //console.log(Cours)
  }

  async addToCart(product){

    

    if(product){
      // product.activeClass = true;
      this.cartService.addProduct(product);
      
      let cartLength = document.querySelector('.cart-length');
      cartLength.classList.add('cart-grow');
      
     // for(let c of this.cartService.getCart()){
      for (const item of this.Cours) {
        if (item.IdCour === product.IdCour) {
          product.activeClass = true;
          item.activeClass = true;
        }else{
          
          product.activeClass = false;
          item.activeClass = true;
        }
      }
      

      const toast = await this.toast.create({
        message: "Le cours a bien été ajouté !",
        color: "success",
        duration: 500,
      });
      toast.present();
      setTimeout(() => {
        cartLength.classList.remove('cart-grow');
      }, 1000 ) 
     
    }else{
      const toast = await this.toast.create({
        message: "Le cours n'a pas pu être être ajouté !",
        color: "danger",
        duration: 1000,
      });
      toast.present();
    }
  }

  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
  }
}
