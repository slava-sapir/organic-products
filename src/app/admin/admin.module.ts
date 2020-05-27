import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminOrderFormComponent } from 'src/app/admin/components/admin-order-form/admin-order-form.component';
import { AdminOrdersComponent } from 'src/app/admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'src/app/admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from 'src/app/admin/components/product-form/product-form.component';
import { AdminAuthGuard } from 'src/app/admin/services/admin-auth-guard.service';
import { AuthGuard } from 'src/app/shared/services/auth-guard.service';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    AdminOrderFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders/:id', component: AdminOrderFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ]),
  ],
  providers: [AdminAuthGuard]
})
export class AdminModule { }
