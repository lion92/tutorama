import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { FaqComponent } from '../../modals/faq/faq.component';
import { AboutComponent } from './../../modals/about/about.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;
  avatar: string;
  user: string;

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private platform: Platform,
    private modal: ModalController,
    private userService: UserService
    ) { }

  async ngOnInit() {
    this.email = localStorage.getItem('user');
    this.userService.getUserByEmail(this.email).then(async(data: any) => {
      this.user = await JSON.stringify(data);

      for(let result of data){
        this.avatar = result.avatar;
      }
      
    }).catch(async(err) => {
      console.log(err)
    }) 
  }

  async getAvatar(){
    //const user = JSON.parse(localStorage.getItem('user'));
    
 
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
