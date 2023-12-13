import React from "react";
import { render, screen } from "@testing-library/react";
import { CartTotal } from "./cartTotal";

describe("CartTotal Component", () => {
  const mockItems = [
    {
      product: {
        id: 1,
        colour: "Black",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 3,
        img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
      },
      qty: 2,
    },
    {
      product: {
        id: 2,
        colour: "Stone",
        name: "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
        price: 4,
        img: "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024",
      },
      qty: 3,
    },
  ];

  it("renders cart total correctly", () => {
    render(<CartTotal cartItems={mockItems} />);
    expect(screen.getByText('$18.00')).toBeInTheDocument();
  });
});
