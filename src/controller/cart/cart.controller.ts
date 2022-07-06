import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
import { CartService } from 'src/service/cart/cart.service';
import { CartMagentoDto } from 'src/dto/dto_magento/cart_product.magento.dto';
import { CartPatchProductFlowDto } from 'src/dto/dto_flow/cart_patch_product.flow.dto';
import { ShippingService } from 'src/service/shipping/shipping.service';
import { CartShippingInformationDto } from 'src/dto/dto_magento/cart.shipping_information.magento.dto';
import { PaymentInformationDto } from 'src/dto/dto_magento/cart.payment_info.dto';
import { InvoiceDto } from 'src/dto/dto_magento/cart.invoice.magento.dto';
import { OrderFlowDto } from 'src/dto/dto_flow/order.flow.dto';
import { InvoiceService } from 'src/service/invoice/invoice.service';
import { RefundService } from 'src/service/refund/refund.service';
import { PaymentMethodsService } from 'src/service/payment_methods/payment_methods.service';
import { BillingAddressService } from 'src/service/billing_address/billing_address.service';
import { OrderService } from 'src/service/order/order.service';
import { ShipmentService } from 'src/service/shipment/shipment.service';
import { CartOrderFlowService } from 'src/service/cart_order_flow/cart_order_flow.service';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private shippingService: ShippingService,
    private refundService: RefundService,
    private paymentMethodsService: PaymentMethodsService,
    private cartOrderFlowService: CartOrderFlowService,
  ) {}

  @Get()
  async getCart(@AuthUser() user: any) {
    const cart = await this.cartService.getCart(user);

    return cart;
  }

  @Get('/totals')
  async getCartTotal(@AuthUser() user: any) {
    const cart = await this.cartService.getCartTotals(user);
    return cart;
  }

  @Post()
  async postCart(@AuthUser() user: any) {
    return await this.cartService.createNewCart(user);
  }

  @Post('/item')
  async postCartItem(
    @AuthUser() user: any,
    @Body() cartProduct: CartMagentoDto,
  ) {
    return await this.cartService.addToProductToCart(user, cartProduct);
  }

  @Patch('/item/:id')
  async patchCart(
    @AuthUser() user: any,
    @Body() patchProduct: CartPatchProductFlowDto,
    @Param('id') id: string,
  ) {
    return await this.cartService.updateQuantityProduct(user, id, patchProduct);
  }

  @Delete('/item/:id')
  async deleteProductFromCart(@AuthUser() user: any, @Param('id') id: string) {
    return await this.cartService.deleteProductFromCart(user, id);
  }

  @Get('/:id/shipping-methods')
  async getCartShippingMethods(@AuthUser() user: any, @Param('id') id: string) {
    const cart = await this.shippingService.getShippingInfo(user, id);

    return cart;
  }
  @Get('/payment-methods')
  async getPaymentMethodsInfo(@AuthUser() user: any) {
    return await this.paymentMethodsService.getPaymentMethodsInfo(user);
  }

  @Post('/order/:orderId/refund')
  async generateRefund(@Param('orderId') orderId: string) {
    return this.refundService.generateRefund(orderId);
  }

  @Post('/order')
  async createOrder(@AuthUser() user: any, @Body() orderData: OrderFlowDto) {
    return this.cartOrderFlowService.createOrder(orderData, user);
  }
}
