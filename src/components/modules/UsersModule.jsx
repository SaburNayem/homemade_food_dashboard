import PageHeader from "../common/PageHeader";
import SectionCard from "../common/SectionCard";
import { statusClass } from "../../utils/dashboardUtils";

export default function UsersModule({ users }) {
  return (
    <>
      <PageHeader
        eyebrow="Users"
        title="Manage customers and home cooks from a separate user module."
        description="Review roles, statuses, and activity without mixing user management into the other screens."
      />

      <SectionCard
        title="User management"
        subtitle="Handle customers and home cooks from one screen."
      >
        <div className="order-table">
          <div className="table-head user-table">
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined</span>
            <span>Orders</span>
            <span>Action</span>
          </div>
          {users.map((user) => (
            <article className="table-row user-table" key={user.id}>
              <span>{user.name}</span>
              <span>{user.role}</span>
              <span>
                <b className={`status-dot ${statusClass(user.status)}`} />
                {user.status}
              </span>
              <span>{user.joined}</span>
              <span>{user.orders}</span>
              <span>
                <button className="secondary-button compact" type="button">
                  View
                </button>
              </span>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
