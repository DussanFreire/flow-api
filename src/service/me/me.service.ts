import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CartFlowDto } from 'src/dto/dto_flow/cart.flow.dto';
import { CartService } from '../cart/cart.service';
import { CategoryService } from '../category/category.service';
import { AxiosRequestConfig } from 'axios';
import { ConnectionUrl } from 'src/enum/connection.enum';
import { catchError, filter, map } from 'rxjs';
import { UserInfoFlowDto } from 'src/dto/dto_flow/user_info.flow.dto';

@Injectable()
export class MeService {
  constructor(
    private httpService: HttpService,
    private cartService: CartService,
    private categoryService: CategoryService,
  ) {}
  //   /customers/me
  async getLoginInfo(token: string) {
    const loginPromises = [
      this.categoryService.getCategories(),
      this.cartService.getCart(token),
      this.getUserId(token),
    ];
    const [categories, cart, user_info] = await Promise.all(loginPromises);
    const items_qty = (cart as CartFlowDto).cart.items_qty;
    const cart_id = (cart as CartFlowDto).cart.id;
    const cart_info = {
      cart_id,
      items_qty,
    };

    return { cart_info, user_info, categories };
  }

  private async getUserId(costumerId: string): Promise<UserInfoFlowDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };

    const userInfo = await this.httpService
      .get<UserInfoFlowDto>(ConnectionUrl.URL + '/customers/me', requestConfig)
      .pipe(
        map(async (response: any) => {
          const userDto: UserInfoFlowDto = new UserInfoFlowDto();
          userDto.id_user = response.data.id;
          userDto.email = response.data.email;
          userDto.firstname = response.data.firstname;
          userDto.lastname = response.data.lastname;
          if (response.data['extension_attributes'] != null) {
            userDto.is_subscribed =
              response.data['extension_attributes']['is_subscribed'];
          } else {
            userDto.is_subscribed = false;
          }
          return userDto;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return userInfo;
  }
}
