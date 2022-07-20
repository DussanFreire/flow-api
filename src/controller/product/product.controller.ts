import { Body, CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ProductFilterMagentoDto } from '../../dto/dto_magento/product/product.filter.magento.dto';
import { ProductService } from '../../service/product/product.service';
import { 
    ApiBadRequestResponse, 
    ApiCreatedResponse, 
    ApiOperation, ApiQuery, ApiTags, 
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    @ApiOperation({summary: 'Get products of a category'})
    @ApiCreatedResponse({description: 'OK response.'})
    @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
    @ApiBadRequestResponse({description:'Bad request.'})
    @ApiQuery({type: ProductFilterMagentoDto})
    async getCategories(
        @Query() request: ProductFilterMagentoDto) {
        return await this.productService.getProductByCategoryID(request)
    }

    //No useful funtion **Never used
    @Get('brands')
    @ApiOperation({summary: 'This endpoint not working.'})
    @ApiCreatedResponse({description: 'OK response.'})
    @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
    @ApiBadRequestResponse({description:'Bad request.'})
    async getBrandFromBranId(
        @Body('request') request: Array<number>) {
        return await this.productService.getBrandFromBrandId(request)
    }
}
