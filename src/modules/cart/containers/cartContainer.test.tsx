/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import CartContainer from "./cartContainer";
import * as api from "../api/fetchCartProducts";
import Product from "../../../core/models/product";
// eslint-disable-next-line testing-library/no-unnecessary-act

describe("CartContainer Component", () => {
  const mockCartItems: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      img: "image-url",
      colour: "black",
    },
  ];

  beforeEach(() => {
    jest.spyOn(api, "fetchCartProduct").mockResolvedValue(mockCartItems);
  });

  it("renders CartContainer component correctly", async () => {
    await act(async () => {
      await render(<CartContainer />);
    });
    expect(screen.getByText(mockCartItems[0].name)).toBeInTheDocument();
  });

  it("filter cart base on selected filter color", async () => {
    await act(async () => {
      await render(<CartContainer />);
    });

    await act(async () => {
      const colorSelect = screen.getByTestId("cart-color-select");
      fireEvent.change(colorSelect, { target: { value: "Red" } });
    });
    expect(api.fetchCartProduct).toHaveBeenCalledTimes(2);
  });
});
