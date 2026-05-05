import { useState } from "react";
import {
  activityFeed,
  cooks,
  customers,
  initialCustomRequests,
  initialFoods,
  initialOrders,
} from "./data/dashboardData";

const orderFlow = ["placed", "accepted", "cooking", "picked up", "delivered"];

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "menu", label: "Menu" },
  { id: "requests", label: "Custom requests" },
  { id: "orders", label: "Orders" },
  { id: "network", label: "Network" },
];

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function nextOrderStatus(status) {
  const currentIndex = orderFlow.indexOf(status);
  if (currentIndex === -1 || currentIndex === orderFlow.length - 1) {
    return status;
  }
  return orderFlow[currentIndex + 1];
}

function statusClass(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function SectionCard({ title, subtitle, children, action, className = "" }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <div className="panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatCard({ value, label, helper, tone = "warm" }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span className="mini-pill">{label}</span>
      <div className="stat-value">{value}</div>
      <div className="stat-helper">{helper}</div>
    </article>
  );
}

function App() {
  const [activeView, setActiveView] = useState("overview");
  const [foods, setFoods] = useState(initialFoods);
  const [customRequests, setCustomRequests] = useState(initialCustomRequests);
  const [orders, setOrders] = useState(initialOrders);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    ingredients: "",
    quantity: "10",
  });

  const activeOrders = orders.filter((item) => item.status !== "delivered");
  const pendingRequests = customRequests.filter(
    (item) => item.status === "Pending",
  );
  const todayRevenue = orders.reduce((sum, item) => sum + item.total, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    const nextFood = {
      id: `seller-food-${foods.length + 1}`,
      name: form.name.trim() || "New homemade special",
      category: "Custom food",
      price: Number(form.price) || 11,
      description:
        form.description.trim() || "Freshly prepared homemade dish.",
      imageUrl:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      ingredients: form.ingredients,
      stock: Number(form.quantity) || 10,
      ordersToday: 0,
      status: "Live",
    };

    setFoods((current) => [nextFood, ...current]);
    setForm({
      name: "",
      price: "",
      description: "",
      ingredients: "",
      quantity: "10",
    });
    setActiveView("menu");
  };

  const updateRequestStatus = (requestId, status) => {
    setCustomRequests((current) =>
      current.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    );
  };

  const advanceOrderStatus = (orderId) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, status: nextOrderStatus(order.status) }
          : order,
      ),
    );
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-badge">HB</div>
          <div>
            <h1>HomeMade Bites</h1>
            <p>Operations dashboard</p>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? "active" : ""}`}
              onClick={() => setActiveView(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="seller-card">
          <span className="pill">Live kitchen</span>
          <h3>Sharmeen Kitchen</h3>
          <p>Traditional Bengali lunch and home-style specials.</p>
          <div className="seller-meta">
            <span>Banani, Dhaka</span>
            <span>4.9 rating</span>
          </div>
          <button className="secondary-button">Logout</button>
        </div>
      </aside>

      <main className="content">
        <header className="hero">
          <div>
            <span className="eyebrow">Control center</span>
            <h2>One dashboard to run menu, orders, requests, cooks, and customer activity.</h2>
            <p>
              This view is now broader than a seller-only page, so the dashboard
              can handle most day-to-day platform operations from one place.
            </p>
          </div>
          <div className="hero-insights">
            <div className="hero-highlight">
              <span className="pill">Active orders</span>
              <strong>{activeOrders.length}</strong>
              <p>Need action from kitchen or delivery</p>
            </div>
            <div className="hero-highlight alt">
              <span className="pill">Revenue today</span>
              <strong>{formatPrice(todayRevenue)}</strong>
              <p>Based on current order totals</p>
            </div>
          </div>
        </header>

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
            value={customers.length}
            label="Customers"
            helper="Tracked regular buyers"
            tone="soft"
          />
        </section>

        <div className="workspace-grid">
          <div className="workspace-main">
            {(activeView === "overview" || activeView === "menu") && (
              <SectionCard
                title="Menu management"
                subtitle="Add dishes, monitor stock, and keep top sellers visible."
                action={
                  <button
                    className="primary-button"
                    onClick={() => setActiveView("menu")}
                    type="button"
                  >
                    Focus menu
                  </button>
                }
              >
                <div className="menu-grid">
                  <form className="form-grid menu-form" onSubmit={handleAddItem}>
                    <label>
                      Food name
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="New homemade special"
                      />
                    </label>
                    <label>
                      Price
                      <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="11"
                        type="number"
                      />
                    </label>
                    <label className="full-span">
                      Description
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Freshly prepared homemade dish."
                        rows="4"
                      />
                    </label>
                    <label className="full-span">
                      Ingredients separated by comma
                      <textarea
                        name="ingredients"
                        value={form.ingredients}
                        onChange={handleChange}
                        placeholder="Rice, spice, care"
                        rows="3"
                      />
                    </label>
                    <label>
                      Available quantity
                      <input
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="10"
                        type="number"
                      />
                    </label>
                    <div className="form-actions full-span">
                      <button className="secondary-button" type="button">
                        Upload food image
                      </button>
                      <button className="primary-button" type="submit">
                        Add item
                      </button>
                    </div>
                  </form>

                  <div className="menu-list">
                    {foods.map((food) => (
                      <article className="menu-item" key={food.id}>
                        <img alt={food.name} src={food.imageUrl} />
                        <div className="menu-copy">
                          <div className="menu-topline">
                            <h3>{food.name}</h3>
                            <span className={`status-chip ${statusClass(food.status)}`}>
                              {food.status}
                            </span>
                          </div>
                          <p>{food.description}</p>
                          <div className="meta-row">
                            <span>{food.category}</span>
                            <span>{formatPrice(food.price)}</span>
                            <span>{food.stock} in stock</span>
                            <span>{food.ordersToday} sold today</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </SectionCard>
            )}

            {(activeView === "overview" || activeView === "requests") && (
              <SectionCard
                title="Custom food requests"
                subtitle="Review buyer preferences and respond quickly."
              >
                <div className="stack-list">
                  {customRequests.map((request) => (
                    <article className="request-card" key={request.id}>
                      <div className="request-header">
                        <div>
                          <h3>{request.foodName}</h3>
                          <p>{request.description}</p>
                        </div>
                        <span
                          className={`status-chip ${statusClass(request.status)}`}
                        >
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
                          onClick={() => updateRequestStatus(request.id, "Rejected")}
                          type="button"
                        >
                          Reject
                        </button>
                        <button
                          className="primary-button"
                          onClick={() => updateRequestStatus(request.id, "Accepted")}
                          type="button"
                        >
                          Accept
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionCard>
            )}

            {(activeView === "overview" || activeView === "orders") && (
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
                          onClick={() => advanceOrderStatus(order.id)}
                          type="button"
                        >
                          {order.status === "delivered" ? "Completed" : "Advance"}
                        </button>
                      </span>
                    </article>
                  ))}
                </div>
              </SectionCard>
            )}

            {(activeView === "overview" || activeView === "network") && (
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
                              {cook.area} • {cook.rating} rating • {cook.liveItems} live items
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
                              {customer.location} • {customer.segment}
                            </p>
                          </div>
                          <span>{customer.orders} orders</span>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}
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
                  <span>
                    {foods.filter((item) => item.status === "Low stock").length} dishes need refill
                  </span>
                </div>
                <div className="priority-item">
                  <strong>Orders in motion</strong>
                  <span>{activeOrders.length} active right now</span>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
