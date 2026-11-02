import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "../redux/slices/authSlice";
import { setListingType, setCategory, setSearchQuery } from "../redux/slices/projectsSlice";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);
  const [mobileBrowseOpen, setMobileBrowseOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
    setBrowseDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBrowseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePropertyFilter = (listingType = "All", category = "All", query = "") => {
    dispatch(setListingType(listingType));
    dispatch(setCategory(category));
    dispatch(setSearchQuery(query));
    setBrowseDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/projects");
  };

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

            {/* Browse Properties Dropdown (Buy / Rent / New Projects) */}
            <div 
              className={`nav-dropdown-wrapper ${browseDropdownOpen ? "open" : ""}`} 
              ref={dropdownRef}
              onMouseEnter={() => setBrowseDropdownOpen(true)}
              onMouseLeave={() => setBrowseDropdownOpen(false)}
            >
              <button 
                type="button" 
                className={`nav-item nav-dropdown-btn ${browseDropdownOpen ? "active" : ""}`}
                onClick={() => setBrowseDropdownOpen(!browseDropdownOpen)}
                aria-expanded={browseDropdownOpen}
              >
                <span>Properties</span>
                <i className={`fa-solid fa-chevron-down dd-arrow ${browseDropdownOpen ? "rotated" : ""}`}></i>
              </button>

              <div className="nav-dropdown-menu">
                <div className="dropdown-mega-grid">
                  {/* Buy Column */}
                  <div className="dropdown-column">
                    <div className="dropdown-column-header">
                      <div className="col-icon buy-icon">
                        <i className="fa-solid fa-tag"></i>
                      </div>
                      <span className="col-title">Buy Property</span>
                    </div>
                    <ul className="dropdown-link-list">
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Sale", "Residential", "Houses")}>
                          <i className="fa-solid fa-house"></i> Houses for Sale
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Sale", "Residential", "Plots")}>
                          <i className="fa-solid fa-location-dot"></i> Plots &amp; Land
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Sale", "Residential", "Apartments")}>
                          <i className="fa-solid fa-building"></i> Flats &amp; Apartments
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Sale", "Commercial")}>
                          <i className="fa-solid fa-briefcase"></i> Commercial Shops &amp; Offices
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Rent Column */}
                  <div className="dropdown-column">
                    <div className="dropdown-column-header">
                      <div className="col-icon rent-icon">
                        <i className="fa-solid fa-key"></i>
                      </div>
                      <span className="col-title">Rent Property</span>
                    </div>
                    <ul className="dropdown-link-list">
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Rent", "Residential", "Houses")}>
                          <i className="fa-solid fa-house-chimney"></i> Houses for Rent
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Rent", "Residential", "Apartments")}>
                          <i className="fa-solid fa-building-user"></i> Rental Apartments
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Rent", "Residential", "Furnished")}>
                          <i className="fa-solid fa-couch"></i> Furnished Residences
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("For Rent", "Commercial")}>
                          <i className="fa-solid fa-store"></i> Commercial Office / Plaza
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* New Projects Column */}
                  <div className="dropdown-column">
                    <div className="dropdown-column-header">
                      <div className="col-icon new-icon">
                        <i className="fa-solid fa-building-flag"></i>
                      </div>
                      <span className="col-title">New Projects</span>
                    </div>
                    <ul className="dropdown-link-list">
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("New Project", "Residential")}>
                          <i className="fa-solid fa-city"></i> Luxury Developments
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("New Project", "Development", "Instalments")}>
                          <i className="fa-solid fa-calendar-check"></i> On Easy Installments
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("New Project", "Commercial")}>
                          <i className="fa-solid fa-hotel"></i> Mixed-Use Towers
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => handlePropertyFilter("All", "All")}>
                          <i className="fa-solid fa-arrow-right"></i> View All Properties
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="dropdown-bottom-banner">
                  <span>Need personal assistance or consultation?</span>
                  <Link to="/contact" className="dd-portals-link">
                    Contact Real Estate Advisor <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="header-actions">
            {isAuthenticated ? (
              <Link to="/dashboard/user" className="nav-login-btn" title="Dashboard">
                <i className="fa-solid fa-circle-user" style={{ fontSize: "16px", color: "#dfb776" }}></i>
                <span>{currentUser?.name?.split(" ")[0] || "Aleem"}</span>
              </Link>
            ) : (
              <Link to="/auth" className="nav-login-btn" title="Login / Register">
                <i className="fa-solid fa-right-to-bracket" style={{ fontSize: "14px", color: "#dfb776" }}></i>
                <span>Login</span>
              </Link>
            )}

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

          {/* Mobile Accordion for Properties */}
          <div className="mobile-accordion">
            <button 
              type="button" 
              className={`m-nav-link accordion-toggle ${mobileBrowseOpen ? "open" : ""}`}
              onClick={() => setMobileBrowseOpen(!mobileBrowseOpen)}
            >
              <span><i className="fa-solid fa-layer-group" style={{ width: "20px" }}></i> Browse Properties</span>
              <i className={`fa-solid fa-chevron-down acc-arrow ${mobileBrowseOpen ? "rotated" : ""}`}></i>
            </button>
            {mobileBrowseOpen && (
              <div className="mobile-accordion-content">
                <button type="button" className="m-sub-link" onClick={() => handlePropertyFilter("For Sale", "Residential")}>
                  • Houses for Sale
                </button>
                <button type="button" className="m-sub-link" onClick={() => handlePropertyFilter("For Sale", "Residential", "Plots")}>
                  • Plots &amp; Land
                </button>
                <button type="button" className="m-sub-link" onClick={() => handlePropertyFilter("For Rent", "Residential")}>
                  • Rental Homes &amp; Flats
                </button>
                <button type="button" className="m-sub-link" onClick={() => handlePropertyFilter("For Sale", "Commercial")}>
                  • Commercial Shops / Offices
                </button>
                <button type="button" className="m-sub-link" onClick={() => handlePropertyFilter("New Project", "Residential")}>
                  • New Project Developments
                </button>
              </div>
            )}
          </div>

          <Link to="/contact" className={`m-nav-link ${isActive("/contact") ? "active" : ""}`}>
            <i className="fa-solid fa-envelope" style={{ width: "20px" }}></i> Contact & Consultation
          </Link>

          <div className="mobile-divider"></div>

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
