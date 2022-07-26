import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from 'src/service/order/order.service';
import { CartService } from '../../service/cart/cart.service';
import { CartOrderFlowService } from '../../service/cart_order_flow/cart_order_flow.service';
import { PaymentMethodsService } from '../../service/payment_methods/payment_methods.service';
import { RefundService } from '../../service/refund/refund.service';
import { ShippingService } from '../../service/shipping/shipping.service';
import { CartController } from './cart.controller';

describe('CartController', () => {
  let cartController: CartController;
  let cartService: CartService;
  let shippingService: ShippingService;
  let paymentMethodsService: PaymentMethodsService;
  let refundService: RefundService;
  let cartOrderService: CartOrderFlowService;
  const userId= 'dkden8mlfwscsblgmvdxfr30duaoviht';
  const cartProduct = {
    sku: '4923710',
    qty: 2,
    quote_id: '124',
  }
  const patchCart = {
    qty: 2,
    quote_id: '124'
  }
  const productId = '234912';
  const addressId= '84';
  const mockShipping = {
    getShippingInfo: jest.fn(),
  }
  const orderData= {
    shipping_carrier_code: '2314',
    shipping_method_code: '5421',
    payment_method: 'cash',
    address_id: '32'
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers:[
        CartService,
        ShippingService,
        RefundService,
        PaymentMethodsService,
        CartOrderFlowService,
        {
          provide: CartService,
          useFactory: () => ({
            createNewCart: jest.fn(),
            getCart: jest.fn(),
            deleteProductFromCart: jest.fn(),
            addToProductToCart: jest.fn(),
            updateQuantityProduct: jest.fn(),
            getCartTotals: jest.fn(),
          })
        },
        {
          provide: ShippingService,
          useValue: mockShipping,
        },
        {
          provide: RefundService,
          useFactory: () => ({
           generateRefund: jest.fn(),
          })
        },
        {
          provide: PaymentMethodsService,
          useFactory: () => ({
            getPaymentMethodsInfo: jest.fn(),
          })
        },
        {
          provide: CartOrderFlowService,
          useFactory: () => ({
            createOrder: jest.fn(),
          })
        },

      ]
    }).compile();

    cartController = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
    shippingService = module.get<ShippingService>(ShippingService);
    paymentMethodsService = module.get<PaymentMethodsService>(PaymentMethodsService);
    refundService = module.get<RefundService>(RefundService);
    cartOrderService = module.get<CartOrderFlowService>(CartOrderFlowService);
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
  });

  describe('cart', () => {
    it('should get cart', async () => {
      cartController.getCart(userId);
      expect(cartService.getCart).toHaveBeenCalled();
    });
    it('should get cart totals', async () => {
      cartController.getCartTotal(userId);
      expect(cartService.getCartTotals).toHaveBeenCalled();
    });
    it('should create a cart', async () => {
      cartController.postCart(userId);
      expect(cartService.createNewCart).toHaveBeenCalled();
    });
    it('should add item to cart', async () => {
      cartController.postCartItem(userId,cartProduct);
      expect(cartService.addToProductToCart).toHaveBeenCalled();
    });
    it('should update cart', async () => {
      cartController.patchCart(userId,patchCart,productId);
      expect(cartService.updateQuantityProduct).toHaveBeenCalled();
    });
    it('should delete product from cart', async () => {
      cartController.deleteProductFromCart(userId,productId);
      expect(cartService.deleteProductFromCart).toHaveBeenCalled();
    });
  });

  describe('shipping-methods', () => {
    it('should get shipping info', async () => {
      cartController.getCartShippingMethods(userId,addressId);
      expect(shippingService.getShippingInfo).toHaveBeenCalled();
    });
  });

  describe('payment-methods', () => {
    it('should get payment methods', async () => {
      cartController.getPaymentMethodsInfo(userId);
      expect(paymentMethodsService.getPaymentMethodsInfo).toHaveBeenCalled();
    });
  });

  describe('refund', () => {
    it('should generate refund', async () => {
      cartController.generateRefund(userId);
      expect(refundService.generateRefund).toHaveBeenCalled();
    });
  });

  describe('order', () => {
    it('should generate refund', async () => {
      cartController.createOrder(userId, orderData);
      expect(cartOrderService.createOrder).toHaveBeenCalled();
    });
  });

});
