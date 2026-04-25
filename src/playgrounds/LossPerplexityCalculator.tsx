import { useState } from "react";
import { perplexity } from "../utils/math";

export default function LossPerplexityCalculator() {
  const [p, setP] = useState(0.8);
  const [seq, setSeq] = useState("0.8,0.5,0.25");
  const probs = seq.split(",").map((x) => Number(x.trim())).filter((x) => x > 0);
  return <section className="playground"><h3>Cross-Entropy / Perplexity Calculator</h3><p>One-hot label 下 cross entropy 是 <code>-log(p_correct)</code>；PPL 是平均 negative log-likelihood 的指数。</p><label className="control">p_correct<input type="range" min="0.01" max="1" step="0.01" value={p} onChange={(e) => setP(Number(e.target.value))} /><b>{p.toFixed(2)}</b></label><div className="big-number">CE = {-Math.log(p).toFixed(3)}</div><label className="control">token probabilities<input value={seq} onChange={(e) => setSeq(e.target.value)} /></label><div className="big-number">PPL = {perplexity(probs).toFixed(3)}</div><p className="takeaway">考试 takeaway：PPL 越低越好；完美模型接近 1。</p></section>;
}
