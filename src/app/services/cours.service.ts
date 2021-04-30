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
      
      this.http.request('GET', this.url + "categorieTout", { responseType: 'text' }).subscribe((data) => {
        try{
            
            let cours: Cour[] = [];
            
            let object = JSON.parse(data)
          
            for(const item of object){
              cours.push({
                IdCour: item.IdCour,
                Nom: item.Nom,
                Auteur: item.Auteur,
                Etoile: item.Etoile,
                contenu: item.contenu,
                prix: item.prix,
                date: item.date,
                image: item.image,
                video: item.video,
                amount: 1,
                
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
                Nom: item.Nom,
                Auteur: item.Auteur,
                Etoile: item.Etoile,
                contenu: item.contenu,
                prix: item.prix,
                date: item.date,
                image: item.image,
                video: item.video,
                amount: 1,
                
              })
              
              resolve(cours);
            }
          }catch(err){
           
            rejects(false)
          }
      })
    })

  }



  // Récupère les tutos les mieux notées 
  getBestTuto(): Promise <Cour[]>{
    return new Promise((resolve, rejects) => {
      
      this.http.request('GET', this.url + "mieunote", { responseType: 'text' }).subscribe((data) => {
        try{
            
            let cours: Cour[] = [];
            let object = JSON.parse(data)
           
            for(const item of object){
              cours.push({
                IdCour: item.IdCour,
                Nom: item.Nom,
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

  // Récupère les tutos par catégorie
  getCourseByCat(cat: string){
    return new Promise((resolve, rejects) => {
      this.http.get(this.url + '/courCategorie/'+ cat).subscribe((data: any) => {
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


}
