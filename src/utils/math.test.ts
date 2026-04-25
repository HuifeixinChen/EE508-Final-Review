import { describe, expect, it } from "vitest";
import { bankConflict, classificationMetrics, gcd, perplexity, softmax } from "./math";

describe("math utilities", () => {
  it("computes gcd", () => {
    expect(gcd(32, 32)).toBe(32);
    expect(gcd(33, 32)).toBe(1);
  });

  it("computes classification metrics", () => {
    const m = classificationMetrics(10, 5, 5, 80);
    expect(m.precision).toBeCloseTo(2 / 3);
    expect(m.recall).toBeCloseTo(2 / 3);
    expect(m.f1).toBeCloseTo(2 / 3);
  });

  it("computes perplexity", () => {
    expect(perplexity([0.5, 0.5])).toBeCloseTo(2);
  });

  it("computes stable softmax", () => {
    const probs = softmax([1, 2, 3]);
    expect(probs.reduce((a, b) => a + b, 0)).toBeCloseTo(1);
    expect(probs[2]).toBeGreaterThan(probs[0]);
  });

  it("computes bank conflicts", () => {
    expect(bankConflict(1)).toBe(1);
    expect(bankConflict(16)).toBe(16);
    expect(bankConflict(33)).toBe(1);
  });
});
