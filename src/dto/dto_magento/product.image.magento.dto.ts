import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductImageMagentoDto {
    id: number;
    label: string;
    position: number;
    file:string;
}