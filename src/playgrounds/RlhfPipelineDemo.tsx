import { useState } from "react";

export default function RlhfPipelineDemo() {
  const [choice, setChoice] = useState<"A" | "B" | null>(null);
  return <section className="playground"><h3>RLHF Pipeline Demo</h3><p>Pretrained LM → SFT → reward model → PPO/RL optimization + KL penalty → aligned assistant。</p><div className="pipeline">{["Pretrained LM", "SFT", "Reward Model", "PPO/RL + KL", "Aligned Assistant"].map((x) => <span key={x}>{x}</span>)}</div><div className="preference"><button className={choice === "A" ? "active" : ""} onClick={() => setChoice("A")}>Response A: 简短但遗漏风险</button><button className={choice === "B" ? "active" : ""} onClick={() => setChoice("B")}>Response B: 有帮助且更安全</button></div><p>{choice ? `Human preference: ${choice}。Reward model 学习给偏好回答更高分。` : "请选择更好的回答。"}</p><p className="takeaway">考试 takeaway：RLHF 用 ranking 训练 reward model，再优化 policy，但要防 reward hacking。</p></section>;
}
