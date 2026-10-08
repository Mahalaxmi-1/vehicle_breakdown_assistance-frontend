import DashboardSidebar from "./DashboardSidebar";

function DashboardLayout({ role, children }) {
  return (
    <div className="dashboard-layout">

      <DashboardSidebar role={role} />

      <main className="dashboard-content">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;