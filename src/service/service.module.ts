import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { TokenService } from './token/token.service';
import { CategoryService } from './category/category.service';
import { PaginateService } from './paginate/paginate.service';
import { CartService } from './cart/cart.service';
import { MeService } from './me/me.service';
import { ShippingService } from './shipping/shipping.service';
import { ProductService } from './product/product.service';
import { AddressService } from './address/address.service';
import { InvoiceService } from './invoice/invoice.service';
import { RefundService } from './refund/refund.service';
import { PaymentMethodsService } from './payment_methods/payment_methods.service';
import { BillingAddressService } from './billing_address/billing_address.service';
import { OrderService } from './order/order.service';
import { ShipmentService } from './shipment/shipment.service';
import { CartOrderFlowService } from './cart_order_flow/cart_order_flow.service';

@Module({
  imports: [HttpModule],
  providers: [
    TokenService,
    CustomerService,
    CategoryService,
    ProductService,
    PaginateService,
    CartService,
    MeService,
    ShippingService,
    AddressService,
    InvoiceService,
    RefundService,
    PaymentMethodsService,
    BillingAddressService,
    OrderService,
    ShipmentService,
    CartOrderFlowService,
  ],
  exports: [
    TokenService,
    CustomerService,
    CategoryService,
    ProductService,
    PaginateService,
    CartService,
    MeService,
    ShippingService,
    AddressService,
    InvoiceService,
    RefundService,
    PaymentMethodsService,
    BillingAddressService,
    OrderService,
    ShipmentService,
    CartOrderFlowService,
  ],
})
export class ServiceModule {}
