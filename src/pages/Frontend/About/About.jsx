import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Counter from "../../../components/Counter";
import "./About.css";

export default function About() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const valuesData = [
    {
      title: "Integrity",
      iconClass: "fa-solid fa-scale-balanced",
      desc: "We build trust in every project through transparent pricing, clear contracts, and ethical execution."
    },
    {
      title: "Quality",
      iconClass: "fa-solid fa-trophy",
      desc: "We never compromise on materials or structural integrity, adhering strictly to global standards."
    },
    {
      title: "Innovation",
      iconClass: "fa-solid fa-lightbulb",
      desc: "Modern solutions, smart home automation, and energy-efficient design for a sustainable future."
    },
    {
      title: "Customer Focus",
      iconClass: "fa-solid fa-handshake",
      desc: "Your goals and investment vision are our highest priority, backed by dedicated after-sales care."
    }
  ];

  return (
    <div className="about-page">
      <Navbar />

      {/* Page Header Banner */}
      <section className="page-hero-banner">
        <div className="banner-overlay"></div>
        <div className="banner-content" data-aos="fade-up">
          <h1 className="banner-title">About Us</h1>
          <div className="banner-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="current">About</span>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="who-we-are-section">
        <div className="about-container">
          <div className="who-grid">
            <div className="who-image-col" data-aos="fade-right">
              <div className="who-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern luxury villa by ANS Developers"
                  className="who-img"
                />
                <div className="experience-badge" data-aos="zoom-in" data-aos-delay="200">
                  <span className="exp-years">15+</span>
                  <span className="exp-text">Years of Architectural Distinction</span>
                </div>
              </div>
            </div>

            <div className="who-text-col" data-aos="fade-left">
              <span className="section-tag">• WHO WE ARE •</span>
              <h2 className="section-title">
                Building Trust Through Quality & Commitment.
              </h2>
              <p className="who-p lead">
                ANS Developers is a leading real estate, construction, and development powerhouse headquartered in Lahore, Pakistan.
              </p>
              <p className="who-p">
                With over a decade of proven experience, we have successfully envisioned, constructed, and delivered prestigious residential villas, high-yielding commercial plazas, and master-planned communities across multiple cities.
              </p>
              <p className="who-p">
                Our mission is to create generational value for our clients by blending timeless architectural elegance with advanced engineering, sustainability, and absolute financial transparency.
              </p>

              {/* Stats Counters */}
              <div className="about-stats-row">
                <div className="about-stat-item">
                  <div className="stat-num">
                    <Counter end={15} suffix="+" />
                  </div>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <div className="stat-num">
                    <Counter end={24} suffix="+" />
                  </div>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <div className="stat-num">
                    <Counter end={8} suffix="" />
                  </div>
                  <span className="stat-label">Cities Covered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section">
        <div className="about-container">
          <div className="values-header" data-aos="fade-up">
            <span className="section-tag">• GUIDING PRINCIPLES •</span>
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The foundational pillars that guide every blueprint we draft and every brick we lay.
            </p>
          </div>

          <div className="values-grid">
            {valuesData.map((val, idx) => (
              <div 
                key={idx} 
                className="value-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="val-icon-box">
                  <i className={val.iconClass} style={{ color: "#c59d5f", fontSize: "28px" }}></i>
                </div>
                <h3 className="val-title">{val.title}</h3>
                <p className="val-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Visionary Leadership */}
      <section className="leadership-section">
        <div className="about-container">
          <div className="leadership-header" data-aos="fade-up">
            <span className="section-tag">• LEADERSHIP •</span>
            <h2 className="section-title">The Minds Behind ANS</h2>
            <p className="section-subtitle">
              Seasoned engineers, master architects, and property strategists dedicated to delivering unmatched standards.
            </p>
          </div>

          <div className="leadership-grid">
            <div className="leader-card" data-aos="fade-up" data-aos-delay="100">
              <div className="leader-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" 
                  alt="Managing Director" 
                />
              </div>
              <div className="leader-info">
                <h4>Aleem N. S.</h4>
                <span className="leader-role">Founder & Managing Director</span>
                <p>Visionary developer leading sustainable infrastructure and luxury real estate initiatives across Pakistan.</p>
              </div>
            </div>

            <div className="leader-card" data-aos="fade-up" data-aos-delay="200">
              <div className="leader-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" 
                  alt="Chief Structural Engineer" 
                />
              </div>
              <div className="leader-info">
                <h4>Engr. Tariq Mehmood</h4>
                <span className="leader-role">Chief Structural Engineer</span>
                <p>Over 20 years of experience in high-rise earthquake design, MEP management, and safety engineering.</p>
              </div>
            </div>

            <div className="leader-card" data-aos="fade-up" data-aos-delay="300">
              <div className="leader-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                  alt="Principal Architect" 
                />
              </div>
              <div className="leader-info">
                <h4>Ayesha Malik</h4>
                <span className="leader-role">Principal Luxury Architect</span>
                <p>Specializes in contemporary biophilic architecture, energy efficiency, and modern interior aesthetics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-box" data-aos="zoom-in">
            <div className="about-cta-content">
              <h2>Let's Build Your Vision Together</h2>
              <p>Get in touch with our team and start your development journey today.</p>
            </div>
            <Link to="/contact" className="btn-gold">
              <span>Contact Us</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}