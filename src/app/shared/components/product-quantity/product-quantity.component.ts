import { Component, Input } from '@angular/core';
import { ShoppingCardService } from '../../services/shopping-card.service';
import { Product } from '../../models/product';
import { ShoppingCard } from '../../models/shopping-card';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-card') shoppingCard: ShoppingCard;
 
   constructor(private shoppingCardService: ShoppingCardService) { }
 
   addToCard() {
     this.shoppingCardService.addToCard(this.product); 
    }
   
   removeFromCard() {
    this.shoppingCardService.removeFromCard(this.product);
    }
}
