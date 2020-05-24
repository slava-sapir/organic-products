import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  listRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }
  
  getAll() {
  this.listRef = this.db.list('/categories', ref => ref.orderByChild('name'));
  return this.listRef.snapshotChanges().pipe(
              map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
}

}
