import { useState } from "react";

export default function ArchitectureToggle() {
  const [mode, setMode] = useState<"encoder" | "decoder" | "encdec">("decoder");
  const blocks = mode === "encoder" ? ["bidirectional self-attention", "feed-forward"] : mode === "decoder" ? ["masked self-attention", "feed-forward"] : ["encoder self-attention", "decoder masked self-attention", "cross-attention", "feed-forward"];
  return <section className="playground"><h3>Transformer Architecture Toggle</h3><p>切换 Encoder-only / Decoder-only / Encoder-decoder，观察 active attention modules。</p><div className="segmented"><button className={mode === "encoder" ? "active" : ""} onClick={() => setMode("encoder")}>Encoder-only</button><button className={mode === "decoder" ? "active" : ""} onClick={() => setMode("decoder")}>Decoder-only</button><button className={mode === "encdec" ? "active" : ""} onClick={() => setMode("encdec")}>Encoder-decoder</button></div><div className="pipeline">{blocks.map((b) => <span key={b}>{b}</span>)}</div><p className="takeaway">考试 takeaway：BERT = encoder-only understanding；GPT = decoder-only causal generation；translation 常用 encoder-decoder。</p></section>;
}
