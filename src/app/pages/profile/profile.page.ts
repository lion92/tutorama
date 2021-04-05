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
    
    const avatar = "https://robohash.org/765dac3458179212aa583b0733cc74b8?set=set4&bgset=&size=400x400";
    return avatar;
  }

  getProfile(){

    const user = JSON.parse(localStorage.getItem('user'));

    return user.email;
  }

}
