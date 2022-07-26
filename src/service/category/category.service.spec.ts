import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  const mockCategoryService= {
    getCategories:jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryService,
          useValue:mockCategoryService,
        }
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });
  it('should get all categories', async () => {
    const spyCategoryService = jest
    .spyOn(categoryService, 'getCategories')
    await categoryService.getCategories();
    expect(spyCategoryService).toHaveBeenCalled;
  });
});
