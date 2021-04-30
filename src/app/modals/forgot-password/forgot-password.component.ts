import { Component, OnInit, Input } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {


  @Input() emailer: string;
  text: string = "Login";

  constructor(
    private modal: ModalController, 
    private auth: AuthService,
    private toast: ToastController,

  
  )
  { }

  ngOnInit() {

  }

  async sendRequestPass(){

    this.auth.forgotPassword(this.emailer).then(async(user: any) => {
      //let data = JSON.parse(user.emailer);
    
      if(this.emailer !== ""){
        const toast = await this.toast.create({
          message: "Utilisez votre mot de passe provisoire reçu par mail pour vous connecter",
          duration: 4000,
          color: "success"
        });

        await toast.present();
      }else{
        const toast = await this.toast.create({
          message: "Erreur !<br>Entrez votre adresse email dans le formulaire de login et recommencez",
          duration: 4000,
          color: "danger",
          buttons: [
            {
              side: 'start',
              icon: 'arrow-back-outline',
              handler: () => {
                this.close();
              }
            }
          ]
        });

        await toast.present();
      }
        
    }).catch(async(err) => {
      
       
    })

  }
  
  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }



}
