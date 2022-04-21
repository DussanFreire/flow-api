import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductImageMagentoDto } from './product.image.magento.dto';

export class ProductMagentoDto {
    id: number;
    sku: string;
    name: string;
    price: number;
    status:  number;
    tier_prices: Array<string>;
    media_gallery_entries: Array<ProductImageMagentoDto>;
    
    constructor(Media_gallery_entries: Array<object>) {
        this.media_gallery_entries = Object.assign(Media_gallery_entries);
    }
}
