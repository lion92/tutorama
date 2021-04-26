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
      
      this.http.request('GET', this.url + "courTout", { responseType: 'text' }).subscribe((data) => {
        try{
            
            let cours: Cour[] = [];
            
            let object = JSON.parse(data)
          
            for(const item of object){
              cours.push({
                IdCour: item.IdCour,
                Auteur: item.Auteur,
                Etoile: item.Etoile,
                contenu: item.contenu,
                prix: item.prix,
                date: item.date,
                image: item.image,
                video: item.video,
                amount: 1
              })
              
              resolve(cours);
            }
          }catch(err){
           
            rejects(false)
          }
      })
    })

  }

  getPromo(): Promise <Cour[]>{

    return new Promise((resolve, rejects) => {
      
      this.http.request('GET', this.url + "promo", { responseType: 'text' }).subscribe((data) => {
        try{
            
            let cours: Cour[] = [];
            let object = JSON.parse(data)
          
            for(const item of object){
              cours.push({
                IdCour: item.IdCour,
                Auteur: item.Auteur,
                Etoile: item.Etoile,
                contenu: item.contenu,
                prix: item.prix,
                date: item.date,
                image: item.image,
                video: item.video,
                amount: 1
              })
              
              resolve(cours);
            }
          }catch(err){
           
            rejects(false)
          }
      })
    })

  }




  getBestTuto(): Promise <Cour[]>{
    return new Promise((resolve, rejects) => {
      
      this.http.request('GET', this.url + "mieunote", { responseType: 'text' }).subscribe((data) => {
        try{
            
            let cours: Cour[] = [];
            let object = JSON.parse(data)
           
            for(const item of object){
              cours.push({
                IdCour: item.IdCour,
                Auteur: item.Auteur,
                Etoile: item.Etoile,
                contenu: item.contenu,
                prix: item.prix,
                date: item.date,
                image: item.image,
                video: item.video
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
