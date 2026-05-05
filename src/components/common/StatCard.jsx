export default function StatCard({ value, label, helper, tone = "warm" }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span className="mini-pill">{label}</span>
      <div className="stat-value">{value}</div>
      <div className="stat-helper">{helper}</div>
    </article>
  );
}
