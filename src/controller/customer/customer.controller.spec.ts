import { Test, TestingModule } from '@nestjs/testing';
import { ResetPassword } from '../../dto/dto_magento/customer/reset.password.magento.dto';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';
import { ForgotPassword } from '../../dto/dto_magento/customer/forgot.password.magento.dto';
import { CustomerService } from '../../service/customer/customer.service';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;
  const mockCustomerService= {
    createCustomer:jest.fn(),
    getInfo: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  }
  const customerData= {
    "email": "jp2409@gmail.com",
    "firstName": "Juan Pablo",
    "lastName": "nuñez",
    "dob": "24-09-1999",
    "password": "test123!"
  }
  const forgotPassword= {
      "email": "juanpanm2409@gmail.com",
      "template": "email_reset"
  }
  const resetPassword = {
    "email": "juanpanm2409@gmail.com",
    "resetToken": "ypoPzCldCO2gwbDirinPN9O5C4FUjUrU",
    "newPassword":"Password2!"
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
  describe('password', () =>{
    it('should reset password', () =>{
      customerController.forgotPassword(forgotPassword as ForgotPassword);
      expect(customerService.forgotPassword).toHaveBeenCalled();
    });
    it('should change password', () =>{
      customerController.resetPassword(resetPassword as ResetPassword);
      expect(customerService.resetPassword).toHaveBeenCalled();
    });
  });
});
