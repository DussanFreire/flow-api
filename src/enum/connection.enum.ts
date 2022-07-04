export enum ConnectionUrl {
  URL_PROD = 'https://flow.bo/index.php/rest/V1',
  URL_STAG = 'https://staging-vdt2zeq-emnitew26jfx2.us-5.magentosite.cloud/index.php/rest/V1',

  URL = URL_STAG,

  ACCESS_TOKEN_PROD = 'oamoppt1z8dqdfhn37mk8ahhdrkhhqy8',
  ACCESS_TOKEN_STAG = '0skkq0kxcze8123ksbprqkh669z10om4',

  ACCESS_TOKEN = ACCESS_TOKEN_STAG,
}
export enum FilterProducts {
  IMAGE_URL_PROD = 'https://flow.bo/media/catalog/product/cache/fd029dace445584c3bbc2d0e9958ecec', // PRODUCTION
  IMAGE_URL_STAG = 'https://staging-vdt2zeq-emnitew26jfx2.us-5.magentosite.cloud/media/catalog/product',
  IMAGE_URL = IMAGE_URL_STAG,
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

export enum Cart {
  PAYMENTMETHODS = '/carts/mine/payment-methods',
}
