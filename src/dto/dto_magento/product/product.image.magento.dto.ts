import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FilterProducts } from 'src/enum/connection.enum';

export class ProductImageMagentoDto {
    id: number;
    label: string;
    position: number;
    file: string;
    constructor(id: number, label: string, position: number, file: string) {
        this.id = id;
        this.label = label;
        this.position = position;
        this.file = FilterProducts.IMAGE_URL.toString() + file;
    }
}