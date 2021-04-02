import { Component, OnInit } from '@angular/core';
import { SplashScreenComponent } from "../../splash-screen/splash-screen.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/tabs'])
  }

}
