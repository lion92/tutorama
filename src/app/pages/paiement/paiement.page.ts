import { Component, OnInit } from '@angular/core';
import { Cour } from 'src/app/interfaces/cour';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  cour: Cour[] = [];

  constructor(private cartService: CartService) { }

  
  ngOnInit() {
    //this.cour = this.cartService.getProducts();
  }




}
