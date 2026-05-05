import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";
import {
  formatDateTime,
  formatPrice,
  statusClass,
} from "../../utils/dashboardUtils";

export default function OrdersModule({ orders, onAdvanceOrder }) {
  return (
    <>
      <PageHeader
        eyebrow="Orders"
        title="Advance every order through the kitchen and delivery flow."
        description="Watch ETAs, update statuses, and keep the fulfillment queue moving."
      />

      <SectionCard
        title="Order control"
        subtitle="Advance order status and watch delivery timing."
      >
        <div className="order-table">
          <div className="table-head">
            <span>Order</span>
            <span>Customer</span>
            <span>Status</span>
            <span>Total</span>
            <span>ETA</span>
            <span>Action</span>
          </div>
          {orders.map((order) => (
            <article className="table-row" key={order.id}>
              <span>#{order.id}</span>
              <span>{order.customerName}</span>
              <span>
                <b className={`status-dot ${statusClass(order.status)}`} />
                {order.status}
              </span>
              <span>{formatPrice(order.total)}</span>
              <span>{formatDateTime(order.estimatedDeliveryTime)}</span>
              <span>
                <button
                  className="primary-button compact"
                  disabled={order.status === "delivered"}
                  onClick={() => onAdvanceOrder(order.id)}
                  type="button"
                >
                  {order.status === "delivered" ? "Completed" : "Advance"}
                </button>
              </span>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
