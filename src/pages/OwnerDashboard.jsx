function OwnerDashboard() {
  return (
    <div className="dashboard-page">
      <div className="container py-5">

        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">Welcome, Vehicle Owner 👋</h2>
          <p className="text-secondary">
            Manage your vehicles and request roadside assistance.
          </p>
        </div>

        {/* Statistics */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary mb-1">
                      My Vehicles
                    </p>
                    <h3 className="fw-bold mb-0">
                      2
                    </h3>
                  </div>

                  <div className="dashboard-icon">
                    🚗
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary mb-1">
                      Active Requests
                    </p>
                    <h3 className="fw-bold mb-0">
                      1
                    </h3>
                  </div>

                  <div className="dashboard-icon">
                    🛠️
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary mb-1">
                      Completed Services
                    </p>
                    <h3 className="fw-bold mb-0">
                      5
                    </h3>
                  </div>

                  <div className="dashboard-icon">
                    ✅
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mb-5">

          <h4 className="fw-bold mb-3">
            Quick Actions
          </h4>

          <div className="row g-4">

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    🚗
                  </div>

                  <h5 className="fw-bold">
                    Manage Vehicles
                  </h5>

                  <p className="text-secondary">
                    Add and manage your vehicle information.
                  </p>

                  <button className="btn btn-outline-primary">
                    Manage Vehicles
                  </button>

                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    🆘
                  </div>

                  <h5 className="fw-bold">
                    Request Assistance
                  </h5>

                  <p className="text-secondary">
                    Report a vehicle breakdown and find nearby assistance.
                  </p>

                  <button className="btn btn-primary">
                    Request Assistance
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Requests */}
        <div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">
              Recent Assistance Requests
            </h4>

            <button className="btn btn-sm btn-outline-primary">
              View All
            </button>
          </div>

          <div className="card border-0 shadow-sm">

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">
                  <tr>
                    <th>Request ID</th>
                    <th>Vehicle</th>
                    <th>Problem</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>#REQ001</td>

                    <td>
                      Hyundai i20
                    </td>

                    <td>
                      Battery
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        Requested
                      </span>
                    </td>

                    <td>
                      Today
                    </td>
                  </tr>

                  <tr>
                    <td>#REQ002</td>

                    <td>
                      Honda City
                    </td>

                    <td>
                      Tyre
                    </td>

                    <td>
                      <span className="badge bg-success">
                        Completed
                      </span>
                    </td>

                    <td>
                      05 Oct 2026
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

export default OwnerDashboard;