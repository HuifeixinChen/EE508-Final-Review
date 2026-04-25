import { useState } from "react";

export default function CausalMaskVisualizer() {
  const [n, setN] = useState(6);
  return <section className="playground"><h3>Causal Mask Visualizer</h3><p>Decoder training 中完整 target 已知，但 future logits 设为 -infinity，softmax 后 future weight 为 0。</p><label className="control">sequence length<input type="range" min="2" max="10" value={n} onChange={(e) => setN(Number(e.target.value))} /><b>{n}</b></label><div className="mask-grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>{Array.from({ length: n * n }, (_, k) => { const row = Math.floor(k / n); const col = k % n; const ok = col <= row; return <span key={k} className={ok ? "allowed" : "blocked"}>{ok ? "0" : "-∞"}</span>; })}</div><p className="takeaway">考试 takeaway：masked attention 允许并行训练，同时保持 autoregressive causality。</p></section>;
}
