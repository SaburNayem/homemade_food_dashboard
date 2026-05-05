export default function PageHeader({ eyebrow, title, description, aside }) {
  return (
    <header className="hero">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {aside ? <div className="hero-insights">{aside}</div> : null}
    </header>
  );
}
