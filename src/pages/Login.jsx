import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-75">

          <div className="col-md-6 col-lg-5">

            <div className="card border-0 shadow auth-card">

              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <div className="auth-icon">
                    🚗
                  </div>

                  <h2 className="fw-bold mt-3">
                    Welcome Back
                  </h2>

                  <p className="text-secondary">
                    Login to your RoadAssist account
                  </p>
                </div>

                <form>

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

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Login As
                    </label>

                    <select className="form-select form-select-lg">
                      <option value="">Select role</option>
                      <option value="OWNER">
                        Vehicle Owner
                      </option>
                      <option value="MECHANIC">
                        Mechanic
                      </option>
                      <option value="ADMIN">
                        Administrator
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mt-2"
                  >
                    Login
                  </button>

                </form>

                <div className="text-center mt-4">
                  <p className="mb-0 text-secondary">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Register
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

export default Login;