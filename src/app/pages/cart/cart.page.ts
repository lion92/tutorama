import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SplashScreenComponent } from "../../splash-screen/splash-screen.component";
import { NavigationExtras, Router } from '@angular/router';
import { Product, CartService } from '../../services/cart.service';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { Cour } from '../../interfaces/cour';
import { CoursService } from 'src/app/services/cours.service';
import { PaypalMobilePage } from '../paypal-mobile/paypal-mobile.page';
import { UserRegister } from 'src/app/interfaces/user-register';
import { UserService } from 'src/app/services/user.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild('paypal-mobile', {static: false, read: ElementRef})fab: ElementRef;

  cart: Cour[] = [];
  cour: Cour[] = [];
  
  cartCour: Cour[] = [];

  idUser: any;
  users: string;
  courCart: Cour;
  user: UserRegister;
  idCourCart: number;
  imgCart: string;
  priceCart: number;
  titleCart: string;
  constructor(
    private router: Router,
    private cartService: CartService,
    private courService: CoursService,
    private userService: UserService,
		private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private storage: NativeStorage
    ) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cour = await this.courService.getData();
    

    const Cours = await localStorage.getItem('cart');
    
    if(Cours!== undefined){

      for(let courCart of JSON.parse(Cours)){
        this.idCourCart = await courCart.IdCour;
       
          // this.imgCart = courCart.image
          this.cartCour.push(courCart)
      }
      // this.cartCour.push(this.imgCart)
    }
  }

  async decreaseCartItem(product){
    await this.cartService.decreaseProduct(product);
  }

  async increaseCartItem(product){
    await this.cartService.addProduct(product);
  }

  async removeCartItem(product){
    await this.cartService.removeProduct(product);
    if (this.platform.is("desktop")) {
      await localStorage.removeItem('cart')
     
    } else {
      await this.storage.remove('cart')
      
    }
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.prix * j.amount, 0).toString();
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout() {
    await this.addCartToBdd();
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

  async isLocalStorage(){
    const Cours = await localStorage.getItem('cart');
    if(Cours!== undefined){

      for(let courCart of JSON.parse(Cours)){
          this.idCourCart = courCart.IdCour;
          this.imgCart = courCart.img
      }
    }
  }


  async addCartToBdd(){
    
    const idUser = await localStorage.getItem('idUser');
    
    this.idUser = parseInt(idUser);
    // this.userService.getUserByEmail(email).then(async(data: any) => {
      
    //   this.users = await JSON.stringify(data);

    //   for(let result of data){
    //     this.idUser = await result.idUtilisateur;
        
    //   }
    //   console.log(this.idUser)
    // }).catch(async(err) => {
    //   console.log(err)
    // }) 
    const Cours = await localStorage.getItem('cart');
    let idC;
    for(let cour of JSON.parse(Cours)){
       idC = cour.IdCour
       
       this.cartService.addCart(this.idUser, idC).then(async(user: any) => {
         
         
        
         
   
         
   
         
       }).catch(async(err) => {
         
         console.log(err)
           
       })
     
    }

}
}
