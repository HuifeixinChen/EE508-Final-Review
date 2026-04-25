import { useMemo, useState } from "react";
import { softmax } from "../utils/math";

const tokens = ["blue", "cloudy", "stormy", "night", "purple", "quiet"];
const logits = [3.1, 2.2, 1.5, 1.1, 0.8, 0.4];

export default function DecodingPlayground() {
  const [temperature, setTemperature] = useState(1);
  const [mode, setMode] = useState<"greedy" | "topk" | "topp">("greedy");
  const [k, setK] = useState(3);
  const [p, setP] = useState(0.8);
  const probs = useMemo(() => softmax(logits, temperature), [temperature]);
  const sorted = probs.map((prob, i) => ({ token: tokens[i], prob })).sort((a, b) => b.prob - a.prob);
  const selected = mode === "greedy" ? sorted.slice(0, 1) : mode === "topk" ? sorted.slice(0, k) : sorted.filter((_, i) => sorted.slice(0, i + 1).reduce((s, x) => s + x.prob, 0) <= p || i === 0);
  return <section className="playground"><h3>Decoding Strategy Playground</h3><p>模型每步输出 vocabulary distribution；decoding 决定如何选 next token。</p><div className="segmented"><button className={mode === "greedy" ? "active" : ""} onClick={() => setMode("greedy")}>greedy</button><button className={mode === "topk" ? "active" : ""} onClick={() => setMode("topk")}>top-k</button><button className={mode === "topp" ? "active" : ""} onClick={() => setMode("topp")}>top-p</button></div><label className="control">temperature<input type="range" min="0.2" max="2" step="0.1" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} /><b>{temperature.toFixed(1)}</b></label><label className="control">k<input type="range" min="1" max="6" value={k} onChange={(e) => setK(Number(e.target.value))} /><b>{k}</b></label><label className="control">p<input type="range" min="0.2" max="0.99" step="0.01" value={p} onChange={(e) => setP(Number(e.target.value))} /><b>{p.toFixed(2)}</b></label><div className="bar-list">{sorted.map((x) => <div key={x.token} className={selected.some((s) => s.token === x.token) ? "chosen" : ""}><span>{x.token}</span><i style={{ width: `${x.prob * 100}%` }} /><b>{x.prob.toFixed(2)}</b></div>)}</div><p className="takeaway">考试 takeaway：top-k 固定数量；top-p 用累计概率自适应候选集合。</p></section>;
}
