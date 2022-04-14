import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { TokenService } from './token/token.service';
import { CategoryService } from './category/category.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [HttpModule],
  providers: [TokenService, CustomerService, CategoryService, ProductService],
  exports: [TokenService, CustomerService, CategoryService, ProductService],
})
export class ServiceModule {}
