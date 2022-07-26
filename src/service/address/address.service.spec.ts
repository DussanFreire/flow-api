import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressesFlowDto } from 'src/dto/dto_flow/me/address-service/user_addresses.flow.dto';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/me/user_address.magento.dto';
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
});
