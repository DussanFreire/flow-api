import { ConnectionUrl, FilterProducts } from 'src/enum/connection.enum';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger, Res } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { CategoryDtoMagento } from 'src/dto/dto_magento/category.magento.dto';
import { CategoryListMagentoDto } from 'src/dto/dto_magento/category_list.magento.dto';
import { ProductListMagentoDto } from 'src/dto/dto_magento/product_list.magento.dto';
import { json } from 'stream/consumers';

@Injectable()
export class ProductService {
    constructor(private httpService: HttpService) {}
    public async getProductByCategoryID(idcategory: number) {
        const products =  await this.httpService
          .get<ProductListMagentoDto>(ConnectionUrl.URL + FilterProducts.PRODUCTS_CATEGORY_ID + idcategory)
          .pipe(
            map((response: any) => {
              const res = new ProductListMagentoDto(response.data.items);
              return res;
            }),
            catchError((e) => {
              throw new HttpException(e.response.data, e.response.status);
            }),
          )
          .toPromise();
          const filteredCategories = 
          products.productList.filter((c) => c.status != 2
          );
          let respo = JSON.stringify(filteredCategories, [
            'id',
            'sku',
            'name',
            'price',
            'status',
            'media_gallery_entries',
            'label',
            'position',
            'file',
            'custom_attributes',
            'attribute_code',
            'value'

          ]);
          const prueba = JSON.parse(respo);
          prueba.forEach(function(data) {
            data.media_gallery_entries.forEach(function(data) {
              data.file = FilterProducts.IMAGE_URL + data.file;
            });
          });
          return prueba;
  } 
}
