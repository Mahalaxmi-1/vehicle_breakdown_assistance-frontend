import { useState } from "react";

function RequestAssistance() {
  const [vehicles] = useState([
    {
      id: 1,
      vehicleNumber: "TS09AB1234",
      vehicleType: "Car",
      brand: "Hyundai",
      model: "Creta",
    },
  ]);

  const [formData, setFormData] = useState({
    vehicleId: "",
    problemCategory: "",
    description: "",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Breakdown Request:", formData);

    setSubmitted(true);

    setFormData({
      vehicleId: "",
      problemCategory: "",
      description: "",
      location: "",
    });
  };

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Request Assistance
        </h2>

        <p className="text-muted mb-0">
          Submit a breakdown request and get help from a nearby mechanic.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div
          className="alert alert-success"
          role="alert"
        >
          <strong>Request submitted successfully!</strong>
          <br />
          Your request has been created and is currently waiting for a mechanic.
        </div>
      )}

      {/* Request Form */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            Breakdown Details
          </h5>

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* Vehicle */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Select Vehicle
                </label>

                <select
                  name="vehicleId"
                  className="form-select"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select your vehicle
                  </option>

                  {vehicles.map((vehicle) => (
                    <option
                      key={vehicle.id}
                      value={vehicle.id}
                    >
                      {vehicle.vehicleNumber} -{" "}
                      {vehicle.brand} {vehicle.model}
                    </option>
                  ))}
                </select>

              </div>

              {/* Problem Category */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Problem Category
                </label>

                <select
                  name="problemCategory"
                  className="form-select"
                  value={formData.problemCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select problem
                  </option>

                  <option value="Battery">
                    🔋 Battery
                  </option>

                  <option value="Tyre">
                    🛞 Tyre
                  </option>

                  <option value="Engine">
                    🔧 Engine
                  </option>

                  <option value="Fuel">
                    ⛽ Fuel
                  </option>

                  <option value="Electrical">
                    ⚡ Electrical
                  </option>

                  <option value="Other">
                    🆘 Other
                  </option>
                </select>

              </div>

              {/* Description */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Problem Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Describe the problem with your vehicle..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>

              {/* Location */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Current Location
                </label>

                <textarea
                  name="location"
                  className="form-control"
                  rows="2"
                  placeholder="Enter your current location..."
                  value={formData.location}
                  onChange={handleChange}
                  required
                ></textarea>

                <small className="text-muted">
                  Later, this will be connected to GPS/location services.
                </small>

              </div>

            </div>

            {/* Submit */}
            <div className="mt-4">

              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                🆘 Submit Assistance Request
              </button>

            </div>

          </form>

        </div>
      </div>

    </div>
  );
}

export default RequestAssistance;