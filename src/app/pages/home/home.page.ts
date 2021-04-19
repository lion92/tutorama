import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Cour } from 'src/app/interfaces/cour';
import { CoursService } from 'src/app/services/cours.service';
import { CartPage } from '../cart/cart.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {


  sliderConfig = {
    spaceBetween: 5,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  cours: Cour[];
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
  img = "https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_1280.png";

  etoile = [];

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    private router: Router,
    private cour: CoursService,
    private modalCtrl: ModalController
    ) {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.router.events.subscribe(async(event) => {
      if (event instanceof NavigationEnd) {
          
      }
    });
  }

  async ngOnInit(){
    
    this.cours = await this.cour.getData();
   
    
  }

  

  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    })
    modal.present();
  }

}
