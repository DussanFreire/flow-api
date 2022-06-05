import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/decorator/user.decorator';
import { CartService } from 'src/service/cart/cart.service';
import { Strategy } from 'passport-jwt';
import { CartMagentoDto } from 'src/dto/dto_magento/cart_product.magento.dto';
import { CartPatchProductFlowDto } from 'src/dto/dto_flow/cart_patch_product.flow.dto';
import { ShippingService } from 'src/service/shipping/shipping.service';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private shippingService: ShippingService,
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
    return await this.cartService.addCart(user);
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
  async getPaymentMethodsInfo(@AuthUser() user: any){
    return await this.shippingService.getPaymentMethodsInfo(user);
  }

}
