import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { TokenService } from './token/token.service';
import { CategoryService } from './category/category.service';
import { PaginateService } from './paginate/paginate.service';
<<<<<<< HEAD
import { ProductService } from './product/product.service';
=======
import { CartService } from './cart/cart.service';
import { MeService } from './me/me.service';
import { ShippingService } from './shipping/shipping.service';
>>>>>>> ft_addaddress-paymentmethods

@Module({
  imports: [HttpModule],
  providers: [
    TokenService,
    CustomerService,
    CategoryService,
    ProductService,
    PaginateService,
    CartService,
    MeService,
    ShippingService,
  ],
  exports: [
    TokenService,
    CustomerService,
    CategoryService,
    ProductService,
    PaginateService,
    CartService,
    MeService,
    ShippingService,
  ],
})
export class ServiceModule {}
