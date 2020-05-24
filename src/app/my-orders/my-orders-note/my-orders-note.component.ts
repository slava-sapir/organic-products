import { Order } from 'src/app/model/order';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-orders-note',
  templateUrl: './my-orders-note.component.html',
  styleUrls: ['./my-orders-note.component.css']
})
export class MyOrdersNoteComponent {
 
  // tslint:disable-next-line: no-input-rename
  @Input('card') orders;
  // tslint:disable-next-line: no-input-rename
  @Input('action') action: boolean;
  // tslint:disable-next-line: no-input-rename
  @Input('orderId') key: string;

  order;

  get myOrder() {
    this.order = this.orders.filter( item => item.key === this.key);
    return this.order;
  }
   // constructor() { }

  // tslint:disable-next-line: no-unused-expression
  close(): void {
    this.action = !this.action;
  }


}
