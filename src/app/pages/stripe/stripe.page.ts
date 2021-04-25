import { Component, OnInit } from '@angular/core';

// import { Stripe } from '@ionic-native/stripe/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import '@capacitor-community/stripe'; // only if you want web support
// Type Safe. Current capacitor 2 limitation
import { StripePlugin } from '@capacitor-community/stripe';
const Stripe = Plugins.Stripe as StripePlugin;
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVV: string;

  constructor(
    private router: Router,
    private toast: ToastController
    ) { }

  tt = "pk_test_51HW5XMA6BK1e8oi2AMtdMGuoLZbKNx8Doz5M2JMFeym8BqO7MRhvOvBLE8RhfnAWZ4VwSMU65804h5PIuZcvgHOv005LGgVIvB";

  ngOnInit(){
    // this.StripePlugin.setPublishableKey(this.tt);
  }

  //   validateCard(){
  //   let card = {
  //     number: this.cardNumber,
  //     expMonth: this.cardMonth,
  //     expYear: this.cardYear,
  //     cvc: this.cardCVV
  //   };

  //   this.StripePlugin.createCardToken(card)
  //   .then(async(token) => {
  //     const toast = await this.toast.create({
  //       message: "Paiement validé !",
  //       duration: 4000,
  //       color: "success"
  //     });

  //     await toast.present();

  //     this.router.navigate(['/tabs/home'])
  //     console.log(token)
  //   })
  //   .catch(async(error) => {
  //     console.log(error)
  //     const toast = await this.toast.create({
  //       message: "Une erreur est survenue durant votre paiement. Veuillez réesayer.",
  //       duration: 4000,
  //       color: "danger"
  //     });

  //     await toast.present();
  //   })
  // }

}
