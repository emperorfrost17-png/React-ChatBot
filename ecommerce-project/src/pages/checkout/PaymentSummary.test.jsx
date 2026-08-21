import { it, expect, describe, vi, beforeEach } from "vitest";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { useLocation } from "react-router";
import { MemoryRouter } from "react-router";

import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");
// This helper component reads the current route from React Router.
// It lets the test check whether the app navigated to a new page.
// We render it inside MemoryRouter so useLocation() can access the router state.
// The value is displayed in a div with data-testid="url-path" so the test can verify it.
// Example: after clicking "Place your order", the pathname should become "/orders".
function Location() {
  const location = useLocation();
  return <div data-testid="url-path">{location.pathname}</div>;
}
describe("test for PaymentSummary component", () => {
  let loadCart;
  let paymentSummary;
  let user;
  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };
    loadCart = vi.fn();
    user = userEvent.setup();
  });
  it("displays payment summary properly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />{" "}
        <Location />
      </MemoryRouter>,
    );
    expect(screen.getByText("Items (3):")).toBeInTheDocument();
    expect(
      within(screen.getByTestId("payment-summary-product-cost")).getByText(
        "$42.75",
      ),
    ).toBeInTheDocument();
    // .toHaveTextContent() checks the text inside an element)
    expect(
      screen.getByTestId("payment-summary-shipping-cost"),
    ).toHaveTextContent("$4.99");
    expect(
      screen.getByTestId("payment-summary-total-before-tax"),
    ).toHaveTextContent("$47.74");
    expect(screen.getByTestId("payment-summary-tax")).toHaveTextContent(
      "$4.77",
    );
    expect(screen.getByTestId("payment-summary-total")).toHaveTextContent(
      "$52.51",
    );
  });
  it("test for place order button", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />{" "}
        <Location />
      </MemoryRouter>,
    );

    const placeOrderButton = screen.getByTestId("place-order-button");
    await user.click(placeOrderButton);
    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });
});
