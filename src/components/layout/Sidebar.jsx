export default function Sidebar({ activeView, navItems, onNavigate }) {
  return (
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
            onClick={() => onNavigate(item.id)}
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
        <button className="secondary-button" type="button">
          Logout
        </button>
      </div>
    </aside>
  );
}
