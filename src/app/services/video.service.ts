import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Video {
  title: string;
  url: string;
  thumb: string;
  subtitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  


  url: string = "https://tutoramaflorian.krissdeveloppeur.com";

 

  constructor(private http: HttpClient) { }

  getTutoByUser(email: string){
    return new Promise((resolve, rejects) => {
      this.http.get(this.url + '/panier/'+ email).subscribe((data: any) => {
       
        if(!data){
          rejects(false)
        }else{
          resolve(data);
        }
          
      });
  });
  }


}
