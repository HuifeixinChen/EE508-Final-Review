import type { Topic } from "../types";

interface Item {
  id: string;
  label: string;
}

interface Props {
  sections: Item[];
  topics: Topic[];
  active: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ sections, topics, active, onNavigate }: Props) {
  return <aside className="sidebar"><div className="brand">EE-508</div><nav aria-label="Main navigation">{sections.map((s) => <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => onNavigate(s.id)}>{s.label}</button>)}<div className="nav-sep" />{topics.map((t) => <button key={t.id} className={active === t.id ? "active" : ""} onClick={() => onNavigate(t.id)}>{t.navTitle}</button>)}</nav></aside>;
}
