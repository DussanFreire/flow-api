import { IsIn, IsNotEmpty, IsNumber, isNumber, IsOptional } from "class-validator";
import { SortConfig, SortDirection } from "src/enum/filter.serch.enum";

export class ProductFilterMagentoDto {
    @IsNotEmpty()
    categoryId: number;
    @IsNotEmpty()
    page: number;
    @IsOptional()
    @IsIn([SortConfig.SORT_BY_NAME, SortConfig.SORT_BY_PRICE, SortConfig.SORT_BY_BRAND, SortConfig.SORT_BY_WEIGHT])
    sort: SortConfig.SORT_BY_NAME;
    @IsOptional()
    @IsIn([SortDirection.DIRECTION_ASC, SortDirection.DIRECTION_DESC])
    sortDirection: SortDirection.DIRECTION_ASC;

    @IsOptional()
    brandIdFilter: number;
    @IsOptional()
    highPriceFilter: number;
    @IsOptional()
    lowPriceFilter: number;
}