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
  disabled: boolean;
  users: string;

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private platform: Platform,
    private modal: ModalController,
    private userService: UserService
    ) { }

  async ngOnInit() {

    
    
    if(this.platform.is("desktop")) {
      this.email = localStorage.getItem('user');
      
    }else{
      this.email = await this.storage.getItem('user');
    }
    this.userService.getUserByEmail(this.email).then(async(data: any) => {
      
      this.user = await JSON.stringify(data);

      for(let result of data){
        this.avatar = result.avatar;
      }
      
    }).catch(async(err) => {
      console.log(err)
    }) 

    
    
    if(this.email == undefined || this.email == null){
      this.disabled = true;
    }else{
      this.disabled = false;
    }
  }

  async getAvatar(){
    //const user = JSON.parse(localStorage.getItem('user'));
    
 
  }


  async getProfile(){
    
    if (this.platform.is("desktop")) {
      this.users = await localStorage.getItem('user')
    } else {
      this.users = await this.storage.getItem('user')
    }
    return this.users;
  }

  async logout(){

    if (this.platform.is("desktop")) {
      await localStorage.removeItem('user');
      await localStorage.removeItem('token');
      
    } else {
      await this.storage.remove('user');
      await this.storage.remove('token');
    }
    this.users = "";
    this.email = "";
    this.router.navigateByUrl('login', { replaceUrl:true });
    
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
