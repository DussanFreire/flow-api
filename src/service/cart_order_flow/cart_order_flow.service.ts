import { HttpException, Injectable } from '@nestjs/common';
import { OrderFlowDto } from 'src/dto/dto_flow/order.flow.dto';
import { OrderSuccessFlowDto } from 'src/dto/dto_flow/order_success.flow.dto';
import { AddressInformationDto } from 'src/dto/dto_magento/address_information.dto';
import { PaymentInformationDto } from 'src/dto/dto_magento/cart.payment_info.dto';
import { CartShippingInformationDto } from 'src/dto/dto_magento/cart.shipping_information.magento.dto';
import { NewCartMagentoDto } from 'src/dto/dto_magento/new_cart.magento.dto';
import { OrderMagentoDto } from 'src/dto/dto_magento/order.magento.dto';
import { ShippingBillingInfoDto } from 'src/dto/dto_magento/shipping_billingInfo.dto';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/user_address.magento.dto';
import { AddressService } from '../address/address.service';
import { BillingAddressService } from '../billing_address/billing_address.service';
import { CartService } from '../cart/cart.service';
import { InvoiceService } from '../invoice/invoice.service';
import { OrderService } from '../order/order.service';
import { ShipmentService } from '../shipment/shipment.service';

@Injectable()
export class CartOrderFlowService {
  constructor(
    private addressService: AddressService,
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private billingAddressService: BillingAddressService,
    private orderService: OrderService,
    private shipmentService: ShipmentService,
  ) {}
  public async createOrder(
    orderData: OrderFlowDto,
    costumerId: any,
  ): Promise<OrderSuccessFlowDto> {
    try {
      const userInfo =
        await this.addressService.getUserInfoWithAddressesInMagentoFormat(
          costumerId,
        );
      const userAddresses = userInfo.customer.addresses;
      const addressSelected: UserAddressMagentoDto = userAddresses.find(
        (a) => a.id + '' === orderData.address_id,
      );
      const billingAddress: ShippingBillingInfoDto =
        this.transformFromToBillinAdress(
          addressSelected,
          userInfo.customer.email,
        );

      const addressInfo: AddressInformationDto = new AddressInformationDto(
        billingAddress,
        orderData.shipping_carrier_code,
        orderData.shipping_method_code,
      );

      const cartShippingInformation: CartShippingInformationDto =
        new CartShippingInformationDto(addressInfo);

      await this.billingAddressService.setShippingBillingAddress(
        costumerId,
        cartShippingInformation,
      );

      const paymentInformation: PaymentInformationDto =
        new PaymentInformationDto(billingAddress, orderData.payment_method);
      const orderInfo: OrderMagentoDto = await this.orderService.generateOrder(
        costumerId,
        paymentInformation,
      );

      const newCartInfo: NewCartMagentoDto =
        await this.cartService.createNewCart(costumerId);

      const result: OrderSuccessFlowDto = new OrderSuccessFlowDto(
        orderData.address_id,
        orderInfo.order_id,
        newCartInfo.cart_id,
      );
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  private transformFromToBillinAdress(
    address: UserAddressMagentoDto,
    email: string,
  ): ShippingBillingInfoDto {
    const shippingAddress: ShippingBillingInfoDto =
      new ShippingBillingInfoDto();

    shippingAddress.city = address.city;
    shippingAddress.country_id = address.country_id;
    shippingAddress.custom_attributes = address.custom_attributes;
    shippingAddress.default_shipping = address.default_shipping;
    shippingAddress.email = email;
    shippingAddress.firstname = address.firstname;
    shippingAddress.lastname = address.lastname;
    shippingAddress.postcode = address.postcode;
    shippingAddress.region = address.region.region;
    shippingAddress.region_id = address.region.region_id;
    shippingAddress.street = address.street;
    shippingAddress.telephone = address.telephone;
    return shippingAddress;
  }
}
