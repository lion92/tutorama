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
  Cours: Cour[] = [];
  contenu: Cour[] = [];

  idUser: any;
  users: string;
  courCart: Cour;
  user: UserRegister;
  idCourCart: number;
  imgCart: string;
  priceCart: number;
  titleCart: string;
  CoursItem: Cour[] = [];

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
    

    if (this.platform.is("desktop")) {
      this.Cours = await JSON.parse(localStorage.getItem('cartItem'));
    } else {
        this.Cours = JSON.parse(await this.storage.getItem('cartItem'));
      
    }

   
    
    if(this.Cours!== undefined){

      for(let courCart of this.Cours){
        this.idCourCart = await courCart.IdCour;
       
        this.contenu.push(courCart)
      }
     
    }
  }

 

  async removeCartItem(product){
    await this.cartService.removeProduct(product);
 
    const tp = this.contenu.findIndex(item => {
			return item.IdCour == product.IdCour
	  })
    // product.activeClass = false;
    this.contenu.splice(tp, 1)
    // product.activeClass = 0
  
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.prix * 1, 0).toString();
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout() {

    await this.addCartToBdd();

    this.close();
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: this.getTotal()
      }
    };

    this.router.navigate(['/paypal-mobile'], navigationExtras);
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


    if (this.platform.is("desktop")) {
      this.CoursItem = await JSON.parse(localStorage.getItem('cartItem'));
    } else {
        this.CoursItem = JSON.parse(await this.storage.getItem('cartItem'));
      
    }


    
    let idC;
    for(let cour of this.CoursItem){
       idC = cour.IdCour
       
       this.cartService.addCart(this.idUser, idC).then(async(user: any) => {
         
         
        
         
   
         
   
         
       }).catch(async(err) => {
         
         console.log(err)
           
       })
     
    }

}
}
