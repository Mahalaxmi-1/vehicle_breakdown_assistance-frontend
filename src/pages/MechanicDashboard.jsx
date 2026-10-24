
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

function MechanicDashboard() {
  const [stats, setStats] = useState({
    availableRequests: 0,
    activeServices: 0,
    completedJobs: 0,
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newRequestNotice, setNewRequestNotice] = useState("");
  const seenRequestIds = useRef(null);

  const loadDashboard = useCallback(async () => {
    try {
      const [summary, available] = await Promise.all([
        api.get("/api/mechanic/requests/stats"),
        api.get("/api/mechanic/requests"),
      ]);

      const nextRequests = available.data;
      const nextIds = new Set(
        nextRequests.map((request) => request.id)
      );

      if (seenRequestIds.current !== null) {
        const added = nextRequests.filter(
          (request) => !seenRequestIds.current.has(request.id)
        );

        if (added.length > 0) {
          setNewRequestNotice(
            `${added.length} new assistance request${
              added.length === 1 ? " is" : "s are"
            } available. Open Assistance Requests to review.`
          );
        }
      }

      seenRequestIds.current = nextIds;
      setStats(summary.data);
      setRequests(nextRequests.slice(0, 5));
      setError("");
    } catch (loadError) {
      setError(
        loadError.response?.data?.message ||
          "Unable to refresh your dashboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const refresh = () => {
      if (active && !document.hidden) {
        void loadDashboard();
      }
    };

    refresh();

    const interval = window.setInterval(refresh, 15000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refresh();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadDashboard]);

  const vehicleLabel = (request) =>
    [request.vehicleBrand, request.vehicleModel]
      .filter(Boolean)
      .join(" ") || request.vehicleType || "Vehicle";

  return (
    <div className="dashboard-page">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Mechanic Dashboard 🔧</h2>
            <p className="text-secondary mb-0">
              Manage assistance requests and your service availability.
            </p>
          </div>
          <span className="badge bg-primary fs-6 px-3 py-2">
            Mechanic
          </span>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {newRequestNotice && (
          <div className="alert alert-info" role="status" aria-live="polite">
            <strong>New request:</strong> {newRequestNotice}
            <div className="mt-2">
              <Link
                className="btn btn-sm btn-primary"
                to="/mechanic/requests"
              >
                View Requests
              </Link>
            </div>
          </div>
        )}

        <div className="row g-4 mb-5">
          {[
            ["New Requests", stats.availableRequests, "🆘"],
            ["Active Service", stats.activeServices, "🔧"],
            ["Completed Jobs", stats.completedJobs, "✅"],
          ].map(([label, value, icon]) => (
            <div className="col-md-4" key={label}>
              <div className="card border-0 shadow-sm dashboard-stat-card">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-secondary mb-1">{label}</p>
                      <h3 className="fw-bold mb-0">
                        {loading ? "—" : value ?? 0}
                      </h3>
                    </div>
                    <div className="dashboard-icon">{icon}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <h4 className="fw-bold mb-3">Quick Actions</h4>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="display-6 mb-3">🆘</div>
                  <h5 className="fw-bold">Assistance Requests</h5>
                  <p className="text-secondary">
                    View new breakdown requests and accept suitable jobs.
                  </p>
                  <Link
                    className="btn btn-primary"
                    to="/mechanic/requests"
                  >
                    View Requests
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="display-6 mb-3">⚙️</div>
                  <h5 className="fw-bold">Availability</h5>
                  <p className="text-secondary">
                    Update your availability when you are ready to receive
                    assistance requests.
                  </p>
                  <Link
                    className="btn btn-outline-success"
                    to="/mechanic/availability"
                  >
                    Set Available
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">
              Available Assistance Requests
            </h4>
            <Link
              className="btn btn-sm btn-outline-primary"
              to="/mechanic/requests"
            >
              View All
            </Link>
          </div>

          <div className="card border-0 shadow-sm">
            {loading ? (
              <div className="text-center py-5">
                Loading requests...
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-5">
                <h5>No available requests</h5>
                <p className="text-muted mb-0">
                  New requests will appear here when available.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Request</th>
                      <th>Vehicle</th>
                      <th>Problem</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>#{request.id}</td>
                        <td>
                          {vehicleLabel(request)}
                          {request.vehicleNumber
                            ? ` · ${request.vehicleNumber}`
                            : ""}
                        </td>
                        <td>{request.problemCategory}</td>
                        <td>{request.location || "—"}</td>
                        <td>
                          <Link
                            className="btn btn-sm btn-primary"
                            to="/mechanic/requests"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MechanicDashboard;
