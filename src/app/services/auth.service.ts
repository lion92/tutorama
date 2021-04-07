import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://tutoramaflorian.krissdeveloppeur.com";


  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/login', { email: email, password: password }).subscribe((data: any) => {
            //(!data.success) ? rejects(false): resolve(data);
           
           if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
           //(!data.success) ? rejects(false): resolve(data);
            
        });
    });
}

  register(user: UserRegister) {
    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/register', user).subscribe((data: any) => {
            (!data.success) ? rejects(data.message): resolve(data);
        });
    });
  }
}
