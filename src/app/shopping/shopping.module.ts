import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth-guard.service';
import { CheckOutComponent } from 'src/app/shopping/components/check-out/check-out.component';
import { MyOrdersNoteComponent } from 'src/app/shopping/components/my-orders/my-orders-note/my-orders-note.component';
import { MyOrdersComponent } from 'src/app/shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'src/app/shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from 'src/app/shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'src/app/shopping/components/products/products.component';
import { ShippingFormComponent } from 'src/app/shopping/components/shipping-form/shipping-form.component';
import {
  ShoppingCardSummaryComponent,
} from 'src/app/shopping/components/shopping-card-summary/shopping-card-summary.component';
import {
  ShoppingCardNoteComponent,
} from 'src/app/shopping/components/shopping-card/shopping-card-note/shopping-card-note.component';
import { ShoppingCardComponent } from 'src/app/shopping/components/shopping-card/shopping-card.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent ,
    ShoppingCardComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCardNoteComponent,
    ShoppingCardSummaryComponent,
    ShippingFormComponent,
    MyOrdersNoteComponent,
    ProductFilterComponent
  ],
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-card', component: ShoppingCardComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ShoppingModule { }
