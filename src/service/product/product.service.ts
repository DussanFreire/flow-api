import { ConnectionUrl, FilterProducts } from 'src/enum/connection.enum';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { ProductListMagentoDto } from 'src/dto/dto_magento/product_list.magento.dto';
import { ProductMagentoDto } from 'src/dto/dto_magento/product.magento.dto';
import { PaginateService } from '../paginate/paginate.service';
import { ProductFilterMagentoDto } from 'src/dto/dto_magento/product.filter.magento.dto';
import { PaginationConfig, SortConfig, SortDirection } from 'src/enum/filter.serch.enum';
import { Any } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService,
    private paginateService: PaginateService,) { }
  public async getProductByCategoryID(request: ProductFilterMagentoDto) {

    const products = await this.httpService
      .get(this.generateURL(request))
      .pipe(
        map((response: any) => response.data.items),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    return await this.filterResponse(products, request.page);
  }
  private generateURL(request: ProductFilterMagentoDto) {
    let url = ConnectionUrl.URL + FilterProducts.PRODUCTS_CATEGORY_ID + request.categoryId + FilterProducts.PRODUCTS_CATEGORY_SORT + request.sort +
      FilterProducts.PRODUCT_CATEGORY_SORT_DIRECTION + request.sortDirection + FilterProducts.PRODUCT_CATEGORY_CURRENT_PAGE + request.page;
    if (request.brandIdFilter != null) {
      url += FilterProducts.PRODUCT_CATEGORY_BRAND + request.brandIdFilter;
    }
    if (request.highPriceFilter != null && request.lowPriceFilter != null) {
      url += FilterProducts.PRODUCT_CATEGORY_PRICE_HIGH + request.highPriceFilter +
        FilterProducts.PRODUCT_CATEGORY_PRICE_LOW + request.lowPriceFilter + FilterProducts.PRODUCT_CATEGORY_PRICE_TO;
    }
    return url;
  }
  private filterResponse(resp, page: number) {
    const respuesta = new ProductListMagentoDto([]);
    let imageUrl;
    let special_price;
    let description;
    resp.forEach(function (data) {
      data.custom_attributes.forEach(function (data) {
        if (data.attribute_code == 'special_price') {
          special_price = data.value;
        } else {
          special_price = 0;
        }
        if (data.attribute_code == "description") {
          description = data.value;
        } else {
          description = '';
        }
      });
      data.media_gallery_entries
      data.media_gallery_entries.forEach(function (data, index) {
        if (index <= 0)
          imageUrl = FilterProducts.IMAGE_URL + data.file;
      });
      let info = new ProductMagentoDto;
      info = {
        id: data.id,
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
    return this.paginateService.paginatedResults(respuesta.productList, page);
  }
  public async getBrandFromBrandId(brandid: Array<number>) {
    let brandsResponse = [];
    const brands = await this.httpService
      .get(ConnectionUrl.URL + FilterProducts.PRODUCT_BRAND)
      .pipe(
        map((response: any) => response.data),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    brandid.forEach(function (info) {
      const idres = brands.find(data => data.value == info);
      brandsResponse.push(idres)
    })
    return brandsResponse;
  }
  public getAllBrandsCategory() {

  }
}
