import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { CustomerController } from './customer/customer.controller';
import { TokenController } from './token/token.controller';

@Module({
  imports: [ServiceModule],
  controllers: [TokenController, CustomerController],
})
export class ControllerModule {}
