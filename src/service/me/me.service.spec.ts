import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from './me.service';

describe('MeService', () => {
  let meService: MeService;
  const mockMeService={
    getLoginInfo:jest.fn(),
    getUserId:jest.fn(),
    updateUserInfo:jest.fn(),
  }
  const updateUserInfo = {
    firstname: 'Juan Pablo',
    lastname: 'Nuñez',
    email: 'jpnm@gmail.com',
    dob: '24-09-1999',
    is_subscribed: true,
    website_id: 1
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
  it('should get user id', async () => {
    const spyInvoiceService = jest
    .spyOn(meService, 'getUserId')
    await meService.getUserId('dkden8mlfwscsblgmvdxfr30duaoviht');
    expect(spyInvoiceService).toHaveBeenCalled;
  });
  it('should update info customer', async () => {
    const spyInvoiceService = jest
    .spyOn(meService, 'updateUserInfo')
    await meService.updateUserInfo('dkden8mlfwscsblgmvdxfr30duaoviht',updateUserInfo);
    expect(spyInvoiceService).toHaveBeenCalled;
  });
});
