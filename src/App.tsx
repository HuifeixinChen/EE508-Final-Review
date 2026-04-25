import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import TopicPage from "./components/TopicPage";
import CheatSheet from "./components/CheatSheet";
import Glossary from "./components/Glossary";
import QuizEngine from "./components/QuizEngine";
import { priorityItems, topics } from "./data/topics";
import { formulas } from "./data/formulas";
import { loadProgress, resetAllProgress, saveProgress, THEME_KEY } from "./utils/storage";
import type { PlaygroundMeta, ProgressState } from "./types";
import ConfusionMatrixCalculator from "./playgrounds/ConfusionMatrixCalculator";
import CudaIndexCalculator from "./playgrounds/CudaIndexCalculator";
import WarpDivergenceVisualizer from "./playgrounds/WarpDivergenceVisualizer";
import CoalescingVisualizer from "./playgrounds/CoalescingVisualizer";
import BankConflictCalculator from "./playgrounds/BankConflictCalculator";
import RnnGradientDemo from "./playgrounds/RnnGradientDemo";
import LstmGateStepper from "./playgrounds/LstmGateStepper";
import Seq2SeqAttentionHeatmap from "./playgrounds/Seq2SeqAttentionHeatmap";
import PositionalEncodingPlotter from "./playgrounds/PositionalEncodingPlotter";
import AttentionShapeCalculator from "./playgrounds/AttentionShapeCalculator";
import CausalMaskVisualizer from "./playgrounds/CausalMaskVisualizer";
import MultiHeadAttentionDemo from "./playgrounds/MultiHeadAttentionDemo";
import LossPerplexityCalculator from "./playgrounds/LossPerplexityCalculator";
import KvCacheStepper from "./playgrounds/KvCacheStepper";
import DecodingPlayground from "./playgrounds/DecodingPlayground";
import QuantizationDemo from "./playgrounds/QuantizationDemo";
import { BpeTfidfChainDemo, CosineVectorDemo } from "./playgrounds/NlpMiniDemos";
import FlashAttentionVisual from "./playgrounds/FlashAttentionVisual";
import RlhfPipelineDemo from "./playgrounds/RlhfPipelineDemo";
import ArchitectureToggle from "./playgrounds/ArchitectureToggle";

const hubPlaygrounds: PlaygroundMeta[] = [
  { id: "confusion", title: "Confusion Matrix Calculator", description: "TP/FP/FN/TN -> Accuracy/Precision/Recall/F1", component: ConfusionMatrixCalculator },
  { id: "cudaIndex", title: "CUDA Global Index Calculator", description: "blockIdx/blockDim/threadIdx -> global index", component: CudaIndexCalculator },
  { id: "warp", title: "Warp Divergence Visualizer", description: "32 lanes and branch patterns", component: WarpDivergenceVisualizer },
  { id: "coalescing", title: "Coalesced Memory Access Demo", description: "contiguous vs strided access", component: CoalescingVisualizer },
  { id: "bank", title: "Shared Memory Bank Conflict Calculator", description: "gcd(stride, 32)", component: BankConflictCalculator },
  { id: "rnn", title: "RNN Gradient Demo", description: "W^T vanishing/exploding", component: RnnGradientDemo },
  { id: "lstm", title: "LSTM Gate Stepper", description: "forget/input/output gates", component: LstmGateStepper },
  { id: "seq2seq", title: "Seq2Seq Attention Heatmap", description: "cross-attention alignment", component: Seq2SeqAttentionHeatmap },
  { id: "position", title: "Positional Encoding Plotter", description: "sin/cos components and RoPE intuition", component: PositionalEncodingPlotter },
  { id: "shape", title: "QKV Attention Shape Calculator", description: "Q/K/V, QK^T, output shapes", component: AttentionShapeCalculator },
  { id: "mask", title: "Causal Mask Visualizer", description: "allowed past cells vs future blocks", component: CausalMaskVisualizer },
  { id: "mha", title: "Multi-head Attention Demo", description: "multiple patterns and subspaces", component: MultiHeadAttentionDemo },
  { id: "loss", title: "Cross-Entropy / Perplexity Calculator", description: "-log p and PPL", component: LossPerplexityCalculator },
  { id: "kv", title: "KV Cache Stepper", description: "prefill vs decode and memory estimate", component: KvCacheStepper },
  { id: "decoding", title: "Decoding Strategy Playground", description: "greedy, temperature, top-k, top-p", component: DecodingPlayground },
  { id: "quant", title: "Quantization Error Demo", description: "memory reduction and rounding error", component: QuantizationDemo },
];

const playgrounds = Object.fromEntries([
  ...hubPlaygrounds.map((p) => [p.id, p.component]),
  ["tfidf", BpeTfidfChainDemo],
  ["cosine", CosineVectorDemo],
  ["flash", FlashAttentionVisual],
  ["rlhf", RlhfPipelineDemo],
  ["arch", ArchitectureToggle],
]) as Record<string, React.ComponentType>;

function Home({ setActive, progress }: { setActive: (id: string) => void; progress: ProgressState }) {
  const high = topics.filter((t) => t.priority === "high");
  return <section className="page"><div className="hero-panel"><div><h2>面向 final 的交互式复习仪表盘</h2><p>内容根据课程 PDFs 中 CUDA、NLP/RNN、Transformers、training/evaluation、KV cache、decoding、RLHF 与 quantization 主题重构。没有直接复制 slide images；图示均为原创 CSS/SVG/交互组件。</p></div><button onClick={() => setActive("priority")}>Start Priority Map</button></div><div className="stat-row"><article><b>{topics.length}</b><span>topic pages</span></article><article><b>100</b><span>quiz questions</span></article><article><b>{hubPlaygrounds.length}</b><span>playgrounds</span></article><article><b>{progress.masteredTopicIds.length}</b><span>mastered</span></article></div><section className="content-block"><h3>Source validation</h3><p>主要依据本地课程 PDFs；关键事实对照 NVIDIA CUDA Programming Guide、Attention Is All You Need、FlashAttention paper、Hugging Face generation strategies docs。</p><div className="tag-row"><a href="https://docs.nvidia.com/cuda/cuda-c-programming-guide/" target="_blank">NVIDIA CUDA Guide</a><a href="https://arxiv.org/abs/1706.03762" target="_blank">Attention Is All You Need</a><a href="https://arxiv.org/abs/2205.14135" target="_blank">FlashAttention</a><a href="https://huggingface.co/docs/transformers/en/generation_strategies" target="_blank">HF Generation Strategies</a></div></section><h3>High Priority Topic Cards</h3><div className="card-grid">{high.map((t) => <button className="topic-card" key={t.id} onClick={() => setActive(t.id)}><span className="priority high">high</span><h3>{t.navTitle}</h3><p>{t.subtitle}</p></button>)}</div></section>;
}

function PriorityMap({ setActive }: { setActive: (id: string) => void }) {
  const linkFor = (label: string) => label.includes("CUDA") || label.includes("GPU") || label.includes("SIMT") || label.includes("Warp") || label.includes("Coalesced") || label.includes("bank") ? "cuda" : label.includes("RNN") || label.includes("LSTM") ? "rnn-lstm" : label.includes("Seq2Seq") ? "seq2seq" : label.includes("KV") || label.includes("Prefill") ? "kv-cache" : label.includes("Decoding") ? "decoding" : label.includes("RLHF") ? "rlhf" : label.includes("Quantization") ? "quantization" : label.includes("Flash") ? "flash" : label.includes("NLP") || label.includes("TF-IDF") || label.includes("Cosine") || label.includes("Chain") || label.includes("Word") || label.includes("BoW") ? "nlp" : label.includes("Evaluation") || label.includes("BLEU") || label.includes("perplexity") || label.includes("F1") ? "evaluation" : label.includes("architecture") ? "transformer-arch" : "attention";
  return <section className="page"><h2>Exam Priority Map</h2><p>点击 checklist 项可跳转到对应复习页。</p><div className="priority-list">{priorityItems.map((item) => <button key={item.label} className={`priority-item ${item.priority}`} onClick={() => setActive(linkFor(item.label))}><span>{item.priority}</span>{item.label}</button>)}</div></section>;
}

function PlaygroundHub({ setActive }: { setActive: (id: string) => void }) {
  const [selected, setSelected] = useState(hubPlaygrounds[0].id);
  const current = hubPlaygrounds.find((p) => p.id === selected)!;
  const P = current.component;
  return <section className="page"><h2>Interactive Playground Hub</h2><div className="card-grid">{hubPlaygrounds.map((p) => <button className="topic-card" key={p.id} onClick={() => setSelected(p.id)}><h3>{p.title}</h3><p>{p.description}</p></button>)}</div><P /><button onClick={() => setActive("quiz")}>Practice related quiz</button></section>;
}

function FormulaOverview() {
  const groups = Array.from(new Set(formulas.map((f) => f.group)));
  return <section className="page"><h2>Formula Quick Index</h2><div className="card-grid">{groups.map((g) => <article className="glossary-card" key={g}><h3>{g}</h3><p>{formulas.filter((f) => f.group === g).map((f) => f.label).join(" · ")}</p></article>)}</div></section>;
}

export default function App() {
  const [active, setActive] = useState("home");
  const [progress, setProgressState] = useState<ProgressState>(() => loadProgress());
  const [theme, setTheme] = useState<"dark" | "light">(() => (localStorage.getItem(THEME_KEY) as "dark" | "light") || "dark");
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem(THEME_KEY, theme); }, [theme]);
  const setProgress = (next: ProgressState) => { setProgressState(next); saveProgress(next); };
  const page = useMemo(() => {
    const topic = topics.find((t) => t.id === active);
    if (topic) return <TopicPage topic={topic} progress={progress} setProgress={setProgress} playgrounds={playgrounds} />;
    if (active === "priority") return <PriorityMap setActive={setActive} />;
    if (active === "playgrounds") return <PlaygroundHub setActive={setActive} />;
    if (active === "quiz") return <QuizEngine />;
    if (active === "mock") return <QuizEngine examMode />;
    if (active === "cheat") return <CheatSheet />;
    if (active === "glossary") return <Glossary />;
    if (active === "formulas") return <FormulaOverview />;
    return <Home setActive={setActive} progress={progress} />;
  }, [active, progress]);
  return <Layout topics={topics} active={active} setActive={setActive} theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} progress={progress}>{page}<footer><button onClick={() => { resetAllProgress(); setProgressState({ masteredTopicIds: [] }); }}>Reset all local progress</button><span>LocalStorage keys: ee508-progress · ee508-wrong-answers · ee508-theme</span></footer></Layout>;
}
