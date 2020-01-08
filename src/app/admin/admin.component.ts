import { Component, OnInit } from '@angular/core';

import { EquipmentService } from '../equipment.service';
import { Equipment } from '../equipment';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Categories } from '../categories';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  equips:Equipment[]; 
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  categories: Observable<any[]>;
  categs: Categories[];
  selectedCategory = null;
  
  constructor(private fb: FormBuilder,private equipmentService:EquipmentService,private afStorage: AngularFireStorage) { }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    //this.downloadURL = this.task.downloadURL();
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



  create(equipment: Equipment){
      this.equipmentService.createEquipment(equipment);
  }

  update(equipment: Equipment) {
    this.equipmentService.updateEquipment(equipment);
  }

  delete(id: string) {
    this.equipmentService.deleteEquipment(id);
  }

  createNew(name: string, price: number, category: string, picture: string){
    let eq = new Equipment(name,picture,price,category);
    console.log(eq.category);
    this.equipmentService.createEquipment(eq);
  }

  onChange(category) {
    this.selectedCategory=category;
}
}