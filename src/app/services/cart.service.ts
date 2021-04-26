import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cour } from '../interfaces/cour';
import { HttpClient } from '@angular/common/http';
import { CoursService } from './cours.service';


export interface Product {
  	id: number;
	name: string;
	price: number;
	amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

	// data: Cour[] =

	// [
	// 	{ idCour: 0, image:"", Auteur: 'Florian', prix: 100.00, Etoile: 5, contenu: "Bien débuter avec nodeJs et express", date: "2021-04-18", amount: 1 },
	// 	{ idCour: 1, image:"", Auteur: 'Antoine', prix: 109.99, Etoile: 4.5, contenu: "Les fondamentaux de TypeScript", date: "2021-04-18", amount: 1 },
	// 	{ idCour: 2, image:"", Auteur: 'Kriss', prix: 85.00, Etoile: 4, contenu: "Structurez votre application avec ionic", date: "2021-04-18", amount: 1 },
	// 	{ idCour: 3, image:"", Auteur: 'Julien', prix: 55.00, Etoile: 3.5, contenu: "Les bases de nodeJs", date: "2021-04-18", amount: 1 },
	// ];
	url: string = "https://tutoramaflorian.krissdeveloppeur.com/";
 	private cart = [];
  	private cartItemCount = new BehaviorSubject(0);
	cours: Cour[];

  	constructor(private http: HttpClient, private cour: CoursService) { 
		
		
	}


	 

	async getProducts(): Promise<Cour[]> {
		return this.cours = await this.cour.getData();
		

	}

	getCart(): Cour[] {
		return this.cart;
	}

	getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

	addProduct(product: Cour) {
		let added = false;
		
		for (const item of this.cart) {
			
			if (item.IdCour === product.IdCour) {
				item.amount += 1;
				added = true;
				break;
			}
		}
		if(!added){
			this.cart.push(product); this.cartItemCount.next(this.cartItemCount.value + 1);
			
			
		}else{
			this.cartItemCount.next(this.cartItemCount.value + 1);
			
		}

	}

	decreaseProduct(product: Cour) {
		for (const [index, item] of this.cart.entries()) {
			if (item.IdCour === product.IdCour) {
				item.amount -= 1;
				if (item.amount === 0) {
					this.cart.splice(index, 1);
					item.amount = 1;
					console.log(item.amount)
				}
			}
		}
		this.cartItemCount.next(this.cartItemCount.value - 1);
	}

	removeProduct(product: Cour) {
		for (const [index, item] of this.cart.entries()) {
			if (item.IdCour === product.IdCour) {
				this.cartItemCount.next(this.cartItemCount.value - item.amount);
				this.cart.splice(index, 1);
				item.amount = 1
			}
		}
	}
}