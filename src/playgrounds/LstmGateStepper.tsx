import { useMemo, useState } from "react";

export default function LstmGateStepper() {
  const [f, setF] = useState(0.7);
  const [i, setI] = useState(0.5);
  const [o, setO] = useState(0.8);
  const [oldC, setOldC] = useState(0.6);
  const [cand, setCand] = useState(0.4);
  const c = useMemo(() => f * oldC + i * cand, [f, oldC, i, cand]);
  const h = o * Math.tanh(c);
  const slider = (name: string, v: number, set: (n: number) => void) => <label className="control">{name}<input type="range" min="0" max="1" step="0.05" value={v} onChange={(e) => set(Number(e.target.value))} /><b>{v.toFixed(2)}</b></label>;
  return <section className="playground"><h3>LSTM Gate Stepper</h3><p>Step 1 forget old memory；Step 2 compute candidate；Step 3 write new memory；Step 4 expose hidden state。</p><div className="grid-3">{slider("forget f_t", f, setF)}{slider("input i_t", i, setI)}{slider("output o_t", o, setO)}{slider("old C", oldC, setOldC)}{slider("candidate C~", cand, setCand)}</div><div className="formula-box">C_t = {f.toFixed(2)}*{oldC.toFixed(2)} + {i.toFixed(2)}*{cand.toFixed(2)} = {c.toFixed(3)}<br />H_t = {o.toFixed(2)} * tanh(C_t) = {h.toFixed(3)}</div><p className="takeaway">考试 takeaway：forget/input/output gates 分别控制保留、写入、暴露。</p></section>;
}
