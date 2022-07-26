import { Test, TestingModule } from '@nestjs/testing';
import { OrderSuccessFlowDto } from 'src/dto/dto_flow/cart/cart-order/order_success.flow.dto';
import { AddressService } from '../address/address.service';
import { BillingAddressService } from '../billing_address/billing_address.service';
import { CartService } from '../cart/cart.service';
import { InvoiceService } from '../invoice/invoice.service';
import { OrderService } from '../order/order.service';
import { ShipmentService } from '../shipment/shipment.service';
import { CartOrderFlowService } from './cart_order_flow.service';

describe('CartOrderFlowService', () => {
  let cartOrderService: CartOrderFlowService;
  let addressService: AddressService;
  let cartService: CartService;
  let invoiceService: InvoiceService;
  let billingAddressService: BillingAddressService;
  let orderService: OrderService;
  let shipmentService: ShipmentService;
  const mockCartOrder= {
    createOrder: jest.fn(),
  }
  const mockBillingAddressService = {
    setShippingBillingAddress: jest.fn(),
  }
  const mockAddressService = {
    getUserAddressesInBolivia: jest.fn(),
    addNewAddress: jest.fn(),
    getUserInfoWithAddressesInMagentoFormat: jest.fn(),
  }
  const mockCartService={
    createNewCart: jest.fn(),
    getCart: jest.fn(),
    deleteProductFromCart: jest.fn(),
    addToProductToCart: jest.fn(),
    updateQuantityProduct: jest.fn(),
    getCartTotals: jest.fn(),
  }
  const mockInvoiceService= {
    generateInvoce:jest.fn(),
  }
  const mockOrderService= {
    generateOrder: jest.fn(),
  }
  const mockShipmentService= {
    generateShipment: jest.fn(),
  }
  const orderToCreate={
    address_id: 3,
    shipment_id: '76',
    invoice_id: '56',
    order_id: '13',
    cart_id: '90',
  }
  const customer= {
    customerId: 'ajwra5ithuaehx2x5hsh013hn79xzem4',
    orderData:{
      shipping_carrier_code: 'string',
      shipping_method_code: 'string',
      payment_method: 'string',
      address_id: 'string',
    }
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartOrderFlowService,
        AddressService,
        BillingAddressService,
        CartService,
        InvoiceService,
        OrderService,
        ShipmentService,
        {
          provide: CartOrderFlowService,
          useValue: mockCartOrder,
        },
        {
          provide: AddressService,
          useValue: mockAddressService,},
        {
          provide: BillingAddressService,
          useValue: mockBillingAddressService,
        },
        {
          provide: CartService,
          useValue: mockCartService,
        },
        {
          provide: InvoiceService,
          useValue: mockInvoiceService,
        },
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
        {
          provide: ShipmentService,
          useValue: mockShipmentService,
        },
      ],
    }).compile();

    cartOrderService = module.get<CartOrderFlowService>(CartOrderFlowService);
  });

  it('should be defined', () => {
    expect(cartOrderService).toBeDefined();
  });
  it('should create a new order', async () => {
    const spyCartOrderflowService = jest
    .spyOn(cartOrderService, 'createOrder')
    .mockResolvedValue(orderToCreate as OrderSuccessFlowDto);
    await cartOrderService.createOrder(customer.orderData, customer.customerId);
    expect(spyCartOrderflowService).toHaveBeenCalled;
  });
});
