import { useState } from "react";

const modes = { FP32: 32, FP16: 16, INT8: 8, INT4: 4 } as const;

export default function QuantizationDemo() {
  const [mode, setMode] = useState<keyof typeof modes>("INT8");
  const [x, setX] = useState(0.73);
  const bits = modes[mode];
  const levels = Math.pow(2, bits === 32 || bits === 16 ? 8 : bits);
  const scale = 2 / (levels - 1);
  const q = Math.round((x + 1) / scale);
  const restored = q * scale - 1;
  return <section className="playground"><h3>Quantization Error Demo</h3><p>量化把 high-precision values 映射到 low-precision grid。这里用 toy [-1,1] 均匀量化演示 rounding error。</p><div className="segmented">{Object.keys(modes).map((m) => <button key={m} className={mode === m ? "active" : ""} onClick={() => setMode(m as keyof typeof modes)}>{m}</button>)}</div><label className="control">x<input type="range" min="-1" max="1" step="0.01" value={x} onChange={(e) => setX(Number(e.target.value))} /><b>{x.toFixed(2)}</b></label><div className="metric-grid"><b>memory vs FP32: {(bits / 32).toFixed(3)}x</b><b>q: {q}</b><b>x approx: {restored.toFixed(3)}</b><b>error: {Math.abs(x - restored).toFixed(3)}</b></div><p className="takeaway">考试 takeaway：量化省 memory/bandwidth，但引入 approximation error；softmax/layer norm 常更敏感。</p></section>;
}
