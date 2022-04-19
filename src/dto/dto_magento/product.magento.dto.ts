import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductMagentoDto {
    id: number;
    sku: string;
    name: string;
    price: number;
}
