import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { Order } from '../model/order';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {

  title = 'Your orders';
  action = false;
  orders$: Observable<Order[]>;
  key: string;

 // userId: string;
 // userSubscription: Subscription;
 // subscription: Subscription;
  
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

   // ngOnInit(): void {}

  // ngOnDestroy(): void {
  //   this.userSubscription.unsubscribe();
  // }


}



