import { Test, TestingModule } from '@nestjs/testing';
import { ShippingService } from './shipping.service';

describe('ShippingService', () => {
  let shippingService: ShippingService;
  const mockShipment= {
    getShippingInfo: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShippingService,
        {
          provide: ShippingService,
          useValue: mockShipment
        }
      ],
    }).compile();

    shippingService = module.get<ShippingService>(ShippingService);
  });

  it('should be defined', () => {
    expect(shippingService).toBeDefined();
  });
  it('should get shipment info', async () => {
    const spyShippingService = jest
    .spyOn(shippingService, 'getShippingInfo')
    await shippingService.getShippingInfo('dkden8mlfwscsblgmvdxfr30duaoviht','3');
    expect(spyShippingService).toHaveBeenCalled;
  });
});
