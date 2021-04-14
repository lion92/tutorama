import { Component, OnInit } from "@angular/core";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: "splash-screen",
  templateUrl: "./splash-screen.component.html",
  styleUrls: ["./splash-screen.component.scss"]
})
export class SplashScreenComponent implements OnInit {
  constructor(public loadingController: LoadingController){}
  windowWidth: string;
  showSplash = true;

  ngOnInit(): void {
    this.presentLoadingWithOptions();
    setTimeout(() => {
      this.windowWidth = "-" + window.innerWidth + "px";

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, 500);
    },2000);

    
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      duration: 1000,
      translucent: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}