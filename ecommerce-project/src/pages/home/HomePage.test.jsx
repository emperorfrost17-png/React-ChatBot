import { it, expect, describe, vi, beforeEach } from "vitest";
import axios from "axios";

import { render, screen, within } from "@testing-library/react";

import { MemoryRouter } from "react-router";

import { HomePage } from "./HomePage";

vi.mock("axios");
describe("HomePage component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
    // .mockImplementation() helps us make the mock do whatever we want in this case the mock is axios
    //the values we give to  axios.get() are going to be saved as parameters for example the URL path
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        // whatever we return from this fake function should match what axios.get() normally returns which is a response with a property .data
        //and data is an array of products so ours should also be an array
        //! axios.get() normally returns a promise that we have to await so we should also return a promise by making our function async
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });
  it("displays the products correctly", async () => {
    render(
      // MemoryRouter is specifically for testing
      //we have to use this because HomePage.jsx has a header component from Header.jsx which uses <NavLink> or even <Link> and for those to work it has to be in a Router so <MemoryRouter> helps us do that
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    //i used .findAllByTestId() because in this test we going to get multiple product container element (2) with the same data-testid
    //.findAllByTestId() does the same as .getAllByTestId but .findAllByTestId() waits until it finds this which is important for us because in HomePage.jsx the product state starts as empty then we use useEffect to load the product
    //so .findAllByTestId() is usefull when our component needs to load something
    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(2);
    //within() lets us find things within a specific element
    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });
});
