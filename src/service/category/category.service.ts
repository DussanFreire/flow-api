import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { CategoryDtoMagento } from 'src/dto/dto_magento/category.magento.dto';
import { CategoryListMagentoDto } from 'src/dto/dto_magento/category_list.magento.dto';
import { ConnectionUrl } from 'src/enum/connection.enum';
@Injectable()
export class CategoryService {
  constructor(private httpService: HttpService) {}

  private filterByActiveCateogries(categories: Array<CategoryDtoMagento>) {
    const categoriesActive = categories.filter((c) => c.is_active);
    if (categoriesActive.length > 0) {
      categoriesActive.map((c) => {
        if (c.name === 'Café&#44; Té y Bebidas') {
          c.name = 'Café, Té y Bebidas';
        }
        c.children_data = this.filterByActiveCateogries(c.children_data);
      });
    }
    return categoriesActive;
  }

  public async getCategories() {
    const categories = await this.httpService
      .get<CategoryListMagentoDto>(ConnectionUrl.URL + '/categories')
      .pipe(
        map((response: any) => {
          const res = new CategoryListMagentoDto(response.data.children_data);
          return res;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    const filteredCategories = this.filterByActiveCateogries(
      categories.categoryList.filter((c) => c.name != 'Lo Nuevo'),
    );

    return filteredCategories;
  }
}
