import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./productCard";

const mockProduct = {
  id: 1,
  name: "Sample Product",
  img: "sample-image.jpg",
  price: 25,
  colour: "Blue",
};

describe("ProductCard Component", () => {
  it("renders product details correctly", () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const nameElement = screen.getByText(mockProduct.name);
    const priceElement = screen.getByText(`$${mockProduct.price}`);
    const colorElement = screen.getByText(`Color: ${mockProduct.colour}`);
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(colorElement).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });

  it("calls onAddToCart function when 'Add to Cart' button is clicked", () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
