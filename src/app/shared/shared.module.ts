import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/core/app-material/app-material.module';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'src/app/shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'src/app/shared/services/auth-guard.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCardService } from 'src/app/shared/services/shopping-card.service';
import { UserService } from 'src/app/shared/services/user.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    AppMaterialModule
  ],
  providers: [
    AuthService, AuthGuard, UserService, CategoryService,
    ShoppingCardService, ProductService, OrderService,
  ]
})
export class SharedModule { }
