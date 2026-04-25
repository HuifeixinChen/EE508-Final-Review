import { useState } from "react";

export default function CudaIndexCalculator() {
  const [blockIdx, setBlockIdx] = useState(6);
  const [blockDim, setBlockDim] = useState(4);
  const [threadIdx, setThreadIdx] = useState(1);
  const i = blockIdx * blockDim + threadIdx;
  return <section className="playground"><h3>CUDA Global Index Calculator</h3><p>1D global index: <code>i = blockIdx.x * blockDim.x + threadIdx.x</code></p><div className="grid-3"><label className="control">blockIdx.x<input type="number" value={blockIdx} onChange={(e) => setBlockIdx(Number(e.target.value))} /></label><label className="control">blockDim.x<input type="number" value={blockDim} onChange={(e) => setBlockDim(Number(e.target.value))} /></label><label className="control">threadIdx.x<input type="number" value={threadIdx} onChange={(e) => setThreadIdx(Number(e.target.value))} /></label></div><div className="big-number">{blockIdx} * {blockDim} + {threadIdx} = {i}</div><p className="takeaway">考试 takeaway：先算 global index，再检查 <code>if (i &lt; N)</code> bounds。</p></section>;
}
