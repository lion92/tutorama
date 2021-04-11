import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://tutoramaflorian.krissdeveloppeur.com";


  constructor(private http: HttpClient) { }

  login(email: string, password: string) {


    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/login', { email: email, password: password }).subscribe((data: any) => {
            //(!data.success) ? rejects(false): resolve(data);
           console.log(data)
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

    const optionRequete = {
      headers: new HttpHeaders({ 
        "Host": "https://tutoramaflorian.krissdeveloppeur.com",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "application/json"
      })
    };
    
    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/register', user, optionRequete).subscribe((data: any) => {
            (!data.success) ? rejects(data.message): resolve(data);
        });
    });
  }
}
