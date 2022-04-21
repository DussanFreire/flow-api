import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductImageMagentoDto } from './product.image.magento.dto';

export class ProductMagentoDto {
    id: number;
    sku: string;
    name: string;
    price: number;
    status:  number;
    discount: number;
    media_gallery_entries: Array<ProductImageMagentoDto>;
    
    constructor(Media_gallery_entries: Array<object>) {
        this.media_gallery_entries = Object.assign(Media_gallery_entries);
        this.discount = 0;
    }
}
