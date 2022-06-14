import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { TokenService } from './token/token.service';
import { CategoryService } from './category/category.service';
import { PaginateService } from './paginate/paginate.service';
import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { MeService } from './me/me.service';
import { ShippingService } from './shipping/shipping.service';
import { QrService } from './payment_methods/qr/qr.service';
import { CardService } from './payment_methods/card/card.service';

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
    QrService,
    CardService,
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
    QrService,
    CardService,
  ],
})
export class ServiceModule {}
