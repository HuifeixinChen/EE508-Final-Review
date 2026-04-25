import type { ComponentType } from "react";
import type { ProgressState, Topic } from "../types";

interface Props {
  topic: Topic;
  progress: ProgressState;
  setProgress: (progress: ProgressState) => void;
  playgrounds: Record<string, ComponentType>;
}

function List({ title, items }: { title: string; items: string[] }) {
  return <section className="content-block"><h3>{title}</h3><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></section>;
}

export default function TopicPage({ topic, progress, setProgress, playgrounds }: Props) {
  const mastered = progress.masteredTopicIds.includes(topic.id);
  const toggle = () => {
    const next = mastered ? progress.masteredTopicIds.filter((id) => id !== topic.id) : [...progress.masteredTopicIds, topic.id];
    setProgress({ masteredTopicIds: next });
  };
  return <article className="topic-page"><div className="topic-hero"><div><span className={`priority ${topic.priority || "medium"}`}>{topic.priority || "study"}</span><h2>{topic.title}</h2><p>{topic.subtitle}</p><div className="tag-row">{topic.tags.map((t) => <span key={t}>{t}</span>)}</div></div><label className="mastery"><input type="checkbox" checked={mastered} onChange={toggle} /> 我掌握了</label></div><div className="two-col"><List title="核心概念" items={topic.concepts} /><List title="为什么重要" items={topic.importance} /><List title="公式" items={topic.formulas} /><List title="直觉解释" items={topic.intuition} /><List title="考试常见问法" items={topic.examQuestions} /><section className="content-block"><h3>标准答题模板</h3><p>{topic.answerTemplate}</p></section><List title="常见错误" items={topic.commonMistakes} /><List title="Mini Quiz" items={topic.miniQuiz} /></div>{topic.playgroundIds?.map((id) => { const P = playgrounds[id]; return P ? <P key={id} /> : null; })}</article>;
}
