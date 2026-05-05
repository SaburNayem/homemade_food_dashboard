import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";

export default function AppControlModule({ controls }) {
  return (
    <>
      <PageHeader
        eyebrow="App control"
        title="Platform tools and operational controls."
        description="Manage settings, promotions, moderation, and delivery coverage from one place."
      />

      <SectionCard
        title="App management"
        subtitle="Control platform-level settings and operational tools."
      >
        <div className="app-control-grid">
          {controls.map((item) => (
            <article className="control-card" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <button className="primary-button compact" type="button">
                {item.action}
              </button>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
