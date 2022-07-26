import { CartItemDtoFlow } from './cart_item.flow.dto';

export class CartTotalFlowDto {
  cart_totals: {
    grand_total: number;
    items_qty: number;
  };
}
