import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cour } from '../interfaces/cour';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  url: string = "https://tutoramaflorian.krissdeveloppeur.com/";

  constructor(private http: HttpClient) { }

  getData(): Promise <Cour[]>{

    return new Promise((resolve, rejects) => {
      
      this.http.request('GET', this.url + "promo", { responseType: 'text' }).subscribe((data) => {
        try{
            
            let cours: Cour[] = [];
            let object = JSON.parse(data)
           console.log(object)
            for(const item of object){
              cours.push({
                idCour: item.idCour,
                Auteur: item.Auteur,
                Etoile: item.Etoile,
                Conetenu: item.Conetenu,
                prix: item.prix,
                date: item.date
              })
              
              resolve(cours);
            }
          }catch(err){
           
            rejects(false)
          }
      })
    })

  }




}
