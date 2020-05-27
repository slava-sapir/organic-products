import { ShoppingCardService } from './shopping-card.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  listRef: AngularFireList<any>;
  objectRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, 
              private shoppingCardService: ShoppingCardService) { }

  async placeOrder (order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCardService.clearCard();
    return result;
  }

  getOrders() {
    this.listRef = this.db.list('/orders');
    return this.listRef.snapshotChanges().pipe(
                map(changes =>
                  changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

   // this is work but don't have class structure
  getOrder(cardId): Observable<Order> {
    this.objectRef = this.db.object('/orders/' + cardId);
    return this.objectRef.valueChanges().pipe(take(1));
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    this.listRef = this.db.list('/orders/', ref => ref.orderByChild('userId').equalTo(userId));
    return this.listRef.snapshotChanges().pipe(
      map(changes =>
        changes.map<Order>(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

}
