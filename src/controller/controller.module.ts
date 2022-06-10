import { CacheModule, Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { CustomerController } from './customer/customer.controller';
import { TokenController } from './token/token.controller';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';
import { CartController } from './cart/cart.controller';
import { LoginController } from './login/login.controller';
import { MeController } from './me/me.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    TokenController,
    CustomerController,
    CategoryController,
    ProductController,
    CartController,
    LoginController,
    MeController,
  ],
})
export class ControllerModule {}
