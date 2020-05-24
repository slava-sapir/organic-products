import { ShoppingCardService } from './../shopping-card.service';
import { Component, Input } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCard } from '../model/shopping-card';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
 // tslint:disable-next-line: no-input-rename
 @Input('product') product: Product;
 // tslint:disable-next-line: no-input-rename
 @Input('show-actions') showActions = true;
 // tslint:disable-next-line: no-input-rename
 @Input('shopping-card') shoppingCard: ShoppingCard;

  constructor(private shoppingCardService: ShoppingCardService) { }

  addToCard() {
    this.shoppingCardService.addToCard(this.product); 
   }
}
