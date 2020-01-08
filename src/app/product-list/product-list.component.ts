import { Component, OnInit } from '@angular/core';

import { EquipmentService } from '../equipment.service';
import { Equipment } from '../equipment';
import { Categories } from '../categories';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  equips: Equipment[];
  categs: Categories[];

  categories: Observable<any[]>;
  selectedCategory = null;
  equipss: Observable<any[]>;
  count: number;

  constructor(private equipmentService:EquipmentService){
  }

  ngOnInit(){
   this.equipmentService.getEquipment().subscribe(data => {
      this.equips = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Equipment;
      })
    });

    this.equipmentService.getCategories().subscribe(data => {
      this.categs = data.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        } as Categories;
      })
    });

    this.categories = this.equipmentService.getCategories();
  }

  onChange(category) {
    this.selectedCategory=category;
    window.alert("category changed to "+category.name);
}
}
