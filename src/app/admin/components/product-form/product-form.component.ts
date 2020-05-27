import { ProductService } from '../../../shared/services/product.service';
import { Component, ContentChild, ViewChild, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { Product } from 'src/app/shared/models/product';
// import {VERSION} from '@angular/material';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 categories$;
 product: Product;
 id: string;



 // tslint:disable-next-line: variable-name
 @ContentChild(MatFormFieldControl, {static: true} ) _control: MatFormFieldControl<any>;
 // tslint:disable-next-line: variable-name
 @ViewChild(MatFormField, { static: true}) _matFormField: MatFormField;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              ) {
                this.categories$ = this.categoryService.getAll();
              }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
     } else { this.productService.create(product); }
    this.router.navigate(['/admin/products']);
  }

  delete () {
    if(confirm('Are you sure you want to delete the product?')) {
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
    }
  }
 
  cancel () {
    if(confirm('Are you sure you want to leave this page?')) {
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit(): void {
    if (this.product === undefined || null) {
       this.product = new Product();
    }

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
       this.productService.get(this.id).subscribe(p => { this.product = p; });
    }
    // mat-fields-input control
    this._matFormField._control = this._control;
  }
}
