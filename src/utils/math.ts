export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 0;
}

export function safeDivide(numerator: number, denominator: number): number | undefined {
  return denominator === 0 ? undefined : numerator / denominator;
}

export function classificationMetrics(tp: number, fp: number, fn: number, tn: number) {
  const accuracy = safeDivide(tp + tn, tp + fp + fn + tn);
  const precision = safeDivide(tp, tp + fp);
  const recall = safeDivide(tp, tp + fn);
  const f1 = precision === undefined || recall === undefined || precision + recall === 0
    ? undefined
    : (2 * precision * recall) / (precision + recall);
  return { accuracy, precision, recall, f1 };
}

export function softmax(logits: number[], temperature = 1): number[] {
  const t = Math.max(temperature, 1e-6);
  const scaled = logits.map((v) => v / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((v) => v / sum);
}

export function perplexity(probabilities: number[]): number {
  const clipped = probabilities.map((p) => Math.max(p, 1e-12));
  const nll = -clipped.reduce((sum, p) => sum + Math.log(p), 0) / clipped.length;
  return Math.exp(nll);
}

export function bankConflict(stride: number, banks = 32): number {
  return gcd(stride, banks);
}

export function cosine(ax: number, ay: number, bx: number, by: number): number {
  const dot = ax * bx + ay * by;
  const norm = Math.hypot(ax, ay) * Math.hypot(bx, by);
  return norm === 0 ? 0 : dot / norm;
}

export function fmt(value: number | undefined, digits = 3): string {
  return value === undefined || Number.isNaN(value) ? "undefined" : value.toFixed(digits);
}
