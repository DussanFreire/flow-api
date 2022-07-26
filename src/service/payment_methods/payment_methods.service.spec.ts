import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsService } from './payment_methods.service';

describe('PaymentMethodsService', () => {
  let paymentMethodsService: PaymentMethodsService;
  const mockPaymentMethods= {
    getPaymentMethodsInfo: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodsService,
        {
          provide: PaymentMethodsService,
          useValue: mockPaymentMethods 
        }
      ],
    }).compile();

    paymentMethodsService = module.get<PaymentMethodsService>(PaymentMethodsService);
  });

  it('should be defined', () => {
    expect(paymentMethodsService).toBeDefined();
  });
  it('should get all payment methods', async () => {
    const spyPaymentMethodsService = jest
    .spyOn(paymentMethodsService, 'getPaymentMethodsInfo')
    await paymentMethodsService.getPaymentMethodsInfo('dkden8mlfwscsblgmvdxfr30duaoviht');
    expect(spyPaymentMethodsService).toHaveBeenCalled;
  });
});
