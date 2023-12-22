import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProduct } from "./cartProduct";

describe("CartProduct Component", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 20,
    img: "test-image-url",
    colour: "Black",
  };

  it("renders product details correctly", () => {
    render(<CartProduct product={mockProduct} />);

    const productName = screen.getByText(mockProduct.name);
    const productPrice = screen.getByText(`$ ${mockProduct.price}`);
    const productImage = screen.getByRole("img", { name: mockProduct.name });

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("src", mockProduct.img);
  });
});
