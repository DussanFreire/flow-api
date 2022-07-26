import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let invoiceService: InvoiceService;
  const mockInvoice={
    generateInvoce:jest.fn(),
  }
  const invoice={
    capture: true,
    notify: true,
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: InvoiceService,
          useValue:mockInvoice
        }
      ],
    }).compile();

    invoiceService = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(invoiceService).toBeDefined();
  });
  it('should generate an invoice', async () => {
    const spyInvoiceService = jest
    .spyOn(invoiceService, 'generateInvoce')
    await invoiceService.generateInvoce(invoice,'95');
    expect(spyInvoiceService).toHaveBeenCalled;
  });
});
