import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   listRef: AngularFireList<any>;
   objectRef: AngularFireObject<any>;
   

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    this.listRef = this.db.list('/products');
    return this.listRef.snapshotChanges().pipe(
                map(changes =>
                  changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  create(product) {
     return this.db.list('/products').push(product).catch();
  }

  get(productId) {
  this.objectRef = this.db.object('/products/' + productId);
  return this.objectRef.valueChanges().pipe(take(1)); 
  }
 
  update(productId, product){
    this.db.object('/products/' + productId).update(product);
  }

  delete (productId){
    return this.db.object('/products/' + productId).remove();
  }
}
