export class CartShippingFlowDto {
  methods: {
    carrier_code: string;
    method_code: string;
    carrier_title: string;
    method_title: string;
    amount: number;
    base_amount: number;
    available: true;
    error_message: boolean;
    price_excl_tax: number;
    price_incl_tax: number;
  }[];
}
