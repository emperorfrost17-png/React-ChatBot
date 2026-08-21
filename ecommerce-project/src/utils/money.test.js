import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

//helps group test together
//a group of test is called a test suite
describe("formatMoney", () => {
  // it() creates a test and the string describe what we are testing
  //expect() helps us check if the result is correct
  //.toBe() is a method for the expected result
  it("formats 1999 cents as $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("displays 2 decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(100)).toBe("$1.00");
  });
  it("displays 0 cents as $0.00", () => {
    expect(formatMoney(0)).toBe('$0.00')
  });
  it('check if it works for negative numbers', () => {
    expect(formatMoney(-999)).toBe('-$9.99')
  })
});
