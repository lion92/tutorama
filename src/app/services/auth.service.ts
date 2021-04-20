import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://tutoramaflorian.krissdeveloppeur.com";


  constructor(private http: HttpClient) { }


  forgotPassword(email: string){

    return new Promise((resolve, rejects) => {
      this.http.post(this.url + '/perdu', { email: email }).subscribe((data: any) => {
        
        if(!data){
          rejects(false)
         }else{
          resolve(data);
         }
        
      })
    })
  }

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

    
    return new Promise((resolve, rejects) => {
        this.http.post(this.url + '/register', user).subscribe((data: any) => {
            (!data.success) ? rejects(data.message): resolve(data);
        });
    });
  }


  logout(){
    return new Promise((resolve, rejects) => {
      this.http.request('POST', this.url + '/deconnexion').subscribe((data: any) => {
        if(!data.success){
          rejects(data.message)
        }else{
          resolve(data);
          console.log(data);
        }
       // (!data.success) ? rejects(data.message): resolve(data);

      })
    })
  }
  

  
}
