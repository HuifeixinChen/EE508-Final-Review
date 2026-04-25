import { useState } from "react";

const prompt = ["The", "cat", "sat"];
const generated = ["on", "the", "mat"];

export default function KvCacheStepper() {
  const [step, setStep] = useState(0);
  const [layers, setLayers] = useState(24);
  const [heads, setHeads] = useState(16);
  const [headDim, setHeadDim] = useState(64);
  const [bytes, setBytes] = useState(2);
  const seq = prompt.length + step;
  const memory = 2 * layers * heads * headDim * seq * bytes;
  return <section className="playground"><h3>KV Cache Stepper</h3><p>Prefill: process prompt in parallel and create cache. Decode: compute new token Q/K/V, reuse cached K/V, append new K/V。</p><div className="segmented">{[0, 1, 2, 3].map((s) => <button key={s} className={step === s ? "active" : ""} onClick={() => setStep(s)}>{s === 0 ? "Prefill" : `Decode ${s}`}</button>)}</div><div className="token-row">{[...prompt, ...generated.slice(0, step)].map((t, i) => <span key={`${t}-${i}`}>{t}<small>K/V</small></span>)}</div><div className="grid-4"><label className="control">layers<input type="number" value={layers} onChange={(e) => setLayers(Number(e.target.value))} /></label><label className="control">heads<input type="number" value={heads} onChange={(e) => setHeads(Number(e.target.value))} /></label><label className="control">head_dim<input type="number" value={headDim} onChange={(e) => setHeadDim(Number(e.target.value))} /></label><label className="control">bytes<input type="number" value={bytes} onChange={(e) => setBytes(Number(e.target.value))} /></label></div><div className="big-number">KV memory ≈ {memory.toLocaleString()} bytes</div><p className="takeaway">考试 takeaway：cache K/V because future Q reuses old K/V；old Q is not reused。</p></section>;
}
