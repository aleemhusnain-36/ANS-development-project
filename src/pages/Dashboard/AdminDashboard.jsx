import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import Counter from "../../components/Counter";
import { selectAllProjects, addProject, deleteProject } from "../../redux/slices/projectsSlice";
import { selectAdminBookings, updateAdminBookingStatus } from "../../redux/slices/bookingsSlice";
import { selectAllInquiries, markInquiryContacted } from "../../redux/slices/inquiriesSlice";
import "./Dashboard.css";

const LISTING_TYPE_TABS = ["All", "For Sale", "For Rent", "New Project"];

const LISTING_BADGE_STYLE = {
  "For Sale":    { background: "#e0f2fe", color: "#0369a1" },
  "For Rent":    { background: "#dcfce7", color: "#166534" },
  "New Project": { background: "#fef3c7", color: "#92400e" },
};

const LISTING_ICON = {
  "For Sale":    "fa-solid fa-tag",
  "For Rent":    "fa-solid fa-key",
  "New Project": "fa-solid fa-building-flag",
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const adminProjects = useSelector(selectAllProjects);
  const bookingsList = useSelector(selectAdminBookings);
  const inquiriesList = useSelector(selectAllInquiries);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [chartPeriod, setChartPeriod] = useState("7days");
  const [hoveredChartPoint, setHoveredChartPoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Dynamic Chart Dataset for Trends
  const chartDatasets = {
    "7days": {
      title: "Weekly Booking Acquisition Curves",
      subNote: "Bookings recorded across the past 7 days",
      yMax: 20,
      ySteps: [20, 15, 10, 0],
      points: [
        { label: "Mon", x: 80,  yVal: 4,  cx: 80,  cy: 150 },
        { label: "Tue", x: 190, yVal: 9,  cx: 190, cy: 110 },
        { label: "Wed", x: 300, yVal: 6,  cx: 300, cy: 130 },
        { label: "Thu", x: 410, yVal: 14, cx: 410, cy: 70 },
        { label: "Fri", x: 520, yVal: 16, cx: 520, cy: 50 },
        { label: "Sat", x: 630, yVal: 11, cx: 630, cy: 90 },
        { label: "Sun", x: 730, yVal: 18, cx: 730, cy: 40 }
      ],
      areaPath: "M 80,150 L 190,110 L 300,130 L 410,70 L 520,50 L 630,90 L 730,40 L 730,180 L 80,180 Z",
      linePath: "M 80,150 L 190,110 L 300,130 L 410,70 L 520,50 L 630,90 L 730,40"
    },
    "30days": {
      title: "Monthly Booking & Revenue Trend",
      subNote: "Monthly cumulative bookings across the year 2026",
      yMax: 30,
      ySteps: [30, 20, 10, 0],
      points: [
        { label: "Jan", x: 80,  yVal: 8,  cx: 80,  cy: 140 },
        { label: "Feb", x: 190, yVal: 12, cx: 190, cy: 115 },
        { label: "Mar", x: 300, yVal: 19, cx: 300, cy: 75 },
        { label: "Apr", x: 410, yVal: 24, cx: 410, cy: 45 },
        { label: "May", x: 520, yVal: 22, cx: 520, cy: 60 },
        { label: "Jun", x: 630, yVal: 27, cx: 630, cy: 35 },
        { label: "Jul", x: 730, yVal: 29, cx: 730, cy: 25 }
      ],
      areaPath: "M 80,140 L 190,110 L 300,75 L 410,45 L 520,60 L 630,35 L 730,25 L 730,180 L 80,180 Z",
      linePath: "M 80,140 L 190,110 L 300,75 L 410,45 L 520,60 L 630,35 L 730,25"
    }
  };
  const currentChart = chartDatasets[chartPeriod] || chartDatasets["7days"];
  const [listingTypeFilter, setListingTypeFilter] = useState("All");
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [imagesList, setImagesList] = useState([]); // Multiple uploaded pictures
  const [newProject, setNewProject] = useState({
    title: "",
    listingType: "For Sale",
    propertyType: "House",
    category: "Residential",
    location: "Islamabad",
    price: "",
    rentPrice: "",
    furnishing: "Unfurnished",
    status: "Under Construction",
    image: ""
  });

  // Customers Directory
  const customersList = [
    { id: "CUST-1", name: "Muhammad Ali", email: "ali@gmail.com", phone: "+92 300 1234567", units: 2, totalSpent: "PKR 170M", status: "Active Investor" },
    { id: "CUST-2", name: "Sana Khan", email: "sana.k@corporate.pk", phone: "+92 321 8765432", units: 1, totalSpent: "PKR 45M", status: "Active Investor" },
    { id: "CUST-3", name: "Usman Tariq", email: "usman@techcorp.com", phone: "+92 333 4567890", units: 3, totalSpent: "PKR 98M", status: "VIP Client" },
    { id: "CUST-4", name: "Bilal Sheikh", email: "bilal.s@holding.com", phone: "+92 302 1122334", units: 1, totalSpent: "PKR 18.5M", status: "Active Investor" },
    { id: "CUST-5", name: "Ayesha Noor", email: "ayesha@designdesk.pk", phone: "+92 345 5566778", units: 1, totalSpent: "PKR 42M", status: "Active Investor" }
  ];

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesList((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagesList((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    const fallbackImage = newProject.category === "Commercial"
      ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

    const primaryImg = imagesList.length > 0 ? imagesList[0] : (newProject.image || fallbackImage);
    const galleryImgs = imagesList.length > 0 ? imagesList : [primaryImg];

    const created = {
      id: Date.now(),
      title: newProject.title,
      listingType: newProject.listingType,
      propertyType: newProject.propertyType,
      category: newProject.category,
      location: newProject.location,
      price: newProject.listingType === "For Rent" ? null : newProject.price,
      rentPrice: newProject.listingType === "For Rent" ? newProject.rentPrice : null,
      furnishing: newProject.furnishing,
      status: newProject.status,
      beds: newProject.category === "Residential" ? 3 : 0,
      baths: newProject.category === "Residential" ? 3 : 2,
      area: "2,500 Sq Ft",
      image: primaryImg,
      gallery: galleryImgs,
      description: "Newly added landmark property managed under ANS Developers portal."
    };
    dispatch(addProject(created));
    setShowAddProjectModal(false);
    setImagesList([]);
    setNewProject({
      title: "",
      listingType: "For Sale",
      propertyType: "House",
      category: "Residential",
      location: "Islamabad",
      price: "",
      rentPrice: "",
      furnishing: "Unfurnished",
      status: "Under Construction",
      image: ""
    });
  };

  const handleUpdateStatus = (index, newStatus) => {
    dispatch(updateAdminBookingStatus({ index, status: newStatus }));
  };

  const filteredBookings = bookingsList.filter((b) => {
    const matchStatus = statusFilter === "All" || b.status.toLowerCase() === statusFilter.toLowerCase();
    const matchSearch = b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

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
              <span className="brand-sub">ADMIN PORTAL</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="fa-solid fa-chart-line nav-icon"></i>
            <span>Dashboard</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <i className="fa-solid fa-building nav-icon"></i>
            <span>Projects</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            <i className="fa-solid fa-users nav-icon"></i>
            <span>Customers</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <i className="fa-solid fa-clipboard-list nav-icon"></i>
            <span>Bookings</span>
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "inquiries" ? "active" : ""}`}
            onClick={() => setActiveTab("inquiries")}
          >
            <i className="fa-solid fa-comments nav-icon"></i>
            <span>Inquiries</span>
            {inquiriesList.filter(i => i.status === "New").length > 0 && (
              <span className="sidebar-pill-count">{inquiriesList.filter(i => i.status === "New").length}</span>
            )}
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <i className="fa-solid fa-gear nav-icon"></i>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link to="/dashboard/user" className="sidebar-switch-btn">
            <span>Switch to Client Portal</span>
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: "4px" }}></i>
          </Link>
          <Link to="/auth" className="sidebar-logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-greeting">
            <h1 style={{ textTransform: "capitalize" }}>
              {activeTab === "dashboard" ? "Dashboard" : activeTab}
            </h1>
            <p>
              {activeTab === "dashboard" && "Real-time analytics across residential, commercial, and development portfolios (Redux state)."}
              {activeTab === "projects" && "Manage development portfolio, construction phases, and unit inventories."}
              {activeTab === "customers" && "Verified high-net-worth investors and property buyers directory."}
              {activeTab === "bookings" && "Official allotment records, verified payment milestones, and agreements."}
              {activeTab === "inquiries" && "Incoming prospective client leads from website and consultation requests."}
              {activeTab === "settings" && "System configurations, company profile, and management permissions."}
            </p>
          </div>

          <div className="topbar-user-area">
            <Link to="/" className="topbar-btn">
              <span>Live Website</span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px" }}></i>
            </Link>
            <div className="user-profile-badge">
              <div className="avatar-circle admin">
                <i className="fa-solid fa-user-shield" style={{ fontSize: "16px" }}></i>
              </div>
              <div className="user-profile-info">
                <span className="user-name">Director Aleem</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Body Content based on activeTab */}
        <div className="dashboard-content-area">
          {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
          {activeTab === "dashboard" && (
            <>
              {/* 4 Stats Cards */}
              <div className="dashboard-stats-grid four-col">
                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="50">
                  <span className="dash-stat-label">Total Projects</span>
                  <div className="dash-stat-val">
                    <Counter end={adminProjects.length} duration={1200} />
                  </div>
                  <span className="dash-stat-note positive">↑ Managed via Redux Store</span>
                </div>

                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="100">
                  <span className="dash-stat-label">Total Customers</span>
                  <div className="dash-stat-val">
                    <Counter end={48} duration={1200} />
                  </div>
                  <span className="dash-stat-note positive">↑ 14% growth vs last month</span>
                </div>

                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="150">
                  <span className="dash-stat-label">Total Bookings</span>
                  <div className="dash-stat-val">
                    <Counter end={bookingsList.length} duration={1200} />
                  </div>
                  <span className="dash-stat-note positive">↑ PKR 820M cumulative volume</span>
                </div>

                <div className="dash-stat-card" data-aos="fade-up" data-aos-delay="200">
                  <span className="dash-stat-label">Active Inquiries</span>
                  <div className="dash-stat-val">
                    <Counter end={inquiriesList.length} duration={1200} />
                  </div>
                  <span className="dash-stat-note neutral">Requires advisor followup</span>
                </div>
              </div>

              {/* Bookings Overview Chart Visual */}
              <div className="dash-section-card chart-card" data-aos="fade-up" data-aos-delay="250">
                <div className="dash-card-header">
                  <div>
                    <h3>{currentChart.title}</h3>
                    <span className="chart-sub-note">{currentChart.subNote}</span>
                  </div>
                  <div className="chart-filter-pills">
                    <button
                      type="button"
                      className={`pill-btn ${chartPeriod === "7days" ? "active" : ""}`}
                      onClick={() => setChartPeriod("7days")}
                      style={{ cursor: "pointer", border: "none" }}
                    >
                      <i className="fa-solid fa-calendar-week" style={{ marginRight: "5px" }}></i>
                      Last 7 Days
                    </button>
                    <button
                      type="button"
                      className={`pill-btn ${chartPeriod === "30days" ? "active" : ""}`}
                      onClick={() => setChartPeriod("30days")}
                      style={{ cursor: "pointer", border: "none" }}
                    >
                      <i className="fa-solid fa-calendar-days" style={{ marginRight: "5px" }}></i>
                      Monthly Trend
                    </button>
                  </div>
                </div>

                {/* SVG Spline Area Chart */}
                <div className="chart-container-box">
                  <svg viewBox="0 0 800 240" className="revenue-area-svg">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dfb776" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#dfb776" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines with Y labels */}
                    <line x1="60" y1="30" x2="760" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <text x="35" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">{currentChart.ySteps[0]}</text>

                    <line x1="60" y1="80" x2="760" y2="80" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <text x="35" y="85" fill="#94a3b8" fontSize="11" textAnchor="middle">{currentChart.ySteps[1]}</text>

                    <line x1="60" y1="130" x2="760" y2="130" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <text x="35" y="135" fill="#94a3b8" fontSize="11" textAnchor="middle">{currentChart.ySteps[2]}</text>

                    <line x1="60" y1="180" x2="760" y2="180" stroke="#e2e8f0" />
                    <text x="35" y="185" fill="#94a3b8" fontSize="11" textAnchor="middle">0</text>

                    {/* Shaded Area */}
                    <path
                      d={currentChart.areaPath}
                      fill="url(#chartGradient)"
                      style={{ transition: "all 0.5s ease" }}
                    />

                    {/* Trend Line */}
                    <path
                      d={currentChart.linePath}
                      fill="none"
                      stroke="#c59d5f"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "all 0.5s ease" }}
                    />

                    {/* Data Points */}
                    {currentChart.points.map((pt, i) => {
                      const isHovered = hoveredChartPoint?.label === pt.label;
                      return (
                        <g
                          key={i}
                          onMouseEnter={() => setHoveredChartPoint(pt)}
                          onMouseLeave={() => setHoveredChartPoint(null)}
                          style={{ cursor: "pointer" }}
                        >
                          <circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={isHovered ? "7" : "5"}
                            fill={isHovered ? "#dfb776" : "#ffffff"}
                            stroke="#c59d5f"
                            strokeWidth="3"
                            style={{ transition: "all 0.2s ease" }}
                          />

                          {/* Hover Tooltip Value */}
                          {isHovered && (
                            <g>
                              <rect
                                x={pt.cx - 24}
                                y={pt.cy - 34}
                                width="48"
                                height="22"
                                rx="6"
                                fill="#0f172a"
                              />
                              <text
                                x={pt.cx}
                                y={pt.cy - 19}
                                fill="#dfb776"
                                fontSize="11"
                                fontWeight="700"
                                textAnchor="middle"
                              >
                                {pt.yVal} deals
                              </text>
                            </g>
                          )}

                          {/* X-axis labels */}
                          <text
                            x={pt.cx}
                            y="210"
                            fill={isHovered ? "#0f172a" : "#94a3b8"}
                            fontSize="12"
                            fontWeight={isHovered ? "700" : "500"}
                            textAnchor="middle"
                          >
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="dash-section-card" data-aos="fade-up" data-aos-delay="300">
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
                        <th>Customer</th>
                        <th>Project</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsList.slice(0, 4).map((b, i) => (
                        <tr key={i}>
                          <td>
                            <div className="customer-info-cell">
                              <span className="customer-avatar">{b.customer[0]}</span>
                              <strong>{b.customer}</strong>
                            </div>
                          </td>
                          <td>{b.project}</td>
                          <td>{b.date}</td>
                          <td>
                            <span className={`status-badge status-${b.status.toLowerCase()}`}>
                              {b.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="table-action-btn"
                              onClick={() => setSelectedBookingModal(b)}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= TAB 2: PROJECTS MANAGEMENT (CONNECTED TO REDUX) ================= */}
          {activeTab === "projects" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header" style={{ flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h3>All Properties &amp; Projects Inventory ({adminProjects.length})</h3>
                  <span className="chart-sub-note">Manage For Sale, For Rent, and New Projects inventories</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                  {/* Listing Type Filter Pills */}
                  <div style={{ display: "flex", gap: "6px", background: "#f1f5f9", padding: "4px", borderRadius: "10px" }}>
                    {LISTING_TYPE_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setListingTypeFilter(tab)}
                        style={{
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          background: listingTypeFilter === tab ? "#0b1420" : "transparent",
                          color: listingTypeFilter === tab ? "#dfb776" : "#64748b"
                        }}
                      >
                        {tab === "All" && <i className="fa-solid fa-layer-group" style={{ marginRight: "5px" }}></i>}
                        {tab !== "All" && <i className={LISTING_ICON[tab]} style={{ marginRight: "5px" }}></i>}
                        {tab}
                      </button>
                    ))}
                  </div>

                  <button
                    className="btn-gold"
                    style={{ padding: "8px 16px", fontSize: "12px" }}
                    onClick={() => setShowAddProjectModal(true)}
                  >
                    <i className="fa-solid fa-plus" style={{ marginRight: "6px" }}></i> Add Property
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Property Title</th>
                      <th>Listing Type</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Price / Rent</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminProjects
                      .filter((p) => listingTypeFilter === "All" || (p.listingType || "For Sale") === listingTypeFilter)
                      .map((p) => {
                        const lType = p.listingType || "For Sale";
                        const bStyle = LISTING_BADGE_STYLE[lType] || { background: "#f1f5f9", color: "#334155" };
                        return (
                          <tr key={p.id}>
                            <td>
                              <div className="customer-info-cell">
                                <img src={p.image} alt={p.title} className="table-thumb" />
                                <div>
                                  <strong>{p.title}</strong>
                                  <span style={{ display: "block", fontSize: "11px", color: "#64748b" }}>
                                    {p.propertyType ? `${p.propertyType} • ` : ""}{p.area}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "4px 10px",
                                  borderRadius: "999px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  background: bStyle.background,
                                  color: bStyle.color
                                }}
                              >
                                <i className={LISTING_ICON[lType] || "fa-solid fa-tag"} style={{ fontSize: "10px" }}></i>
                                {lType}
                              </span>
                            </td>
                            <td><span className="category-pill">{p.category}</span></td>
                            <td>
                              <i className="fa-solid fa-location-dot" style={{ color: "#dfb776", marginRight: "4px" }}></i>
                              {p.location}
                            </td>
                            <td className="amount-cell">
                              {lType === "For Rent" ? (
                                <span style={{ color: "#16a34a", fontWeight: "700" }}>{p.rentPrice || p.price}</span>
                              ) : (
                                p.price
                              )}
                            </td>
                            <td>
                              <span className={`status-badge status-${p.status === "Completed" || p.status === "Available" ? "completed" : "pending"}`}>
                                {p.status}
                              </span>
                            </td>
                            <td>
                              <div className="admin-actions-cell">
                                <Link to={`/projects/${p.id}`} className="icon-btn view" title="View Public Page">
                                  <i className="fa-solid fa-eye"></i>
                                </Link>
                                <button 
                                  className="icon-btn edit" 
                                  title="Delete from Redux"
                                  onClick={() => dispatch(deleteProject(p.id))}
                                >
                                  <i className="fa-solid fa-trash-can" style={{ color: "#ef4444" }}></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 3: CUSTOMERS DIRECTORY ================= */}
          {activeTab === "customers" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header">
                <div>
                  <h3>High-Net-Worth Investors & Buyers ({customersList.length})</h3>
                  <span className="chart-sub-note">Verified client contact directory & investment portfolio records</span>
                </div>
                <button className="dash-link-action" onClick={() => alert("Exporting Investor Directory to Excel...")}>
                  <i className="fa-solid fa-file-excel" style={{ marginRight: "6px" }}></i> Export Directory
                </button>
              </div>

              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Contact Info</th>
                      <th>Allocated Units</th>
                      <th>Total Portfolio Value</th>
                      <th>Investor Tier</th>
                      <th>Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersList.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div className="customer-info-cell">
                            <span className="customer-avatar">{c.name[0]}</span>
                            <div>
                              <strong>{c.name}</strong>
                              <span style={{ display: "block", fontSize: "11px", color: "#94a3b8" }}>{c.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>{c.email}</div>
                          <span style={{ fontSize: "12px", color: "#64748b" }}>{c.phone}</span>
                        </td>
                        <td><strong>{c.units} Property Units</strong></td>
                        <td className="amount-cell">{c.totalSpent}</td>
                        <td>
                          <span className="status-badge status-confirmed">{c.status}</span>
                        </td>
                        <td>
                          <a
                            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="table-action-btn"
                            style={{ background: "#dcfce7", color: "#166534" }}
                          >
                            <i className="fa-brands fa-whatsapp" style={{ marginRight: "6px" }}></i> WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 4: ALL BOOKINGS (CONNECTED TO REDUX) ================= */}
          {activeTab === "bookings" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header">
                <div>
                  <h3>Master Allotment & Bookings Registry (Redux)</h3>
                  <span className="chart-sub-note">Filter, search, and update client payment status</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="Search by client or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Project</th>
                      <th>Date</th>
                      <th>Contract Value</th>
                      <th>Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b, i) => (
                      <tr key={i}>
                        <td>
                          <div className="customer-info-cell">
                            <span className="customer-avatar">{b.customer[0]}</span>
                            <strong>{b.customer}</strong>
                          </div>
                        </td>
                        <td>{b.project}</td>
                        <td>{b.date}</td>
                        <td className="amount-cell">{b.amount}</td>
                        <td>
                          <span className={`status-badge status-${b.status.toLowerCase()}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateStatus(i, e.target.value)}
                            style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "12px", border: "1px solid #cbd5e1" }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 5: INQUIRIES & LEADS (CONNECTED TO REDUX) ================= */}
          {activeTab === "inquiries" && (
            <div className="dash-section-card" data-aos="fade-up">
              <div className="dash-card-header">
                <div>
                  <h3>Client Inquiries & Consultation Leads ({inquiriesList.length})</h3>
                  <span className="chart-sub-note">Prospective buyers awaiting sales advisor response</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {inquiriesList.map((inq) => (
                  <div
                    key={inq.id}
                    style={{
                      background: "#fafaf9",
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "16px"
                    }}
                  >
                    <div style={{ maxWidth: "600px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <strong style={{ fontSize: "16px", color: "#0f172a" }}>{inq.name}</strong>
                        <span className="category-pill">{inq.service}</span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{inq.date}</span>
                      </div>
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: "6px 0 10px" }}>
                        "{inq.message}"
                      </p>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>
                        <i className="fa-solid fa-phone" style={{ marginRight: "6px" }}></i> {inq.phone} • <i className="fa-solid fa-envelope" style={{ marginLeft: "8px", marginRight: "6px" }}></i> {inq.email}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold"
                        style={{ padding: "8px 16px", fontSize: "12px" }}
                      >
                        <i className="fa-brands fa-whatsapp" style={{ marginRight: "6px" }}></i> WhatsApp ↗
                      </a>
                      <button
                        className="table-action-btn"
                        onClick={() => dispatch(markInquiryContacted(inq.id))}
                      >
                        {inq.status === "Contacted" ? (
                          <span>
                            <i className="fa-solid fa-circle-check" style={{ color: "#10b981", marginRight: "4px" }}></i> Contacted
                          </span>
                        ) : (
                          "Mark Contacted"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: SETTINGS ================= */}
          {activeTab === "settings" && (
            <div className="dash-section-card" data-aos="fade-up">
              <h3 className="dash-card-title">Portal & System Settings</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "20px" }}>
                <div className="form-group">
                  <label>Company Display Name</label>
                  <input type="text" defaultValue="ANS Developers (Pvt) Ltd." />
                </div>
                <div className="form-group">
                  <label>Official Headquarters Address</label>
                  <input type="text" defaultValue="Main Boulevard, Gulberg III, Lahore, Pakistan" />
                </div>
                <div className="form-group">
                  <label>Support Phone / WhatsApp</label>
                  <input type="text" defaultValue="+92 300 0000000" />
                </div>
                <div className="form-group">
                  <label>Executive Support Email</label>
                  <input type="email" defaultValue="info@ansdevelopers.com" />
                </div>
              </div>

              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                <button className="btn-gold" onClick={() => alert("System configurations saved!")}>
                  <i className="fa-solid fa-floppy-disk" style={{ marginRight: "6px" }}></i>
                  Save System Configurations
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Booking Details Modal */}
      {selectedBookingModal && (
        <div className="modal-backdrop" onClick={() => setSelectedBookingModal(null)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Booking Allotment Details</h3>
              <button className="close-btn" onClick={() => setSelectedBookingModal(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Customer:</strong> {selectedBookingModal.customer}</p>
              <p><strong>Project:</strong> {selectedBookingModal.project}</p>
              <p><strong>Booking Date:</strong> {selectedBookingModal.date}</p>
              <p><strong>Total Value:</strong> {selectedBookingModal.amount}</p>
              <p><strong>Current Status:</strong> {selectedBookingModal.status}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-gold" onClick={() => setSelectedBookingModal(null)}>
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Project Modal */}
      {showAddProjectModal && (
        <div className="modal-backdrop" onClick={() => setShowAddProjectModal(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Property / Project</h3>
              <button className="close-btn" onClick={() => setShowAddProjectModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleAddProjectSubmit}>
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "70vh", overflowY: "auto" }}>
                <div className="form-group">
                  <label>Property Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palm Villas or Luxury F-10 Apartment"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>Listing Type</label>
                    <select
                      value={newProject.listingType}
                      onChange={(e) => setNewProject({ ...newProject, listingType: e.target.value })}
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                      <option value="New Project">New Project</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Property Type</label>
                    <select
                      value={newProject.propertyType}
                      onChange={(e) => setNewProject({ ...newProject, propertyType: e.target.value })}
                    >
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Office">Office</option>
                      <option value="Shop">Shop</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Development">Development</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Furnishing Status</label>
                    <select
                      value={newProject.furnishing}
                      onChange={(e) => setNewProject({ ...newProject, furnishing: e.target.value })}
                    >
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi Furnished">Semi Furnished</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>City / Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sector F-7, Islamabad"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  />
                </div>

                {newProject.listingType === "For Rent" ? (
                  <div className="form-group">
                    <label>Monthly Rent (PKR)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PKR 150,000 / Month"
                      value={newProject.rentPrice}
                      onChange={(e) => setNewProject({ ...newProject, rentPrice: e.target.value })}
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Price Starting From</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PKR 95,000,000"
                      value={newProject.price}
                      onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Current Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Completed">Completed</option>
                    <option value="Immediate Possession">Immediate Possession</option>
                  </select>
                </div>

                {/* Picture Upload / Image Selection */}
                <div className="form-group" style={{ border: "1.5px dashed #cbd5e1", borderRadius: "12px", padding: "16px", background: "#f8fafc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                      <i className="fa-solid fa-images" style={{ color: "#dfb776" }}></i>
                      Upload Property Pictures (Multiple Allowed)
                    </label>
                    {imagesList.length > 0 && (
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#16a34a", background: "#dcfce7", padding: "2px 8px", borderRadius: "999px" }}>
                        {imagesList.length} Selected
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFileChange}
                      style={{ fontSize: "12.5px" }}
                    />
                    
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Tip: Select multiple photos at once (holding Ctrl / Shift). First picture will be the main cover!</span>

                    {/* Multiple Image Previews Grid */}
                    {imagesList.length > 0 && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: "10px", marginTop: "6px" }}>
                        {imagesList.map((imgSrc, idx) => (
                          <div
                            key={idx}
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "80px",
                              borderRadius: "8px",
                              overflow: "hidden",
                              border: idx === 0 ? "2px solid #dfb776" : "1px solid #e2e8f0"
                            }}
                          >
                            <img
                              src={imgSrc}
                              alt={`Upload ${idx + 1}`}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            {idx === 0 && (
                              <span
                                style={{
                                  position: "absolute",
                                  bottom: "2px",
                                  left: "2px",
                                  background: "#dfb776",
                                  color: "#0b1420",
                                  fontSize: "9px",
                                  fontWeight: "800",
                                  padding: "1px 5px",
                                  borderRadius: "4px"
                                }}
                              >
                                Cover
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              style={{
                                position: "absolute",
                                top: "4px",
                                right: "4px",
                                background: "rgba(239, 68, 68, 0.85)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "50%",
                                width: "18px",
                                height: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontSize: "10px"
                              }}
                              title="Delete picture"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn-gold w-100">
                  <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: "6px" }}></i>
                  Save &amp; Publish to Redux ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
