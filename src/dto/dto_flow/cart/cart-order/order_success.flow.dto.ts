import { IsNotEmpty, IsString } from 'class-validator';

export class OrderSuccessFlowDto {
  @IsNotEmpty()
  address_id: number;
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  cart_id: string;

  constructor(addressId, orderId, cartId) {
    this.address_id = addressId;
    this.order_id = orderId;
    this.cart_id = cartId;
  }
}
