import { sum } from "../src";

describe("sum.test.ts", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(1, 2)).toBe(4);
  });
});
