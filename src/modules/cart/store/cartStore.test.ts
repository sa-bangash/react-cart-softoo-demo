import { CartStore, useCartStore } from "./cartStore";
import { act } from "@testing-library/react";

describe("useCartStore", () => {
  it("adds a product to the cart", () => {
    let state: CartStore;

    act(() => {
      useCartStore.setState({ cartItems: [] });
      state = useCartStore.getState();
      state.addToCart({
        id: 1,
        name: "Test Product",
        colour: "black",
        img: "someimage",
        price: 20,
      });
    });

    expect(useCartStore.getState().cartItems.length).toBe(1);
  });

  it("removes a product from the cart", () => {
    let state: CartStore;

    act(() => {
      useCartStore.setState({
        cartItems: [
          {
            product: {
              id: 1,
              name: "Test Product",
              colour: "black",
              img: "someimage",
              price: 20,
            },
            qty: 1,
          },
        ],
      });
      state = useCartStore.getState();
      state.removeFromCart(1);
    });

    expect(useCartStore.getState().cartItems.length).toBe(0);
  });

  it("reduces quantity of a product in the cart", () => {
    let state: CartStore;

    act(() => {
      useCartStore.setState({
        cartItems: [
          {
            product: {
              id: 1,
              name: "Test Product",
              colour: "black",
              img: "someimage",
              price: 20,
            },
            qty: 2,
          },
        ],
      });
      state = useCartStore.getState();
      state.reduceQuantity(1);
    });

    expect(useCartStore.getState().cartItems[0].qty).toBe(1);
  });
});
