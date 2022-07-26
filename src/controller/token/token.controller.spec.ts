import { Test, TestingModule } from '@nestjs/testing';
import { LoginFlowDto } from '../../dto/dto_flow/token/login.flow.dto';
import { TokenService } from '../../service/token/token.service';
import { TokenController } from './token.controller';

describe('LoginController', () => {
  let tokenController: TokenController;
  let loginService: TokenService;
  const mockToken= {
    getToken: jest.fn(),
  }
  const token= {
    username: 'juan@gmail.com',
    password: 'Password!'
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers:[TokenService,{provide:TokenService,useValue:mockToken}]
    }).compile();

    tokenController = module.get<TokenController>(TokenController);
    loginService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(tokenController).toBeDefined();
  });
  describe('token', () => {
    it('should get token', () =>{
      tokenController.getToken(token as LoginFlowDto);
      expect(loginService.getToken).toHaveBeenCalled();
    });
  });
});
