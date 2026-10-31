import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Counter from "../../../components/Counter";
import { selectAllProjects, selectRentProperties, setListingType } from "../../../redux/slices/projectsSlice";
import { servicesData, companyStats, testimonialsData } from "../../../data/mockData";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const rentProperties = useSelector(selectRentProperties);

  useEffect(() => {
    AOS.refresh();
  }, []);

  // Map service IDs to Font Awesome icon classes
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
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION - LANDMARKA LUXURY STYLE */}
      <section className="luxury-hero">
        <div className="hero-backdrop"></div>
        <div className="hero-starry-overlay"></div>
        <div className="hero-gradient-overlay"></div>

        <div className="hero-container">
          {/* Main Hero Header Title */}
          <div className="hero-headline-block" data-aos="fade-up" data-aos-duration="1000">
            <div className="hero-mini-eyebrow">
              <span className="eyebrow-line"></span>
              <span>EST. 2011 • REAL ESTATE • CONSTRUCTION • DEVELOPMENT</span>
            </div>
            <h1 className="hero-main-title">
              UNLOCK THE ART<br />
              OF LUXURY LIVING
            </h1>
          </div>

          {/* Right Bottom Hero Card & Call to Action */}
          <div className="hero-bottom-grid">
            <div className="hero-empty-spacer"></div>

            <div className="hero-consultation-card" data-aos="fade-left" data-aos-delay="200" data-aos-duration="900">
              <div className="card-top-line"></div>
              <p className="hero-narrative">
                As a trusted luxury real estate advisor & premier developer, we guide high-net-worth clients to extraordinary properties with discretion, architectural mastery, and unmatched service.
              </p>
              <div className="hero-cta-group">
                <Link to="/contact" className="btn-gold-consultation">
                  <i className="fa-solid fa-calendar-check" style={{ marginRight: "8px" }}></i>
                  BOOK A PRIVATE CONSULTATION
                </Link>
                <Link to="/projects" className="btn-explore-link">
                  <span>EXPLORE PROPERTIES</span>
                  <i className="fa-solid fa-arrow-up-right-from-square arrow"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Down Mouse Indicator */}
          <a href="#stats-overview" className="scroll-mouse-indicator" aria-label="Scroll to content">
            <div className="mouse-pill">
              <div className="mouse-wheel"></div>
            </div>
            <span className="scroll-text">DISCOVER MORE</span>
          </a>
        </div>
      </section>

      {/* LUXURY AWARDS & TRUST BADGES BAR */}
      <section className="awards-trust-bar">
        <div className="awards-container">
          <div className="award-item" data-aos="fade-up" data-aos-delay="100">
            <div className="award-icon-box">
              <i className="fa-solid fa-crown" style={{ color: "#dfb776", fontSize: "20px" }}></i>
            </div>
            <div className="award-text">
              <span className="award-title">TOP LUXURY REAL ESTATE AGENT & DEVELOPER</span>
              <span className="award-subtitle">Awarded for high-end residential mastery</span>
            </div>
          </div>

          <div className="award-divider"></div>

          <div className="award-item" data-aos="fade-up" data-aos-delay="200">
            <div className="award-icon-box">
              <i className="fa-solid fa-award" style={{ color: "#dfb776", fontSize: "20px" }}></i>
            </div>
            <div className="award-text">
              <span className="award-title">RECOGNIZED FOR EXCELLENCE</span>
              <span className="award-subtitle">Luxury Residential & Commercial Sales 2024-2026</span>
            </div>
          </div>

          <div className="award-divider"></div>

          <div className="award-item" data-aos="fade-up" data-aos-delay="300">
            <div className="award-icon-box">
              <i className="fa-solid fa-shield-halved" style={{ color: "#dfb776", fontSize: "20px" }}></i>
            </div>
            <div className="award-text">
              <span className="award-title">100% TRANSPARENT TRANSACTIONS</span>
              <span className="award-subtitle">Verified legal titles and approved masterplans</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - WITH ANIMATED COUNTER */}
      <section id="stats-overview" className="stats-section">
        <div className="stats-container">
          <div className="stats-header" data-aos="fade-up">
            <span className="section-tag">• OUR JOURNEY IN NUMBERS •</span>
            <h2 className="section-title">Built on Trust. Driven by Vision.</h2>
            <p className="section-subtitle">
              From prime plots and commercial landmarks to turnkey construction and continuous maintenance, our numbers reflect unmatched dedication to client satisfaction.
            </p>
          </div>

          <div className="stats-grid">
            {companyStats.map((stat, idx) => (
              <div 
                key={idx} 
                className="stat-card"
                data-aos="fade-up"
                data-aos-delay={idx * 120}
              >
                <div className="stat-number">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-desc">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header" data-aos="fade-up">
            <span className="section-tag">• WHAT WE DO •</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive real estate, architecture, engineering and facility management solutions tailored to ambitious investors and luxury homeowners.
            </p>
          </div>

          <div className="services-grid">
            {servicesData.map((service, index) => (
              <div 
                key={service.id} 
                className="service-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="service-icon-wrapper">
                  <i className={getServiceIcon(service.id)} style={{ color: "#c59d5f", fontSize: "22px" }}></i>
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.shortDesc}</p>
                
                <Link to="/services" className="service-card-link">
                  <span>Learn More</span>
                  <i className="fa-solid fa-arrow-right arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="featured-projects-section">
        <div className="projects-container">
          <div className="projects-header-row" data-aos="fade-up">
            <div>
              <span className="section-tag">• PORTFOLIO SHOWCASE •</span>
              <h2 className="section-title text-light">Featured Projects</h2>
              <p className="section-subtitle text-light-muted">
                Explore our landmark residential and commercial developments engineered to perfection.
              </p>
            </div>
            <Link to="/projects" className="btn-outline-gold">
              View All Projects <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </Link>
          </div>

          <div className="featured-projects-grid">
            {projects.slice(0, 4).map((project, idx) => (
              <div 
                key={project.id} 
                className="project-card"
                data-aos="zoom-in"
                data-aos-delay={idx * 120}
              >
                <div className="project-image-box">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-category-badge">{project.category}</div>
                  <div className="project-status-badge">{project.status}</div>
                </div>

                <div className="project-info">
                  <div className="project-location">
                    <i className="fa-solid fa-location-dot pin-icon" style={{ color: "#dfb776" }}></i>
                    <span>{project.location}</span>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description.slice(0, 85)}...</p>

                  <div className="project-specs">
                    {project.beds > 0 && (
                      <span>
                        <i className="fa-solid fa-bed" style={{ marginRight: "4px", color: "#dfb776" }}></i> {project.beds} Beds
                      </span>
                    )}
                    {project.baths > 0 && (
                      <span>
                        <i className="fa-solid fa-bath" style={{ marginRight: "4px", color: "#dfb776" }}></i> {project.baths} Baths
                      </span>
                    )}
                    <span>
                      <i className="fa-solid fa-ruler-combined" style={{ marginRight: "4px", color: "#dfb776" }}></i> {project.area}
                    </span>
                  </div>

                  <div className="project-footer">
                    <div className="project-price-tag">
                      <span className="price-label">Price</span>
                      <span className="price-value">{project.price}</span>
                    </div>
                    <Link to={`/projects/${project.id}`} className="project-detail-btn">
                      Details <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "10px", marginLeft: "4px" }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED RENT PROPERTIES SECTION ─── */}
      <section className="rent-properties-section">
        <div className="rent-properties-container">
          <div className="rent-properties-header-row" data-aos="fade-up">
            <div>
              <span className="section-tag">• PROPERTIES FOR RENT •</span>
              <h2 className="section-title">Featured Rental Properties</h2>
              <p className="section-subtitle">
                Explore our premium furnished and semi-furnished homes, apartments, offices, and shops available for immediate rent.
              </p>
            </div>
            <Link
              to="/projects"
              className="btn-outline-gold"
              onClick={() => dispatch(setListingType("For Rent"))}
            >
              View All Rentals <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </Link>
          </div>

          <div className="rent-properties-grid">
            {rentProperties.slice(0, 3).map((p, idx) => (
              <div
                key={p.id}
                className="rent-property-card"
                data-aos="fade-up"
                data-aos-delay={idx * 110}
              >
                <div className="rp-image-box">
                  <img src={p.image} alt={p.title} loading="lazy" />

                  {/* For Rent badge */}
                  <div className="rp-listing-badge">
                    <i className="fa-solid fa-key"></i> For Rent
                  </div>

                  {/* Furnishing tag */}
                  {p.furnishing && (
                    <div
                      className="rp-furnishing-tag"
                      style={{
                        background:
                          p.furnishing === "Fully Furnished" ? "#16a34a" :
                          p.furnishing === "Semi Furnished"  ? "#d97706" : "#64748b"
                      }}
                    >
                      <i className="fa-solid fa-couch" style={{ marginRight: "4px" }}></i>
                      {p.furnishing}
                    </div>
                  )}

                  {/* Property type chip */}
                  <div className="rp-type-chip">{p.propertyType}</div>
                </div>

                <div className="rp-content">
                  <div className="rp-location">
                    <i className="fa-solid fa-location-dot" style={{ color: "#dfb776" }}></i>
                    <span>{p.location}</span>
                  </div>

                  <h3 className="rp-title">{p.title}</h3>

                  <div className="rp-specs">
                    {p.beds > 0 && (
                      <span><i className="fa-solid fa-bed" style={{ color: "#dfb776" }}></i> {p.beds} Beds</span>
                    )}
                    {p.baths > 0 && (
                      <span><i className="fa-solid fa-bath" style={{ color: "#dfb776" }}></i> {p.baths} Baths</span>
                    )}
                    <span><i className="fa-solid fa-ruler-combined" style={{ color: "#dfb776" }}></i> {p.area}</span>
                  </div>

                  <div className="rp-footer">
                    <div className="rp-price-block">
                      <span className="rp-price-label">Monthly Rent</span>
                      <span className="rp-price-val">{p.rentPrice}</span>
                    </div>
                    <Link to={`/projects/${p.id}`} className="rp-detail-btn">
                      Details <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "10px", marginLeft: "4px" }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / TRUST SECTION */}      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header" data-aos="fade-up">
            <span className="section-tag">• CLIENT EXPERIENCES •</span>
            <h2 className="section-title">Endorsed by Discerning Clients</h2>
            <p className="section-subtitle">
              Read how our dedication to quality construction and transparent dealing shapes lasting partnerships.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonialsData.map((item, i) => (
              <div 
                key={i} 
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="stars-row">
                  {[...Array(item.rating)].map((_, starIdx) => (
                    <i key={starIdx} className="fa-solid fa-star" style={{ color: "#dfb776", marginRight: "3px" }}></i>
                  ))}
                </div>
                <p className="testimonial-quote">"{item.quote}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{item.author[0]}</div>
                  <div>
                    <h4 className="author-name">{item.author}</h4>
                    <span className="author-role">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LET'S BUILD SOMETHING GREAT - CTA BANNER */}
      <section className="cta-banner-section">
        <div className="cta-banner-container" data-aos="zoom-in" data-aos-duration="900">
          <div className="cta-banner-content">
            <span className="cta-tag">GET IN TOUCH WITH OUR EXPERT TEAM</span>
            <h2 className="cta-title">Let's Build Something Great</h2>
            <p className="cta-desc">
              Whether you are looking to purchase high-growth plots, invest in commercial complexes, or build your dream luxury home, we are here to bring your vision to life.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-gold">
                <span>Contact Us</span>
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}></i>
              </Link>
              <a href="tel:+923000000000" className="btn-outline-gold">
                <i className="fa-solid fa-phone" style={{ marginRight: "8px" }}></i>
                Call: +92 300 0000000
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
