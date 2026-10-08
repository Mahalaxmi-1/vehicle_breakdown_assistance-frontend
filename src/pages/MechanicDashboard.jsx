function MechanicDashboard() {
  return (
    <div className="dashboard-page">
      <div className="container py-5">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Mechanic Dashboard 🔧</h2>
            <p className="text-secondary mb-0">
              Manage assistance requests and your service availability.
            </p>
          </div>

          <span className="badge bg-success fs-6 px-3 py-2">
            Available
          </span>
        </div>

        {/* Statistics */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm dashboard-stat-card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-secondary mb-1">
                      New Requests
                    </p>
                    <h3 className="fw-bold mb-0">
                      3
                    </h3>
                  </div>

                  <div className="dashboard-icon">
                    🆘
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
                      Active Service
                    </p>
                    <h3 className="fw-bold mb-0">
                      1
                    </h3>
                  </div>

                  <div className="dashboard-icon">
                    🔧
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
                      Completed Jobs
                    </p>
                    <h3 className="fw-bold mb-0">
                      12
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
                    🆘
                  </div>

                  <h5 className="fw-bold">
                    Assistance Requests
                  </h5>

                  <p className="text-secondary">
                    View nearby breakdown requests and accept suitable jobs.
                  </p>

                  <button className="btn btn-primary">
                    View Requests
                  </button>

                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="display-6 mb-3">
                    ⚙️
                  </div>

                  <h5 className="fw-bold">
                    Availability
                  </h5>

                  <p className="text-secondary">
                    Update your availability when you are ready to receive
                    assistance requests.
                  </p>

                  <button className="btn btn-outline-success">
                    Set Available
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Assistance Requests */}
        <div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">
              Nearby Assistance Requests
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
                    <th>Request</th>
                    <th>Vehicle</th>
                    <th>Problem</th>
                    <th>Location</th>
                    <th>Distance</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>#REQ101</td>

                    <td>
                      Hyundai i20
                    </td>

                    <td>
                      Battery
                    </td>

                    <td>
                      Hyderabad
                    </td>

                    <td>
                      2.4 km
                    </td>

                    <td>
                      <button className="btn btn-sm btn-primary">
                        Accept
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>#REQ102</td>

                    <td>
                      Honda City
                    </td>

                    <td>
                      Tyre
                    </td>

                    <td>
                      Hyderabad
                    </td>

                    <td>
                      4.1 km
                    </td>

                    <td>
                      <button className="btn btn-sm btn-primary">
                        Accept
                      </button>
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

export default MechanicDashboard;