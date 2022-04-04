import { Controller, Get } from '@nestjs/common';
import { CategoryService } from 'src/service/category/category.service';

@Controller('categories')
export class CategoryController {
    constructor(private categoyService: CategoryService){}
    @Get()
    async getCategories(){
        return this.categoyService.getCategories();
    }
}
