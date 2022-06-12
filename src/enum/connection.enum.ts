export enum ConnectionUrl {
  URL = 'https://staging-vdt2zeq-emnitew26jfx2.us-5.magentosite.cloud/index.php/rest/V1',
  ACCESS_TOKEN = '0skkq0kxcze8123ksbprqkh669z10om4',
}
export enum FilterProducts{
  IMAGE_URL = 'https://staging-vdt2zeq-emnitew26jfx2.us-5.magentosite.cloud/media/catalog/product',
  PRODUCTS_CATEGORY_ID = '/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=',
  PRODUCTS_CATEGORY_SORT = '&searchCriteria[sortOrders][1][field]=',
  PRODUCT_CATEGORY_SORT_DIRECTION = '&searchCriteria[sortOrders][1][direction]=',
  PRODUCT_CATEGORY_CURRENT_PAGE = '&searchCriteria[currentPage]=',
  PRODUCT_CATEGORY_PAGE_SIZE = '&searchCriteria[pageSize]=',
  PRODUCT_CATEGORY_BRAND = '&searchCriteria[filter_groups][1][filters][0][field]=brand&searchCriteria[filter_groups][1][filters][0][value]=',
  PRODUCT_CATEGORY_PRICE_HIGH = '&searchCriteria[filter_groups][2][filters][0][field]=price&searchCriteria[filter_groups][2][filters][0][value]=',
  PRODUCT_CATEGORY_PRICE_LOW = '&searchCriteria[filter_groups][2][filters][0][condition_type]=from&searchCriteria[filter_groups][3][filters][0][field]=price&searchCriteria[filter_groups][3][filters][0][value]=',
  PRODUCT_CATEGORY_PRICE_TO = '&searchCriteria[filter_groups][3][filters][0][condition_type]=to',
  PRODUCT_BRAND = '/products/attributes/brand/options',

}

export enum Cart{
  PAYMENTMETHODS = '/carts/mine/payment-methods',
}

export enum QrGeneration{
  SANBOX_URI= 'https://www99.bancred.com.bo/sandbox/api/v2/Qr/Generated',
  LIVE_URI='https://apis.bcp.com.bo/OpenAPI_Qr/WebApi_Qr/api/v2/Qr/Generated'
}

export enum QrConsult{
  SANBOX_URI = 'https://www99.bancred.com.bo/sandbox/api/v2/Qr/Consult',
  LIVE_URI= 'https://apis.bcp.com.bo/OpenAPI_Qr/WebApi_Qr/api/v2/Qr/Consult'
}

export enum QrUpdate{
  SANBOX_URI = 'https://www99.bancred.com.bo/sandbox/api/v2/Qr/Updated/Status',
  LIVE_URI= 'https://apis.bcp.com.bo/OpenAPI_Qr/WebApi_Qr/api/v2/Qr/Updated/Status'
}