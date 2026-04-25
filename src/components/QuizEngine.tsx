import { useMemo, useState } from "react";
import { quizzes } from "../data/quizzes";
import type { Difficulty, QuizQuestion } from "../types";
import { isCorrect, sampleQuestions } from "../utils/quiz";
import { loadWrongAnswers, saveWrongAnswers } from "../utils/storage";

interface Props {
  examMode?: boolean;
}

function QuestionCard({ q, onAnswer }: { q: QuizQuestion; onAnswer: (ok: boolean, answer: string) => void }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ok = submitted && isCorrect(q, answer);
  const submit = () => {
    setSubmitted(true);
    onAnswer(isCorrect(q, answer), answer);
  };
  return <article className="question-card"><div className="question-meta"><span>{q.topic}</span><span>{q.difficulty}</span><span>{q.type}</span></div><h3>{q.id}. {q.question}</h3>{q.options ? <div className="option-list">{q.options.map((o) => <button key={o} className={answer === o ? "active" : ""} onClick={() => setAnswer(o)}>{o}</button>)}</div> : <input className="answer-input" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="输入答案关键词" />}<button onClick={submit} disabled={!answer}>Submit</button>{submitted && <div className={ok ? "feedback ok-box" : "feedback warn-box"}><b>{ok ? "正确" : `不完全正确。参考答案：${q.correctAnswer}`}</b><p>{q.explanation}</p><small>常见错误：{q.commonMistake}</small></div>}</article>;
}

export default function QuizEngine({ examMode = false }: Props) {
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [random, setRandom] = useState(examMode);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [wrongIds, setWrongIds] = useState<string[]>(loadWrongAnswers());
  const [startedAt] = useState(Date.now());
  const topics = Array.from(new Set(quizzes.map((q) => q.topic)));
  const filtered = useMemo(() => {
    const base = quizzes.filter((q) => (topic === "all" || q.topic === topic) && (difficulty === "all" || q.difficulty === difficulty));
    return random ? sampleQuestions(base, examMode ? 30 : Math.min(10, base.length)) : base;
  }, [topic, difficulty, random, examMode]);
  const score = Object.values(answers).filter(Boolean).length;
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  const onAnswer = (id: string, ok: boolean) => {
    const nextAnswers = { ...answers, [id]: ok };
    setAnswers(nextAnswers);
    if (!ok) {
      const nextWrong = Array.from(new Set([...wrongIds, id]));
      setWrongIds(nextWrong);
      saveWrongAnswers(nextWrong);
    }
  };
  const reset = () => {
    setAnswers({});
    setWrongIds([]);
    saveWrongAnswers([]);
  };
  return <section className="page"><div className="quiz-head"><div><h2>{examMode ? "Mock Final Exam" : "Quiz Bank"}</h2><p>{examMode ? "30 questions · timer · score · review wrong answers" : "100 questions · filters · random quiz · wrong-answer history"}</p></div><div className="score-card"><b>{score}/{Object.keys(answers).length || filtered.length}</b><span>{examMode ? `timer ${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}` : `${wrongIds.length} wrong saved`}</span></div></div><div className="toolbar"><select value={topic} onChange={(e) => setTopic(e.target.value)}><option value="all">All topics</option>{topics.map((t) => <option key={t}>{t}</option>)}</select><select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty | "all")}><option value="all">All difficulty</option><option value="easy">easy</option><option value="medium">medium</option><option value="hard">hard</option></select><label><input type="checkbox" checked={random} onChange={(e) => setRandom(e.target.checked)} /> Random quiz</label><button onClick={reset}>Reset progress</button></div><div className="question-list">{filtered.map((q) => <QuestionCard key={`${q.id}-${random}`} q={q} onAnswer={(ok) => onAnswer(q.id, ok)} />)}</div></section>;
}
