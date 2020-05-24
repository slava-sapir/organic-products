import { ShoppingCardService } from './../shopping-card.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { ShoppingCard } from '../model/shopping-card';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  category: string;
  card$: Observable<ShoppingCard>;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private shoppingCardService: ShoppingCardService) { }

  async ngOnInit() {
    this.card$ = await this.shoppingCardService.getCard();
    this.populateProducts(); 
  }

   private populateProducts(){

    this.productService.getAll().pipe(switchMap(items => {
        items.forEach(item => { 
        this.products.push(item as Product);
       });
        return this.route.queryParamMap;}))
       .subscribe(params => {  this.category = params.get('category');
    });
  }

}
