import { ProductImageMagentoDto } from './product.image.magento.dto';

export class ProductAtributes {
    
    attribute_code: string;
    value: string;
    
    constructor(attribute_code: string, value: string) {
        this.attribute_code = attribute_code;
        this.value = value;
    }
}