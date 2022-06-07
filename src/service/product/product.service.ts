import { ConnectionUrl, FilterProducts } from 'src/enum/connection.enum';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger, Res } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { CategoryDtoMagento } from 'src/dto/dto_magento/category.magento.dto';
import { CategoryListMagentoDto } from 'src/dto/dto_magento/category_list.magento.dto';
import { ProductListMagentoDto } from 'src/dto/dto_magento/product_list.magento.dto';
import { json } from 'stream/consumers';
import { ProductMagentoDto } from 'src/dto/dto_magento/product.magento.dto';
import { PaginateService } from '../paginate/paginate.service';

@Injectable()
export class ProductService {
    constructor(private httpService: HttpService, private paginateService: PaginateService) {}
    public async getProductByCategoryID(idcategory: number, page: number, limit: number) {
        const products =  await this.httpService
          .get(ConnectionUrl.URL + FilterProducts.PRODUCTS_CATEGORY_ID + idcategory)
          .pipe(
            map((response: any) => response.data.items ),
            catchError((e) => {
              throw new HttpException(e.response.data, e.response.status);
            }),
          )
          .toPromise();
          let filteredCategories = 
          (products).filter((c) => c.status != 2
          );
          const respuesta = new ProductListMagentoDto([]);
          let prueba = filteredCategories;
          let imageUrl;
          let special_price;
          let description;
          filteredCategories.forEach(function(data) {
            data.custom_attributes.forEach(function(data){
              if(data.attribute_code == 'special_price'){
                special_price = data.value;
              }else{
                special_price = 0;
              }
              if(data.attribute_code == "description"){
                description = data.value;
              }else{
                description = '';
              }
            });
            data.media_gallery_entries.forEach(function(data, index) {
              if(index <= 0)
                imageUrl = FilterProducts.IMAGE_URL + data.file;
              data.file = FilterProducts.IMAGE_URL + data.file;
            });
            let info = new ProductMagentoDto;
            info = {
              id:data.id,
              sku: data.sku,
              name: data.name,
              price: data.price,
              status: data.status,
              image_url: imageUrl,
              special_price: special_price,
              description: description
            }
            respuesta.productList.push(info)
          });
          return await this.paginateService.paginatedResults(respuesta.productList,page,limit);
  } 
}
