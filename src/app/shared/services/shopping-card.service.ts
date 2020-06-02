import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { take, map, retry } from 'rxjs/operators';
import { Item } from '../models/item';
import { ShoppingCard } from '../models/shopping-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) { }

  async getCard(): Promise<Observable<ShoppingCard>> {
    const cartId = await this.getOrCreateCardId();
    return this.db.object('/shopping-cards/' + cartId).valueChanges()
    .pipe(map((cart: ShoppingCard) => new ShoppingCard(cart.items))
     );
  }

    getCardById(): Observable<ShoppingCard> {
    const cartId = localStorage.getItem('cartId');
    // const cartId = await this.getOrCreateCardId();
    return this.db.object('/shopping-cards/' + cartId).valueChanges()
    .pipe(map((cart: ShoppingCard) => new ShoppingCard(cart.items))
     );
  }

  async clearCard() {
    const cartId = await this.getOrCreateCardId();
    const promise = this.db.object('/shopping-cards/' + cartId + '/items').remove();
    promise.then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  }

  async addToCard(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCard(product: Product){
    this.updateItem(product, -1);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cards/' + cartId + '/items/' + productId);
  }

  private create() {
    return this.db.list('/shopping-cards').push({
    dateCreated: new Date().toDateString()
    });
  }

  private async getOrCreateCardId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; } 

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  // private async updateItem(product: Product, change: number) {
  //   const cardId = await this.getOrCreateCardId();
  //   const item$ = this.getItem(cardId, product.key);
  //   item$.valueChanges().pipe(take(1))
  //   .subscribe((item: Item) => {
  //     if (item)
  //      { item$.update({ product, quantity: item.quantity + change}); }
  //      else { item$.set({ product, quantity : 1}); }
  //     });
  //  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCardId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: Item) => {
     if(item) {
      item.quantity + change === 0 ? item$.remove() : 
      item$.update({ product, quantity: item.quantity + change});
     }
     else { item$.set({ product, quantity : 1}); }
    });
  }
}
