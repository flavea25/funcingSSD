import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Equipment } from './equipment';
import { Categories } from './categories';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EquipmentService {
   e: Equipment;

  private currentCategory = new BehaviorSubject<any>(null);
  private categories$: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) { 
    this.categories$ = this.firestore.collection('categories');
  }

  getEquipment() {
    return this.firestore.collection('equipment').snapshotChanges();
}

getCategories() {
    return this.categories$.valueChanges();
}

createEquipment(eq: Equipment){
    this.e = {
      name: eq.name,
      price: eq.price,
      category: eq.category,
      picture: eq.picture,
      sizes: [],
      quantity: []
    }
    this.firestore.collection<Equipment>('equipment').add(this.e).then( _ => alert("Added"));
}

updateEquipment(eq: Equipment){
    delete eq.id;
    this.firestore.doc('equipment/' + eq.id).update(eq);
}
deleteEquipment(eqId: string){
    this.firestore.doc('equipment/' + eqId).delete();
}

  get selectedCategory() {
    return this.currentCategory.asObservable();
  }

  set selectedCategory(value) {
    this.currentCategory.next(value);
  }
}