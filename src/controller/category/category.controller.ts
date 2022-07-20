import { Controller, Get } from '@nestjs/common';
import { 
    ApiBadRequestResponse, 
    ApiCreatedResponse, 
    ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from '../../service/category/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoyService: CategoryService){}
    @Get()
    @ApiOperation({summary: 'Get Categories.'})
    @ApiCreatedResponse({description: 'OK response.'})
    @ApiBadRequestResponse({description:'Bad request.'})
    async getCategories(){
        const categoria = this.categoyService.getCategories()
        return (await categoria);
    }
}
