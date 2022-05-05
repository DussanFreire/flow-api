import { Body, CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ProductService } from 'src/service/product/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}
    
    @Get()
    async getCategories(
        @Query('categoryId') category_id: number,
        @Query('page') page: number){
            return await this.productService.getProductByCategoryID(category_id, page)
        }
}
