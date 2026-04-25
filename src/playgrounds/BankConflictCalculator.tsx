import { useState } from "react";
import { bankConflict } from "../utils/math";

export default function BankConflictCalculator() {
  const [stride, setStride] = useState(32);
  const conflict = bankConflict(stride, 32);
  return <section className="playground"><h3>Shared Memory Bank Conflict Calculator</h3><p>假设 32 banks，thread i 访问 <code>shared_mem[base + i * stride]</code>。</p><label className="control">stride<input type="number" value={stride} onChange={(e) => setStride(Number(e.target.value))} /></label><div className="big-number">gcd({stride}, 32) = {conflict}-way</div><table><tbody>{[1, 2, 4, 16, 32, 33].map((s) => <tr key={s}><td>stride {s}</td><td>{bankConflict(s)}-way {bankConflict(s) === 1 ? "no conflict" : "conflict"}</td></tr>)}</tbody></table><p className="takeaway">考试 takeaway：broadcast/multicast 同地址读取是例外；<code>tile[32][33]</code> padding 可把 column stride 32 改成 33。</p></section>;
}
