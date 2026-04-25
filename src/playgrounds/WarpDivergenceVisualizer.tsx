import { useState } from "react";

export default function WarpDivergenceVisualizer() {
  const [mode, setMode] = useState<"even" | "lt32">("even");
  const diverges = mode === "even";
  return <section className="playground"><h3>Warp Divergence Visualizer</h3><p>32 lanes 表示一个 warp。分歧只关心同一 warp 内是否走不同 branch。</p><div className="segmented"><button className={mode === "even" ? "active" : ""} onClick={() => setMode("even")}>threadIdx.x % 2</button><button className={mode === "lt32" ? "active" : ""} onClick={() => setMode("lt32")}>threadIdx.x &lt; 32</button></div><div className="lane-grid">{Array.from({ length: 32 }, (_, i) => <span key={i} className={`lane ${mode === "even" ? (i % 2 === 0 ? "lane-a" : "lane-b") : "lane-a"}`}>{i}</span>)}</div><p className={diverges ? "warn" : "ok"}>{diverges ? "同一 warp 内 even/odd lanes 分支不同，会 divergence。" : "在一个 32-lane warp 内全部 true，不产生同一 warp divergence。"}</p><p className="takeaway">考试 takeaway：不同 warps 走不同路径不等于同一 warp divergence。</p></section>;
}
