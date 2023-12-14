import { act, render, screen } from "@testing-library/react";
import { CartItemModel } from "../models/CartItem";
import { CartProvider, useCart } from "./cartContext";
import { useEffect } from "react";

const ItemsTestComponent = () => {
  const cart = useCart();
  return (
    <div data-testid="cart-items">
      {cart.cartItems.map((item: CartItemModel) => (
        <div key={item.product.id}>
          <div key={item.product.id}>{item.product.name}</div>
          <div data-testid="qty">{item.qty}</div>
        </div>
      ))}
    </div>
  );
};
describe("CartProvider", () => {
  it("should provide cart context", () => {
    render(
      <CartProvider>
        <ItemsTestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-items")).toBeInTheDocument();
  });

  it("should add items to the cart", () => {
    const TestComponent = () => {
      const cart = useCart();
      return (
        <>
          <button
            onClick={() =>
              cart.addToCart({
                id: 1,
                name: "Test Product",
                price: 10,
                colour: "black",
                img: "someimageulr",
              })
            }
          >
            Add to Cart
          </button>
        </>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
        <ItemsTestComponent />
      </CartProvider>
    );

    const addToCartBtn = screen.getByText("Add to Cart");
    expect(addToCartBtn).toBeInTheDocument();

    act(() => {
      addToCartBtn.click();
    });

    const cartItems = screen.getByTestId("cart-items");
    expect(cartItems).toHaveTextContent("Test Product");
  });
  it("should remove items from the cart", () => {
    const TestComponent = () => {
      const cart = useCart();
      useEffect(() => {
        cart.addToCart({
          id: 1,
          name: "product test",
          img: "some image",
          colour: "black",
          price: 2,
        });
      }, []);
      return (
        <button onClick={() => cart.removeFromCart(1)}>Remove from Cart</button>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
        <ItemsTestComponent></ItemsTestComponent>
      </CartProvider>
    );

    const removeFromCartBtn = screen.getByText("Remove from Cart");
    expect(removeFromCartBtn).toBeInTheDocument();
    expect(screen.getByText("product test")).toBeInTheDocument();
    act(() => {
      removeFromCartBtn.click();
    });

    const cartItems = screen.queryByText("product test");
    expect(cartItems).toBeNull();
  });
  it("should reduce quantity from the cart", () => {
    const TestComponent = () => {
      const cart = useCart();
      useEffect(() => {
        addToCart();
        addToCart();
      }, []);
      const addToCart = () => {
        cart.addToCart({
          id: 1,
          name: "product test",
          img: "some image",
          colour: "black",
          price: 2,
        });
      };
      return (
        <>
          <button onClick={() => cart.reduceQantity(1)}>-</button>
        </>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
        <ItemsTestComponent></ItemsTestComponent>
      </CartProvider>
    );

    const reduceQuantityBtn = screen.getByText("-");
    expect(reduceQuantityBtn).toBeInTheDocument();
    expect(screen.getByText("product test")).toBeInTheDocument();
    expect(screen.getByTestId("qty")).toHaveTextContent("2");
    act(() => {
      reduceQuantityBtn.click();
    });
    expect(screen.getByTestId("qty")).toHaveTextContent("1");
  });
});
