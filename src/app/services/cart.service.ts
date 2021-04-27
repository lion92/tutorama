import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cour } from '../interfaces/cour';
import { HttpClient } from '@angular/common/http';
import { CoursService } from './cours.service';
import { UserRegister } from '../interfaces/user-register';


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
	
	url: string = "https://tutoramaflorian.krissdeveloppeur.com/";
 	private cart = [];
  	private cartItemCount = new BehaviorSubject(0);
	cours: Cour[];
	private storage = [];
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
		product.amount = 1
		for (const item of this.cart) {
			// item.amount = 1
			if (item.IdCour === product.IdCour) {
				item.amount += 1;
				added = true;
				break;
			}
		}
		
		if(!added){
			this.cart.push(product); this.cartItemCount.next(this.cartItemCount.value + 1);
			localStorage.setItem('toto',JSON.stringify(this.getCart()))
			
		}else{
			this.cartItemCount.next(this.cartItemCount.value + 1);
			
		}

	}

	// decreaseProduct(product: Cour) {
	// 	for (const [index, item] of this.cart.entries()) {
	// 		if (item.IdCour === product.IdCour) {
	// 			item.amount -= 1;
	// 			if (item.amount === 0) {
	// 				this.cart.splice(index, 1);
	// 				item.amount = 1;
	// 				console.log(item.amount)
	// 			}
	// 		}
	// 	}
	// 	this.cartItemCount.next(this.cartItemCount.value - 1);
	// }

	removeProduct(product: any) {
		this.storage.push(localStorage.getItem('toto'))
		for (const [index, item] of this.storage.entries()) {
			if (item.IdCour === product.IdCour) {
				this.cartItemCount.next(this.cartItemCount.value - item.amount);
				this.storage.splice(index, 1);
				
				item.amount = 1
			}
		}


	}

	addCart(idUtilisateur: number, idCour: number){
		return new Promise((resolve, rejects) => {
			this.http.post(this.url + '/addpanier', { idUtilisateur: idUtilisateur, idCour: idCour }).subscribe((data: any) => {
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