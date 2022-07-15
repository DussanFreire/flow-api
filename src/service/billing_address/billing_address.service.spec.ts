import { Test, TestingModule } from '@nestjs/testing';
import { CartShippingInformationDto } from 'src/dto/dto_magento/cart/cart-order/cart.shipping_information.magento.dto';
import { BillingAddressService } from './billing_address.service';

describe('BillingAddressService', () => {
  let billingService: BillingAddressService;
  const mockBillingAddressService = {
    setShippingBillingAddress: jest.fn(),
  }
  const shippingBilling= {
      addressInformation: {
        shipping_address: {
            region_code: "CBBA",
            region: "Cochabamba",
            region_id: 702,
            country_id: "BO",
            street: [
                "Santos dumont"
            ],
            postcode: "1",
            city: "Cochabamba",
            firstname: "Juan",
            lastname: "Nuñez",
            email: "jpnm@example.com",
            telephone: "77171712",
            same_as_billing: 1,
            default_shipping:true,
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
        },
        billing_address: {
            region_code: "CBBA",
            region: "Cochabamba",
            region_id: 702,
            country_id: "BO",
            street: [
                "Av. America #1234"
            ],
            postcode: "1",
            city: "Cochabamba",
            firstname: "Juan Pablo",
            lastname: "Nuñez",
            email: "jpnm2@example.com",
            telephone: "771717",
            same_as_billing: 1,
            default_shipping:true,
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
            },
        shipping_carrier_code: "tablerate",
        shipping_method_code: "bestway"
      }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingAddressService,
        {
          provide: BillingAddressService,
          useValue: mockBillingAddressService,
        },
      ],
    }).compile();

    billingService = module.get<BillingAddressService>(BillingAddressService);
  });

  it('should be defined', () => {
    expect(billingService).toBeDefined();
  });
  it('should set shipping billing address', async () => {
    const spyBillingService = jest
    .spyOn(billingService, 'setShippingBillingAddress')
    .mockResolvedValue(shippingBilling as unknown as CartShippingInformationDto);
    await billingService.setShippingBillingAddress('123', shippingBilling);
    expect(spyBillingService).toHaveBeenCalled;
  });
});
