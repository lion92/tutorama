import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';
import { CartPage } from '../cart/cart.page';


@Component({
  selector: 'app-paypal-mobile',
  templateUrl: './paypal-mobile.page.html',
  styleUrls: ['./paypal-mobile.page.scss'],
})
export class PaypalMobilePage implements OnInit {

 data: string = '';

  constructor(private payPal: PayPal, private cartPage: CartPage, private route: ActivatedRoute, private router: Router)
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
 
  ngOnInit(){
    
    console.log(this.data)
  }

  payWithPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AQlum1LKgEJ_smmGn0jKMp4zWpxZK604wELTCHwm_dg1t-1Sf1L8Rw1491yUOp-LM9xTbdB9wQs5jGs-'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.data, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid
        }, (error) => {
          console.log(error)
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
