import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { modifpassword } from '../interfaces/ModifPassword';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mot-de-passe-recuperation',
  templateUrl: './mot-de-passe-recuperation.page.html',
  styleUrls: ['./mot-de-passe-recuperation.page.scss'],
})
export class MotDePasseRecuperationPage implements OnInit {
  @Input() email: string;
  @Input() password: string;
  @Input() nouveau: string;
  pass: modifpassword = {
    email: '',
    password: '',
    nouveau: '',
  };
  constructor(
    private modal: ModalController,
    private auth: AuthService,
    private toast: ToastController
  ) {}

  ngOnInit() {}
  async sendRequestPass() {
    this.auth
      .modifpassword(this.email, this.password, this.nouveau)
      .then(async (testmodif: any) => {
        //let data = JSON.parse(user.emailer);
        console.log(this.email + ' ' + this.password + ' ' + this.nouveau);
      })
      .catch(async (err) => {});
  }
}
