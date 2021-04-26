import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreenComponent } from "../../splash-screen/splash-screen.component";
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  token: string = '';
  avatar: string = '';
  tabBarElement: any;
  isErrorMail: boolean = true;

  constructor(
    private auth: AuthService,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router,
    private toast: ToastController,
    private modal: ModalController
  ) {
    this.tabBarElement = document.querySelector('#tabs ion-tab-bar');
   }

  ngAfterViewInit(){
    
  }

  async ngOnInit() {
   
    
    let token;
    if (this.platform.is("desktop")) {
        token = await localStorage.getItem('token')
      
    } else {
        token = await this.storage.getItem('token')
    }
     
      console.log("Je suis le token avant connexion" + token)
    if (token !== null){
      this.router.navigate(['/tabs/home'])
      console.log("Je suis le token après connexion" + token)
    }

  }

  async forgotPassword() {
    const modal = await this.modal.create({
      component: ForgotPasswordComponent,
      componentProps: {
        'emailer': this.email
    }
    });
    return await modal.present();
  }

  testEmail() {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    // this.isErrorMail = !regex.test(this.email);
    this.isErrorMail = (regex.test(this.email.trim())) ? false : true;
  }

  async loginForm(){
    
      this.auth.login(this.email, this.password).then(async(user: any) => {
        
        this.token = user.split('!')[1];
        
        console.log(this.token + " je suis")
        
        if (this.platform.is("desktop")) {
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', this.email)
      } else {
          await this.storage.setItem('token', {property: this.token})
          await this.storage.setItem('user', {property: this.email})
      }

        const toast = await this.toast.create({
          message: "Vous vous êtes bien connecté",
          color: "success",
          duration: 2000,
        });
        toast.present();

        this.router.navigate(['/tabs/home'])
      }).catch(async(err) => {
          console.log(err)
          const toast = await this.toast.create({
            message: "Vous avez mal renseigné le champs email ou password !",
            color: "danger",
            duration: 2000,
          });
          toast.present();
        
      })
  }



  

}
