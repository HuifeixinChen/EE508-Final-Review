import { useMemo, useState } from "react";
import { cosine } from "../utils/math";

export function BpeTfidfChainDemo() {
  const [mergeStep, setMergeStep] = useState(0);
  const [corpus, setCorpus] = useState("cat sat on mat\ncat ate fish\nfish sat");
  const [term, setTerm] = useState("cat");
  const tokens = [["T", "h", "e", " ", "c", "a", "t", " ", "s", "a", "t"], ["Th", "e", " ", "c", "at", " ", "s", "at"], ["The", " ", "cat", " ", "sat"]];
  const docs = corpus.split("\n").filter(Boolean);
  const df = docs.filter((d) => d.toLowerCase().split(/\s+/).includes(term.toLowerCase())).length;
  const tf = docs[0]?.toLowerCase().split(/\s+/).filter((w) => w === term.toLowerCase()).length || 0;
  const idf = Math.log((docs.length || 1) / Math.max(df, 1));
  return <section className="playground"><h3>BPE / TF-IDF / Chain Rule Mini Demo</h3><p>BPE 从 characters/bytes 开始合并 frequent pairs；TF-IDF downweights common words；LM 用 chain rule 分解整句概率。</p><button onClick={() => setMergeStep((mergeStep + 1) % 3)}>merge frequent pairs</button><div className="token-row">{tokens[mergeStep].map((t, i) => <span key={`${t}-${i}`}>{t}</span>)}</div><div className="grid-2"><label className="control">corpus<textarea value={corpus} onChange={(e) => setCorpus(e.target.value)} /></label><label className="control">term<input value={term} onChange={(e) => setTerm(e.target.value)} /></label></div><div className="formula-box">TF(first doc)={tf}, DF={df}, IDF=log({docs.length}/{Math.max(df, 1)})={idf.toFixed(3)}, TF-IDF={(tf * idf).toFixed(3)}</div><div className="formula-box">P(I, am, happy) = P(I) P(am | I) P(happy | I, am)</div><p className="takeaway">考试 takeaway：表示方法从 sparse/无序逐步走向 dense/contextual/sequence-aware。</p></section>;
}

export function CosineVectorDemo() {
  const [ax, setAx] = useState(1);
  const [ay, setAy] = useState(0);
  const [bx, setBx] = useState(0.6);
  const [by, setBy] = useState(0.8);
  const c = useMemo(() => cosine(ax, ay, bx, by), [ax, ay, bx, by]);
  return <section className="playground"><h3>2D Vector Cosine Demo</h3><p>Cosine similarity 比较 direction，不比较 magnitude。</p><div className="grid-4">{[["A.x", ax, setAx], ["A.y", ay, setAy], ["B.x", bx, setBx], ["B.y", by, setBy]].map(([label, value, set]) => <label className="control" key={label as string}>{label as string}<input type="number" step="0.1" value={value as number} onChange={(e) => (set as (n: number) => void)(Number(e.target.value))} /></label>)}</div><svg className="vector-plane" viewBox="-100 -100 200 200"><line x1="-100" y1="0" x2="100" y2="0" /><line x1="0" y1="-100" x2="0" y2="100" /><line x1="0" y1="0" x2={ax * 60} y2={-ay * 60} className="vec-a" /><line x1="0" y1="0" x2={bx * 60} y2={-by * 60} className="vec-b" /></svg><div className="big-number">cos(A,B) = {c.toFixed(3)}</div><p className="takeaway">考试 takeaway：1 same direction，0 orthogonal，-1 opposite。</p></section>;
}
