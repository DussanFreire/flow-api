import { CategoryDtoMagento } from './category.magento.dto';

export class CategoryListMagentoDto {
  categoryList: Array<CategoryDtoMagento>;

  constructor(CategoryList: Array<object>) {
    this.categoryList = Object.assign(CategoryList);
  }
}
