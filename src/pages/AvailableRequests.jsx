
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/client";

function AvailableRequests() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [stats, setStats] = useState({ availableRequests: 0 });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [newRequestNotice, setNewRequestNotice] = useState("");
  const [newRequestCount, setNewRequestCount] = useState(0);

  const seenRequestIds = useRef(null);
  const inFlight = useRef(false);

  const loadRequests = useCallback(async ({ showLoading = false } = {}) => {
    if (inFlight.current) return;

    inFlight.current = true;
    if (showLoading) setLoading(true);

    try {
      const [available, mine, summary] = await Promise.all([
        api.get("/api/mechanic/requests"),
        api.get("/api/mechanic/requests/mine"),
        api.get("/api/mechanic/requests/stats"),
      ]);

      if (
        !Array.isArray(available.data) ||
        !Array.isArray(mine.data)
      ) {
        throw new Error("Unexpected requests response from the server.");
      }

      const nextRequests = available.data;
      const nextIds = new Set(
        nextRequests.map((request) => request.id)
      );

      // Avoid treating the initial page load as a new-request notification.
      if (seenRequestIds.current !== null) {
        const added = nextRequests.filter(
          (request) => !seenRequestIds.current.has(request.id)
        );

        if (added.length > 0) {
          setNewRequestCount((count) => count + added.length);
          setNewRequestNotice(
            `${added.length} new assistance request${
              added.length === 1 ? " is" : "s are"
            } available.`
          );
        }
      }

      seenRequestIds.current = nextIds;
      setRequests(nextRequests);
      setAcceptedRequests(mine.data);
      setStats(summary.data);
      setError("");

      setSelectedRequest((current) => {
        if (!current) return null;

        return (
          nextRequests.find((request) => request.id === current.id) || null
        );
      });
    } catch (loadError) {
      setError(
        loadError.response?.data?.message ||
          loadError.message ||
          "Unable to load requests. Please try again."
      );
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const refresh = () => {
      if (active && !document.hidden) {
        void loadRequests();
      }
    };

    void loadRequests({ showLoading: true });

    const interval = window.setInterval(refresh, 15000);

    const handleVisibilityChange = () => {
      if (!document.hidden) refresh();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadRequests]);

  const handleAccept = async (request) => {
    if (!window.confirm(`Accept assistance request #${request.id}?`)) {
      return;
    }

    setAcceptingId(request.id);
    setError("");
    setMessage("");

    try {
      await api.post(`/api/mechanic/requests/${request.id}/accept`);

      setSelectedRequest(null);
      setMessage(`Request #${request.id} has been accepted.`);
      setNewRequestNotice("");
      await loadRequests({ showLoading: false });
    } catch (acceptError) {
      setError(
        acceptError.response?.data?.message ||
          "Unable to accept this request. Refresh and try again."
      );

      await loadRequests({ showLoading: false });
    } finally {
      setAcceptingId(null);
    }
  };

  const dismissNotice = () => {
    setNewRequestNotice("");
    setNewRequestCount(0);
  };

  const statusLabel = (status) =>
    ({
      REQUESTED: "Requested",
      ACCEPTED: "Accepted",
      ON_THE_WAY: "On the Way",
      IN_SERVICE: "In Service",
      COMPLETED: "Completed",
    }[status] || status || "Unknown");

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const vehicleLabel = (request) =>
    [request.vehicleBrand, request.vehicleModel]
      .filter(Boolean)
      .join(" ") ||
    request.vehicleType ||
    "Vehicle";

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Available Requests</h2>
        <p className="text-muted mb-0">
          Review breakdown requests and accept jobs you can handle.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="status">
          {message}
        </div>
      )}

      {newRequestNotice && (
        <div
          className="alert alert-info d-flex flex-wrap justify-content-between align-items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <div>
            <strong>🔔 New assistance requests</strong>
            <div>{newRequestNotice}</div>
            <small>
              Requests refresh automatically every 15 seconds while this
              page is open.
            </small>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => {
                dismissNotice();
                void loadRequests({ showLoading: false });
              }}
            >
              Refresh now
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={dismissNotice}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Available Requests</p>
              <h3 className="fw-bold mb-0">
                {stats.availableRequests ?? requests.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Assigned to You</p>
              <h3 className="fw-bold mb-0">
                {acceptedRequests.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">New Requests Detected</p>
              <h3 className="fw-bold mb-0">{newRequestCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-1">
            <h5 className="fw-bold mb-0">
              Available Assistance Requests
            </h5>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              disabled={loading}
              onClick={() => {
                dismissNotice();
                void loadRequests({ showLoading: true });
              }}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          <p className="small text-muted mb-3">
            The list includes requests returned by the server for your
            account. New eligible requests appear automatically.
          </p>

          {loading ? (
            <div className="text-center py-5">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-5">
              <div className="fs-1 mb-3">✅</div>
              <h5>No available requests</h5>
              <p className="text-muted mb-0">
                New requests will appear here when available.
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {requests.map((request) => (
                <div className="col-12" key={request.id}>
                  <div className="border rounded-3 p-3">
                    <div className="d-flex flex-wrap justify-content-between gap-3">
                      <div>
                        <span className="badge bg-warning text-dark mb-2">
                          {request.problemCategory}
                        </span>

                        <h5 className="fw-bold mb-1">
                          Request #{request.id}
                        </h5>

                        <p className="text-muted mb-1">
                          {vehicleLabel(request)}
                          {request.vehicleNumber
                            ? ` · ${request.vehicleNumber}`
                            : ""}
                        </p>

                        <p className="mb-1">
                          <strong>Location:</strong>{" "}
                          {request.location || "—"}
                        </p>

                        {Number.isFinite(request.distanceKm) && (
                          <p className="text-muted small mb-1">
                            About {request.distanceKm.toFixed(1)} km away
                          </p>
                        )}

                        <p className="text-muted small mb-0">
                          Requested {formatDate(request.requestedAt)}
                        </p>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={acceptingId !== null}
                          onClick={() => handleAccept(request)}
                        >
                          {acceptingId === request.id
                            ? "Accepting..."
                            : "Accept"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedRequest && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                Request #{selectedRequest.id}
              </h5>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <strong>Vehicle</strong>
                <p className="text-muted">
                  {vehicleLabel(selectedRequest)}
                  {selectedRequest.vehicleNumber
                    ? ` (${selectedRequest.vehicleNumber})`
                    : ""}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Problem Category</strong>
                <p className="text-muted">
                  {selectedRequest.problemCategory || "—"}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Location</strong>
                <p className="text-muted">
                  {selectedRequest.location || "—"}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Requested</strong>
                <p className="text-muted">
                  {formatDate(selectedRequest.requestedAt)}
                </p>
              </div>

              <div className="col-12">
                <strong>Problem Description</strong>
                <p className="text-muted">
                  {selectedRequest.description || "—"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              disabled={acceptingId !== null}
              onClick={() => handleAccept(selectedRequest)}
            >
              {acceptingId === selectedRequest.id
                ? "Accepting..."
                : "Accept This Request"}
            </button>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Requests Assigned to You</h5>

          {acceptedRequests.length === 0 ? (
            <p className="text-muted mb-0">
              You have no assigned requests.
            </p>
          ) : (
            acceptedRequests.map((request) => (
              <div
                key={request.id}
                className="d-flex flex-wrap justify-content-between align-items-center border-bottom py-3 gap-2"
              >
                <div>
                  <strong>Request #{request.id}</strong>
                  <p className="text-muted mb-0">
                    {vehicleLabel(request)} · {request.problemCategory}
                  </p>
                </div>

                <span
                  className={`badge ${
                    request.status === "COMPLETED"
                      ? "bg-success"
                      : "bg-primary"
                  }`}
                >
                  {statusLabel(request.status)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AvailableRequests;
