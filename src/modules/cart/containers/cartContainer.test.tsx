import { CartProvider } from "../context/cartContext";
import CartContainer from "./cartContainer";
import { useCart } from "../context/cartContext";
import { render, screen } from "@testing-library/react";

jest.mock("../context/cartContext", () => ({
  ...jest.requireActual("../context/cartContext"),
  useCart: jest.fn(),
}));
describe("CartContainer Component", () => {
  it("renders cart items and total correctly", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        { product: { id: 1, name: "Product 1", price: 20 }, qty: 2 },
        { product: { id: 2, name: "Product 2", price: 30 }, qty: 1 },
      ],
      removeFromCart: jest.fn(),
      reduceQuantity: jest.fn(),
      addToCart: jest.fn(),
    });

    render(
      <CartProvider>
        <CartContainer />
      </CartProvider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("displays a message for an empty cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      removeFromCart: jest.fn(),
      reduceQuantity: jest.fn(),
      addToCart: jest.fn(),
    });

    render(
      <CartProvider>
        <CartContainer />
      </CartProvider>
    );
    expect(screen.getByText("No Item in the cart!")).toBeInTheDocument();
  });
});
