import { Controller, Post, Body } from '@nestjs/common';
import { LoginFlowDto } from '../../dto/dto_flow/token/login.flow.dto';
import { TokenService } from '../../service/token/token.service';

@Controller('token')
export class TokenController {
  constructor(private loginService: TokenService) {}

  @Post()
  async getToken(@Body() loginData: LoginFlowDto) {
    return await this.loginService.getToken(loginData);
  }
}
