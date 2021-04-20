import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://tutoramaflorian.krissdeveloppeur.com";


  constructor(private http: HttpClient) { }

    getUserByEmail(email: string) {

      return new Promise((resolve, rejects) => {
          this.http.get(this.url + '/utilisateur/'+ email).subscribe((data: any) => {
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

}
