export const BASE_URL = "http://127.0.0.1:9262/api";
export const URL = {
  shop: {
    category: `${BASE_URL}/category`,
    categoryWithProducts: `${BASE_URL}/category/with-products`,
    categoryAndProduct: `${BASE_URL}/category/and-products`,
    products: `${BASE_URL}/product`,
    productsWitCat: `${BASE_URL}/product/with-cat`,
  },
  cheque: {
    history: `${BASE_URL}/cheque`,
    payment: `${BASE_URL}/cheque/payment`,
  },
};
export const BASE_LSTORAGE = "last-cheque-app:";
export const LSTORAGE = {
  cart: BASE_LSTORAGE + "cart",
};
