import { Controller, Post, Body } from '@nestjs/common';
import { LoginFlowDto } from 'src/dto/dto_flow/login.flow.dto';
import { TokenService } from 'src/service/token/token.service';

@Controller('token')
export class TokenController {
  constructor(private loginService: TokenService) {}

  @Post()
  async getToken(@Body() loginData: LoginFlowDto) {
    return await this.loginService.getToken(loginData);
  }
}
