import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import Counter from "../../components/Counter";
import { selectCurrentUser, updateProfile, logout } from "../../redux/slices/authSlice";
import { selectUserBookings } from "../../redux/slices/bookingsSlice";
import { selectRentProperties, setListingType } from "../../redux/slices/projectsSlice";
import "./Dashboard.css";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const userBookings = useSelector(selectUserBookings);
  const rentProperties = useSelector(selectRentProperties);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [rentTypeFilter, setRentTypeFilter] = useState("All");
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "Aleem Khan",
    email: currentUser?.email || "aleem@example.com",
    phone: currentUser?.phone || "+92 300 1234567",
    cnic: currentUser?.cnic || "35201-1234567-1",
    address: currentUser?.address || "House 14-B, Sector Z, Phase 6 DHA, Lahore"
  });

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <Link to="/" className="sidebar-logo">
            <span className="logo-symbol">
              <i className="fa-solid fa-gem"></i>
            </span>
            <div className="logo-text">
              <span className="brand-title">ANS</span>
              <span className="brand-sub">DEVELOPERS</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="fa-solid fa-chart-pie nav-icon"></i>
            <span>Dashboard</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <i className="fa-solid fa-folder-open nav-icon"></i>
            <span>My Bookings</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "rentals" ? "active" : ""}`}
            onClick={() => setActiveTab("rentals")}
          >
            <i className="fa-solid fa-key nav-icon" style={{ color: "#16a34a" }}></i>
            <span>Rental Properties</span>
            <span className="sidebar-pill-count" style={{ background: "#dcfce7", color: "#166534" }}>
              {rentProperties.length}
            </span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="fa-solid fa-circle-user nav-icon"></i>
            <span>My Profile</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <i className="fa-solid fa-sliders nav-icon"></i>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link to="/dashboard/admin" className="sidebar-switch-btn">
            <span>Switch to Admin View</span>
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: "4px" }}></i>
          </Link>
          <button 
            type="button" 
            className="sidebar-logout-btn"
            style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
            onClick={() => {
              dispatch(logout());
              navigate("/auth");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-greeting">
            <h1>Welcome, {currentUser?.name?.split(" ")[0] || "Aleem"}!</h1>
            <p>
              {activeTab === "dashboard" && "Here's what's happening with your account (connected via Redux)."}
              {activeTab === "bookings" && "Track construction progress, documents, and possession milestones."}
              {activeTab === "rentals" && "Browse exclusive furnished & semi-furnished properties available for immediate rent."}
              {activeTab === "profile" && "Manage your personal investor profile and official verification documents."}
              {activeTab === "settings" && "Account security and notification preferences."}
            </p>
          </div>

          <div className="topbar-user-area">
            <Link to="/" className="topbar-btn" title="Back to Home Website">
              <span>Website</span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px" }}></i>
            </Link>
            <div className="user-profile-badge">
              <div className="avatar-circle">
                <i className="fa-solid fa-user-check" style={{ fontSize: "16px" }}></i>
              </div>
              <div className="user-profile-info">
                <span className="user-name">{currentUser?.name || "Aleem Khan"}</span>
                <span className="user-role">{currentUser?.role || "Verified Investor"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="dashboard-content-area">
          {/* ================= TAB 1: USER DASHBOARD OVERVIEW ================= */}
          {activeTab === "dashboard" && (
            <>
              {/* Metrics Stats Row */}
              <div className="dashboard-stats-grid">
                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="50">
                  <span className="dash-stat-label">Total Bookings</span>
                  <div className="dash-stat-val">
                    <Counter end={userBookings.length} duration={1200} />
                  </div>
                  <span className="dash-stat-note">Properties under contract</span>
                </div>

                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="100">
                  <span className="dash-stat-label">Active Projects</span>
                  <div className="dash-stat-val">
                    <Counter end={2} duration={1200} />
                  </div>
                  <span className="dash-stat-note">Under active development</span>
                </div>

                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="150">
                  <span className="dash-stat-label">Support Tickets</span>
                  <div className="dash-stat-val">
                    <Counter end={1} duration={1200} />
                  </div>
                  <span className="dash-stat-note">1 resolved inquiry</span>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="dash-section-card" data-aos="fade-up" data-aos-delay="200">
                <div className="dash-card-header">
                  <h3>Recent Bookings</h3>
                  <button className="dash-link-action" onClick={() => setActiveTab("bookings")}>
                    View All <i className="fa-solid fa-arrow-right" style={{ marginLeft: "4px" }}></i>
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBookings.map((item) => (
                        <tr key={item.id}>
                          <td className="project-cell">
                            <div className="customer-info-cell">
                              <i className="fa-solid fa-house-chimney-window" style={{ color: "#c59d5f", fontSize: "16px" }}></i>
                              <strong>{item.project}</strong>
                            </div>
                          </td>
                          <td className="date-cell">{item.date}</td>
                          <td>
                            <span className={`status-badge status-${item.status.toLowerCase()}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="table-action-btn"
                              onClick={() => setSelectedBookingModal(item)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dash-section-card" data-aos="fade-up" data-aos-delay="250">
                <h3 className="dash-card-title">Quick Actions</h3>
                <div className="quick-actions-grid">
                  <Link to="/projects" className="quick-action-card">
                    <div className="qa-icon" style={{ color: "#c59d5f" }}>
                      <i className="fa-solid fa-building-circle-check"></i>
                    </div>
                    <div className="qa-content">
                      <h4>Book a Project</h4>
                      <p>Browse available luxury villas and commercial spaces</p>
                    </div>
                    <i className="fa-solid fa-arrow-right qa-arrow"></i>
                  </Link>

                  <div className="quick-action-card" onClick={() => setActiveTab("profile")}>
                    <div className="qa-icon" style={{ color: "#3b82f6" }}>
                      <i className="fa-solid fa-id-card"></i>
                    </div>
                    <div className="qa-content">
                      <h4>Update Profile</h4>
                      <p>Manage your contact details, tax ID, and billing info</p>
                    </div>
                    <i className="fa-solid fa-arrow-right qa-arrow"></i>
                  </div>

                  <Link to="/contact" className="quick-action-card">
                    <div className="qa-icon" style={{ color: "#10b981" }}>
                      <i className="fa-solid fa-headset"></i>
                    </div>
                    <div className="qa-content">
                      <h4>Contact Support</h4>
                      <p>Reach out to your assigned private relationship manager</p>
                    </div>
                    <i className="fa-solid fa-arrow-right qa-arrow"></i>
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* ================= TAB 2: MY BOOKINGS DETAILED ================= */}
          {activeTab === "bookings" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header">
                <div>
                  <h3>My Property Portfolios & Allotments ({userBookings.length})</h3>
                  <span className="chart-sub-note">Detailed milestone tracking, construction progress, and possession certificates</span>
                </div>
                <Link to="/projects" className="btn-gold" style={{ padding: "8px 16px", fontSize: "12px" }}>
                  + Explore New Projects
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {userBookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <i className="fa-solid fa-building-user" style={{ color: "#c59d5f", fontSize: "18px" }}></i>
                          <h4 style={{ fontSize: "18px", color: "#0f172a" }}>{b.project}</h4>
                          <span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span>
                        </div>
                        <span style={{ fontSize: "13px", color: "#64748b" }}>Allocated Unit: <strong>{b.unit}</strong> • Booking ID: #{b.id}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>Contract Amount</span>
                        <strong style={{ fontSize: "17px", color: "#b88d49" }}>{b.amount}</strong>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginTop: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "6px" }}>
                        <span style={{ color: "#64748b" }}>Development & Construction Progress</span>
                        <strong style={{ color: "#0f172a" }}>{b.progress}% Completed</strong>
                      </div>
                      <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${b.progress}%`,
                            height: "100%",
                            background: b.progress === 100 ? "#10b981" : "linear-gradient(90deg, #dfb776, #c59d5f)",
                            borderRadius: "999px"
                          }}
                        ></div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                      <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                        <i className="fa-solid fa-calendar-day" style={{ marginRight: "6px", color: "#94a3b8" }}></i> Allotment Date: {b.date}
                      </span>
                      <button
                        className="table-action-btn"
                        onClick={() => setSelectedBookingModal(b)}
                      >
                        <i className="fa-solid fa-file-arrow-down" style={{ marginRight: "6px" }}></i>
                        Download Allotment Deed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: RENTAL PROPERTIES (NEW) ================= */}
          {activeTab === "rentals" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header" style={{ flexWrap: "wrap", gap: "14px" }}>
                <div>
                  <h3>Available Rental Properties ({rentProperties.length})</h3>
                  <span className="chart-sub-note">Verified villas, luxury apartments, executive offices, and commercial retail units</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: "6px", background: "#f1f5f9", padding: "4px", borderRadius: "10px" }}>
                    {["All", "Residential", "Commercial"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setRentTypeFilter(cat)}
                        style={{
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          background: rentTypeFilter === cat ? "#16a34a" : "transparent",
                          color: rentTypeFilter === cat ? "#ffffff" : "#64748b"
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <Link
                    to="/projects"
                    className="btn-gold"
                    style={{ padding: "8px 14px", fontSize: "12px" }}
                    onClick={() => dispatch(setListingType("For Rent"))}
                  >
                    View All on Portal <i className="fa-solid fa-arrow-right" style={{ marginLeft: "4px" }}></i>
                  </Link>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "12px" }}>
                {rentProperties
                  .filter((p) => rentTypeFilter === "All" || p.category === rentTypeFilter)
                  .map((p) => (
                    <div
                      key={p.id}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "16px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            background: "rgba(22, 163, 74, 0.9)",
                            color: "#ffffff",
                            fontSize: "10.5px",
                            fontWeight: "700",
                            padding: "3px 10px",
                            borderRadius: "999px"
                          }}
                        >
                          <i className="fa-solid fa-key" style={{ marginRight: "4px" }}></i> For Rent
                        </span>
                        {p.furnishing && (
                          <span
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              background: p.furnishing === "Fully Furnished" ? "#16a34a" : "#d97706",
                              color: "#ffffff",
                              fontSize: "10px",
                              fontWeight: "700",
                              padding: "3px 8px",
                              borderRadius: "999px"
                            }}
                          >
                            {p.furnishing}
                          </span>
                        )}
                      </div>

                      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                          <i className="fa-solid fa-location-dot" style={{ color: "#dfb776" }}></i>
                          <span>{p.location}</span>
                        </div>

                        <h4 style={{ fontSize: "15px", color: "#0f172a", marginBottom: "8px", fontWeight: "700" }}>{p.title}</h4>

                        <div style={{ display: "flex", gap: "10px", fontSize: "11.5px", color: "#64748b", padding: "8px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: "12px" }}>
                          {p.beds > 0 && <span><i className="fa-solid fa-bed" style={{ color: "#dfb776", marginRight: "3px" }}></i>{p.beds} Bed</span>}
                          {p.baths > 0 && <span><i className="fa-solid fa-bath" style={{ color: "#dfb776", marginRight: "3px" }}></i>{p.baths} Bath</span>}
                          <span><i className="fa-solid fa-ruler-combined" style={{ color: "#dfb776", marginRight: "3px" }}></i>{p.area}</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                          <div>
                            <span style={{ fontSize: "10px", color: "#94a3b8", display: "block" }}>Monthly Rent</span>
                            <strong style={{ fontSize: "14px", color: "#16a34a" }}>{p.rentPrice}</strong>
                          </div>
                          <Link
                            to={`/projects/${p.id}`}
                            className="table-action-btn"
                            style={{ background: "#0b1420", color: "#ffffff", padding: "6px 12px", textDecoration: "none" }}
                          >
                            Details <i className="fa-solid fa-arrow-right" style={{ fontSize: "10px", marginLeft: "4px" }}></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: MY PROFILE (CONNECTED TO REDUX) ================= */}
          {activeTab === "profile" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header">
                <div>
                  <h3>Investor Profile & Verification (Redux Store)</h3>
                  <span className="chart-sub-note">Changes here persist across your active session</span>
                </div>
              </div>

              {profileSaved && (
                <div style={{ background: "#dcfce7", color: "#166534", padding: "12px 18px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-circle-check"></i> Profile information saved successfully in Redux!
                </div>
              )}

              <form onSubmit={handleProfileSave}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>Full Name (as per CNIC / Passport)</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>National ID (CNIC)</label>
                    <input
                      type="text"
                      required
                      value={formData.cnic}
                      onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>Residential Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <button type="submit" className="btn-gold">
                    <i className="fa-solid fa-floppy-disk" style={{ marginRight: "6px" }}></i>
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 4: SETTINGS ================= */}
          {activeTab === "settings" && (
            <div className="dash-section-card" data-aos="fade-up">
              <h3 className="dash-card-title">Account & Security Preferences</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#fafaf9", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <strong>SMS Construction Alerts</strong>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Receive automatic SMS notifications when project milestones are completed.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#fafaf9", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <strong>Two-Factor Authentication</strong>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Protect your allotment deeds with WhatsApp verification OTP.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#fafaf9", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <strong>Quarterly Market Insights</strong>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Receive exclusive off-market luxury property rates and previews.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Booking View Modal */}
      {selectedBookingModal && (
        <div className="modal-backdrop" onClick={() => setSelectedBookingModal(null)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Allotment Deed Details</h3>
              <button className="close-btn" onClick={() => setSelectedBookingModal(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Project:</strong> {selectedBookingModal.project}</p>
              <p><strong>Unit / Plot:</strong> {selectedBookingModal.unit || "Luxury Suite"}</p>
              <p><strong>Allotment Date:</strong> {selectedBookingModal.date}</p>
              <p><strong>Total Value:</strong> {selectedBookingModal.amount}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${selectedBookingModal.status.toLowerCase()}`}>{selectedBookingModal.status}</span></p>
              <div style={{ marginTop: "16px", padding: "14px", background: "#f8fafc", borderRadius: "8px", fontSize: "13px", color: "#475569" }}>
                <i className="fa-solid fa-shield-halved" style={{ color: "#10b981", marginRight: "6px" }}></i> Official ANS Developers blockchain-verified certificate and ownership deed.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-gold" onClick={() => { alert("Allotment PDF deed downloaded!"); setSelectedBookingModal(null); }}>
                <i className="fa-solid fa-file-pdf" style={{ marginRight: "6px" }}></i> Download Signed PDF Deed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
