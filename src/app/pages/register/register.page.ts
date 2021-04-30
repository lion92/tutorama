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
        
      const toast = await this.toast.create({
        message: "Utilisateur enregisté !",
        color: "success",
        duration: 2000,
      });
      toast.present();
      

      this.router.navigate(['/login'])
        
    }).catch(async(err) => {
      
      console.log(err)
      const toast = await this.toast.create({
        message: "Vous avez mal renseigné les champs!",
        color: "danger",
        duration: 2000,
      });
      toast.present();
      
       console.log(err)
    })
  }

}
