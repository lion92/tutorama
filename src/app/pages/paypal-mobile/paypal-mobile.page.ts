import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartPage } from '../cart/cart.page';


@Component({
  selector: 'app-paypal-mobile',
  templateUrl: './paypal-mobile.page.html',
  styleUrls: ['./paypal-mobile.page.scss'],
})
export class PaypalMobilePage implements OnInit {

 cartItemCount: BehaviorSubject<number>;
 data: string = '';

  constructor(
    private payPal: PayPal, 
    private cartPage: CartPage, 
    private route: ActivatedRoute, 
    private router: Router, 
    private modalCtrl: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private cartService: CartService
    )
  {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = params.special;
      }
    });
  }

  paymentAmount: string = this.data;
  currency: string = 'EUR';
  currencyIcon: string = '€';
 
  async ngOnInit(){
    this.cartItemCount = await this.cartService.getCartItemCount();
  }

  // Lance le paiement avec Paypal
  payWithPaypal() {
    if (this.platform.is("desktop")) {
      localStorage.removeItem('cartItem')
      this.cartItemCount.next(0);
   }else{
      this.storage.remove('cartItem')
      this.cartItemCount.next(0);
   }
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AQlum1LKgEJ_smmGn0jKMp4zWpxZK604wELTCHwm_dg1t-1Sf1L8Rw1491yUOp-LM9xTbdB9wQs5jGs-'
    }).then(() => {
      
    
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
       
      })).then(() => {
        let payment = new PayPalPayment(this.data, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          
          // Successfully paid
        }, (error) => {
          console.log(error)
         
        });
      }, () => {
       
      });
    }, () => {
     
    });
  }
 
  
}
