import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from 'src/service/product/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}
    @Get()
    async getCategories(@Query('categoryId') category_id: number){
        const products = this.productService.getProductByCategoryID(category_id)
        return (await products);
    }
}
