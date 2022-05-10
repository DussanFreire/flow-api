import { Body, CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ProductFilterMagentoDto } from 'src/dto/dto_magento/product.filter.magento.dto';
import { ProductService } from 'src/service/product/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}
    
    @Get()
    async getCategories(
        @Query() request: ProductFilterMagentoDto){
            return await this.productService.getProductByCategoryID(request)
        }
}
