import { act, render, screen, waitFor } from "@testing-library/react";
import { CartItemModel } from "../models/CartItem";
import { CartProvider, useCart } from "./cartContext";
import user from "@testing-library/user-event";
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
    render(<ItemsTestComponent />, {
      wrapper: CartProvider,
    });

    expect(screen.getByTestId("cart-items")).toBeInTheDocument();
  });

  test("should add items to the cart", async () => {
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
      <>
        <TestComponent />
        <ItemsTestComponent />
      </>,
      {
        wrapper: CartProvider,
      },
    );

    const addToCartBtn = screen.getByRole("button");
    expect(addToCartBtn).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await user.click(addToCartBtn);
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
      <>
        <TestComponent />
        <ItemsTestComponent></ItemsTestComponent>
      </>,
      {
        wrapper: CartProvider,
      },
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
      <>
        <TestComponent />
        <ItemsTestComponent></ItemsTestComponent>
      </>,
      { wrapper: CartProvider },
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
