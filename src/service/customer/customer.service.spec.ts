import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPassword } from 'src/dto/dto_magento/customer/forgot.password.magento.dto';
import { ResetPassword } from 'src/dto/dto_magento/customer/reset.password.magento.dto';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';
import { CustomerService } from './customer.service';

describe('RegisterService', () => {
  let customerservice: CustomerService;
  const mockCustomerService= {
    createCustomer:jest.fn(),
    getInfo: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  }
  const customer= {
    email: 'juanpan24@gmail.com',
    firstName: 'Juan Pablo',
    lastName: 'Nuñez',
    dob: '24-09-1999',
    password: 'Password!',
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
  it('should reset password', async () => {
    const spyCustomerService = jest
    .spyOn(customerservice, 'forgotPassword')
    await customerservice.forgotPassword(forgotPassword as ForgotPassword);
    expect(spyCustomerService).toHaveBeenCalled;
  });
  it('should change password', async () => {
    const spyCustomerService = jest
    .spyOn(customerservice, 'resetPassword')
    await customerservice.resetPassword(resetPassword as ResetPassword);
    expect(spyCustomerService).toHaveBeenCalled;
  });
});
