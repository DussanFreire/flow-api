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
        c.children_data = this.filterByActiveCateogries(c.children_data);
      });
    }
    return categoriesActive;
  }
  private CategoriesOrder: string[] = [
    'Electrónicos',
    'Alimentos y Bebidas',
    'Belleza y Cuidado Personal',
    'Bebé',
    'Bioseguridad',
    'Hogar y Cocina',
    'Herramientas',
    'Libros',
    'Mascotas',
    'Meterial de Escritorio',
    'Moda',
    'Juguetes',
    'Lo Nuevo',
    'Precios de Locura',
    'Gift Cards',
  ];

  private sortCategoties(
    categories: CategoryDtoMagento[],
  ): CategoryDtoMagento[] {
    const listSorted: CategoryListMagentoDto = new CategoryListMagentoDto([]);
    for (let index = 0; index < this.CategoriesOrder.length; index++) {
      const category = categories.filter(
        (c) => c.name === this.CategoriesOrder[index],
      );
      if (category.length > 0) listSorted.categoryList.push(category[0]);
    }
    return listSorted.categoryList;
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
      categories.categoryList,
    );

    const sortedCategories = this.sortCategoties(filteredCategories);
    return JSON.stringify(sortedCategories, [
      'id',
      'name',
      'is_active',
      'children_data',
    ]);
  }
}
