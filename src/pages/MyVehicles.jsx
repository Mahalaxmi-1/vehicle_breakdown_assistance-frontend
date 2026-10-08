import { useState } from "react";

function MyVehicles() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNumber: "TS09AB1234",
      vehicleType: "Car",
      brand: "Hyundai",
      model: "Creta",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "Car",
    brand: "",
    model: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === editingId
            ? {
                ...vehicle,
                ...formData,
              }
            : vehicle
        )
      );
    } else {
      const newVehicle = {
        id: Date.now(),
        ...formData,
      };

      setVehicles([...vehicles, newVehicle]);
    }

    resetForm();
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      brand: vehicle.brand,
      model: vehicle.model,
    });

    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (confirmed) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      vehicleNumber: "",
      vehicleType: "Car",
      brand: "",
      model: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Vehicles</h2>

          <p className="text-muted mb-0">
            Manage the vehicles registered to your account.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? "✕ Close" : "+ Add Vehicle"}
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">

            <h5 className="fw-bold mb-4">
              {editingId ? "Edit Vehicle" : "Add New Vehicle"}
            </h5>

            <form onSubmit={handleSubmit}>

              <div className="row g-3">

                {/* Vehicle Number */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    name="vehicleNumber"
                    className="form-control"
                    placeholder="e.g. TS09AB1234"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Vehicle Type */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Vehicle Type
                  </label>

                  <select
                    name="vehicleType"
                    className="form-select"
                    value={formData.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Truck">Truck</option>
                    <option value="Bus">Bus</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Brand */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    className="form-control"
                    placeholder="e.g. Hyundai"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Model */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Model
                  </label>

                  <input
                    type="text"
                    name="model"
                    className="form-control"
                    placeholder="e.g. Creta"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="mt-4">

                <button
                  type="submit"
                  className="btn btn-primary px-4 me-2"
                >
                  {editingId ? "Update Vehicle" : "Save Vehicle"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>
          </div>
        </div>
      )}

      {/* Vehicle List */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            Registered Vehicles
          </h5>

          {vehicles.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1 mb-3">
                🚗
              </div>

              <h5>No vehicles added yet</h5>

              <p className="text-muted">
                Add your vehicle to request roadside assistance.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                + Add Vehicle
              </button>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vehicle Number</th>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {vehicles.map((vehicle, index) => (

                    <tr key={vehicle.id}>

                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {vehicle.vehicleNumber}
                      </td>

                      <td>
                        <span className="badge bg-light text-dark">
                          {vehicle.vehicleType}
                        </span>
                      </td>

                      <td>
                        {vehicle.brand}
                      </td>

                      <td>
                        {vehicle.model}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(vehicle)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          Delete
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

    </div>
  );
}

export default MyVehicles;