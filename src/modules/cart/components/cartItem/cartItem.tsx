import { memo } from "react";
import { CartItemModel } from "../../models/CartItem";
import { CartProduct } from "../cartProduct/cartProduct";
import "./cartitem.scss";
interface CartProductProps {
  cartItem: CartItemModel;
  onAdd: (productId: number) => void;
  onReduce: (productId: number) => void;
  onRemove: (productId: number) => void;
}
const areEqual = (prevProps: CartProductProps, nextProps: CartProductProps) => {
  return prevProps.cartItem.qty === nextProps.cartItem.qty;
};

export const CartItem: React.FC<CartProductProps> = memo(
  ({ cartItem, onAdd, onReduce, onRemove }: CartProductProps) => {
    return (
      <div className="cart-item">
        <CartProduct product={cartItem.product}></CartProduct>
        <div className="cart-item__actions">
          <div className="cart-item__quantity-controls">
            <button
            data-testid="reduce-btn"
              onClick={() => onReduce(cartItem.product.id)}
              className="cart-item__reduce"
              disabled={cartItem.qty < 2}
            >
              -
            </button>
            <div>{cartItem.qty}</div>
            <button
              data-testid="add-btn"
              onClick={() => onAdd(cartItem.product.id)}
              className="cart-item__add"
            >
              +
            </button>
          </div>
          <button
            data-testid="remove-btn"
            onClick={() => onRemove(cartItem.product.id)}
            className="cart-item__remove"
          >
            Remove
          </button>
        </div>
      </div>
    );
  },
  areEqual
);
