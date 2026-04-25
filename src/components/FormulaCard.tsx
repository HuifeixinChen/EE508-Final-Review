import type { Formula } from "../types";

export default function FormulaCard({ formula }: { formula: Formula }) {
  return <article className="formula-card"><small>{formula.group}</small><h4>{formula.label}</h4><code>{formula.expression}</code><p>{formula.note}</p></article>;
}
