import { Controller, Post, Body } from '@nestjs/common';
import { LoginFlowDto } from '../../dto/dto_flow/token/login.flow.dto';
import { TokenService } from '../../service/token/token.service';
import { 
  ApiBadRequestResponse, 
  ApiBody, 
  ApiCreatedResponse, 
  ApiOperation, ApiTags, 
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Token')
@Controller('token')
export class TokenController {
  constructor(private loginService: TokenService) {}

  @Post()
  @ApiOperation({summary: 'Get a token access.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: LoginFlowDto})
  async getToken(@Body() loginData: LoginFlowDto) {
    return await this.loginService.getToken(loginData);
  }
}
