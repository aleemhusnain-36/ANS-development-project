import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { addInquiry } from "../../../redux/slices/inquiriesSlice";
import "./Contact.css";

export default function Contact() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Plots",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch lead into Redux store
    dispatch(addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    }));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "Plots", message: "" });
    }, 4000);
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* Banner */}
      <section className="page-hero-banner contact-hero-banner">
        <div className="banner-content" data-aos="fade-up">
          <h1 className="banner-title">Contact & Consultation</h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Left Contact Information */}
            <div className="contact-info-col" data-aos="fade-right">
              <span className="section-tag">• REACH OUT TO US •</span>
              <h2 className="section-title">Let's Discuss Your Next Visionary Project</h2>
              <p className="contact-intro">
                Our team of dedicated property strategists and civil engineers is ready to assist you with investment advice, site visits, or custom construction blueprints.
              </p>

              <div className="contact-cards-stack">
                <div className="c-info-card">
                  <div className="c-icon-pill">
                    <i className="fa-solid fa-building-columns" style={{ color: "#c59d5f" }}></i>
                  </div>
                  <div>
                    <h4>Corporate Headquarters</h4>
                    <p>ANS Development & Maintenance, Defence View Extension Block, Jaranwala, 37250, Pakistan</p>
                  </div>
                </div>

                <div className="c-info-card">
                  <div className="c-icon-pill">
                    <i className="fa-solid fa-phone" style={{ color: "#c59d5f" }}></i>
                  </div>
                  <div>
                    <h4>Phone & WhatsApp</h4>
                    <p>+92 319 7015696 / +92 339 9133026</p>
                    <span className="timing-note">
                      <i className="fa-solid fa-clock" style={{ marginRight: "4px" }}></i> Available Mon - Sat (9:00 AM - 7:00 PM)
                    </span>
                  </div>
                </div>

                <div className="c-info-card">
                  <div className="c-icon-pill">
                    <i className="fa-solid fa-envelope" style={{ color: "#c59d5f" }}></i>
                  </div>
                  <div>
                    <h4>Email Inquiries</h4>
                    <p>ansdevelopment41@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="whatsapp-box">
                <div className="wa-icon">
                  <i className="fa-brands fa-whatsapp" style={{ color: "#25d366" }}></i>
                </div>
                <div>
                  <h5>Instant WhatsApp Assistance</h5>
                  <p>Chat directly with our senior property consultant for quick rate lists and brochures.</p>
                  <a href="https://wa.me/923197015696" target="_blank" rel="noreferrer" className="wa-link">
                    <span>Open WhatsApp Chat</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: "6px" }}></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="contact-form-col" data-aos="fade-left">
              <div className="contact-form-wrapper">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and an ANS representative will contact you within 24 hours.</p>

                {submitted ? (
                  <div className="contact-success-banner">
                    <div className="success-check">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h4>Inquiry Recorded in Redux!</h4>
                    <p>Thank you for reaching out to ANS Developers. Our sales CRM has logged your request.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-fields">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aleem Khan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="aleem@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Contact Number (WhatsApp) *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+92 300 0000000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Service of Interest</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                          <option value="Plots">Residential / Commercial Plots</option>
                          <option value="Shops">Commercial Shops / Retail</option>
                          <option value="Construction">Turnkey Construction</option>
                          <option value="Development">Land Development</option>
                          <option value="Maintenance">Property Maintenance</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Message / Requirements *</label>
                      <textarea
                        rows="5"
                        required
                        placeholder="Tell us about your requirements, preferred city, budget or any questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-gold w-100">
                      <span>Submit Inquiry</span>
                      <i className="fa-solid fa-paper-plane" style={{ marginLeft: "8px" }}></i>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE LOCATION MAP */}
      <section className="contact-map-section">
        <div className="contact-map-header" data-aos="fade-up">
          <span className="section-tag">• FIND US ON MAP •</span>
          <h2 className="section-title">Visit Our Office</h2>
          <p className="section-subtitle">ANS Development &amp; Maintenance — Faisalabad, Pakistan</p>
        </div>

        <div className="contact-map-wrapper" data-aos="fade-up" data-aos-delay="100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.1859964121554!2d73.4065690093088!3d31.32623605660396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39227fcc7ab0a853%3A0x84b4905b21e62381!2sANS%20Development%20%26%20Maintenance!5e0!3m2!1sen!2s!4v1793633889438!5m2!1sen!2s"
            width="100%"
            height="480"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="ANS Development & Maintenance Location"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}