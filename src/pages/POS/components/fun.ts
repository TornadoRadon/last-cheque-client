import { LSTORAGE } from "../../../utils/properties";
import { ProductInCart } from "./models";

export function getCart(): ProductInCart[] {
  let _cart = localStorage.getItem(LSTORAGE.cart);
  if (_cart) return JSON.parse(_cart);
  else return [];
}

export function clearCart() {
  localStorage.removeItem(LSTORAGE.cart);
}

export function addToCart(p: ProductInCart) {
    
  let cart = getCart();
  cart.unshift(p);
  localStorage.setItem(LSTORAGE.cart, JSON.stringify(cart));
}
