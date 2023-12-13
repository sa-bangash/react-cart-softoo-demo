import { CartItemModel } from "../models/CartItem";
interface CartTotalProps {
  cartItems: Array<CartItemModel>;
}

export const CartTotal: React.FC<CartTotalProps> = ({
  cartItems,
}: CartTotalProps) => {
  const total = cartItems.reduce((acc, item) => {
    acc += item.qty * item.product.price;
    return acc;
  }, 0);
  return <div className="cart-product">${total?.toFixed(2)}</div>;
};
