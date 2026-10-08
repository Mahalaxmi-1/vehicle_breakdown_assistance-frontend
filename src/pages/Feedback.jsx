import { useState } from "react";

function Feedback() {
  const [services, setServices] = useState([
    {
      id: 1002,
      vehicleNumber: "TS09AB1234",
      problemCategory: "Tyre",
      mechanic: "Rajesh Kumar",
      date: "05 Oct 2026",
      rating: 0,
      comment: "",
      submitted: false,
    },
    {
      id: 998,
      vehicleNumber: "TS09AB1234",
      problemCategory: "Battery",
      mechanic: "Suresh Auto Services",
      date: "22 Sep 2026",
      rating: 5,
      comment: "Good and quick service.",
      submitted: true,
    },
  ]);

  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const openFeedback = (service) => {
    setSelectedService(service);
    setSelectedRating(service.rating || 0);
    setComment(service.comment || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setServices(
      services.map((service) =>
        service.id === selectedService.id
          ? {
              ...service,
              rating: selectedRating,
              comment: comment,
              submitted: true,
            }
          : service
      )
    );

    setSelectedService(null);
    setSelectedRating(0);
    setComment("");
  };

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Feedback
        </h2>

        <p className="text-muted mb-0">
          Rate your completed assistance services and share your experience.
        </p>
      </div>

      {/* Service List */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            Completed Services
          </h5>

          {services.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1 mb-3">
                ⭐
              </div>

              <h5>No completed services</h5>

              <p className="text-muted">
                Feedback can be given after a service is completed.
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
                    <th>Date</th>
                    <th>Feedback</th>
                  </tr>
                </thead>

                <tbody>

                  {services.map((service) => (

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
                        {service.date}
                      </td>

                      <td>

                        {service.submitted ? (

                          <span className="text-success fw-semibold">
                            ⭐ {service.rating}/5
                          </span>

                        ) : (

                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => openFeedback(service)}
                          >
                            Give Feedback
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* Feedback Form */}
      {selectedService && (

        <div className="card border-0 shadow-sm mt-4">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h5 className="fw-bold mb-1">
                  Rate Your Service
                </h5>

                <p className="text-muted mb-0">
                  Request #{selectedService.id} —{" "}
                  {selectedService.mechanic}
                </p>
              </div>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Rating */}
              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Your Rating
                </label>

                <div>
                  {[1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"
                      className="btn p-1"
                      onClick={() => setSelectedRating(star)}
                    >
                      <span
                        style={{
                          fontSize: "32px",
                          color:
                            star <= selectedRating
                              ? "#ffc107"
                              : "#d1d5db",
                        }}
                      >
                        ★
                      </span>
                    </button>

                  ))}
                </div>

                {selectedRating > 0 && (
                  <small className="text-muted">
                    You selected {selectedRating} out of 5 stars.
                  </small>
                )}

              </div>

              {/* Comment */}
              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Comment
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={selectedRating === 0}
              >
                Submit Feedback
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Feedback;