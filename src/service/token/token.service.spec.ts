import { Test, TestingModule } from '@nestjs/testing';
import { LoginFlowDto } from 'src/dto/dto_flow/token/login.flow.dto';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  const mockToken= {
    getToken: jest.fn(),
  }
  const token= {
    username: 'juan@gmail.com',
    password: 'Password!'
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: TokenService,
          useValue: mockToken
        }
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });
  it('should get token', async () => {
    const spyTokenService = jest
    .spyOn(tokenService, 'getToken')
    await tokenService.getToken(token as LoginFlowDto);
    expect(spyTokenService).toHaveBeenCalled;
  });
});
