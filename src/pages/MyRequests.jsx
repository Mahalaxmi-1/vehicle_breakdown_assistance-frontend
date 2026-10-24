
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/client";

const STATUS_STEPS = [
  { value: "REQUESTED", label: "Request Submitted" },
  { value: "ACCEPTED", label: "Mechanic Assigned" },
  { value: "ON_THE_WAY", label: "Mechanic On the Way" },
  { value: "IN_SERVICE", label: "Service in Progress" },
  { value: "COMPLETED", label: "Service Completed" },
];

const STATUS_LABELS = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  ON_THE_WAY: "On the Way",
  IN_SERVICE: "In Service",
  COMPLETED: "Completed",
};

const STATUS_CLASSES = {
  REQUESTED: "bg-warning text-dark",
  ACCEPTED: "bg-primary",
  ON_THE_WAY: "bg-info text-dark",
  IN_SERVICE: "bg-secondary",
  COMPLETED: "bg-success",
};

function statusLabel(status) {
  return STATUS_LABELS[status] || status || "Unknown";
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyError, setHistoryError] = useState("");
  const [statusNotice, setStatusNotice] = useState("");

  const previousStatuses = useRef(null);

  const selectedRequest =
    requests.find((request) => request.id === selectedRequestId) || null;

  const loadRequests = useCallback(async () => {
    try {
      const { data } = await api.get("/api/owner/requests");

      if (!Array.isArray(data)) {
        throw new Error("Unexpected owner requests response.");
      }

      const nextStatuses = new Map(
        data.map((request) => [request.id, request.status])
      );

      if (previousStatuses.current !== null) {
        const changed = data.filter((request) => {
          const oldStatus = previousStatuses.current.get(request.id);
          return oldStatus && oldStatus !== request.status;
        });

        if (changed.length > 0) {
          setStatusNotice(
            changed
              .map(
                (request) =>
                  `Request #${request.id}: ${statusLabel(request.status)}`
              )
              .join(" · ")
          );
        }
      }

      previousStatuses.current = nextStatuses;
      setRequests(data);
      setError("");
    } catch (loadError) {
      setError(
        loadError.response?.data?.message ||
          loadError.message ||
          "Unable to refresh your assistance requests."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let inFlight = false;

    const refresh = async () => {
      if (!active || document.hidden || inFlight) return;

      inFlight = true;
      try {
        await loadRequests();
      } finally {
        inFlight = false;
      }
    };

    void refresh();

    const interval = window.setInterval(() => {
      void refresh();
    }, 15000);

    const handleVisibilityChange = () => {
      if (!document.hidden) void refresh();
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

  useEffect(() => {
    if (selectedRequestId === null) {
      setHistory([]);
      setHistoryError("");
      return undefined;
    }

    let active = true;
    let inFlight = false;

    const refreshHistory = async () => {
      if (!active || document.hidden || inFlight) return;

      inFlight = true;
      try {
        const response = await api.get(
          `/api/owner/requests/${selectedRequestId}/history`
        );

        if (active) {
          setHistory(response.data);
          setHistoryError("");
        }
      } catch (historyLoadError) {
        if (active) {
          setHistoryError(
            historyLoadError.response?.data?.message ||
              "Unable to load request history."
          );
        }
      } finally {
        inFlight = false;
      }
    };

    setHistory([]);
    void refreshHistory();

    const interval = window.setInterval(() => {
      void refreshHistory();
    }, 15000);

    const handleVisibilityChange = () => {
      if (!document.hidden) void refreshHistory();
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
  }, [selectedRequestId]);

  const currentStep = selectedRequest
    ? STATUS_STEPS.findIndex(
        (step) => step.value === selectedRequest.status
      )
    : -1;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Requests</h2>
        <p className="text-muted mb-0">
          Track your vehicle assistance requests and service progress.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {statusNotice && (
        <div className="alert alert-info" role="status" aria-live="polite">
          <strong>Request update:</strong> {statusNotice}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">Assistance Requests</h5>

          {loading ? (
            <div className="text-center py-5">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-5">
              <div className="fs-1 mb-3">📋</div>
              <h5>No assistance requests</h5>
              <p className="text-muted mb-0">
                Your submitted requests will appear here.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Vehicle</th>
                    <th>Problem</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td className="fw-semibold">#{request.id}</td>
                      <td>{request.vehicleNumber || "—"}</td>
                      <td>{request.problemCategory || "—"}</td>
                      <td>{request.location || "—"}</td>
                      <td>{formatDate(request.requestedAt)}</td>
                      <td>
                        <span
                          className={`badge ${
                            STATUS_CLASSES[request.status] ||
                            "bg-light text-dark"
                          }`}
                        >
                          {statusLabel(request.status)}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            setSelectedRequestId(request.id)
                          }
                        >
                          Track Request
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedRequest && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <div>
                <h5 className="fw-bold mb-1">
                  Tracking Request #{selectedRequest.id}
                </h5>
                <span
                  className={`badge ${
                    STATUS_CLASSES[selectedRequest.status] ||
                    "bg-light text-dark"
                  }`}
                >
                  {statusLabel(selectedRequest.status)}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedRequestId(null)}
              >
                Close
              </button>
            </div>

            <h6 className="fw-bold mb-3">Service Progress</h6>

            <div className="list-group mb-4">
              {STATUS_STEPS.map((step, index) => {
                const reached = currentStep >= index;
                const isCurrent = currentStep === index;

                return (
                  <div
                    key={step.value}
                    className="list-group-item d-flex align-items-start gap-3 py-3"
                  >
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                        reached
                          ? "bg-success text-white"
                          : "bg-light text-muted border"
                      }`}
                      style={{ width: 32, height: 32 }}
                    >
                      {reached ? "✓" : index + 1}
                    </div>

                    <div>
                      <div
                        className={`fw-semibold ${
                          isCurrent ? "text-primary" : ""
                        }`}
                      >
                        {step.label}
                      </div>
                      {isCurrent && (
                        <small className="text-muted">
                          Current status
                        </small>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedRequest.status === "REQUESTED" &&
              selectedRequest.matchingMessage && (
                <div
                  className={`alert ${
                    selectedRequest.matchingStatus ===
                      "NO_ELIGIBLE_MECHANIC" ||
                    selectedRequest.matchingStatus === "LOCATION_REQUIRED"
                      ? "alert-warning"
                      : "alert-info"
                  }`}
                >
                  {selectedRequest.matchingMessage}
                </div>
              )}

            <h6 className="fw-bold mb-3">Assigned Mechanic</h6>

            {selectedRequest.status === "REQUESTED" ? (
              <div className="alert alert-info">
                Your request is waiting for a mechanic to accept it.
              </div>
            ) : selectedRequest.mechanicName ? (
              <div className="card bg-light border-0 mb-4">
                <div className="card-body">
                  <div className="fw-semibold">
                    {selectedRequest.mechanicName}
                  </div>
                  {selectedRequest.mechanicPhone && (
                    <div className="mt-1">
                      Phone:{" "}
                      <a href={`tel:${selectedRequest.mechanicPhone}`}>
                        {selectedRequest.mechanicPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="alert alert-light border mb-4">
                Mechanic details are not available in the server response yet.
              </div>
            )}

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <strong>Vehicle</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.vehicleNumber || "—"}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Problem</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.problemCategory || "—"}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Location</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.location || "—"}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Requested On</strong>
                <p className="text-muted mb-0">
                  {formatDate(selectedRequest.requestedAt)}
                </p>
              </div>

              <div className="col-12">
                <strong>Description</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.description || "—"}
                </p>
              </div>

              {selectedRequest.serviceDetails && (
                <div className="col-12">
                  <strong>Service Details</strong>
                  <p className="text-muted mb-0">
                    {selectedRequest.serviceDetails}
                  </p>
                </div>
              )}
            </div>

            <h6 className="fw-bold mb-3">Status History</h6>

            {historyError && (
              <div className="alert alert-danger">{historyError}</div>
            )}

            {!historyError && history.length === 0 ? (
              <p className="text-muted">
                No status history is available yet.
              </p>
            ) : (
              <ul className="list-group list-group-flush">
                {history.map((entry, index) => (
                  <li
                    className="list-group-item px-0"
                    key={`${entry.toStatus}-${entry.changedAt || index}-${index}`}
                  >
                    <div className="fw-semibold">
                      {statusLabel(entry.toStatus)}
                    </div>
                    <small className="text-muted">
                      {entry.changedByRole === "MECHANIC"
                        ? entry.changedByName || "Mechanic"
                        : "RoadAssist"}{" "}
                      · {formatDate(entry.changedAt)}
                    </small>
                  </li>
                ))}
              </ul>
            )}

            <p className="small text-muted mt-3 mb-0">
              Request status and history refresh approximately every 15
              seconds while this page is open.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRequests;
