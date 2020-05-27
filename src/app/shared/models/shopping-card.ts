import { Item } from './item';
import { Product } from './product';

export class ShoppingCard {

private newItems: Item[] = [];

  constructor(public items: Item[]) {
      // tslint:disable-next-line: forin
      // if (!items) { items = [] }
       this.items = items || [];
       for (const productId in items) {
        if (items.hasOwnProperty(productId)) {
        const item = items[productId];
        this.newItems.push(new Item( item ));
        }
      } 
    }

  get newCard() {
      return this.newItems;
  }

  get totalPrice(){
    let total = 0;
    for (const elem of this.newItems) {
      total += elem.totalPrice;
    }
    return total;
  }

  get totalItemsCount() {
      let count = 0;
      // tslint:disable-next-line: forin
      for (const productId in this.items) {
      count += this.items[productId].quantity;
   }
      return count;
  }

  getQuantity(product: Product) {
     const item = this.items[product.key];
     return item ? item.quantity : 0 ;
    }


}
