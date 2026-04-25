import { useState } from "react";

export default function RnnGradientDemo() {
  const [w, setW] = useState(0.5);
  const [steps, setSteps] = useState(20);
  const mult = Math.pow(w, steps);
  return <section className="playground"><h3>RNN Gradient Vanishing/Exploding Demo</h3><p>BPTT 中梯度反复乘 recurrent weight。标量直觉：<code>W^T</code>。</p><label className="control">W<input type="range" min="0.1" max="2.2" step="0.1" value={w} onChange={(e) => setW(Number(e.target.value))} /><b>{w.toFixed(1)}</b></label><label className="control">time steps<input type="range" min="1" max="100" value={steps} onChange={(e) => setSteps(Number(e.target.value))} /><b>{steps}</b></label><div className="rnn-chain">{Array.from({ length: Math.min(steps, 12) }, (_, i) => <span key={i}>RNN</span>)}</div><div className="big-number">{w.toFixed(1)}^{steps} = {mult.toExponential(2)}</div><p className={mult > 10 ? "warn" : mult < 0.1 ? "warn" : "ok"}>{mult > 10 ? "exploding gradient" : mult < 0.1 ? "vanishing gradient" : "相对稳定"}</p><p className="takeaway">考试 takeaway：长序列下反复矩阵乘法是 vanilla RNN 梯度问题根源。</p></section>;
}
