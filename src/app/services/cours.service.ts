import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cour } from '../interfaces/cour';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  url: string = "http://localhost:3000/api/cours/";

  constructor(private http: HttpClient) { }

  // getData(): Promise <Cour[]>{

  //   return new Promise((resolve, rejects) => {
      
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //           'Authorization': 'Bearer ' + localStorage.getItem("token")
  //       })
  //     };
  //     this.http.request('GET', 'http://localhost:3000/api/cours/', { headers: httpOptions.headers, responseType: 'text' }).subscribe((data) => {
  //       try{
            
  //           let cours: Cour[] = [];
  //           let object = JSON.parse(data)
           
  //           for(const item of object.data){
  //             cours.push({
  //               auteur: item.auteur,
  //               image: item.image,
  //               video: item.video,
  //               etoile: item.etoile,
  //               contenu: item.contenu,
  //               prix: item.prix,
  //               date: item.date
  //             })
              
  //             resolve(cours);
  //           }
  //         }catch(err){
           
  //           rejects(false)
  //         }
  //     })
  //   })

  // }




}
