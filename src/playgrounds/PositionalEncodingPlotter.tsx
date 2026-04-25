import { useMemo, useState } from "react";

function pe(pos: number, dim: number, dModel: number) {
  const denom = Math.pow(10000, (2 * Math.floor(dim / 2)) / dModel);
  const angle = pos / denom;
  return dim % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
}

export default function PositionalEncodingPlotter() {
  const [position, setPosition] = useState(4);
  const [dim, setDim] = useState(2);
  const [dModel, setDModel] = useState(16);
  const points = useMemo(() => Array.from({ length: 20 }, (_, x) => pe(x, dim, dModel)), [dim, dModel]);
  const value = pe(position, dim, dModel);
  return <section className="playground"><h3>Positional Encoding Plotter</h3><p>Self-attention 本身 permutation-invariant；输入通常是 token embedding + positional encoding。</p><div className="grid-3"><label className="control">position<input type="number" value={position} onChange={(e) => setPosition(Number(e.target.value))} /></label><label className="control">dimension i<input type="number" min="0" value={dim} onChange={(e) => setDim(Number(e.target.value))} /></label><label className="control">d_model<input type="number" min="2" value={dModel} onChange={(e) => setDModel(Number(e.target.value))} /></label></div><svg className="plot" viewBox="0 0 300 120" role="img" aria-label="sinusoidal positional encoding plot"><polyline points={points.map((y, x) => `${x * 15},${60 - y * 45}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="3" /></svg><div className="formula-box">PE({position}, {dim}) = {value.toFixed(4)}；RoPE 则是在 dot-product 前旋转 Q/K。</div><p className="takeaway">考试 takeaway：PE(pos,i) 是位置向量的一个 component，不是整个位置编码。</p></section>;
}
