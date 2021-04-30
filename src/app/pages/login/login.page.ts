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

  idUser: string= '';
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


  ngOnInit() {}

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
    
    this.isErrorMail = (regex.test(this.email.trim())) ? false : true;
  }

  async loginForm(){
    
      this.auth.login(this.email, this.password).then(async(user: any) => {
        
        this.token = user.split('!')[1];
        this.idUser = user.split(" ")[1];
        
        
        if (this.platform.is("desktop")) {
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', this.email)
          localStorage.setItem('idUser', this.idUser)
      } else {
          await this.storage.setItem('token', this.token)
          await this.storage.setItem('user', this.email)
          await this.storage.setItem('idUser', this.idUser)
      }

        const toast = await this.toast.create({
          message: "Connecté !",
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
