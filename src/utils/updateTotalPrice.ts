import { CartItemType } from "../redux/slices/cart/types";

export const updateTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
}