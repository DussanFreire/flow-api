import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { CustomerController } from './customer/customer.controller';
import { TokenController } from './token/token.controller';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ServiceModule],
  controllers: [TokenController, CustomerController, CategoryController, ProductController],
})
export class ControllerModule {}
