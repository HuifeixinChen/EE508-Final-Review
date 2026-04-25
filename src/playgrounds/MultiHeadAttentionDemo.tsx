import { useState } from "react";

const patterns = ["subject", "adjective", "position", "local"];

export default function MultiHeadAttentionDemo() {
  const [heads, setHeads] = useState(4);
  return <section className="playground"><h3>Multi-head Attention Demo</h3><p>多个 head 可以关注不同位置和表示子空间，然后 concat 并乘 <code>W_O</code>。</p><label className="control">heads<input type="range" min="1" max="8" value={heads} onChange={(e) => setHeads(Number(e.target.value))} /><b>{heads}</b></label><div className="head-grid">{Array.from({ length: heads }, (_, i) => <div className="head-card" key={i}><b>Head {i + 1}</b><div className="mini-bars">{[0.2, 0.6, 0.9, 0.35].map((h, j) => <span key={j} style={{ height: `${20 + ((h + i * 0.13) % 1) * 60}px` }} />)}</div><small>{patterns[i % patterns.length]}</small></div>)}</div><p className="takeaway">考试 takeaway：MHA 不是重复同一个 head，而是并行学习不同关系。</p></section>;
}
