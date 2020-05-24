import { Product } from 'src/app/model/product';


export class Item {

public product: Product;
public quantity: number;
// constructor(public product: Product, public quantity: number) {}
constructor(init?: Partial<Item>) {
    Object.assign(this, init);
}

get totalPrice() {
     { return  this.product.price * this.quantity; }
}

}
