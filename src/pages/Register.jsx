import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("OWNER");

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center py-5">

          <div className="col-md-7 col-lg-6">

            <div className="card border-0 shadow auth-card">

              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">

                  <div className="auth-icon">
                    🚗
                  </div>

                  <h2 className="fw-bold mt-3">
                    Create Account
                  </h2>

                  <p className="text-secondary">
                    Join RoadAssist and get roadside assistance
                  </p>

                </div>

                <form>

                  {/* Account Type */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Account Type
                    </label>

                    <select
                      className="form-select form-select-lg"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="OWNER">
                        Vehicle Owner
                      </option>

                      <option value="MECHANIC">
                        Mechanic / Service Provider
                      </option>
                    </select>
                  </div>

                  {/* Name */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Mechanic Fields */}

                  {role === "MECHANIC" && (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Specialization
                        </label>

                        <select className="form-select form-select-lg">
                          <option value="">
                            Select specialization
                          </option>

                          <option value="GENERAL">
                            General Mechanic
                          </option>

                          <option value="ENGINE">
                            Engine Specialist
                          </option>

                          <option value="ELECTRICAL">
                            Electrical Specialist
                          </option>

                          <option value="TYRE">
                            Tyre Specialist
                          </option>

                          <option value="BATTERY">
                            Battery Specialist
                          </option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Service Location
                        </label>

                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter your service location"
                        />
                      </div>
                    </>
                  )}

                  {/* Password */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Create a password"
                    />
                  </div>

                  {/* Confirm Password */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm your password"
                    />
                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mt-2"
                  >
                    Create Account
                  </button>

                </form>

                <div className="text-center mt-4">

                  <p className="mb-0 text-secondary">
                    Already have an account?{" "}

                    <Link
                      to="/login"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Login
                    </Link>

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;