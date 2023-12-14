import { create } from "zustand";
import { CartItemModel } from "../models/CartItem";
import Product from "../../../core/models/product";

export interface CartStore {
  cartItems: CartItemModel[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  reduceQuantity: (productId: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (product) => {
    set((state) => ({
      cartItems: state.cartItems.some((item) => item.product.id === product.id)
        ? state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...state.cartItems, { product, qty: 1 }],
    }));
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.product.id !== productId
      ),
    }));
  },
  reduceQuantity: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId && item.qty > 0
          ? { ...item, qty: item.qty - 1 }
          : item
      ),
    }));
  },
}));
