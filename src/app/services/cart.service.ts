import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cour } from '../interfaces/cour';
import { HttpClient } from '@angular/common/http';
import { CoursService } from './cours.service';
import { UserRegister } from '../interfaces/user-register';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


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
	private active = new BehaviorSubject(0);
	cours: Cour[];
	storageCart: any;

  	constructor(
		private http: HttpClient,
		private cour: CoursService,
		private platform: Platform,
		private storage: NativeStorage
		)
	{}

    
	 

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
			if (item.IdCour === product.IdCour) {
				product.activeClass = true
				added = true;
				break;
			}
		}
		
		if(!added){
			this.cart.push(product); this.cartItemCount.next(this.cartItemCount.value + 1);
			this.active.next(this.active.value + 1);
			if(this.platform.is("desktop")) {
				localStorage.setItem('cartItem',JSON.stringify(this.getCart()))
			}else{
				this.storage.setItem('cartItem', JSON.stringify(this.getCart()))
			}

			
		}else{
			this.cartItemCount.next(this.cartItemCount.value + 1);
			
		}

	}

	async removeProduct(product: Cour) {
		if(this.platform.is("desktop")) {
			this.storageCart = await JSON.parse(localStorage.getItem('cartItem'));
			
		}else{
			this.storageCart = await JSON.parse(await this.storage.getItem('cartItem'));
		}
		
	
		const tp = this.storageCart.findIndex(item => {
			item.activeClass = false
			return item.IdCour == product.IdCour
	    })
		
	
		
		
	   
		
		for (const [index, item] of this.cart.entries()) {
			if (item.IdCour === product.IdCour) {
				this.cartItemCount.next(this.cartItemCount.value - item.amount);
				this.cart.splice(index, 1);
				// product.activeClass = 1
    
				item.amount = 1
			}
		}

		this.storageCart.splice(tp, 1)

		if(this.platform.is("desktop")) {

			localStorage.setItem('cartItem', JSON.stringify(this.storageCart))
		}else{
			this.storage.setItem('cartItem', JSON.stringify(this.storageCart))
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