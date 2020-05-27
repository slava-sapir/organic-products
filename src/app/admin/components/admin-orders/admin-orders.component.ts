import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnDestroy {
  user$: Observable<any>;
  userId: string; 
  userSubscription: Subscription;

  orders: Order[] = [];
  subscription: Subscription;
  displayedColumns: string[] = ['name', 'datePlaced', 'total', 'userId', 'key'];
  dataSource: MatTableDataSource<Order>;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.user$ = this.authService.userData$;
    this.userSubscription = this.user$.subscribe(user => this.userId = user.uid);
    this.subscription = this.orderService.getOrders()
          .subscribe(items => {
          items.forEach(item => {
            if(item.userId === this.userId){
            this.orders.push(item as Order);
            }
          });
          this.dataSource = new MatTableDataSource(this.orders);
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
    this.userSubscription.unsubscribe();
}

}
