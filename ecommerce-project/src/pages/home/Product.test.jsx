import { it, expect, describe, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import { Product } from "./Product";

describe("Product component", () => {
  it("display the product details correctly", () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    //vi.fn() creates a fake function that doesn't do anything (basically a mock)
    const loadCart = vi.fn();
    //this renders a component in a fake web page
    render(<Product product={product} loadCart={loadCart} />);
    //screen() helps check the screen or the fake web page to see if everything was rendered correctly
    // screen.getByText() searches the screen or the fake webpage for an element with specific text
    // .toBeInTheDocument() is used as an assertion to verify that a specific HTML element exists within the rendered document
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    // getByTestId() finds an element by its data-testid attribute.
    // In Product.jsx, the product image has data-testid="product-image",
    // so this gives us that image element from the fake webpage.

    // toHaveAttribute() checks that the image has the correct src attribute,
    // which means it is showing the image path from the product data.
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
    expect(screen.getByTestId("product-rating")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });
});
