import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { TokenService } from './token/token.service';
import { CategoryService } from './category/category.service';
import { PaginateService } from './paginate/paginate.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [HttpModule],
  providers: [TokenService, CustomerService, CategoryService, ProductService, PaginateService],
  exports: [TokenService, CustomerService, CategoryService, ProductService, PaginateService],
})
export class ServiceModule {}
