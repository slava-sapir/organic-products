// import { Shipping } from './../../../shared/models/shipping';
import { Shipping } from '../../../shared/models/shipping'; // shipping-form original
import { FormBuilder, Validators } from '@angular/forms';
import { ShoppingCard } from 'src/app/shared/models/shopping-card';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

  constructor(private fb: FormBuilder,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router) {}

     @Input('card') card: ShoppingCard;

      userId: string;
      userSubscription: Subscription;
      shipping: Shipping;

      // tslint:disable-next-line: member-ordering
      addressForm = this.fb.group({
      company: null,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: null,
      city: [null, Validators.required],
      province: [null, Validators.required],
      postalCode: [null, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), 
        Validators.minLength(6), Validators.maxLength(6)])
      ],
      shippingType: ['free', Validators.required]
      });

      hasUnitNumber = false;

      provinces = [
      {name: 'Ontario', abbreviation: 'ON'},
      {name: 'Monitoba', abbreviation: 'MB'},
      {name: 'Alberta', abbreviation: 'AL'},
      {name: 'British Colambia', abbreviation: 'BC'},
      {name: 'Saskatchewan', abbreviation: 'SK'},
      {name: 'Quebec', abbreviation: 'QC'},
      {name: 'Nova Scotia', abbreviation: 'NS'},
      {name: 'Newfoundland and Labrador', abbreviation: 'N.L./T.-N.-L.'},
      {name: 'Prince Edward Island', abbreviation: 'PE'},
      {name: 'New Brunswick', abbreviation: 'NB'},
      {name: 'Northwest Territories', abbreviation: 'NT'},
      {name: 'Nunavut', abbreviation: 'NU'}
  ];
    
    ngOnInit(): void {
        // mat-fields-input control
        //  this._matFormField._control = this._control;
     const user$ = this.authService.userData$;
     this.userSubscription = user$.subscribe(user => this.userId = user.uid);
    }
    
    ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
    }

    async placeOrder() {
        this.shipping = Object.assign({}, this.addressForm.value);
        const order = new Order(this.userId, this.shipping, this.card);
        const result = await this.orderService.placeOrder(order);
        this.router.navigate(['/order-success', result.key]);
    }

}
