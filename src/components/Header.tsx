import ProgressTracker from "./ProgressTracker";
import type { ProgressState, Topic } from "../types";

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  progress: ProgressState;
  topics: Topic[];
}

export default function Header({ theme, onToggleTheme, progress, topics }: Props) {
  return <header className="topbar"><div><h1>EE-508 Final Exam Interactive Review</h1><p>CUDA · GPU Architecture · Language Models · Transformers · KV Cache · Decoding · RLHF · Quantization</p></div><ProgressTracker topics={topics} progress={progress} /><button className="icon-button" onClick={onToggleTheme} aria-label="Toggle dark or light mode">{theme === "dark" ? "☀" : "☾"}</button></header>;
}
