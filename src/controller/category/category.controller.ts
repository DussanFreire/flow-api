import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../../service/category/category.service';

@Controller('categories')
export class CategoryController {
    constructor(private categoyService: CategoryService){}
    @Get()
    async getCategories(){
        const categoria = this.categoyService.getCategories()
        return (await categoria);
    }
}
