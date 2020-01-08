import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../cart.service';

import { Equipment } from './equipment';
import { EquipmentService } from '../equipment.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  equips: Equipment[];
  path:string;

  constructor(private route: ActivatedRoute,private cartService: CartService,private equipmentService:EquipmentService) { }

  addToCart(e) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(e);
  }

  ngOnInit() {

  this.equipmentService.getEquipment().subscribe(data => {
      this.equips = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Equipment;
      })
    });

  this.path=window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  
}

}