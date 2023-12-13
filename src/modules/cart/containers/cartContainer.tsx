import { useEffect, useState } from "react";
import {
  fetchCartProduct,
  FetchCartProductParam,
} from "../api/fetchCartProducts";
import { CartItemModel } from "../models/CartItem";
import { CartFilter, CartItem, CartTotal } from "../components";
import "./cartContainer.scss";

const CartContainer: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async (param?: FetchCartProductParam) => {
    setLoading(true);
    const data = await fetchCartProduct(param);
    setLoading(false);
    const cartData = data.map((product) => ({ product, qty: 1 }));
    setCartItems(cartData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onColourChange = (selectedColor: string) => {
    fetchData({ colour: selectedColor });
  };

  const handleAdd = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      })
    );
  };

  const handleReduce = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      })
    );
  };

  const handleRemove = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <div className="cart-container">
      <CartFilter onColourChange={onColourChange}></CartFilter>
      {loading ? (
        <div data-testid="loading-text">loading...</div>
      ) : (
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
      )}
    </div>
  );
};
export default CartContainer;
