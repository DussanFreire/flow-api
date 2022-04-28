import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductAtributes } from './product.atribute.magento.dto';
import { ProductImageMagentoDto } from './product.image.magento.dto';

export class ProductMagentoDto {
    id: number;
    sku: string;
    name: string;
    price: number;
    status:  number;
    image_url: string;
    special_price: string;
    description: string;
}
