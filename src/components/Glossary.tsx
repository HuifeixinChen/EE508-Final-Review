import { glossary } from "../data/glossary";

export default function Glossary() {
  return <section className="page"><h2>Glossary</h2><div className="card-grid">{glossary.map((g) => <article className="glossary-card" key={`${g.term}-${g.english}`}><small>{g.topic}</small><h3>{g.term} <span>({g.english})</span></h3><p>{g.definition}</p></article>)}</div></section>;
}
