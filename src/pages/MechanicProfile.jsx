import { useState } from "react";

function MechanicProfile() {
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    phone: "9876543210",
    specialization: "Engine & Electrical",
    serviceLocation: "Madhapur, Hyderabad",
    experience: "5",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="p-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          My Profile
        </h2>

        <p className="text-muted mb-0">
          Manage your mechanic profile and service information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h5 className="fw-bold mb-1">
                Mechanic Information
              </h5>

              <p className="text-muted mb-0">
                Keep your service details up to date.
              </p>
            </div>

            {!editing && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}

          </div>

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* Name */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />

              </div>

              {/* Phone */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />

              </div>

              {/* Specialization */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Specialization
                </label>

                <select
                  name="specialization"
                  className="form-select"
                  value={profile.specialization}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                >
                  <option value="Engine & Electrical">
                    Engine & Electrical
                  </option>

                  <option value="Tyre & Wheel">
                    Tyre & Wheel
                  </option>

                  <option value="Battery">
                    Battery
                  </option>

                  <option value="General Repair">
                    General Repair
                  </option>

                  <option value="Fuel System">
                    Fuel System
                  </option>

                  <option value="All Services">
                    All Services
                  </option>
                </select>

              </div>

              {/* Experience */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Experience (Years)
                </label>

                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  min="0"
                  value={profile.experience}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />

              </div>

              {/* Service Location */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Service Location
                </label>

                <textarea
                  name="serviceLocation"
                  className="form-control"
                  rows="2"
                  value={profile.serviceLocation}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                ></textarea>

              </div>

            </div>

            {/* Buttons */}
            {editing && (
              <div className="mt-4">

                <button
                  type="submit"
                  className="btn btn-primary px-4 me-2"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>

              </div>
            )}

          </form>

        </div>

      </div>

      {/* Verification Status */}
      <div className="card border-0 shadow-sm mt-4">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-3">
            Account Status
          </h5>

          <div className="d-flex align-items-center">

            <span className="badge bg-success me-2">
              Verified
            </span>

            <span className="text-muted">
              Your mechanic profile has been verified by the administrator.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MechanicProfile;