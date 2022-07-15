import { Test, TestingModule } from '@nestjs/testing';
import { RefundService } from './refund.service';

describe('RefundService', () => {
  let refundService: RefundService;
  const mockRefund= {
    generateRefund: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundService,
        {
          provide: RefundService,
          useValue: mockRefund,
        }
      ],
    }).compile();

    refundService = module.get<RefundService>(RefundService);
  });

  it('should be defined', () => {
    expect(refundService).toBeDefined();
  });
  it('should generate refund', async () => {
    const spyRefundService = jest
    .spyOn(refundService, 'generateRefund')
    await refundService.generateRefund('312');
    expect(spyRefundService).toHaveBeenCalled;
  });
});
