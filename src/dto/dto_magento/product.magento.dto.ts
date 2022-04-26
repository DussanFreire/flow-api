import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductAtributes } from './product.atribute.magento.dto';
import { ProductImageMagentoDto } from './product.image.magento.dto';

export class ProductMagentoDto {
    id: number;
    sku: string;
    name: string;
    price: number;
    status:  number;
    media_gallery_entries: Array<ProductImageMagentoDto>;
    custom_attributes: Array<ProductAtributes>;
    constructor(Media_gallery_entries: Array<object>, Custom_attributes: Array<ProductAtributes>) {
        this.media_gallery_entries = Object.assign(Media_gallery_entries);
        this.custom_attributes = Object.assign(Custom_attributes);
    }
}
