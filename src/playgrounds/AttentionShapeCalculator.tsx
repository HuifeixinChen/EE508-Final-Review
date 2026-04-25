import { useState } from "react";

export default function AttentionShapeCalculator() {
  const [n, setN] = useState(8);
  const [dModel, setDModel] = useState(64);
  const [dk, setDk] = useState(16);
  const [dv, setDv] = useState(16);
  return <section className="playground"><h3>QKV Attention Shape Calculator</h3><p>Given <code>X in R^(n x d_model)</code>，计算 self-attention 各矩阵 shape。</p><div className="grid-4"><label className="control">n<input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} /></label><label className="control">d_model<input type="number" value={dModel} onChange={(e) => setDModel(Number(e.target.value))} /></label><label className="control">d_k<input type="number" value={dk} onChange={(e) => setDk(Number(e.target.value))} /></label><label className="control">d_v<input type="number" value={dv} onChange={(e) => setDv(Number(e.target.value))} /></label></div><div className="metric-grid"><b>X: {n} x {dModel}</b><b>Q/K: {n} x {dk}</b><b>QK^T: {n} x {n}</b><b>Output: {n} x {dv}</b></div><p className="takeaway">考试 takeaway：QK^T 是 token-token score matrix，shape 是 n x n。</p></section>;
}
