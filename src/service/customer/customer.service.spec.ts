import { Test, TestingModule } from '@nestjs/testing';
import { CustomerFlowDto } from 'src/dto/dto_flow/customer/customer.flow.dto';
import { CustomerService } from './customer.service';

describe('RegisterService', () => {
  let customerservice: CustomerService;
  const mockCustomerService= {
    createCustomer:jest.fn(),
    getInfo: jest.fn(),
  }
  const customer= {
    email: 'juanpan24@gmail.com',
    firstName: 'Juan Pablo',
    lastName: 'Nuñez',
    dob: '24-09-1999',
    password: 'Password!',
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        }
      ],
    }).compile();

    customerservice = module.get<CustomerService>(CustomerService);
  });
  it('should be defined', () => {
    expect(customerservice).toBeDefined();
  });
  it('should create a customer', async () => {
    const spyCustomerService = jest
    .spyOn(customerservice, 'createCustomer')
    await customerservice.createCustomer(customer as CustomerFlowDto);
    expect(spyCustomerService).toHaveBeenCalled;
  });
  it('should get info of a customer', async () => {
    const spyCustomerService = jest
    .spyOn(customerservice, 'getInfo')
    await customerservice.getInfo('dkden8mlfwscsblgmvdxfr30duaoviht');
    expect(spyCustomerService).toHaveBeenCalled;
  });
});
