import { useState } from "react";

function MyRequests() {
  const [requests] = useState([
    {
      id: 1001,
      vehicleNumber: "TS09AB1234",
      problemCategory: "Battery",
      description: "Vehicle is not starting.",
      location: "Madhapur, Hyderabad",
      status: "Requested",
      date: "08 Oct 2026",
    },
    {
      id: 1002,
      vehicleNumber: "TS09AB1234",
      problemCategory: "Tyre",
      description: "Rear tyre is punctured.",
      location: "Kondapur, Hyderabad",
      status: "Completed",
      date: "05 Oct 2026",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "Requested":
        return "bg-warning text-dark";

      case "Accepted":
        return "bg-primary";

      case "On the Way":
        return "bg-info text-dark";

      case "In Service":
        return "bg-secondary";

      case "Completed":
        return "bg-success";

      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          My Requests
        </h2>

        <p className="text-muted mb-0">
          Track your vehicle assistance requests.
        </p>
      </div>

      {/* Requests */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            Assistance Requests
          </h5>

          {requests.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1 mb-3">
                📋
              </div>

              <h5>No assistance requests</h5>

              <p className="text-muted">
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

                      <td className="fw-semibold">
                        #{request.id}
                      </td>

                      <td>
                        {request.vehicleNumber}
                      </td>

                      <td>
                        {request.problemCategory}
                      </td>

                      <td>
                        {request.location}
                      </td>

                      <td>
                        {request.date}
                      </td>

                      <td>
                        <span
                          className={`badge ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            setSelectedRequest(request)
                          }
                        >
                          View
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

      {/* Request Details */}
      {selectedRequest && (
        <div className="card border-0 shadow-sm mt-4">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h5 className="fw-bold mb-0">
                Request #{selectedRequest.id}
              </h5>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>

            </div>

            <div className="row g-3">

              <div className="col-md-6">
                <strong>Vehicle</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.vehicleNumber}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Problem</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.problemCategory}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Location</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.location}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Date</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.date}
                </p>
              </div>

              <div className="col-12">
                <strong>Description</strong>
                <p className="text-muted mb-0">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="col-12">
                <strong>Current Status</strong>

                <div className="mt-2">
                  <span
                    className={`badge ${getStatusClass(
                      selectedRequest.status
                    )}`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MyRequests;