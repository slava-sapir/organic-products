import { Shipping } from '../../../shared/models/shipping';
import { ShoppingCard } from 'src/app/shared/models/shopping-card';
import { Component,  ContentChild, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})

export class ShippingFormComponent implements OnInit, OnDestroy {
// tslint:disable-next-line: variable-name
@ContentChild(MatFormFieldControl, {static: true} ) _control: MatFormFieldControl<any>;
// tslint:disable-next-line: variable-name
@ViewChild(MatFormField, { static: true}) _matFormField: MatFormField;
// tslint:disable-next-line: no-input-rename
@Input('card') card: ShoppingCard;

shipping = {
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: ''
};

// shipping: Shipping;
userId: string;
userSubscription: Subscription;

constructor(
  private orderService: OrderService,
  private authService: AuthService,
  private router: Router) {}
  
  ngOnInit(): void {
      // mat-fields-input control
   this._matFormField._control = this._control;

   const user$ = this.authService.userData$;
   this.userSubscription = user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.card);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
