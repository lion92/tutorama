import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getAvatar(){
    const user = JSON.parse(localStorage.getItem('user'));
    
    
    return user.avatar;
  }

  getProfile(){

    const user = JSON.parse(localStorage.getItem('user'));

    return user.email;
  }

}
