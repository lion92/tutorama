import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { FaqComponent } from '../../modals/faq/faq.component';
import { AboutComponent } from './../../modals/about/about.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private platform: Platform,
    private modal: ModalController
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

  async faq() {
      const modal = await this.modal.create({
        component: FaqComponent,
        componentProps: {
        }
      });
    return await modal.present();
  }

  async info() {
      const modal = await this.modal.create({
        component: AboutComponent,
        componentProps: {
        }
      });
    return await modal.present();
  }

}
