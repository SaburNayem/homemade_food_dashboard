import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";
import { statusClass } from "../../utils/dashboardUtils";

export default function NetworkModule({ cooks, customers }) {
  return (
    <>
      <PageHeader
        eyebrow="Network"
        title="Track your cook network and customer activity."
        description="See which kitchens are active and which customers drive the most demand."
      />

      <SectionCard
        title="Cook and customer network"
        subtitle="See which cooks are live and who orders most often."
      >
        <div className="network-grid">
          <div className="network-block">
            <h3>Nearby home cooks</h3>
            <div className="stack-list">
              {cooks.map((cook) => (
                <article className="mini-card" key={cook.id}>
                  <div>
                    <strong>{cook.name}</strong>
                    <p>
                      {cook.area} | {cook.rating} rating | {cook.liveItems} live
                      {" "}items
                    </p>
                  </div>
                  <span className={`status-chip ${statusClass(cook.status)}`}>
                    {cook.status}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="network-block">
            <h3>Customer highlights</h3>
            <div className="stack-list">
              {customers.map((customer) => (
                <article className="mini-card" key={customer.id}>
                  <div>
                    <strong>{customer.name}</strong>
                    <p>
                      {customer.location} | {customer.segment}
                    </p>
                  </div>
                  <span>{customer.orders} orders</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </>
  );
}
