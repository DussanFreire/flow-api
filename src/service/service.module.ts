import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { TokenService } from './token/token.service';
import { CategoryService } from './category/category.service';

@Module({
  imports: [HttpModule],
  providers: [TokenService, CustomerService, CategoryService],
  exports: [TokenService, CustomerService, CategoryService],
})
export class ServiceModule {}
