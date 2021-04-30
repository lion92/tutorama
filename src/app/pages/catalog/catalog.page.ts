import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CoursService } from 'src/app/services/cours.service';

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
  python = [];
  java: [];
  sql: [];
  php: [];
  css: [];
  js: [];

  sliderConfig = {
    spaceBetween: 3,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(
    private router: Router,
    private cartService: CartService,
    private courService: CoursService, 
    private modalCtrl: ModalController,
    private toast: ToastController,
    private platform: Platform,
    private storage: NativeStorage,
    private loadingController: LoadingController
    ) {}

  async ngOnInit(){
    this.presentLoading();
    this.products = await this.cartService.getProducts();
    this.cart = await this.cartService.getCart();
    this.cartItemCount = await this.cartService.getCartItemCount();
    
    this.Cours = await JSON.parse(localStorage.getItem('cartItem'));
    
    
    
    // Récupère les cours par catégorie
    this.courService.getCourseByCat("Python").then(async(data: any) => {
      this.python = await data;
    }).catch(async(err) => {
      console.log(err)
    }) 

    this.courService.getCourseByCat("Java").then(async(data: any) => {
      this.java = await data;
    }).catch(async(err) => {
      console.log(err)
    }) 

    this.courService.getCourseByCat("SQL").then(async(data: any) => {
      this.sql = await data;
    }).catch(async(err) => {
      console.log(err)
    }) 

    this.courService.getCourseByCat("PHP").then(async(data: any) => {
      this.php = await data;
    }).catch(async(err) => {
      console.log(err)
    }) 

    this.courService.getCourseByCat("CSS").then(async(data: any) => {
      this.css = await data;
    }).catch(async(err) => {
      console.log(err)
    }) 

    this.courService.getCourseByCat("Javascript").then(async(data: any) => {
      this.js = await data;
    }).catch(async(err) => {
      console.log(err)
    }) 
  }

  
  async addToCart(product){

    
    if(product){
      
      this.cartService.addProduct(product);
     
      let cartLength = document.querySelector('.cart-length');
      cartLength.classList.add('cart-grow');
    
      
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


  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000,
      translucent: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
   
  }

  
}
