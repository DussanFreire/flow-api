import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './register/customer.service';
import { TokenService } from './token/token.service';

@Module({
  imports: [HttpModule],
  providers: [TokenService, CustomerService],
  exports: [TokenService, CustomerService],
})
export class ServiceModule {}
