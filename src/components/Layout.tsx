import type { ReactNode } from "react";
import type { ProgressState, Topic } from "../types";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
  topics: Topic[];
  active: string;
  setActive: (id: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  progress: ProgressState;
}

const sections = [
  { id: "home", label: "Dashboard" },
  { id: "priority", label: "Priority Map" },
  { id: "playgrounds", label: "Playgrounds" },
  { id: "quiz", label: "Quiz Bank" },
  { id: "mock", label: "Mock Final" },
  { id: "cheat", label: "Cheat Sheet" },
  { id: "glossary", label: "Glossary" },
];

export default function Layout({ children, topics, active, setActive, theme, toggleTheme, progress }: Props) {
  return <div className="app-shell"><Sidebar sections={sections} topics={topics} active={active} onNavigate={setActive} /><main className="main"><Header theme={theme} onToggleTheme={toggleTheme} progress={progress} topics={topics} />{children}</main></div>;
}
