import { IsNotEmpty, IsString } from 'class-validator';

export class OrderSuccessFlowDto {
  @IsNotEmpty()
  address_id: number;
  @IsNotEmpty()
  @IsString()
  shipment_id: string;
  @IsNotEmpty()
  @IsString()
  invoice_id: string;
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  cart_id: string;

  constructor(addressId, shipmentId, invoiceId, orderId, cartId) {
    this.address_id = addressId;
    this.shipment_id = shipmentId;
    this.invoice_id = invoiceId;
    this.order_id = orderId;
    this.cart_id = cartId;
  }
}
