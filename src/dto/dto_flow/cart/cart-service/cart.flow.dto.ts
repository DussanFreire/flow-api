import { CartItemDtoFlow } from './cart_item.flow.dto';

export class CartFlowDto {
  cart: {
    id: number;
    items_count: number;
    items_qty: number;
    items: CartItemDtoFlow[];
    grand_total: number;
  };
}
