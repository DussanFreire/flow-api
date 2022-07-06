import { Test, TestingModule } from '@nestjs/testing';
import { CartOrderFlowService } from './cart_order_flow.service';

describe('CartOrderFlowService', () => {
  let service: CartOrderFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartOrderFlowService],
    }).compile();

    service = module.get<CartOrderFlowService>(CartOrderFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
