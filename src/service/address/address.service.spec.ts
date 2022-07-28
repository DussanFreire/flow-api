import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressesFlowDto } from 'src/dto/dto_flow/me/address-service/user_addresses.flow.dto';
import { AddressDeleteMagentoDto } from 'src/dto/dto_magento/address/address_delete.magento.dto';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/me/user_address.magento.dto';
import { UserInfoMagento } from 'src/dto/dto_magento/me/user_info.magento.dto';
import { Repository } from 'typeorm';
import { BillingAddressService } from '../billing_address/billing_address.service';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let addressservice: AddressService;
  let billingAddressService: BillingAddressService;
  const mockBillingAddressService = {
    setShippingBillingAddress: jest.fn(),
  }
  const mockAddressService = {
    getUserAddressesInBolivia: jest.fn(),
    addNewAddress: jest.fn(),
    getUserInfoWithAddressesInMagentoFormat: jest.fn(),
    deleteAddressById: jest.fn(),
    updateAddress: jest.fn(),
  }
  const responseDeleteAddress= {
    response: true,
  }
  const requetsDeleteAddress={
    tokenCustomer: 'bdmwzqbjmdf48h1dxabgo7by8ogos9h0',
    addressId: '4923'
  }
  const address= [
    {
      id: 43,
      name: 'Juan Pablo',
      region: 'Nuñez',
      city: 'Santa Cruz',
      telephone: '77391892',
      country: 'BO',
      street: ['5to Anillo Santos Dumont', 'Av San Pablo'],
      lat: '10',
      lng: '10'
    },
  ];
  const userAddress= {
    id: 13,
    region: {
        region_code: "SC",
        region: "Santa Cruz",
        region_id: 0
    },
    country_id: "BO",
    street: ['string', 'string'],
    postcode: 78701,
    telephone: "1111122222",
    city: "Santa Cruz de la Sierra",
    firstname: "Juan Pablo",
    lastname: "Nuñez",
    default_shipping: true,
    default_billing: true,
    custom_attributes: [
        {
            attribute_code: "lat",
            value: "19"
        },
        {
            attribute_code: "lng",
            value: "19"
        }
    ]
  };
  const userAddresscustomer= {
    id: 13,
    region: {
        region_code: "SC",
        region: "Santa Cruz",
        region_id: 0
    },
    country_id: "BO",
    street: ['string', 'string'],
    postcode: "78701",
    telephone: "1111122222",
    city: "Santa Cruz de la Sierra",
    email: 'jp2409@gmail.com',
    firstname: "Juan Pablo",
    lastname: "Nuñez",
    website_id: 1,
    default_shipping: true,
    default_billing: true,
    custom_attributes: [
        {
            attribute_code: "lat",
            value: "19"
        },
        {
            attribute_code: "lng",
            value: "19"
        }
    ],
    addresses: [
      userAddress
    ]
    
  }
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
  const userInfoAddressMagento = {
    customer:{
        email: 'jpnm@gmail.com',
        firstname: 'Juan Pablo',
        lastname: 'Nuñez',
        website_id: 1,
        addresses: [{addressCustomer}]
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      AddressService,
      BillingAddressService,
      {
        provide: AddressService,
        useValue: mockAddressService,},
      {
        provide: BillingAddressService,
        useValue: mockBillingAddressService,
      },
    ],
    }).compile();

    addressservice = module.get<AddressService>(AddressService);
    billingAddressService = module.get<BillingAddressService>(BillingAddressService);
  });

  it('Address Service should be defined', () => {
    expect(addressservice).toBeDefined();
  });
  it('should get addresses', async () => {
    const spyAddressService = jest
    .spyOn(addressservice, 'getUserAddressesInBolivia')
    .mockResolvedValue(address as unknown as UserAddressesFlowDto);
    await addressservice.getUserAddressesInBolivia('123');
    expect(spyAddressService).toHaveBeenCalled;
  });
  it('should add new address', async () => {
    const spyAddressService = jest
    .spyOn(addressservice, 'addNewAddress')
    .mockResolvedValue(userAddresscustomer as unknown as UserAddressMagentoDto);
    await addressservice.addNewAddress('123', userAddresscustomer);
    expect(spyAddressService).toHaveBeenCalled;
  });
  it('should update an address', async () => {
    const spyAddressService = jest
    .spyOn(addressservice, 'updateAddress')
    .mockResolvedValue(addressCustomer as UserAddressMagentoDto);
    await addressservice.updateAddress(requetsDeleteAddress.tokenCustomer, addressCustomer, '78701');
    expect(spyAddressService).toHaveBeenCalled;
  });
  it('should delete an address', async () => {
    const spyAddressService = jest
    .spyOn(addressservice, 'deleteAddressById')
    .mockResolvedValue(responseDeleteAddress.response as unknown as AddressDeleteMagentoDto);
    await addressservice.deleteAddressById(requetsDeleteAddress.tokenCustomer, requetsDeleteAddress.addressId);
    expect(spyAddressService).toHaveBeenCalled;
  });
  it('should delete an address', async () => {
    const spyAddressService = jest
    .spyOn(addressservice, 'getUserInfoWithAddressesInMagentoFormat')
    .mockResolvedValue(userInfoAddressMagento as unknown as UserInfoMagento);
    await addressservice.getUserInfoWithAddressesInMagentoFormat(requetsDeleteAddress.tokenCustomer);
    expect(spyAddressService).toHaveBeenCalled;
  });
});
