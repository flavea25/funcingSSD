import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itms=[];
  total=0;

  addToCart(product){
    this.itms.push(product);
    this.total+=product.price;
  }

  getItems(){
    return this.itms;
  }

  clearCart(){
    this.itms=[];
    this.total=0;
    return this.itms;
  }

  getTotal(){
	  return this.total;
  }

  constructor(private http: HttpClient){

  }
}