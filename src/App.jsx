import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import AppControlModule from "./components/modules/AppControlModule";
import MenuModule from "./components/modules/MenuModule";
import NetworkModule from "./components/modules/NetworkModule";
import OrdersModule from "./components/modules/OrdersModule";
import OverviewModule from "./components/modules/OverviewModule";
import RequestsModule from "./components/modules/RequestsModule";
import UsersModule from "./components/modules/UsersModule";
import {
  activityFeed,
  appControls,
  cooks,
  customers,
  initialCustomRequests,
  initialFoods,
  initialOrders,
  users,
} from "./data/dashboardData";
import { nextOrderStatus } from "./utils/dashboardUtils";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "menu", label: "Menu" },
  { id: "requests", label: "Custom requests" },
  { id: "orders", label: "Orders" },
  { id: "users", label: "Users" },
  { id: "app", label: "App control" },
  { id: "network", label: "Network" },
];

const initialForm = {
  name: "",
  price: "",
  description: "",
  ingredients: "",
  quantity: "10",
};

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [foods, setFoods] = useState(initialFoods);
  const [customRequests, setCustomRequests] = useState(initialCustomRequests);
  const [orders, setOrders] = useState(initialOrders);
  const [form, setForm] = useState(initialForm);

  const pendingRequests = customRequests.filter(
    (item) => item.status === "Pending",
  );
  const activeOrders = orders.filter((item) => item.status !== "delivered");
  const lowStockFoods = foods.filter((item) => item.status === "Low stock");
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
    setForm(initialForm);
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

  const overviewProps = {
    foods,
    orders,
    users,
    pendingRequests,
    activeOrders,
    lowStockFoods,
    todayRevenue,
    activityFeed,
  };

  const moduleMap = {
    overview: <OverviewModule {...overviewProps} onNavigate={setActiveView} />,
    menu: (
      <MenuModule
        foods={foods}
        form={form}
        onChange={handleChange}
        onSubmit={handleAddItem}
      />
    ),
    requests: (
      <RequestsModule
        requests={customRequests}
        onUpdateStatus={updateRequestStatus}
      />
    ),
    orders: <OrdersModule orders={orders} onAdvanceOrder={advanceOrderStatus} />,
    users: <UsersModule users={users} />,
    app: <AppControlModule controls={appControls} />,
    network: <NetworkModule cooks={cooks} customers={customers} />,
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        navItems={navItems}
        onNavigate={setActiveView}
      />
      <main className="content">{moduleMap[activeView]}</main>
    </div>
  );
}
