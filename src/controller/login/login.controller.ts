import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/dto/login.dto';
import { LoginService } from 'src/service/login/login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/integration/customer/token')
  async loginCustomer(@Body() loginData: LoginDto) {
    return this.loginService.loginCustomer(loginData);
  }
}
