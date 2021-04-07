import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Cour } from 'src/app/interfaces/cour';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  cours: Cour[];

  constructor(private router: Router, private cour: CoursService) {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.router.events.subscribe(async(event) => {
      if (event instanceof NavigationEnd) {
          this.cours = await this.cour.getData()
      }
  });
  }

  async ngOnInit(){
    this.cours = await this.cour.getData();
    console.log(this.cours)
  }
}
