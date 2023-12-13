import { fireEvent, render, screen } from "@testing-library/react";
import { CartItem } from "./cartItem";

describe("cartItem component", () => {
  const mockCartItem = {
    product: {
      id: 1,
      name: "Test Product",
      price: 20,
      img: "test-image-url",
      colour: "Black",
    },
    qty: 3,
  };

  it("renders CartItem component correctly", () => {
    const mockOnAdd = jest.fn();
    const mockOnReduce = jest.fn();
    const mockOnRemove = jest.fn();
    render(
      <CartItem
        cartItem={mockCartItem}
        onAdd={mockOnAdd}
        onReduce={mockOnReduce}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText(mockCartItem.qty)).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(screen.getByText(mockCartItem.product.name)).toBeInTheDocument();
  });

  it("call add function when click add button", () => {
    const mockOnAdd = jest.fn();
    render(
      <CartItem
        cartItem={mockCartItem}
        onAdd={mockOnAdd}
        onReduce={() => {}}
        onRemove={() => {}}
      />
    );
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });
  it("call remove function when click remove button", () => {
    const mockOnRemove = jest.fn();
    render(
      <CartItem
        cartItem={mockCartItem}
        onAdd={() => {}}
        onReduce={() => {}}
        onRemove={mockOnRemove}
      />
    );
    fireEvent.click(screen.getByTestId("remove-btn"));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("call reduce function when click reduce button", () => {
    const mockOnReduce = jest.fn();
    render(
      <CartItem
        cartItem={mockCartItem}
        onAdd={() => {}}
        onReduce={mockOnReduce}
        onRemove={() => {}}
      />
    );
    fireEvent.click(screen.getByTestId("reduce-btn"));
    expect(mockOnReduce).toHaveBeenCalledTimes(1);
  });

  it("disabled reduce button when qty is less than 2", () => {
    render(
      <CartItem
        cartItem={{ ...mockCartItem, qty: 1 }}
        onAdd={() => {}}
        onReduce={() => {}}
        onRemove={() => {}}
      />
    );
    const reducerButton = screen.getByTestId("reduce-btn") as HTMLButtonElement;
    expect(reducerButton.disabled).toBe(true);
  });
});
