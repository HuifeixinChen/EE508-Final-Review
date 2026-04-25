import { useState } from "react";

const source = ["Le", "chat", "est", "assis"];
const target = ["The", "cat", "sat"];
const weights = [[0.8, 0.1, 0.05, 0.05], [0.05, 0.85, 0.05, 0.05], [0.05, 0.1, 0.3, 0.55]];

export default function Seq2SeqAttentionHeatmap() {
  const [step, setStep] = useState(1);
  return <section className="playground"><h3>Seq2Seq Attention Heatmap</h3><p>Decoder 当前 step 用 cross-attention 对 encoder hidden states 加权，避免固定 context bottleneck。</p><label className="control">decoder step<input type="range" min="0" max="2" value={step} onChange={(e) => setStep(Number(e.target.value))} /><b>{target[step]}</b></label><div className="heatmap">{source.map((s, i) => <span key={s} style={{ opacity: 0.25 + weights[step][i] }}>{s}<b>{weights[step][i].toFixed(2)}</b></span>)}</div><div className="teacher">Teacher forcing: 若模型误预测 “Elle”，训练下一步仍喂真实 token “{target[step]}”。</div><p className="takeaway">考试 takeaway：cross-attention 是 decoder query 动态选择 source hidden states。</p></section>;
}
