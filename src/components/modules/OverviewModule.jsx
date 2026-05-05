import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";
import StatCard from "../common/StatCard";
import { formatPrice } from "../../utils/dashboardUtils";

export default function OverviewModule({
  foods,
  orders,
  users,
  pendingRequests,
  activeOrders,
  lowStockFoods,
  todayRevenue,
  activityFeed,
  onNavigate,
}) {
  return (
    <>
      <PageHeader
        eyebrow="Control center"
        title="One dashboard to run menu, orders, requests, users, and app operations."
        description="This overview is now its own module, giving you a quick snapshot of the whole platform before you drill into a separate section."
        aside={[
          <div className="hero-highlight" key="active-orders">
            <span className="pill">Active orders</span>
            <strong>{activeOrders.length}</strong>
            <p>Need action from kitchen or delivery</p>
          </div>,
          <div className="hero-highlight alt" key="revenue">
            <span className="pill">Revenue today</span>
            <strong>{formatPrice(todayRevenue)}</strong>
            <p>Based on current order totals</p>
          </div>,
        ]}
      />

      <section className="stats-grid">
        <StatCard
          value={foods.length}
          label="Menu items"
          helper="Live dishes and specials"
        />
        <StatCard
          value={orders.length}
          label="Orders"
          helper="Current order queue"
          tone="gold"
        />
        <StatCard
          value={pendingRequests.length}
          label="Pending requests"
          helper="Waiting for seller review"
          tone="cream"
        />
        <StatCard
          value={users.length}
          label="Users"
          helper="Customers and cooks"
          tone="soft"
        />
      </section>

      <div className="workspace-grid">
        <div className="workspace-main">
          <SectionCard
            title="Module overview"
            subtitle="Jump into a dedicated module for full controls."
          >
            <div className="overview-grid">
              <button
                className="overview-tile"
                onClick={() => onNavigate("menu")}
                type="button"
              >
                <strong>Menu</strong>
                <span>{foods.length} items live right now</span>
              </button>
              <button
                className="overview-tile"
                onClick={() => onNavigate("requests")}
                type="button"
              >
                <strong>Custom requests</strong>
                <span>{pendingRequests.length} requests need review</span>
              </button>
              <button
                className="overview-tile"
                onClick={() => onNavigate("orders")}
                type="button"
              >
                <strong>Orders</strong>
                <span>{activeOrders.length} orders are still in motion</span>
              </button>
              <button
                className="overview-tile"
                onClick={() => onNavigate("users")}
                type="button"
              >
                <strong>Users</strong>
                <span>{users.length} platform accounts to manage</span>
              </button>
              <button
                className="overview-tile"
                onClick={() => onNavigate("app")}
                type="button"
              >
                <strong>App control</strong>
                <span>Platform settings and operational tools</span>
              </button>
              <button
                className="overview-tile"
                onClick={() => onNavigate("network")}
                type="button"
              >
                <strong>Network</strong>
                <span>Cook coverage and customer demand view</span>
              </button>
            </div>
          </SectionCard>
        </div>

        <div className="workspace-side">
          <SectionCard
            title="Today at a glance"
            subtitle="The most important platform updates."
          >
            <div className="insight-list">
              {activityFeed.map((item) => (
                <div className="insight-item" key={item}>
                  <span className="insight-dot" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Platform health"
            subtitle="Quick metrics for service quality."
          >
            <div className="health-grid">
              <div className="health-card">
                <strong>24 min</strong>
                <span>Average delivery time</span>
              </div>
              <div className="health-card">
                <strong>96%</strong>
                <span>Acceptance rate</span>
              </div>
              <div className="health-card">
                <strong>4.8</strong>
                <span>Kitchen satisfaction</span>
              </div>
              <div className="health-card">
                <strong>12</strong>
                <span>Addresses covered</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Priority queue"
            subtitle="Items that deserve attention next."
          >
            <div className="priority-list">
              <div className="priority-item">
                <strong>Pending requests</strong>
                <span>{pendingRequests.length} waiting for reply</span>
              </div>
              <div className="priority-item">
                <strong>Low stock warning</strong>
                <span>{lowStockFoods.length} dishes need refill</span>
              </div>
              <div className="priority-item">
                <strong>Orders in motion</strong>
                <span>{activeOrders.length} active right now</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
