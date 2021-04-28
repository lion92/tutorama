import { Component, OnInit } from '@angular/core';
import { Cour } from 'src/app/interfaces/cour';
import { CartService } from 'src/app/services/cart.service';

import { VideoService } from 'src/app/services/video.service';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  paiement: Cour[] = [];
  email: string;
  constructor(private cartService: CartService, private paiementUser: VideoService) { }

  
  async ngOnInit() {
    //this.cour = this.cartService.getProducts();
    this.email = await localStorage.getItem('user');
     
       this.paiementUser.getTutoByUser(this.email).then(async(data: any) => {
      
        this.paiement = data;
        
       
        
       }).catch(async(err) => {
         console.log(err)
       }) 
  }




}
