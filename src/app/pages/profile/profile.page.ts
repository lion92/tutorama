import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getAvatar(){
    //const user = JSON.parse(localStorage.getItem('user'));
    
    
   // return user.avatar;
  }

  getProfile(){

    const user = localStorage.getItem('user');
    console.log(user)
    return user;
  }

  async logout(){

    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }

}
