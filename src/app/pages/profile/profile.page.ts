import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private platform: Platform
    ) { }

  ngOnInit() {
  }

  getAvatar(){
    //const user = JSON.parse(localStorage.getItem('user'));
    
    
   // return user.avatar;
  }

   getProfile(){
    let user;
    if (this.platform.is("desktop")) {
      user = localStorage.getItem('user')
    } else {
      user =  this.storage.getItem('user')
    }
    return user;
  }

  async logout(){

    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
    this.router.navigateByUrl('/tabs/login', { replaceUrl:true });
  }

}
