import { ReactNode, createContext, useContext, useState } from "react";
import { CartItemModel } from "../models/CartItem";
import Product from "../../../core/models/product";

interface CartProviderProps {
  children: ReactNode;
}

export interface CartContextProps {
  cartItems: CartItemModel[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  reduceQantity: (proeuctId: number) => void;
}
const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  reduceQantity: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
}: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const index = prevCartItems.findIndex(
        (item) => item.product.id === product.id,
      );
      if (index > -1) {
        const updateState = [...prevCartItems];
        updateState[index] = {
          ...prevCartItems[index],
          qty: prevCartItems[index].qty + 1,
        };
        return updateState;
      }
      return [
        ...prevCartItems,
        {
          product,
          qty: 1,
        },
      ];
    });
  };
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };
  const reduceQantity = (productId: number) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex(
        (item) => item.product.id === productId,
      );
      if (index > -1) {
        const updateState = [...prevItems];
        updateState[index] = {
          ...updateState[index],
          qty: updateState[index].qty - 1,
        };
        return updateState;
      }
      return prevItems;
    });
  };
  const contextValue: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    reduceQantity,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
