import type { ProgressState, Topic } from "../types";

interface Props {
  topics: Topic[];
  progress: ProgressState;
}

export default function ProgressTracker({ topics, progress }: Props) {
  const done = progress.masteredTopicIds.length;
  const total = topics.length;
  const pct = Math.round((done / total) * 100);
  return <div className="progress-card" aria-label="study progress"><div><b>{pct}%</b><span>{done}/{total} topics mastered</span></div><progress value={done} max={total} /></div>;
}
