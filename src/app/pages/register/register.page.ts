import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: UserRegister = { email: '', user_password: ''}

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {}

  async register() {
    this.auth.register(this.user).then(async(data) => {
        console.log(data)
        
        this.router.navigate(['/login']);
    }).catch(async(err) => {
        console.log(err)
    })
  }

}
