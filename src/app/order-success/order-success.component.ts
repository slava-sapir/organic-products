import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  id: string;
  order$: Observable<Order>;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit() {
    if (this.order$ === undefined || null) {
     this.id = this.route.snapshot.paramMap.get('id');
     if (this.id) {
     this.order$ = this.orderService.getOrder(this.id);
    }
  }
}


}
