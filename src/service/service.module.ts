import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@Module({
  imports: [HttpModule],
  providers: [LoginService, RegisterService],
  exports: [LoginService, RegisterService],
})
export class ServiceModule {}
