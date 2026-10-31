import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AOS from "aos";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { setListingType } from "../../redux/slices/projectsSlice";
import "./PortalsHub.css";

export default function PortalsHub() {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="portals-hub-page">
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner portals-hero-banner">
        <div className="banner-content" data-aos="fade-up">
          <span className="section-tag" style={{ color: "#dfb776" }}>• ANS DIGITAL ECOSYSTEM •</span>
          <h1 className="banner-title">ANS Portals &amp; Portfolios</h1>
          <div className="banner-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="current">Portals Gateway</span>
          </div>
        </div>
      </section>

      {/* Main Portals Showcase Grid */}
      <section className="portals-grid-section">
        <div className="portals-container">
          <div className="portals-section-header" data-aos="fade-up">
            <h2 className="section-title">Select Your Digital Portal</h2>
            <p className="section-subtitle">
              Secure, role-based gateways for property buyers, investors, executive management, and authorized real estate partners.
            </p>
          </div>

          {/* 2×2 Grid — 4 Portal Cards */}
          <div className="portals-card-grid four-grid">

            {/* PORTAL 1: Customer / Investor Portal */}
            <div className="portal-access-card" data-aos="fade-up" data-aos-delay="100">
              <div className="portal-card-top">
                <div className="portal-icon-pill client">
                  <i className="fa-solid fa-user-tie" style={{ color: "#c59d5f" }}></i>
                </div>
                <span className="portal-badge client">Investor &amp; Buyer</span>
              </div>

              <h3 className="portal-card-title">Customer &amp; Investor Portal</h3>
              <p className="portal-card-desc">
                Dedicated management portal for property owners and investors to track development, installments, and official documents.
              </p>

              <ul className="portal-features-list">
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Live construction progress bars &amp; milestone tracking</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Instant access to signed Allotment Deeds &amp; payment receipts</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Personalized dashboard for <strong>Aleem Khan</strong></span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Browse &amp; save rental &amp; sale properties from your portal</span>
                </li>
              </ul>

              <div className="portal-card-action">
                <Link to="/dashboard/user" className="btn-gold w-100">
                  <span>Enter Client Portal (Aleem)</span>
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                </Link>
                <Link to="/auth" className="portal-sublink">
                  Need to register a new unit? Login / Register
                </Link>
              </div>
            </div>

            {/* PORTAL 2: Executive Admin Portal (featured) */}
            <div className="portal-access-card featured" data-aos="fade-up" data-aos-delay="200">
              <div className="portal-card-top">
                <div className="portal-icon-pill admin">
                  <i className="fa-solid fa-shield-halved" style={{ color: "#dfb776" }}></i>
                </div>
                <span className="portal-badge admin">Executive &amp; Operations</span>
              </div>

              <h3 className="portal-card-title">Executive Admin Portal</h3>
              <p className="portal-card-desc">
                Comprehensive enterprise command center for executive leadership, sales heads, and site engineers.
              </p>

              <ul className="portal-features-list">
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Real-time KPI metrics (Projects, Bookings, Customers, Leads)</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Interactive weekly &amp; monthly booking acquisition curves</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Full property inventory — For Sale, For Rent &amp; New Projects</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Direct client leads CRM &amp; WhatsApp response management</span>
                </li>
              </ul>

              <div className="portal-card-action">
                <Link to="/dashboard/admin" className="btn-gold w-100">
                  <span>Enter Admin Management Portal</span>
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                </Link>
                <span className="portal-sublink">
                  Requires 2FA Super-Admin Authentication
                </span>
              </div>
            </div>

            {/* PORTAL 3: Rental Management Portal — NEW */}
            <div className="portal-access-card rental" data-aos="fade-up" data-aos-delay="300">
              <div className="portal-card-top">
                <div className="portal-icon-pill rental-icon">
                  <i className="fa-solid fa-key" style={{ color: "#16a34a" }}></i>
                </div>
                <span className="portal-badge rental-badge">Rental Listings</span>
              </div>

              <div className="portal-new-tag">
                <i className="fa-solid fa-sparkles" style={{ marginRight: "4px" }}></i> NEW
              </div>

              <h3 className="portal-card-title">Rental Management Portal</h3>
              <p className="portal-card-desc">
                Explore premium furnished and semi-furnished residential and commercial properties available for immediate rent across Pakistan.
              </p>

              <ul className="portal-features-list">
                <li>
                  <i className="fa-solid fa-circle-check p-check" style={{ color: "#16a34a" }}></i>
                  <span>Houses, Flats, Apartments &amp; Portions for rent</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check" style={{ color: "#16a34a" }}></i>
                  <span>Offices, Shops &amp; Commercial spaces for lease</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check" style={{ color: "#16a34a" }}></i>
                  <span>Furnishing status — Unfurnished, Semi &amp; Fully Furnished</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check" style={{ color: "#16a34a" }}></i>
                  <span>Instant WhatsApp inquiry to property manager</span>
                </li>
              </ul>

              <div className="portal-card-action">
                <Link
                  to="/projects"
                  className="btn-rent w-100"
                  onClick={() => dispatch(setListingType("For Rent"))}
                >
                  <i className="fa-solid fa-key" style={{ marginRight: "8px" }}></i>
                  <span>Browse Rental Listings</span>
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                </Link>
                <Link to="/contact" className="portal-sublink">
                  List your property with ANS — Contact us
                </Link>
              </div>
            </div>

            {/* PORTAL 4: Broker & Partner Portal */}
            <div className="portal-access-card" data-aos="fade-up" data-aos-delay="400">
              <div className="portal-card-top">
                <div className="portal-icon-pill partner">
                  <i className="fa-solid fa-handshake" style={{ color: "#3b82f6" }}></i>
                </div>
                <span className="portal-badge partner">Brokers &amp; Associates</span>
              </div>

              <h3 className="portal-card-title">Partner &amp; Broker Portal</h3>
              <p className="portal-card-desc">
                Authorized platform for real estate agencies, overseas sales partners, and certified commercial brokers.
              </p>

              <ul className="portal-features-list">
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Download official CDA/LDA NOCs, blueprints &amp; floor plans</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Protected client lead registration with timestamp locking</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>Real-time commission tracking &amp; disbursement ledger</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check p-check"></i>
                  <span>High-resolution promotional marketing collateral</span>
                </li>
              </ul>

              <div className="portal-card-action">
                <button
                  className="btn-dark w-100"
                  onClick={() => alert("Partner registration & brokerage verification required. Please contact admin@ansdevelopers.com.")}
                >
                  <span>Apply For Broker Access</span>
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                </button>
                <Link to="/contact" className="portal-sublink">
                  Inquire about partnership terms
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Security & Reliability Callout */}
      <section className="portal-security-section">
        <div className="portals-container">
          <div className="security-banner-box" data-aos="zoom-in">
            <div className="sec-icon">
              <i className="fa-solid fa-lock" style={{ color: "#dfb776" }}></i>
            </div>
            <div className="sec-text">
              <h4>Bank-Grade Security &amp; End-to-End Encryption</h4>
              <p>
                All ANS Developer portals are secured with 256-bit SSL encryption, automated offsite daily backups, and role-based multi-factor authentication.
              </p>
            </div>
            <Link to="/auth" className="btn-outline-gold">
              <span>Security Login</span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: "6px" }}></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
