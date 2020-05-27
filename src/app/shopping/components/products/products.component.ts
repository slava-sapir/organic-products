import { ShoppingCardService } from '../../../shared/services/shopping-card.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { ShoppingCard } from '../../../shared/models/shopping-card';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
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
       .subscribe(params => {
         this.category = params.get('category');
         this.applyFilter();
    });
  }

  private applyFilter() { 
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) :
    this.products;
  }

}
