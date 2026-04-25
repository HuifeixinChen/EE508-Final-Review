import { useState } from "react";

export default function CoalescingVisualizer() {
  const [stride, setStride] = useState(1);
  const addresses = Array.from({ length: 16 }, (_, i) => i * stride);
  return <section className="playground"><h3>Coalesced Memory Access Demo</h3><p>Good: <code>A[i] = B[i] + C[i]</code>。Bad: <code>B[i * stride]</code> 产生 strided access。</p><label className="control">stride<input type="range" min="1" max="8" value={stride} onChange={(e) => setStride(Number(e.target.value))} /><b>{stride}</b></label><div className="memory-row">{addresses.map((a, i) => <span key={i} className={stride === 1 ? "mem good" : "mem bad"}>T{i}→B[{a}]</span>)}</div><p className={stride === 1 ? "ok" : "warn"}>{stride === 1 ? "连续线程访问连续地址，coalesced。" : "连续线程跨 stride 访问，memory transactions 更低效。"}</p><p className="takeaway">考试 takeaway：row-major 图像 row-wise 通常 coalesced，column-wise 常 strided。</p></section>;
}
