import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsz=[];
  checkoutForm;
  totall:number=0;
  total:number=0;
  sh:number=0;
  regular:number = 9.99;
  premium:number = 19.99;

  constructor(private cartService: CartService, private formBuilder: FormBuilder,private authService:AuthService) {
    this.itemsz=this.cartService.getItems();
    this.checkoutForm=this.formBuilder.group({name: ' ', address: ' '});
  }

  onSubmit(customerData) {
    // Process checkout data here
    window.alert('Your order has been placed!');
    this.authService.sendEmail();

    this.itemsz = this.cartService.clearCart();
    this.checkoutForm.reset();
    this.total=0;
  }

  ngOnInit() {
    this.itemsz = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  onItemChange(event){
    this.sh=event.target.value.valueOf();
    this.totall=this.total.valueOf()+this.sh.valueOf();
}


}