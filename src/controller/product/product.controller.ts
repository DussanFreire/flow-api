import { Body, Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/service/product/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}
    @Get()
    async getCategories(@Body('id') id:number){
        const products = this.productService.getProductByCategoryID(id)
        return (await products);
    }
}
