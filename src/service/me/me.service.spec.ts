import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from './me.service';

describe('MeService', () => {
  let meService: MeService;
  const mockMeService={
    getLoginInfo:jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeService,
        {
          provide: MeService,
          useValue: mockMeService,
        }
        
      ],
    }).compile();

    meService = module.get<MeService>(MeService);
  });

  it('should be defined', () => {
    expect(meService).toBeDefined();
  });
  it('should get info customer', async () => {
    const spyInvoiceService = jest
    .spyOn(meService, 'getLoginInfo')
    await meService.getLoginInfo('dkden8mlfwscsblgmvdxfr30duaoviht');
    expect(spyInvoiceService).toHaveBeenCalled;
  });
});
