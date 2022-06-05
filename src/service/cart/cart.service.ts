import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map, of } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { CartMagentoDto } from 'src/dto/dto_magento/cart_product.magento.dto';
import { CartFlowProductDto } from 'src/dto/dto_flow/cart_product.flow.dto';
import { CartFlowDto } from 'src/dto/dto_flow/cart.flow.dto';
import { CartPatchProductFlowDto } from 'src/dto/dto_flow/cart_patch_product.flow.dto';
import { ConnectionUrl, FilterProducts } from 'src/enum/connection.enum';
import { CartItemDtoFlow } from 'src/dto/dto_flow/cart_item.flow.dto';
import { CartTotalFlowDto } from 'src/dto/dto_flow/cart_totals.flow.dto';

@Injectable()
export class CartService {
  constructor(private httpService: HttpService) {}

  public async addCart(costumerId: string) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };

    const url = ConnectionUrl.URL + '/carts/mine';

    const cart = await this.httpService
      .post(url, null, requestConfig)
      .pipe(
        map((response: any) => {
          return { cartId: response.data };
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return cart;
  }

  async getItems(itemsList: CartItemDtoFlow[]): Promise<CartItemDtoFlow[]> {
    let items: any[];
    let promiseItems: Promise<any>[] = itemsList.map(
      (el: CartItemDtoFlow): Promise<any> =>
        this.httpService
          .get(ConnectionUrl.URL + `/products/${el['sku']}`)
          .pipe(
            map((item) => {
              let imageUrl: string = '';
              imageUrl =
                item.data['media_gallery_entries'][0] != undefined
                  ? FilterProducts.IMAGE_URL +
                    item.data['media_gallery_entries'][0].file
                  : FilterProducts.IMAGE_URL;

              el.image_url = imageUrl;

              return el;
            }),
            catchError((error) => of(error)),
          )
          .toPromise(),
    );

    items = await Promise.all(promiseItems);

    return items;
  }
  public async getCart(costumerId: string): Promise<CartFlowDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const cartPromise = this.httpService
      .get<CartFlowDto>(ConnectionUrl.URL + '/carts/mine', requestConfig)
      .pipe(
        map(async (response: any) => {
          const cartDto: CartFlowDto = new CartFlowDto();
          const cartItems = await this.getItems(response.data.items);
          const cartObj = {
            id: response.data.id,
            items: cartItems,
            items_count: response.data.items_count,
            items_qty: response.data.items_qty,
            grand_total: 0,
          };
          cartDto.cart = cartObj;
          return cartDto;
        }),
        catchError(async (e) => {
          if (
            e.response.status === 404 &&
            (e.data['message'] as string).startsWith('No such entity with')
          ) {
            await this.addCart(costumerId);
            await this.getCart(costumerId);
          } else {
            throw new HttpException(e.response.data, e.response.status);
          }
        }),
      )
      .toPromise();
    const promises = [cartPromise, this.getCartTotals(costumerId)];
    const [cart, cart_totals] = await Promise.all(promises);
    (cart as CartFlowDto).cart.grand_total = (
      cart_totals as CartTotalFlowDto
    ).cart_totals.grand_total;
    return cart as CartFlowDto;
  }

  public async deleteProductFromCart(
    costumerId: string,
    cartProductId: string,
  ) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + `/carts/mine/items/${cartProductId}`;

    const cart = await this.httpService
      .delete<any>(url, requestConfig)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return cart;
  }

  public async addToProductToCart(
    costumerId: string,
    cartProduct: CartMagentoDto,
  ) {
    const product = { cartItem: { ...cartProduct } };
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + '/carts/mine/items';

    try {
      const cart = await this.httpService
        .post(url, product, requestConfig)
        .pipe(
          map((response: any) => {
            const product: CartFlowProductDto = new CartFlowProductDto();
            product.price = response.data.price;
            product.item_id = response.data.item_id;
            product.sku = response.data.sku;
            product.qty = response.data.qty;
            product.quote_id = response.data.quote_id;
            return product;
          }),
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          }),
        )
        .toPromise();
      return cart;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async updateQuantityProduct(
    costumerId: string,
    itemId: string,
    patchProduct: CartPatchProductFlowDto,
  ) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + `/carts/mine/items/${itemId}`;
    const cart = await this.httpService
      .put(url, { cartItem: patchProduct }, requestConfig)
      .pipe(
        map((response: any) => {
          const product: CartFlowProductDto = new CartFlowProductDto();
          product.price = response.data.price;
          product.item_id = response.data.item_id;
          product.sku = response.data.sku;
          product.qty = response.data.qty;
          product.quote_id = response.data.quote_id;
          return product;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return cart;
  }

  public async getCartTotals(costumerId: string): Promise<CartTotalFlowDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };

    const cart = await this.httpService
      .get<CartTotalFlowDto>(
        ConnectionUrl.URL + '/carts/mine/totals',
        requestConfig,
      )
      .pipe(
        map(async (response: any) => {
          const cartDto: CartTotalFlowDto = new CartTotalFlowDto();
          const cartObj = {
            grand_total: response.data.grand_total,
            items_qty: response.data.items_qty,
          };
          cartDto.cart_totals = cartObj;
          return cartDto;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return cart;
  }
}
