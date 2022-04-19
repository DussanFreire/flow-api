import { CategoryDtoMagento } from './category.magento.dto';
import { ProductMagentoDto } from './product.magento.dto';

export class ProductListMagentoDto {
  productList: Array<ProductMagentoDto>;

  constructor(ProductList: Array<object>) {
    this.productList = Object.assign(ProductList);
  }
}