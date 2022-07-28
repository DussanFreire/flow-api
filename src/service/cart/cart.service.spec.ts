import { Test, TestingModule } from '@nestjs/testing';
import { CartFlowDto } from 'src/dto/dto_flow/cart/cart-service/cart.flow.dto';
import { CartFlowProductDto } from 'src/dto/dto_flow/cart/cart-service/cart_product.flow.dto';
import { CartTotalFlowDto } from 'src/dto/dto_flow/cart/cart-service/cart_totals.flow.dto';
import { NewCartMagentoDto } from 'src/dto/dto_magento/cart/cart-service/new_cart.magento.dto';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cartService: CartService;
  const mockCartService={
    createNewCart: jest.fn(),
    getCart: jest.fn(),
    deleteProductFromCart: jest.fn(),
    addToProductToCart: jest.fn(),
    updateQuantityProduct: jest.fn(),
    getCartTotals: jest.fn(),
    getItems:jest.fn(),
  }
  const cart={
    customerId: 'ajwra5ithuaehx2x5hsh013hn79xzem4',
    item_id: '5262',
    cart_id: '123',
    cartProductId: '5262',
    patchProduct: {
      qty: 1,
      quote_id: '4339'
    }
  }
  const item= {
    sku: "7771257730189",
    qty: 2,
    quote_id: '4339'
  }
  const cartItemResponse= {
    item_id: 5262,
    sku: "7771257730189",
    qty: 2,
    quote_id: '4339',
    price: 19.5
  }
  const cartinfo= {
      cart: {
          id: 4339,
          items: [
              {
                  item_id: 5262,
                  sku: "7771257730189",
                  qty: 2,
                  name: "Cruji Pap Pimentón 250gr",
                  price: 19.5,
                  product_type: "simple",
                  quote_id: "4339",
                  image_url: "https://staging-vdt2zeq-emnitew26jfx2.us-5.magentosite.cloud/media/catalog/product/7/7/7771257730189.jpg"
              }
          ],
          items_count: 1,
          items_qty: 2,
          grand_total: 39
      }
  }
  const cartTotals= {
    cart_totals: {
      grand_total: 19.5,
      items_qty: 2
    }
  }
  const getItems = cartinfo.cart.items;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
  });
  it('should create a new cart', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'createNewCart')
    .mockResolvedValue(cart as unknown as NewCartMagentoDto);
    await cartService.createNewCart(cart.cart_id);
    expect(spyCartService).toHaveBeenCalled;
  });
  it('should get info cart', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'getCart')
    .mockResolvedValue(cartinfo as unknown as CartFlowDto);
    await cartService.getCart(cart.cart_id);
    expect(spyCartService).toHaveBeenCalled;
  });
  it('should delete an item from a cart', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'deleteProductFromCart')
    .mockResolvedValue(cartinfo as unknown as CartFlowDto);
    await cartService.deleteProductFromCart(cart.cart_id, cart.cartProductId);
    expect(spyCartService).toHaveBeenCalled;
  });
  it('should add an item to cart', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'addToProductToCart')
    .mockResolvedValue(cartItemResponse as unknown as CartFlowProductDto);
    await cartService.addToProductToCart(cart.cart_id, item);
    expect(spyCartService).toHaveBeenCalled;
  });
  it('should update quantity of an item to cart', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'updateQuantityProduct')
    .mockResolvedValue(cartItemResponse as unknown as CartFlowProductDto);
    await cartService.updateQuantityProduct(cart.customerId, cart.item_id, cart.patchProduct);
    expect(spyCartService).toHaveBeenCalled;
  });
  it('should get cart totals', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'getCartTotals')
    .mockResolvedValue(cartTotals as unknown as CartTotalFlowDto);
    await cartService.getCartTotals(cart.customerId);
    expect(spyCartService).toHaveBeenCalled;
  });
  it('should get cart totals', async () => {
    const spyCartService = jest
    .spyOn(cartService, 'getItems')
    .mockResolvedValue(getItems);
    await cartService.getItems(getItems);
    expect(spyCartService).toHaveBeenCalled;
  });
});
