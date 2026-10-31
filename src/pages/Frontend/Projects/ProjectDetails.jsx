import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { selectAllProjects } from "../../../redux/slices/projectsSlice";
import { addInquiry } from "../../../redux/slices/inquiriesSlice";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const project = projects.find((p) => p.id === Number(id)) || projects[0];

  const [selectedImage, setSelectedImage] = useState(project?.image);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });

  useEffect(() => {
    if (project) {
      setSelectedImage(project.image);
    }
    AOS.refresh();
  }, [project]);

  if (!project) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "120px 20px", textAlign: "center" }}>
          <h2>Project not found</h2>
          <Link to="/projects" className="btn-gold" style={{ marginTop: "20px" }}>
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: `${project.title} (${project.category})`,
      message: `Preferred date: ${formData.date || "Anytime"}. ${formData.message}`
    }));

    setInquirySent(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", date: "", message: "" });
    }, 2500);
  };

  return (
    <div className="project-detail-page">
      <Navbar />

      {/* Top Breadcrumb Nav Bar */}
      <div className="project-nav-bar">
        <div className="detail-container">
          <div className="detail-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/projects">Projects</Link>
            <span>/</span>
            <span className="current">{project.title}</span>
          </div>
          <Link to="/projects" className="back-link">
            <i className="fa-solid fa-arrow-left" style={{ marginRight: "6px" }}></i> Back to All Projects
          </Link>
        </div>
      </div>

      {/* Main Showcase Section */}
      <section className="detail-main-section">
        <div className="detail-container">
          <div className="detail-header" data-aos="fade-up">
            <div className="detail-title-group">
              <div className="detail-tags">
                <span className="detail-cat-badge">{project.category}</span>
                <span className="detail-status-badge">{project.status}</span>
              </div>
              <h1 className="detail-title">{project.title}</h1>
              <div className="detail-loc">
                <i className="fa-solid fa-location-dot" style={{ color: "#dfb776" }}></i>
                <span>{project.location}</span>
              </div>
            </div>

            <div className="detail-price-box">
              <span className="detail-price-label">Price / Investment</span>
              <span className="detail-price-amount">{project.price}</span>
            </div>
          </div>

          {/* Gallery & Showcase */}
          <div className="detail-gallery-grid" data-aos="fade-up" data-aos-delay="100">
            <div className="main-display-image">
              <img src={selectedImage || project.image} alt={project.title} />
            </div>

            {project.gallery && project.gallery.length > 1 && (
              <div className="gallery-thumbnails">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`thumb-box ${selectedImage === img ? "active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Two-Column Layout */}
          <div className="detail-info-grid">
            {/* Left Column: Overview, Specs, Features */}
            <div className="detail-left-col" data-aos="fade-right">
              {/* Overview */}
              <div className="content-card">
                <h3 className="card-section-title">Project Overview</h3>
                <p className="detail-desc-text">{project.description}</p>
              </div>

              {/* Specifications Table */}
              <div className="content-card">
                <h3 className="card-section-title">Key Specifications</h3>
                <div className="specs-table-grid">
                  <div className="spec-table-row">
                    <span className="spec-name">Property Category</span>
                    <span className="spec-val">{project.category}</span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-name">Total Covered Area</span>
                    <span className="spec-val">
                      <i className="fa-solid fa-ruler-combined" style={{ color: "#dfb776", marginRight: "6px" }}></i>
                      {project.area}
                    </span>
                  </div>
                  {project.beds > 0 && (
                    <div className="spec-table-row">
                      <span className="spec-name">Bedrooms</span>
                      <span className="spec-val">
                        <i className="fa-solid fa-bed" style={{ color: "#dfb776", marginRight: "6px" }}></i>
                        {project.beds} Master Suites
                      </span>
                    </div>
                  )}
                  {project.baths > 0 && (
                    <div className="spec-table-row">
                      <span className="spec-name">Bathrooms</span>
                      <span className="spec-val">
                        <i className="fa-solid fa-bath" style={{ color: "#dfb776", marginRight: "6px" }}></i>
                        {project.baths} Luxury Baths
                      </span>
                    </div>
                  )}
                  <div className="spec-table-row">
                    <span className="spec-name">Year Built / Handover</span>
                    <span className="spec-val">{project.year || "2025"}</span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-name">Development Status</span>
                    <span className="spec-val highlight">{project.status}</span>
                  </div>
                </div>
              </div>

              {/* Features & Amenities */}
              <div className="content-card">
                <h3 className="card-section-title">Features & Amenities</h3>
                <div className="amenities-grid">
                  {project.features?.map((feat, idx) => (
                    <div key={idx} className="amenity-item">
                      <i className="fa-solid fa-circle-check" style={{ color: "#c59d5f" }}></i>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Inquire / Book a Visit Sticky Card */}
            <div className="detail-right-col" data-aos="fade-left">
              <div className="inquiry-form-card">
                <h3 className="inquiry-card-title">Book a Private Tour</h3>
                <p className="inquiry-card-subtitle">
                  Speak directly with an ANS senior project advisor for floor plans and payment schedules.
                </p>

                {inquirySent ? (
                  <div className="inquiry-success-message">
                    <div className="success-icon">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h4>Inquiry Received in Redux!</h4>
                    <p>Our executive real estate consultant will contact you within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="inquiry-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aleem Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="aleem@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number (WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Preferred Visit Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Message / Specific Questions</label>
                      <textarea
                        rows="3"
                        placeholder="I would like to inquire regarding installment options and floor plans..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-gold w-100">
                      <span>Submit Tour Request</span>
                      <i className="fa-solid fa-paper-plane" style={{ marginLeft: "8px" }}></i>
                    </button>
                  </form>
                )}

                <div className="advisor-contact-direct">
                  <div className="advisor-avatar">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div className="advisor-details">
                    <span className="advisor-name">ANS Sales Desk</span>
                    <span className="advisor-phone">
                      <i className="fa-solid fa-phone" style={{ marginRight: "4px" }}></i> +92 300 0000000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
