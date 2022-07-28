import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  const mockOrder= {
    generateOrder:jest.fn(),
    getUserOrders:jest.fn(),
  }
  const generateOrder= {
    payment_method:  {
      method: 'card'
    },
    billing_address: {
      region_code: '34',
      region: 'Bolivia',
      region_id: 9,
      country_id: 'BO',
      street: ['',''],
      postcode: '10',
      city: 'Santa Cruz',
      firstname: 'Juan Pablo',
      lastname: 'Nuñez',
      email: 'juan@gmail.com',
      telephone: '7712391',
      default_shipping: true,
      custom_attributes: [
        {
          attribute_code: 'lat',
          value: '10'
        },
        {
          attribute_code: 'lat',
          value: '10'
        }
      ]
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderService,
          useValue: mockOrder,
        }
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });
  it('should generate order', async () => {
    const spyOrderService = jest
    .spyOn(orderService, 'generateOrder')
    await orderService.generateOrder('dkden8mlfwscsblgmvdxfr30duaoviht', generateOrder);
    expect(spyOrderService).toHaveBeenCalled;
  });
  it('should get customer orders', async () => {
    const spyOrderService = jest
    .spyOn(orderService, 'getUserOrders')
    await orderService.getUserOrders('dkden8mlfwscsblgmvdxfr30duaoviht');
    expect(spyOrderService).toHaveBeenCalled;
  });
});
