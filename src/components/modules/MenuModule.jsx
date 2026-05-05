import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";
import { formatPrice, statusClass } from "../../utils/dashboardUtils";

export default function MenuModule({ foods, form, onChange, onSubmit }) {
  return (
    <>
      <PageHeader
        eyebrow="Menu"
        title="Manage dishes, stock, and your live food listings."
        description="Keep the menu current, add new items quickly, and monitor what is selling today."
      />

      <SectionCard
        title="Menu management"
        subtitle="Add dishes, monitor stock, and keep top sellers visible."
      >
        <div className="menu-grid">
          <form className="form-grid menu-form" onSubmit={onSubmit}>
            <label>
              Food name
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="New homemade special"
              />
            </label>
            <label>
              Price
              <input
                name="price"
                value={form.price}
                onChange={onChange}
                placeholder="11"
                type="number"
              />
            </label>
            <label className="full-span">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Freshly prepared homemade dish."
                rows="4"
              />
            </label>
            <label className="full-span">
              Ingredients separated by comma
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={onChange}
                placeholder="Rice, spice, care"
                rows="3"
              />
            </label>
            <label>
              Available quantity
              <input
                name="quantity"
                value={form.quantity}
                onChange={onChange}
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
    </>
  );
}
