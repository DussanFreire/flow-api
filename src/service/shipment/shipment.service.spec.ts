import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentService } from './shipment.service';

describe('ShipmentService', () => {
  let shipmentService: ShipmentService;
  const mockShipment= {
    generateShipment: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentService,
        {
          provide: ShipmentService,
          useValue: mockShipment
        }
      ],
    }).compile();

    shipmentService = module.get<ShipmentService>(ShipmentService);
  });

  it('should be defined', () => {
    expect(shipmentService).toBeDefined();
  });
  it('should generate shipment', async () => {
    const spyShipmentService = jest
    .spyOn(shipmentService, 'generateShipment')
    await shipmentService.generateShipment('312');
    expect(spyShipmentService).toHaveBeenCalled;
  });
});
