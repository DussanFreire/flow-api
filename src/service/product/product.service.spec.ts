import { Test, TestingModule } from '@nestjs/testing';
import { ProductFilterMagentoDto } from 'src/dto/dto_magento/product/product.filter.magento.dto';
import { SortConfig, SortDirection } from '../../enum/filter.serch.enum';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  const productCategory= {
    categoryId: 12,
    page: 2,
    sortDirection: SortDirection.DIRECTION_ASC,
    sort: SortConfig.SORT_BY_NAME,
    brandIdFilter: 3,
    highPriceFilter: 2,
    lowPriceFilter: 1
  }
  const brandId= [12,32];
  const mockProduct= {
    getProductByCategoryID: jest.fn(),
    getBrandFromBrandId: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductService,
          useValue: mockProduct,
        }
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
  it('should get products by category', async () => {
    const spyProductCategoryService = jest
    .spyOn(productService, 'getProductByCategoryID')
    await productService.getProductByCategoryID(productCategory as ProductFilterMagentoDto);
    expect(spyProductCategoryService).toHaveBeenCalled;
  });
});
