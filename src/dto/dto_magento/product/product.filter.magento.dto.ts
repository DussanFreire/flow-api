import { IsIn, IsNotEmpty, IsNumber, isNumber, IsOptional } from "class-validator";
import { SortConfig, SortDirection } from "../../../enum/filter.serch.enum";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterMagentoDto {
    @IsNotEmpty()
    @ApiProperty({type:Number})
    categoryId: number;
    @IsNotEmpty()
    @ApiProperty({type:Number})
    page: number;
    @IsOptional()
    @IsIn([SortConfig.SORT_BY_NAME, SortConfig.SORT_BY_PRICE, SortConfig.SORT_BY_BRAND, SortConfig.SORT_BY_WEIGHT])
    @ApiPropertyOptional({type:[SortConfig.SORT_BY_NAME, SortConfig.SORT_BY_PRICE, SortConfig.SORT_BY_BRAND, SortConfig.SORT_BY_WEIGHT]})
    sort: SortConfig.SORT_BY_NAME;
    @IsOptional()
    @IsIn([SortDirection.DIRECTION_ASC, SortDirection.DIRECTION_DESC])
    @ApiPropertyOptional({type:[SortDirection.DIRECTION_ASC, SortDirection.DIRECTION_DESC]})
    sortDirection: SortDirection.DIRECTION_ASC;

    @IsOptional()
    @ApiPropertyOptional({type:Number})
    brandIdFilter: number;
    @IsOptional()
    @ApiPropertyOptional({type:Number})
    highPriceFilter: number;
    @IsOptional()
    @ApiPropertyOptional({type:Number})
    lowPriceFilter: number;
}