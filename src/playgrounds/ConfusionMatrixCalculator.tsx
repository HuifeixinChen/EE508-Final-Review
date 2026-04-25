import { useState } from "react";
import { classificationMetrics, fmt } from "../utils/math";

export default function ConfusionMatrixCalculator() {
  const [tp, setTp] = useState(10);
  const [fp, setFp] = useState(5);
  const [fn, setFn] = useState(5);
  const [tn, setTn] = useState(80);
  const m = classificationMetrics(tp, fp, fn, tn);
  const input = (label: string, value: number, set: (v: number) => void) => (
    <label className="control"><span>{label}</span><input type="number" min="0" value={value} onChange={(e) => set(Number(e.target.value))} /></label>
  );
  return <section className="playground"><h3>Confusion Matrix Calculator</h3><p>输入 TP/FP/FN/TN，比较 Accuracy、Precision、Recall、F1。若 TP+FP=0，precision undefined，实践中常按 0 处理。</p><div className="grid-4">{input("TP", tp, setTp)}{input("FP", fp, setFp)}{input("FN", fn, setFn)}{input("TN", tn, setTn)}</div><div className="metric-grid"><b>Accuracy {fmt(m.accuracy)}</b><b>Precision {fmt(m.precision)}</b><b>Recall {fmt(m.recall)}</b><b>F1 {fmt(m.f1)}</b></div><p className="takeaway">考试 takeaway：类别不平衡时先看 minority class 的 recall/F1，不要只报 accuracy。</p></section>;
}
