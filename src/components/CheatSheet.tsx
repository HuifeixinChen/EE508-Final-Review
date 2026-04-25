import { formulas } from "../data/formulas";
import FormulaCard from "./FormulaCard";

const templates = ["SIMT: 一个 warp 内多个 threads 以 single instruction 风格执行，但每个 thread 有独立状态。", "Warp divergence: 同一 warp 内 branch 不一致会串行执行路径。", "Coalescing: consecutive threads access consecutive addresses。", "Shared memory bank conflict: 32 banks 下用 gcd(stride,32)，broadcast 例外。", "Masked attention: future logits = -infinity，softmax 后 future weights = 0。", "Multi-head attention: 不同 heads 学不同位置和表示子空间。", "KV cache: prefill 建 cache，decode 复用旧 K/V 并追加新 K/V。", "FlashAttention: exact attention, IO-aware tiling, no full n x n HBM materialization。", "RLHF: SFT -> reward model from preferences -> PPO/RL + KL penalty。", "Quantization: lower precision saves memory/bandwidth but introduces error。"];

export default function CheatSheet() {
  return <section className="page cheat"><div className="print-header"><h2>Formula Sheet / Cheat Sheet</h2><button onClick={() => window.print()}>Print</button></div><div className="formula-grid">{formulas.map((f) => <FormulaCard key={f.id} formula={f} />)}</div><section className="content-block"><h3>Most likely short-answer templates</h3><ul>{templates.map((t) => <li key={t}>{t}</li>)}</ul></section></section>;
}
