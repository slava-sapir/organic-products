import { Subscription } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
 // filteredProducts: any[];
  products: Product[] = [];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'category', 'key'];
  dataSource: MatTableDataSource<Product>;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService: ProductService) {
        this.subscription = this.productService.getAll()
        .subscribe(items => {
          items.forEach(item => {
          this.products.push(item as Product);
          });
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
       });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

}
