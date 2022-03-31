import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/dto/login.dto';
import { TokenService } from 'src/service/token/token.service';

@Controller('token')
export class TokenController {
  constructor(private loginService: TokenService) {}

  @Post()
  async getToken(@Body() loginData: LoginDto) {
    return this.loginService.getToken(loginData);
  }
}
