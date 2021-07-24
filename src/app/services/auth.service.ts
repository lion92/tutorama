import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRegister } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  url: string = 'https://tutoramaflorian.krissdeveloppeur.com';

  constructor(private http: HttpClient,
    private router: Router
    
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
        .subscribe((data: any) => {
          console.log('///' + data);
          if (data.includes('Utilisateur') && data.includes('connecté')) {
            this.router.navigate(['/tabs/home'])
          } else {
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
          if (!data.success) {
            this.router.navigate(['/tabs/login'])
            //rejects(data.message);
          } else {
          //  resolve(data);
            console.log(data);
            this.router.navigate(['/tabs/login'])
          }
        });
    });
  }
}
