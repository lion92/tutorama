import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRegister } from '../interfaces/user-register';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://tutoramaflorian.krissdeveloppeur.com';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController
  ) {}

  forgotPassword(email: string) {
    return new Promise((resolve, rejects) => {
      this.http
        .post(this.url + '/perdu', { email: email })
        .subscribe((data: any) => {
          if (!data) {
            rejects(false);
          } else {
            resolve(data);
          }
        });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.http
        .post(this.url + '/login', { email: email, password: password })
        .subscribe(async (data: any) => {
          console.log('///' + data);
          if(!(JSON.stringify(data).includes('Utilisateur') && JSON.stringify(data).includes('connecté'))){
            const toast = await this.toast.create({
              message:
                'Mot de passe incorrect ou email incorrect',
              duration: 4000,
              color: 'danger',
            });

            await toast.present();
          }
          if (
            !data ||
            (JSON.stringify(data).includes('Utilisateur') && JSON.stringify(data).includes('connecté'))
          ) {
            this.router.navigate(['/tabs/home']);
          } else {
            const toast = await this.toast.create({
              message:
                'Mot de passe incorrect ou email incorrect',
              duration: 4000,
              color: 'danger',
            });

            await toast.present();
            rejects(false);
          }
        });
    });
  }

  register(user: UserRegister) {
    return new Promise((resolve, rejects) => {
      this.http.post(this.url + '/register', user).subscribe((data: any) => {
        console.log(data);
        if (!data) {
          rejects(false);
        } else {
          resolve(data);
        }
      });
    });
  }

  logout() {
    return new Promise((resolve, rejects) => {
      this.http
        .request('POST', this.url + '/deconnexion')
        .subscribe((data: any) => {
          try {
            if (!data.success) {
              this.router.navigate(['/tabs/login']);
              //rejects(data.message);
            } else {
              //  resolve(data);
              console.log(data);
              this.router.navigate(['/tabs/login']);
            }
          } catch (Exception) {}
        });
    });
  }
}
