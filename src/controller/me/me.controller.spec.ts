import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../../service/address/address.service';
import { MeService } from '../../service/me/me.service';
import { MeController } from './me.controller';

describe('MeController', () => {
  let meController: MeController;
  let meService: MeService;
  let addressService: AddressService;
  const mockMeService={
    getLoginInfo:jest.fn(),
  }
  const mockAddressService = {
    getUserAddressesInBolivia: jest.fn(),
    addNewAddress: jest.fn(),
    getUserInfoWithAddressesInMagentoFormat: jest.fn(),
  }
  const userId= 'dkden8mlfwscsblgmvdxfr30duaoviht';
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
        {
          provide: MeService,
          useValue: mockMeService
        },
        {
          provide: AddressService,
          useValue: mockAddressService
        }
      ]
    }).compile();

    meController = module.get<MeController>(MeController);
    meService = module.get<MeService>(MeService);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(meController).toBeDefined();
  });
  describe('me', () =>{
    it('should get customer info', () =>{
      meController.getUserInfo(userId);
      expect(meService.getLoginInfo).toHaveBeenCalled();
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
  });
});
