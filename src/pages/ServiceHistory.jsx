function ServiceHistory() {
  const history = [
    {
      id: 1002,
      vehicleNumber: "TS09AB1234",
      problemCategory: "Tyre",
      mechanic: "Rajesh Kumar",
      serviceDetails: "Rear tyre puncture repaired and air pressure checked.",
      completionDate: "05 Oct 2026",
      status: "Completed",
    },
    {
      id: 998,
      vehicleNumber: "TS09AB1234",
      problemCategory: "Battery",
      mechanic: "Suresh Auto Services",
      serviceDetails: "Battery terminals cleaned and battery checked.",
      completionDate: "22 Sep 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Service History
        </h2>

        <p className="text-muted mb-0">
          View your previous vehicle assistance and service records.
        </p>
      </div>

      {/* History Card */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            Previous Services
          </h5>

          {history.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1 mb-3">
                🕒
              </div>

              <h5>No service history</h5>

              <p className="text-muted">
                Your completed assistance requests will appear here.
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
                    <th>Mechanic</th>
                    <th>Completion Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {history.map((service) => (

                    <tr key={service.id}>

                      <td className="fw-semibold">
                        #{service.id}
                      </td>

                      <td>
                        {service.vehicleNumber}
                      </td>

                      <td>
                        {service.problemCategory}
                      </td>

                      <td>
                        {service.mechanic}
                      </td>

                      <td>
                        {service.completionDate}
                      </td>

                      <td>
                        <span className="badge bg-success">
                          {service.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* Service Details */}
      {history.map((service) => (

        <div
          className="card border-0 shadow-sm mt-3"
          key={service.id}
        >

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h5 className="fw-bold mb-0">
                Request #{service.id}
              </h5>

              <span className="badge bg-success">
                Completed
              </span>

            </div>

            <div className="row g-3">

              <div className="col-md-4">
                <strong>Vehicle</strong>
                <p className="text-muted mb-0">
                  {service.vehicleNumber}
                </p>
              </div>

              <div className="col-md-4">
                <strong>Problem</strong>
                <p className="text-muted mb-0">
                  {service.problemCategory}
                </p>
              </div>

              <div className="col-md-4">
                <strong>Mechanic</strong>
                <p className="text-muted mb-0">
                  {service.mechanic}
                </p>
              </div>

              <div className="col-12">
                <strong>Service Details</strong>
                <p className="text-muted mb-0">
                  {service.serviceDetails}
                </p>
              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ServiceHistory;