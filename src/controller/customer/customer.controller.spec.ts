import { Test, TestingModule } from '@nestjs/testing';
import { CustomerFlowDto } from 'src/dto/dto_flow/customer/customer.flow.dto';
import { CustomerService } from '../../service/customer/customer.service';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;
  const mockCustomerService= {
    createCustomer:jest.fn(),
    getInfo: jest.fn(),
  }
  const customerData= {
    "email": "jp2409@gmail.com",
    "firstName": "Juan Pablo",
    "lastName": "nuñez",
    "dob": "24-09-1999",
    "password": "test123!"
  }
  const userId= 'dkden8mlfwscsblgmvdxfr30duaoviht';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers:[CustomerService,{provide:CustomerService,useValue:mockCustomerService}]
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  describe('customer', () =>{
    it('should create a customer', () =>{
      customerController.createCustomer(customerData as CustomerFlowDto);
      expect(customerService.createCustomer).toHaveBeenCalled();
    });
    it('should get info', () =>{
      customerController.getInfo(userId);
      expect(customerService.getInfo).toHaveBeenCalled();
    });
  });
});
