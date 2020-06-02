import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-order-form',
  templateUrl: './admin-order-form.component.html',
  styleUrls: ['./admin-order-form.component.css']
})
export class AdminOrderFormComponent implements OnInit {

  id: string;
  order$: Observable<Order>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) { }

ngOnInit() {
     if (this.order$ === undefined || null) {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
      this.order$ = this.orderService.getOrder(this.id);
     }
   }
}

back() {
  if(confirm('Are you sure you want to leave this page?')) {
    this.router.navigate(['/admin/orders']);
  }
}

}
