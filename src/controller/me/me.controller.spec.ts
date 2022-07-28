import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../service/order/order.service';
import { AddressService } from '../../service/address/address.service';
import { MeService } from '../../service/me/me.service';
import { MeController } from './me.controller';

describe('MeController', () => {
  let meController: MeController;
  let meService: MeService;
  let addressService: AddressService;
  let orderService: OrderService;

  const mockMeService={
    getLoginInfo:jest.fn(),
    getUserId:jest.fn(),
    updateUserInfo:jest.fn(),
  }
  const mockAddressService = {
    getUserAddressesInBolivia: jest.fn(),
    addNewAddress: jest.fn(),
    getUserInfoWithAddressesInMagentoFormat: jest.fn(),
    deleteAddressById: jest.fn(),
    updateAddress: jest.fn(),
  }
  const mockOrder= {
    generateOrder:jest.fn(),
    getUserOrders:jest.fn(),
  }
  const updateInfoUser = {
    email: 'jpnm@gmail.com',
    firstname: 'Juan Pablo',
    lastname: 'Nuñez',
    website_id: 1,
    dob: '24-09-1999',
    is_subscribed: true
  }
  const userId= 'dkden8mlfwscsblgmvdxfr30duaoviht';
  const addressId = '8231'
  const addressCustomer= {
    "id": 321,
    "region": {
        "region_code": "SC",
        "region": "Santa Cruz",
        "region_id": 0
    },
    "country_id": "BO",
    "street": [
        "Santos dumont",
        "Av San Pablo"
    ],
    "telephone": "1111122222",
    "postcode": "78701",
    "city": "Santa Cruz de la Sierra",
    "firstname": "Juan prueba de address",
    "lastname": "nunez prueba",
    "default_shipping": true,
    "default_billing": true,
    "custom_attributes": [
        {
            "attribute_code": "lat",
            "value": "19"
        },
        {
            "attribute_code": "lng",
            "value": "19"
        }
    ]
}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeController],
      providers:[
        MeService,
        AddressService,
        OrderService,
        {
          provide: MeService,
          useValue: mockMeService
        },
        {
          provide: AddressService,
          useValue: mockAddressService
        },
        {
          provide: OrderService,
          useValue: mockOrder
        }
      ]
    }).compile();

    meController = module.get<MeController>(MeController);
    meService = module.get<MeService>(MeService);
    addressService = module.get<AddressService>(AddressService);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(meController).toBeDefined();
  });
  describe('me', () =>{
    it('should get customer info', () =>{
      meController.getAllUserInfo(userId);
      expect(meService.getLoginInfo).toHaveBeenCalled();
    });
    it('should update customer info', () =>{
      meController.updateUserInfo(userId, updateInfoUser);
      expect(meService.updateUserInfo).toHaveBeenCalled();
    });
  });

  describe('addresses', () => {
    it('should get addresses of a customer', () =>{
      meController.getUserAddressesInBolivia(userId);
      expect(addressService.getUserAddressesInBolivia).toHaveBeenCalled();
    });
    it('should add addresses of a customer', () =>{
      meController.addNewAddres(userId, addressCustomer);
      expect(addressService.addNewAddress).toHaveBeenCalled();
    });
    it('should update an addresses of a customer', () =>{
      meController.updateAddress(userId, addressCustomer, addressId);
      expect(addressService.updateAddress).toHaveBeenCalled();
    });
    it('should delete an addresses of a customer', () =>{
      meController.deleteAddress(userId, addressId);
      expect(addressService.deleteAddressById).toHaveBeenCalled();
    });
  });

  describe('user-info', () => {
    it('should get customer info', () =>{
      meController.getUserInfo(userId);
      expect(meService.getUserId).toHaveBeenCalled();
    });
  });

  describe('orders', () => {
    it('should get addresses of a customer', () =>{
      meController.getUserOrders(userId);
      expect(orderService.getUserOrders).toHaveBeenCalled();
    });
  });
});
