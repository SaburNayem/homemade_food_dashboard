import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";
import {
  formatDateTime,
  statusClass,
} from "../../utils/dashboardUtils";

export default function RequestsModule({ requests, onUpdateStatus }) {
  return (
    <>
      <PageHeader
        eyebrow="Custom requests"
        title="Review buyer requests and respond with clear kitchen decisions."
        description="Handle special meal requests in one focused module instead of mixing them into the overview."
      />

      <SectionCard
        title="Custom food requests"
        subtitle="Review buyer preferences and respond quickly."
      >
        <div className="stack-list">
          {requests.map((request) => (
            <article className="request-card" key={request.id}>
              <div className="request-header">
                <div>
                  <h3>{request.foodName}</h3>
                  <p>{request.description}</p>
                </div>
                <span className={`status-chip ${statusClass(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <div className="meta-row">
                <span>{request.customerName}</span>
                <span>{request.quantity} servings</span>
                <span>{request.spiceLevel}</span>
                <span>{formatDateTime(request.deliveryDateTime)}</span>
              </div>
              <div className="button-row">
                <button
                  className="secondary-button"
                  onClick={() => onUpdateStatus(request.id, "Rejected")}
                  type="button"
                >
                  Reject
                </button>
                <button
                  className="primary-button"
                  onClick={() => onUpdateStatus(request.id, "Accepted")}
                  type="button"
                >
                  Accept
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
