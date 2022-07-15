import { Test, TestingModule } from '@nestjs/testing';
import { ProductFilterMagentoDto } from '../../dto/dto_magento/product/product.filter.magento.dto';
import { SortConfig, SortDirection } from '../../enum/filter.serch.enum';
import { ProductService } from '../../service/product/product.service';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  const mockProduct= {
    getProductByCategoryID: jest.fn(),
    getBrandFromBrandId: jest.fn()
  }
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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers:[ProductService,{provide: ProductService,useValue: mockProduct}]
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });
  describe('product', () =>{
    it('should get products by category', () => {
      productController.getCategories(productCategory as ProductFilterMagentoDto);
      expect(productService.getProductByCategoryID).toHaveBeenCalled();
    });
    it('should get brand from brandId', () => {
      productController.getBrandFromBranId(brandId);
      expect(productService.getBrandFromBrandId).toHaveBeenCalled();
    });
  })
});
