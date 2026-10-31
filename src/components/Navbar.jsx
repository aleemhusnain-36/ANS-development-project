import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/authSlice";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className={`ans-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="logo-symbol">
              <i className="fa-solid fa-gem"></i>
            </div>
            <div className="logo-text">
              <span className="brand-title">ANS</span>
              <span className="brand-sub">DEVELOPERS</span>
            </div>
          </Link>

          {/* Luxury Tagline in Header */}
          <div className="header-tagline">
            <span>Luxury & premium</span>
            <span>real estate developer</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-item ${isActive("/about") ? "active" : ""}`}>
              About
            </Link>
            <Link to="/services" className={`nav-item ${isActive("/services") ? "active" : ""}`}>
              Services
            </Link>
            <Link to="/projects" className={`nav-item ${isActive("/projects") ? "active" : ""}`}>
              Projects
            </Link>
            <Link to="/portals" className={`nav-item ${isActive("/portals") || isActive("/dashboard") ? "active" : ""}`}>
              Portals
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="header-actions">
            <Link to="/dashboard/user" className="nav-login-btn" title="Client Portal (Aleem)">
              <i className="fa-solid fa-circle-user" style={{ fontSize: "16px", color: "#dfb776" }}></i>
              <span>{currentUser?.name?.split(" ")[0] || "Aleem"}</span>
            </Link>

            <Link to="/contact" className="header-cta-btn">
              <span>Let's Talk</span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px" }}></i>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`mobile-toggle-btn ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-symbol">
              <i className="fa-solid fa-gem"></i>
            </div>
            <div className="logo-text">
              <span className="brand-title">ANS</span>
              <span className="brand-sub">DEVELOPERS</span>
            </div>
          </Link>
          <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mobile-nav-links">
          <Link to="/" className={`m-nav-link ${isActive("/") ? "active" : ""}`}>
            <i className="fa-solid fa-house" style={{ width: "20px" }}></i> Home
          </Link>
          <Link to="/about" className={`m-nav-link ${isActive("/about") ? "active" : ""}`}>
            <i className="fa-solid fa-circle-info" style={{ width: "20px" }}></i> About The Developer
          </Link>
          <Link to="/services" className={`m-nav-link ${isActive("/services") ? "active" : ""}`}>
            <i className="fa-solid fa-city" style={{ width: "20px" }}></i> Services
          </Link>
          <Link to="/projects" className={`m-nav-link ${isActive("/projects") ? "active" : ""}`}>
            <i className="fa-solid fa-building" style={{ width: "20px" }}></i> Featured Projects
          </Link>
          <Link to="/contact" className={`m-nav-link ${isActive("/contact") ? "active" : ""}`}>
            <i className="fa-solid fa-envelope" style={{ width: "20px" }}></i> Contact & Consultation
          </Link>

          <div className="mobile-divider"></div>

          <Link to="/portals" className="m-nav-link highlight" style={{ color: "#ffffff" }}>
            <i className="fa-solid fa-globe" style={{ width: "20px" }}></i> ANS Portals Hub
          </Link>
          <Link to="/dashboard/user" className="m-nav-link highlight">
            <i className="fa-solid fa-user-tie" style={{ width: "20px" }}></i> Customer Dashboard (Aleem)
          </Link>
          <Link to="/dashboard/admin" className="m-nav-link highlight">
            <i className="fa-solid fa-shield-halved" style={{ width: "20px" }}></i> Admin Management Portal
          </Link>
          <Link to="/auth" className="m-nav-link">
            <i className="fa-solid fa-right-to-bracket" style={{ width: "20px" }}></i> Login / Register
          </Link>
        </nav>

        <div className="mobile-drawer-footer">
          <Link to="/contact" className="btn-gold w-100">
            Book a Private Consultation <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px", marginLeft: "6px" }}></i>
          </Link>
          <p className="mobile-contact-info">
            <i className="fa-solid fa-phone" style={{ marginRight: "4px" }}></i> +92 300 0000000 | info@ansdevelopers.com
          </p>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </>
  );
}
