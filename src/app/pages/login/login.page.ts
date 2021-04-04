import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  user_password: string = '';

  constructor(
    private auth: AuthService,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router
  ) { }

  async ngOnInit() {
    let token;
    if (this.platform.is("desktop")) {
        token = localStorage.getItem('token')
    } else {
        token = await this.storage.getItem('token')
    }
   
    if (token !== undefined && token !== null)
        this.router.navigate(['/tabs'])
  }

  async loginForm(){
    
      this.auth.login(this.email, this.user_password).then(async(user: any) => {
        console.log(this.email)
     
        if (this.platform.is("desktop")) {
          localStorage.setItem('token', user.token)
          localStorage.setItem('user', JSON.stringify(user.data))
      } else {
          await this.storage.setItem('token', user.token)
          await this.storage.setItem('user', JSON.stringify(user.data))
      }
          this.router.navigate(['/home'])
      }).catch(async(err) => {
          console.log(err)
        
      })
  }

}
