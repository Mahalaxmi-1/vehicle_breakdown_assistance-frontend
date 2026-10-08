function AdminDashboard() {
  return (
    <div className="dashboard-page">
      <div className="container py-5">

        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">
            Admin Dashboard 🛡️
          </h2>

          <p className="text-secondary">
            Monitor and manage the RoadAssist platform.
          </p>
        </div>

        {/* Statistics */}
        <div className="row g-4 mb-5">

          <div className="col-md-3">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <p className="text-secondary mb-1">
                  Vehicle Owners
                </p>

                <h3 className="fw-bold">
                  156
                </h3>

                <div className="dashboard-icon">
                  👤
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <p className="text-secondary mb-1">
                  Mechanics
                </p>

                <h3 className="fw-bold">
                  42
                </h3>

                <div className="dashboard-icon">
                  🔧
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <p className="text-secondary mb-1">
                  Active Requests
                </p>

                <h3 className="fw-bold">
                  18
                </h3>

                <div className="dashboard-icon">
                  🆘
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <p className="text-secondary mb-1">
                  Completed Services
                </p>

                <h3 className="fw-bold">
                  287
                </h3>

                <div className="dashboard-icon">
                  ✅
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Management */}
        <div className="mb-5">

          <h4 className="fw-bold mb-3">
            Platform Management
          </h4>

          <div className="row g-4">

            {/* Users */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    👥
                  </div>

                  <h5 className="fw-bold">
                    Manage Users
                  </h5>

                  <p className="text-secondary">
                    View and manage registered vehicle owners.
                  </p>

                  <button className="btn btn-outline-primary">
                    Manage Users
                  </button>

                </div>
              </div>
            </div>

            {/* Mechanics */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    🔧
                  </div>

                  <h5 className="fw-bold">
                    Manage Mechanics
                  </h5>

                  <p className="text-secondary">
                    Verify and manage service provider accounts.
                  </p>

                  <button className="btn btn-outline-primary">
                    Manage Mechanics
                  </button>

                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    🏷️
                  </div>

                  <h5 className="fw-bold">
                    Problem Categories
                  </h5>

                  <p className="text-secondary">
                    Manage vehicle breakdown problem categories.
                  </p>

                  <button className="btn btn-outline-primary">
                    Manage Categories
                  </button>

                </div>
              </div>
            </div>

            {/* Requests */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    📋
                  </div>

                  <h5 className="fw-bold">
                    Assistance Requests
                  </h5>

                  <p className="text-secondary">
                    Monitor active and completed assistance requests.
                  </p>

                  <button className="btn btn-outline-primary">
                    View Requests
                  </button>

                </div>
              </div>
            </div>

            {/* Service History */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    📊
                  </div>

                  <h5 className="fw-bold">
                    Service History
                  </h5>

                  <p className="text-secondary">
                    Review completed assistance services.
                  </p>

                  <button className="btn btn-outline-primary">
                    View History
                  </button>

                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    ⭐
                  </div>

                  <h5 className="fw-bold">
                    Feedback
                  </h5>

                  <p className="text-secondary">
                    Review ratings and feedback submitted by users.
                  </p>

                  <button className="btn btn-outline-primary">
                    View Feedback
                  </button>

                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div>

          <h4 className="fw-bold mb-3">
            Recent Platform Activity
          </h4>

          <div className="card border-0 shadow-sm">

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">
                  <tr>
                    <th>Activity</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>
                      New mechanic registration
                    </td>

                    <td>
                      Rahul Kumar
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        Pending Verification
                      </span>
                    </td>

                    <td>
                      Today
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Assistance request completed
                    </td>

                    <td>
                      Priya Sharma
                    </td>

                    <td>
                      <span className="badge bg-success">
                        Completed
                      </span>
                    </td>

                    <td>
                      Today
                    </td>
                  </tr>

                  <tr>
                    <td>
                      New vehicle owner registration
                    </td>

                    <td>
                      Arjun Reddy
                    </td>

                    <td>
                      <span className="badge bg-primary">
                        Active
                      </span>
                    </td>

                    <td>
                      Yesterday
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;