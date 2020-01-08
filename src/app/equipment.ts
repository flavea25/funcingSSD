
export class Equipment {
  id: string;
  name: string;
  picture: string;
  price: number;
  sizes: Array<string>;
  quantity: Array<number>;
  category: string;

  constructor (name: string, picture: string, price: number, category: string){
    this.name = name;
    this.category = category;
    this.picture = picture;
    this.price = price;
  }
}