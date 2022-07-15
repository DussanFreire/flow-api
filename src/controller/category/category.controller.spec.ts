import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../service/category/category.service';
import { CategoryController } from './category.controller';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let cartService: CategoryService;
  const mockCategoryService= {
    getCategories:jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers:[CategoryService, {provide: CategoryService, useValue: mockCategoryService}]
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    cartService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('categories', () =>{
    it('should get categories', () =>{
      categoryController.getCategories();
      expect(cartService.getCategories).toHaveBeenCalled();
    });
  });
});
