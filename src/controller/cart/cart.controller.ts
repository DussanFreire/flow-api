import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthUser } from '../../decorator/user.decorator';
import { CartService } from '../../service/cart/cart.service';
import { CartMagentoDto } from '../../dto/dto_magento/cart/cart-service/cart_product.magento.dto';
import { CartPatchProductFlowDto } from '../../dto/dto_flow/cart/cart_patch_product.flow.dto';
import { ShippingService } from '../../service/shipping/shipping.service';
import { OrderFlowDto } from '../../dto/dto_flow/cart/order.flow.dto';
import { RefundService } from '../../service/refund/refund.service';
import { PaymentMethodsService } from '../../service/payment_methods/payment_methods.service';
import { CartOrderFlowService } from '../../service/cart_order_flow/cart_order_flow.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@ApiTags('Cart')
@ApiBearerAuth()
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
  @ApiOperation({summary: 'Get user cart.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getCart(@AuthUser() user: any) {
    const cart = await this.cartService.getCart(user);
    return cart;
  }

  @Get('/totals')
  @ApiOperation({summary: 'Get user cart totals.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getCartTotal(@AuthUser() user: any) {
    const cart = await this.cartService.getCartTotals(user);
    return cart;
  }

  @Post()
  @ApiOperation({summary: 'Create a cart for customer.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async postCart(@AuthUser() user: any) {
    return await this.cartService.createNewCart(user);
  }

  @Post('/item')
  @ApiOperation({summary: 'Add item to cart.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: CartMagentoDto})
  async postCartItem(
    @AuthUser() user: any,
    @Body() cartProduct: CartMagentoDto,
  ) {
    return await this.cartService.addToProductToCart(user, cartProduct);
  }

  @Patch('/item/:id')
  @ApiOperation({summary: 'Update cart.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Item not found.'})
  @ApiBody({type: CartPatchProductFlowDto})
  async patchCart(
    @AuthUser() user: any,
    @Body() patchProduct: CartPatchProductFlowDto,
    @Param('id') id: string,
  ) {
    return await this.cartService.updateQuantityProduct(user, id, patchProduct);
  }

  @Delete('/item/:id')
  @ApiOperation({summary: 'Delete product from cart.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async deleteProductFromCart(@AuthUser() user: any, @Param('id') id: string) {
    return await this.cartService.deleteProductFromCart(user, id);
  }

  @Get('/:id/shipping-methods')
  @ApiOperation({summary: 'Get shipping info.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getCartShippingMethods(@AuthUser() user: any, @Param('id') id: string) {
    const cart = await this.shippingService.getShippingInfo(user, id);

    return cart;
  }

  @Get('/payment-methods')
  @ApiOperation({summary: 'Get payment methods.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getPaymentMethodsInfo(@AuthUser() user: any) {
    return await this.paymentMethodsService.getPaymentMethodsInfo(user);
  }

  @Post('/order/:orderId/refund')
  @ApiOperation({summary: 'Generate refund.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async generateRefund(@Param('orderId') orderId: string) {
    return this.refundService.generateRefund(orderId);
  }

  @Post('/order')
  @ApiOperation({summary: 'Create Order.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: OrderFlowDto})
  async createOrder(@AuthUser() user: any, @Body() orderData: OrderFlowDto) {
    return this.cartOrderFlowService.createOrder(orderData, user);
  }
}
