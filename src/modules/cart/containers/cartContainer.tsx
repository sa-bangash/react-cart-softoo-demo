import { CartItem, CartTotal } from "../components";
import "./cartContainer.scss";
import { useCart } from "../context/cartContext";
import Product from "../../../core/models/product";

const CartContainer: React.FC = () => {
  const { cartItems, removeFromCart, reduceQantity,addToCart } = useCart();
  const handleAdd = (product: Product) => {
    addToCart(product)
  };

  const handleReduce = (productId: number) => {
    reduceQantity(productId);
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };
  return (
    <div className="cart-container">
      {cartItems.length ? (
        <>
          {cartItems.map((item) => {
            return (
              <CartItem
                cartItem={item}
                key={item.product.id}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onReduce={handleReduce}
              ></CartItem>
            );
          })}
          <div className="cart-total">
            <CartTotal cartItems={cartItems}></CartTotal>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h2>No Item in the cart!</h2>
        </div>
      )}
    </div>
  );
};
export default CartContainer;
