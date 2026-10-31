import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { servicesData } from "../../../data/mockData";
import "./Services.css";

export default function Services() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const getServiceIcon = (id) => {
    switch (id) {
      case "plots": return "fa-solid fa-map-location-dot";
      case "shops": return "fa-solid fa-store";
      case "construction": return "fa-solid fa-trowel-bricks";
      case "development": return "fa-solid fa-city";
      case "maintenance": return "fa-solid fa-screwdriver-wrench";
      default: return "fa-solid fa-building";
    }
  };

  return (
    <div className="services-page">
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner services-hero-banner">
        <div className="banner-content" data-aos="fade-up">
          <h1 className="banner-title">Our Services</h1>
          <div className="banner-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="current">Services</span>
          </div>
        </div>
      </section>

      {/* What We Do Intro Section */}
      <section className="services-intro-section">
        <div className="services-page-container">
          <div className="intro-grid">
            <div className="intro-text" data-aos="fade-right">
              <span className="section-tag">• WHAT WE DO •</span>
              <h2 className="section-title">
                Complete Real Estate & Construction Solutions
              </h2>
              <p className="intro-lead">
                We offer a wide range of services to meet your residential, commercial, and investment needs. Our expert team ensures quality, transparency, and timely delivery in every project.
              </p>
              <p className="intro-p">
                Whether you are acquiring prime plots for capital gains, seeking high-traffic commercial shops, undertaking bespoke architectural construction, or requiring reliable post-handover facility maintenance — ANS Developers provides end-to-end expertise.
              </p>
              
              <div className="service-feature-checklist">
                <div className="check-item">
                  <span className="check-badge">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span>Strict adherence to CDA, LDA, and RDA building codes</span>
                </div>
                <div className="check-item">
                  <span className="check-badge">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span>Fixed price contracts with no hidden material escalations</span>
                </div>
                <div className="check-item">
                  <span className="check-badge">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  <span>Certified project managers on-site every day</span>
                </div>
              </div>
            </div>

            <div className="intro-image-wrapper" data-aos="fade-left">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
                alt="Construction and real estate excellence"
                className="intro-img"
              />
              <div className="intro-floating-badge" data-aos="zoom-in" data-aos-delay="200">
                <span className="badge-highlight">100%</span>
                <span className="badge-desc">Quality Guaranteed & On-Time Handover</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="detailed-services-section">
        <div className="services-page-container">
          <div className="detailed-services-grid">
            {servicesData.map((service, index) => (
              <div 
                key={service.id} 
                className="detailed-service-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="d-service-header">
                  <div className="d-service-icon">
                    <i className={getServiceIcon(service.id)} style={{ color: "#c59d5f" }}></i>
                  </div>
                  <span className="d-service-number">0{index + 1}</span>
                </div>

                <h3 className="d-service-title">{service.title}</h3>
                <p className="d-service-short">{service.shortDesc}</p>
                <p className="d-service-long">{service.longDesc}</p>

                <div className="d-service-highlights">
                  {service.highlights.map((h, i) => (
                    <span key={i} className="highlight-tag">
                      <i className="fa-solid fa-circle-check" style={{ color: "#c59d5f", marginRight: "6px" }}></i>
                      {h}
                    </span>
                  ))}
                </div>

                <Link to="/contact" className="d-service-cta">
                  <span>Inquire About {service.title}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Workflow */}
      <section className="process-section">
        <div className="services-page-container">
          <div className="process-header" data-aos="fade-up">
            <span className="section-tag">• HOW WE WORK •</span>
            <h2 className="section-title">Our 4-Step Proven Process</h2>
            <p className="section-subtitle">
              From the initial consultation to final key handover, our structured workflow ensures effortless execution.
            </p>
          </div>

          <div className="process-steps-grid">
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-num-pill">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h4>01. Consultation & Feasibility</h4>
              <p>We analyze your plot, investment goals, budget, and architectural preferences to create a clear project blueprint.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-num-pill">
                <i className="fa-solid fa-compass-drafting"></i>
              </div>
              <h4>02. Architecture & Approvals</h4>
              <p>Our architects create 3D renders, MEP plans, structural drawings, and process official authority approvals.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-num-pill">
                <i className="fa-solid fa-helmet-safety"></i>
              </div>
              <h4>03. Precision Construction</h4>
              <p>Executed with certified grade materials, seismic testing, and weekly video progress updates for our clients.</p>
            </div>
            <div className="process-step-card" data-aos="fade-up" data-aos-delay="400">
              <div className="step-num-pill">
                <i className="fa-solid fa-key"></i>
              </div>
              <h4>04. Handover & Maintenance</h4>
              <p>Flawless completion, key handover ceremony, and continuous maintenance warranty support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Have a Project in Mind? CTA */}
      <section className="services-cta-section">
        <div className="services-page-container">
          <div className="services-cta-banner" data-aos="zoom-in">
            <div className="services-cta-text">
              <h2>Have a Project in Mind?</h2>
              <p>Our team is ready to help you turn your vision into reality with expert consultation.</p>
            </div>
            <Link to="/contact" className="btn-gold">
              <span>Get Started</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}