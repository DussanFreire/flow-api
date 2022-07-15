import { Body, CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ProductFilterMagentoDto } from '../../dto/dto_magento/product/product.filter.magento.dto';
import { ProductService } from '../../service/product/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async getCategories(
        @Query() request: ProductFilterMagentoDto) {
        return await this.productService.getProductByCategoryID(request)
    }
    @Get('brands')
    async getBrandFromBranId(
        @Body('request') request: Array<number>) {
        return await this.productService.getBrandFromBrandId(request)
    }
}
