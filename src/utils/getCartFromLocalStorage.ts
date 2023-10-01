import { CartItemType } from "../redux/slices/cart/types";
import { updateTotalPrice } from "./updateTotalPrice";

export const getCartFromLS = () => {
  const cart = localStorage.getItem('cart');
  const items = cart ? JSON.parse(cart): [];
  const totalPrice = Number(updateTotalPrice(items));
  
  return {
    items,
    totalPrice
  }
}