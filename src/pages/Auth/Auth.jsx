import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Auth.css";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("aleem@example.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Aleem Khan");
  const [phone, setPhone] = useState("+92 300 1234567");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Default logged in as user Aleem
    navigate("/dashboard/user");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/user");
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-backdrop"></div>
      <div className="auth-gradient-overlay"></div>

      <div className="auth-container">
        <div className="auth-card" data-aos="zoom-in" data-aos-duration="600">
          {/* Tab Switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`auth-tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {activeTab === "login" ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group">
                <div className="label-with-link">
                  <label>Password</label>
                  <a href="#forgot" className="forgot-link">Forgot password?</a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <div className="remember-me-row">
                <label className="checkbox-container">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-label">Remember me</span>
                </label>
              </div>

              <button type="submit" className="btn-gold-auth w-100">
                <span>Login</span>
                <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginLeft: "8px" }}></i>
              </button>

              <div className="social-divider">
                <span>Or continue with</span>
              </div>

              <div className="social-buttons-grid">
                <button
                  type="button"
                  className="social-auth-btn"
                  onClick={() => navigate("/dashboard/user")}
                >
                  <i className="fa-brands fa-google" style={{ color: "#EA4335", fontSize: "16px" }}></i>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="social-auth-btn"
                  onClick={() => navigate("/dashboard/user")}
                >
                  <i className="fa-brands fa-facebook" style={{ color: "#1877F2", fontSize: "16px" }}></i>
                  <span>Facebook</span>
                </button>
              </div>

              {/* Demo Quick Navigation Links */}
              <div className="demo-shortcuts-box">
                <span className="demo-shortcuts-title">Quick Demo Portals:</span>
                <div className="demo-btn-group">
                  <Link to="/dashboard/user" className="demo-link-btn">
                    <i className="fa-solid fa-user-tie" style={{ marginRight: "6px" }}></i>
                    Customer Portal (Aleem) →
                  </Link>
                  <Link to="/dashboard/admin" className="demo-link-btn admin">
                    <i className="fa-solid fa-shield-halved" style={{ marginRight: "6px" }}></i>
                    Admin Portal →
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aleem Khan"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="form-group">
                <label>Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                />
              </div>

              <button type="submit" className="btn-gold-auth w-100">
                Create Account ↗
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
