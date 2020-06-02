import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {

  page = 1;
  pageSize =3;
  title = 'List of your orders';
  action = false;
  orders$: Observable<Order[]>;
  key: string;

  constructor(private orderService: OrderService,
              private authService: AuthService) {
    // this.userSubscription = this.authService.userData$.subscribe(user => this.userId = user.uid );
    this.orders$ = this.authService.userData$
    .pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid) ));
  }

  view(key: string) {
   this.action = !this.action;
   this.key = key;
   }

}



