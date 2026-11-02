import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ans-footer">
      <div className="footer-top-accent"></div>
      
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col" data-aos="fade-up" data-aos-delay="50">
            <Link to="/" className="footer-brand">
              <div className="f-logo-box">
                <i className="fa-solid fa-gem"></i>
              </div>
              <div className="f-logo-text">
                <span className="f-title">ANS</span>
                <span className="f-sub">DEVELOPERS</span>
              </div>
            </Link>
            <p className="footer-bio">
              Real estate, construction and development for a better tomorrow. We bring modern visionary architecture to life across Pakistan.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter/X" className="social-icon">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-icon">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Properties</Link></li>
              <li><Link to="/dashboard/user">Customer Portal</Link></li>
              <li><Link to="/dashboard/admin">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="150">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Plots (Residential & Commercial)</Link></li>
              <li><Link to="/services">Commercial Shops</Link></li>
              <li><Link to="/services">Turnkey Construction</Link></li>
              <li><Link to="/services">Land Development</Link></li>
              <li><Link to="/services">Property Maintenance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>+92 300 0000000</span>
              </li>
              <li>
                <span className="contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <span>info@ansdevelopers.com</span>
              </li>
              <li>
                <span className="contact-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>Gulberg III, Lahore, Pakistan</span>
              </li>
              <li>
                <span className="contact-icon">
                  <i className="fa-solid fa-clock"></i>
                </span>
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 ANS Developers. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
