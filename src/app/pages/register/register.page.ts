import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserRegister } from './../../interfaces/user-register';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss', '../login/login.page.scss'],
})
export class RegisterPage implements OnInit {

  user: UserRegister = 
  { 
    email: '',
    nom: '',
    prenom: '',
    numeroTel: '',
    numeroRue: undefined,
    age: undefined,
    batiment: '',
    code_Postale: '',
    libelle: '',
    password: '',
    avatar: ''
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {}

  async register() {
    this.auth.register(this.user).then(async(data: any) => {
        
      this.router.navigate(['/login']);
        
    }).catch(async(err) => {
      
        console.log(err)
    })
  }

}
