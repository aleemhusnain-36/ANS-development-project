import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Counter from "../../../components/Counter";
import { selectAllProjects, selectRentProperties, setListingType, setCategory, setSearchQuery } from "../../../redux/slices/projectsSlice";
import { selectAllTestimonials, addTestimonial } from "../../../redux/slices/testimonialsSlice";
import { servicesData, companyStats } from "../../../data/mockData";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectAllProjects);
  const rentProperties = useSelector(selectRentProperties);
  const testimonials = useSelector(selectAllTestimonials);

  // Testimonial Carousel State
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    role: "",
    rating: 5,
    projectType: "Luxury Residential",
    quote: ""
  });

  const nextTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.quote.trim()) return;

    dispatch(addTestimonial(newReview));
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewModalOpen(false);
      setCurrentTestimonialIdx(0); // Show newly added review
      setNewReview({
        author: "",
        role: "",
        rating: 5,
        projectType: "Luxury Residential",
        quote: ""
      });
    }, 1500);
  };

  // Browse Properties Tab & Slide State
  const [activeTab, setActiveTab] = useState({
    homes: "popular",
    plots: "popular",
    commercial: "popular"
  });

  const [activeSlide, setActiveSlide] = useState({
    homes: 0,
    plots: 0,
    commercial: 0
  });

  const handleBrowseFilter = (listingType, category, query = "") => {
    dispatch(setListingType(listingType));
    dispatch(setCategory(category));
    dispatch(setSearchQuery(query));
    navigate("/projects");
  };

  const nextSlide = (categoryKey, totalSlides = 2) => {
    setActiveSlide(prev => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] + 1) % totalSlides
    }));
  };

  const prevSlide = (categoryKey, totalSlides = 2) => {
    setActiveSlide(prev => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] - 1 + totalSlides) % totalSlides
    }));
  };

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

      {/* BROWSE PROPERTIES SECTION (ANS LUXURY GOLD THEME WITH SLIDER) */}
      <section className="browse-properties-section">
        <div className="browse-properties-container" data-aos="fade-up">
          <div className="browse-header">
            <span className="section-tag">• EXPLORE REAL ESTATE •</span>
            <h2 className="browse-title">Browse Properties</h2>
            <p className="browse-subtitle">Explore verified properties across Pakistan by category, subtype, and area size</p>
          </div>

          <div className="browse-cards-grid">
            {/* Card 1: Homes */}
            <div className="browse-card">
              <div className="browse-card-header">
                <div className="browse-card-icon-title">
                  <div className="browse-icon homes-icon">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <h3 className="browse-card-title">Homes</h3>
                </div>

                {/* Slider Nav Buttons */}
                <div className="card-slider-arrows">
                  <button 
                    type="button" 
                    className="slider-nav-btn" 
                    onClick={() => prevSlide("homes", 2)}
                    aria-label="Previous slide"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button 
                    type="button" 
                    className="slider-nav-btn" 
                    onClick={() => nextSlide("homes", 2)}
                    aria-label="Next slide"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="browse-subtabs">
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.homes === "popular" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, homes: "popular" }));
                    setActiveSlide(prev => ({ ...prev, homes: 0 }));
                  }}
                >
                  Popular
                </button>
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.homes === "type" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, homes: "type" }));
                    setActiveSlide(prev => ({ ...prev, homes: 0 }));
                  }}
                >
                  Type
                </button>
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.homes === "area" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, homes: "area" }));
                    setActiveSlide(prev => ({ ...prev, homes: 0 }));
                  }}
                >
                  Area Size
                </button>
              </div>

              {/* Slider Track Container */}
              <div className="browse-slider-viewport">
                <div 
                  className="browse-slider-track"
                  style={{ transform: `translateX(-${activeSlide.homes * 100}%)` }}
                >
                  {/* Slide 1 */}
                  <div className="browse-slide-page">
                    <div className="browse-links-grid">
                      {activeTab.homes === "popular" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "5 Marla")}>
                            <span className="item-title">5 Marla</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "10 Marla")}>
                            <span className="item-title">10 Marla</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "3 Marla")}>
                            <span className="item-title">3 Marla</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("New Project", "Residential")}>
                            <span className="item-title">New</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential")}>
                            <span className="item-title">Low Price</span>
                            <span className="item-sub">All Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Small")}>
                            <span className="item-title">Small</span>
                            <span className="item-sub">Houses</span>
                          </button>
                        </>
                      )}
                      {activeTab.homes === "type" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Villa")}>
                            <span className="item-title">Villas</span>
                            <span className="item-sub">Luxury Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Apartment")}>
                            <span className="item-title">Flats &amp; Apts</span>
                            <span className="item-sub">Apartments</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("For Sale", "Residential")}>
                            <span className="item-title">For Sale</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("For Rent", "Residential")}>
                            <span className="item-title">For Rent</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Penthouse")}>
                            <span className="item-title">Penthouse</span>
                            <span className="item-sub">High-Rise</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Farmhouse")}>
                            <span className="item-title">Farmhouse</span>
                            <span className="item-sub">Country Homes</span>
                          </button>
                        </>
                      )}
                      {activeTab.homes === "area" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "3 Marla")}>
                            <span className="item-title">3 Marla</span>
                            <span className="item-sub">Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "5 Marla")}>
                            <span className="item-title">5 Marla</span>
                            <span className="item-sub">Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "7 Marla")}>
                            <span className="item-title">7 Marla</span>
                            <span className="item-sub">Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "10 Marla")}>
                            <span className="item-title">10 Marla</span>
                            <span className="item-sub">Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "1 Kanal")}>
                            <span className="item-title">1 Kanal</span>
                            <span className="item-sub">Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "2 Kanal")}>
                            <span className="item-title">2 Kanal+</span>
                            <span className="item-sub">Mansions</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="browse-slide-page">
                    <div className="browse-links-grid">
                      {activeTab.homes === "popular" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "1 Kanal")}>
                            <span className="item-title">1 Kanal</span>
                            <span className="item-sub">Luxury Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("For Rent", "Residential", "Furnished")}>
                            <span className="item-title">Furnished</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Corner")}>
                            <span className="item-title">Corner</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Park Facing")}>
                            <span className="item-title">Park Facing</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Brand New")}>
                            <span className="item-title">Brand New</span>
                            <span className="item-sub">Houses</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Basement")}>
                            <span className="item-title">With Basement</span>
                            <span className="item-sub">Houses</span>
                          </button>
                        </>
                      )}
                      {activeTab.homes === "type" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Upper Portion")}>
                            <span className="item-title">Upper Portion</span>
                            <span className="item-sub">Rent / Sale</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Lower Portion")}>
                            <span className="item-title">Lower Portion</span>
                            <span className="item-sub">Rent / Sale</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Studio")}>
                            <span className="item-title">Studio Flat</span>
                            <span className="item-sub">Modern Living</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Duplex")}>
                            <span className="item-title">Duplex</span>
                            <span className="item-sub">Luxury Layout</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Guest House")}>
                            <span className="item-title">Guest House</span>
                            <span className="item-sub">Short Term</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Room")}>
                            <span className="item-title">Single Room</span>
                            <span className="item-sub">Economical</span>
                          </button>
                        </>
                      )}
                      {activeTab.homes === "area" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "2.5 Marla")}>
                            <span className="item-title">2.5 Marla</span>
                            <span className="item-sub">Compact Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "4 Marla")}>
                            <span className="item-title">4 Marla</span>
                            <span className="item-sub">City Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "8 Marla")}>
                            <span className="item-title">8 Marla</span>
                            <span className="item-sub">Prime Homes</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "12 Marla")}>
                            <span className="item-title">12 Marla</span>
                            <span className="item-sub">Spacious</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "1.5 Kanal")}>
                            <span className="item-title">1.5 Kanal</span>
                            <span className="item-sub">Luxury Villa</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "4 Kanal")}>
                            <span className="item-title">4 Kanal</span>
                            <span className="item-sub">Palace Estate</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Dots Indicator */}
              <div className="browse-dots">
                <button 
                  type="button" 
                  className={`dot-btn ${activeSlide.homes === 0 ? "active" : ""}`}
                  onClick={() => setActiveSlide(prev => ({ ...prev, homes: 0 }))}
                  aria-label="Go to slide 1"
                ></button>
                <button 
                  type="button" 
                  className={`dot-btn ${activeSlide.homes === 1 ? "active" : ""}`}
                  onClick={() => setActiveSlide(prev => ({ ...prev, homes: 1 }))}
                  aria-label="Go to slide 2"
                ></button>
              </div>
            </div>

            {/* Card 2: Plots */}
            <div className="browse-card">
              <div className="browse-card-header">
                <div className="browse-card-icon-title">
                  <div className="browse-icon plots-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <h3 className="browse-card-title">Plots</h3>
                </div>

                {/* Slider Nav Buttons */}
                <div className="card-slider-arrows">
                  <button 
                    type="button" 
                    className="slider-nav-btn" 
                    onClick={() => prevSlide("plots", 2)}
                    aria-label="Previous slide"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button 
                    type="button" 
                    className="slider-nav-btn" 
                    onClick={() => nextSlide("plots", 2)}
                    aria-label="Next slide"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="browse-subtabs">
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.plots === "popular" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, plots: "popular" }));
                    setActiveSlide(prev => ({ ...prev, plots: 0 }));
                  }}
                >
                  Popular
                </button>
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.plots === "type" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, plots: "type" }));
                    setActiveSlide(prev => ({ ...prev, plots: 0 }));
                  }}
                >
                  Type
                </button>
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.plots === "area" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, plots: "area" }));
                    setActiveSlide(prev => ({ ...prev, plots: 0 }));
                  }}
                >
                  Area Size
                </button>
              </div>

              {/* Slider Track Container */}
              <div className="browse-slider-viewport">
                <div 
                  className="browse-slider-track"
                  style={{ transform: `translateX(-${activeSlide.plots * 100}%)` }}
                >
                  {/* Slide 1 */}
                  <div className="browse-slide-page">
                    <div className="browse-links-grid">
                      {activeTab.plots === "popular" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "5 Marla")}>
                            <span className="item-title">5 Marla</span>
                            <span className="item-sub">Res. Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "10 Marla")}>
                            <span className="item-title">10 Marla</span>
                            <span className="item-sub">Res. Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "3 Marla")}>
                            <span className="item-title">3 Marla</span>
                            <span className="item-sub">Res. Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Instalments")}>
                            <span className="item-title">Installments</span>
                            <span className="item-sub">Res. Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development")}>
                            <span className="item-title">Installments</span>
                            <span className="item-sub">Comm. Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Possession")}>
                            <span className="item-title">Possession</span>
                            <span className="item-sub">Comm. Plots</span>
                          </button>
                        </>
                      )}
                      {activeTab.plots === "type" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Residential Plot")}>
                            <span className="item-title">Residential</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Commercial Plot")}>
                            <span className="item-title">Commercial</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Agricultural")}>
                            <span className="item-title">Agricultural</span>
                            <span className="item-sub">Land</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Industrial")}>
                            <span className="item-title">Industrial</span>
                            <span className="item-sub">Land</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Plot File")}>
                            <span className="item-title">Plot Files</span>
                            <span className="item-sub">Instalments</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Corner")}>
                            <span className="item-title">Corner Plots</span>
                            <span className="item-sub">Prime Location</span>
                          </button>
                        </>
                      )}
                      {activeTab.plots === "area" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "3 Marla")}>
                            <span className="item-title">3 Marla</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "5 Marla")}>
                            <span className="item-title">5 Marla</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "10 Marla")}>
                            <span className="item-title">10 Marla</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "1 Kanal")}>
                            <span className="item-title">1 Kanal</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "2 Kanal")}>
                            <span className="item-title">2 Kanal</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "4 Kanal")}>
                            <span className="item-title">4 Kanal+</span>
                            <span className="item-sub">Acreage</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="browse-slide-page">
                    <div className="browse-links-grid">
                      {activeTab.plots === "popular" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "1 Kanal")}>
                            <span className="item-title">1 Kanal</span>
                            <span className="item-sub">Prime Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "LDA Approved")}>
                            <span className="item-title">LDA / CDA</span>
                            <span className="item-sub">Approved Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "Main Boulevard")}>
                            <span className="item-title">Main Blvd</span>
                            <span className="item-sub">Commercial / Res</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Overseas")}>
                            <span className="item-title">Overseas Block</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Executive")}>
                            <span className="item-title">Executive Block</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Ready to Build")}>
                            <span className="item-title">Ready to Build</span>
                            <span className="item-sub">Possession Plots</span>
                          </button>
                        </>
                      )}
                      {activeTab.plots === "type" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Commercial Broadway")}>
                            <span className="item-title">Broadway</span>
                            <span className="item-sub">Commercial</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Farmhouse Plot")}>
                            <span className="item-title">Farmhouse Plot</span>
                            <span className="item-sub">Green Living</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Golf Estate")}>
                            <span className="item-title">Golf View</span>
                            <span className="item-sub">Luxury Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Park Facing Plot")}>
                            <span className="item-title">Park Facing</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Affordable Plot")}>
                            <span className="item-title">Budget Friendly</span>
                            <span className="item-sub">Installment Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "Semi Commercial")}>
                            <span className="item-title">Mixed-Use</span>
                            <span className="item-sub">Semi-Commercial</span>
                          </button>
                        </>
                      )}
                      {activeTab.plots === "area" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "7 Marla")}>
                            <span className="item-title">7 Marla</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "8 Marla")}>
                            <span className="item-title">8 Marla</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "12 Marla")}>
                            <span className="item-title">12 Marla</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Residential", "1.5 Kanal")}>
                            <span className="item-title">1.5 Kanal</span>
                            <span className="item-sub">Plots</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "8 Kanal")}>
                            <span className="item-title">1 Acre</span>
                            <span className="item-sub">Farm Land</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Development", "16 Kanal")}>
                            <span className="item-title">2+ Acres</span>
                            <span className="item-sub">Mega Projects</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Dots Indicator */}
              <div className="browse-dots">
                <button 
                  type="button" 
                  className={`dot-btn ${activeSlide.plots === 0 ? "active" : ""}`}
                  onClick={() => setActiveSlide(prev => ({ ...prev, plots: 0 }))}
                  aria-label="Go to slide 1"
                ></button>
                <button 
                  type="button" 
                  className={`dot-btn ${activeSlide.plots === 1 ? "active" : ""}`}
                  onClick={() => setActiveSlide(prev => ({ ...prev, plots: 1 }))}
                  aria-label="Go to slide 2"
                ></button>
              </div>
            </div>

            {/* Card 3: Commercial */}
            <div className="browse-card">
              <div className="browse-card-header">
                <div className="browse-card-icon-title">
                  <div className="browse-icon commercial-icon">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <h3 className="browse-card-title">Commercial</h3>
                </div>

                {/* Slider Nav Buttons */}
                <div className="card-slider-arrows">
                  <button 
                    type="button" 
                    className="slider-nav-btn" 
                    onClick={() => prevSlide("commercial", 2)}
                    aria-label="Previous slide"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button 
                    type="button" 
                    className="slider-nav-btn" 
                    onClick={() => nextSlide("commercial", 2)}
                    aria-label="Next slide"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="browse-subtabs">
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.commercial === "popular" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, commercial: "popular" }));
                    setActiveSlide(prev => ({ ...prev, commercial: 0 }));
                  }}
                >
                  Popular
                </button>
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.commercial === "type" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, commercial: "type" }));
                    setActiveSlide(prev => ({ ...prev, commercial: 0 }));
                  }}
                >
                  Type
                </button>
                <button 
                  type="button"
                  className={`subtab-btn ${activeTab.commercial === "area" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(prev => ({ ...prev, commercial: "area" }));
                    setActiveSlide(prev => ({ ...prev, commercial: 0 }));
                  }}
                >
                  Area Size
                </button>
              </div>

              {/* Slider Track Container */}
              <div className="browse-slider-viewport">
                <div 
                  className="browse-slider-track"
                  style={{ transform: `translateX(-${activeSlide.commercial * 100}%)` }}
                >
                  {/* Slide 1 */}
                  <div className="browse-slide-page">
                    <div className="browse-links-grid">
                      {activeTab.commercial === "popular" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Office")}>
                            <span className="item-title">Small</span>
                            <span className="item-sub">Offices</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("New Project", "Commercial", "Office")}>
                            <span className="item-title">New</span>
                            <span className="item-sub">Offices</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Instalments")}>
                            <span className="item-title">Installments</span>
                            <span className="item-sub">Shops</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Shop")}>
                            <span className="item-title">Small</span>
                            <span className="item-sub">Shops</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("New Project", "Commercial", "Shop")}>
                            <span className="item-title">New</span>
                            <span className="item-sub">Shops</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Running")}>
                            <span className="item-title">Running</span>
                            <span className="item-sub">Shops</span>
                          </button>
                        </>
                      )}
                      {activeTab.commercial === "type" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Office")}>
                            <span className="item-title">Offices</span>
                            <span className="item-sub">Corporate</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Shop")}>
                            <span className="item-title">Shops</span>
                            <span className="item-sub">Retail Spaces</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Plaza")}>
                            <span className="item-title">Commercial Plazas</span>
                            <span className="item-sub">Whole Building</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Warehouse")}>
                            <span className="item-title">Warehouses</span>
                            <span className="item-sub">Storage</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("For Rent", "Commercial")}>
                            <span className="item-title">For Rent</span>
                            <span className="item-sub">Commercial</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("For Sale", "Commercial")}>
                            <span className="item-title">For Sale</span>
                            <span className="item-sub">Commercial</span>
                          </button>
                        </>
                      )}
                      {activeTab.commercial === "area" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "300 Sq Ft")}>
                            <span className="item-title">Under 500</span>
                            <span className="item-sub">Sq Ft</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "1,000 Sq Ft")}>
                            <span className="item-title">500 - 1,000</span>
                            <span className="item-sub">Sq Ft</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "2,000 Sq Ft")}>
                            <span className="item-title">1,000 - 2,500</span>
                            <span className="item-sub">Sq Ft</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "5,000 Sq Ft")}>
                            <span className="item-title">2,500 - 5,000</span>
                            <span className="item-sub">Sq Ft</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "10,000 Sq Ft")}>
                            <span className="item-title">5,000+</span>
                            <span className="item-sub">Sq Ft</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Floor")}>
                            <span className="item-title">Full Floor</span>
                            <span className="item-sub">Commercial</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="browse-slide-page">
                    <div className="browse-links-grid">
                      {activeTab.commercial === "popular" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Food Court")}>
                            <span className="item-title">Food Court</span>
                            <span className="item-sub">Kiosks &amp; Outlets</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Rented")}>
                            <span className="item-title">Rented Out</span>
                            <span className="item-sub">Guaranteed ROI</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Corner Shop")}>
                            <span className="item-title">Corner Shop</span>
                            <span className="item-sub">High Footfall</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Showroom")}>
                            <span className="item-title">Showroom</span>
                            <span className="item-sub">Main Road</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Basement Shop")}>
                            <span className="item-title">Lower Ground</span>
                            <span className="item-sub">Budget Units</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Mezzanine")}>
                            <span className="item-title">Mezzanine</span>
                            <span className="item-sub">Commercial Hall</span>
                          </button>
                        </>
                      )}
                      {activeTab.commercial === "type" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Factory")}>
                            <span className="item-title">Factory</span>
                            <span className="item-sub">Industrial Site</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Gym")}>
                            <span className="item-title">Fitness Center</span>
                            <span className="item-sub">Commercial Space</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Medical")}>
                            <span className="item-title">Clinic / Lab</span>
                            <span className="item-sub">Healthcare</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "School")}>
                            <span className="item-title">School / Inst</span>
                            <span className="item-sub">Education Site</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Hotel")}>
                            <span className="item-title">Hotel / Motel</span>
                            <span className="item-sub">Hospitality</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Filling Station")}>
                            <span className="item-title">Petrol Pump</span>
                            <span className="item-sub">Highway Land</span>
                          </button>
                        </>
                      )}
                      {activeTab.commercial === "area" && (
                        <>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "150 Sq Ft")}>
                            <span className="item-title">100 - 250</span>
                            <span className="item-sub">Sq Ft Kiosk</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "800 Sq Ft")}>
                            <span className="item-title">600 - 900</span>
                            <span className="item-sub">Sq Ft Boutique</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "3,500 Sq Ft")}>
                            <span className="item-title">3,000 - 4,500</span>
                            <span className="item-sub">Sq Ft Branch</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "8,000 Sq Ft")}>
                            <span className="item-title">6,000 - 10,000</span>
                            <span className="item-sub">Sq Ft Superstore</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "15,000 Sq Ft")}>
                            <span className="item-title">15,000+</span>
                            <span className="item-sub">Sq Ft Multi-Story</span>
                          </button>
                          <button type="button" className="browse-item" onClick={() => handleBrowseFilter("All", "Commercial", "Building")}>
                            <span className="item-title">Complete Tower</span>
                            <span className="item-sub">Landmark</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Dots Indicator */}
              <div className="browse-dots">
                <button 
                  type="button" 
                  className={`dot-btn ${activeSlide.commercial === 0 ? "active" : ""}`}
                  onClick={() => setActiveSlide(prev => ({ ...prev, commercial: 0 }))}
                  aria-label="Go to slide 1"
                ></button>
                <button 
                  type="button" 
                  className={`dot-btn ${activeSlide.commercial === 1 ? "active" : ""}`}
                  onClick={() => setActiveSlide(prev => ({ ...prev, commercial: 1 }))}
                  aria-label="Go to slide 2"
                ></button>
              </div>
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

      {/* TESTIMONIALS / LUXURY CLIENT EXPERIENCES CAROUSEL WITH SUBMISSION */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header-flex" data-aos="fade-up">
            <div className="testimonials-header-left">
              <span className="section-tag">• CLIENT EXPERIENCES &amp; REVIEWS •</span>
              <h2 className="section-title">Endorsed by Discerning Clients</h2>
              <p className="section-subtitle">
                Read real experiences from investors, homeowners, and commercial partners across Pakistan.
              </p>
            </div>

            <div className="testimonials-header-right">
              <button 
                type="button" 
                className="btn-gold-outline-review"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Testimonial Showcase Slider */}
          <div className="testimonials-carousel-wrapper" data-aos="fade-up" data-aos-delay="100">
            {/* Carousel Navigation Arrow Prev */}
            <button 
              type="button" 
              className="carousel-arrow-btn prev"
              onClick={prevTestimonial}
              aria-label="Previous review"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            {/* Main Featured Testimonial Card */}
            <div className="featured-testimonial-card">
              <div className="testimonial-quote-icon">
                <i className="fa-solid fa-quote-left"></i>
              </div>

              <div className="stars-row">
                {[...Array(testimonials[currentTestimonialIdx]?.rating || 5)].map((_, starIdx) => (
                  <i key={starIdx} className="fa-solid fa-star" style={{ color: "#dfb776", marginRight: "4px" }}></i>
                ))}
                <span className="rating-badge">Verified Experience</span>
              </div>

              <p className="featured-quote-text">
                "{testimonials[currentTestimonialIdx]?.quote}"
              </p>

              <div className="testimonial-card-footer">
                <div className="author-identity-group">
                  <div className="author-luxury-avatar">
                    {testimonials[currentTestimonialIdx]?.avatar ? (
                      <img src={testimonials[currentTestimonialIdx].avatar} alt={testimonials[currentTestimonialIdx].author} />
                    ) : (
                      <span>{testimonials[currentTestimonialIdx]?.author?.[0] || "A"}</span>
                    )}
                  </div>
                  <div className="author-meta-info">
                    <h4 className="author-luxury-name">{testimonials[currentTestimonialIdx]?.author}</h4>
                    <span className="author-luxury-role">{testimonials[currentTestimonialIdx]?.role}</span>
                    {testimonials[currentTestimonialIdx]?.projectType && (
                      <span className="author-project-tag">
                        <i className="fa-solid fa-building-circle-check"></i> {testimonials[currentTestimonialIdx].projectType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="review-index-counter">
                  <span className="current-num">{String(currentTestimonialIdx + 1).padStart(2, '0')}</span>
                  <span className="divider">/</span>
                  <span className="total-num">{String(testimonials.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Arrow Next */}
            <button 
              type="button" 
              className="carousel-arrow-btn next"
              onClick={nextTestimonial}
              aria-label="Next review"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="carousel-dots-indicator">
            {testimonials.map((_, dotIdx) => (
              <button 
                key={dotIdx}
                type="button"
                className={`carousel-dot ${dotIdx === currentTestimonialIdx ? "active" : ""}`}
                onClick={() => setCurrentTestimonialIdx(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="review-modal-backdrop" onClick={() => setIsReviewModalOpen(false)}>
          <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <div className="modal-title-box">
                <span className="section-tag">• CLIENT VOICE •</span>
                <h3 className="modal-title">Share Your Experience</h3>
                <p className="modal-subtitle">Your review helps future investors and homeowners build with confidence.</p>
              </div>
              <button 
                type="button" 
                className="modal-close-icon"
                onClick={() => setIsReviewModalOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="review-success-state">
                <div className="success-icon-badge">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4>Thank You For Your Review!</h4>
                <p>Your feedback has been published to our real-time client endorsements.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="form-row-dual">
                  <div className="form-group">
                    <label>Your Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Tariq Mehmood"
                      value={newReview.author}
                      onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Designation / City *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Property Buyer, Islamabad"
                      value={newReview.role}
                      onChange={(e) => setNewReview(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <label>Property / Service Type</label>
                    <select 
                      value={newReview.projectType}
                      onChange={(e) => setNewReview(prev => ({ ...prev, projectType: e.target.value }))}
                    >
                      <option value="Luxury Residential">Luxury Residential Villa</option>
                      <option value="Residential Plots">Residential Plots</option>
                      <option value="Commercial Complex">Commercial Shops / Offices</option>
                      <option value="Turnkey Construction">Turnkey Construction</option>
                      <option value="Rental Property">Rental Residence</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Rating</label>
                    <div className="star-rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-select-btn ${star <= newReview.rating ? "selected" : ""}`}
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        >
                          <i className="fa-solid fa-star"></i>
                        </button>
                      ))}
                      <span className="rating-num-label">{newReview.rating} of 5 Stars</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review / Experience *</label>
                  <textarea 
                    rows={4} 
                    required
                    placeholder="Share how ANS Developers handled your construction, dealing, transparency, or site handover..."
                    value={newReview.quote}
                    onChange={(e) => setNewReview(prev => ({ ...prev, quote: e.target.value }))}
                  ></textarea>
                </div>

                <div className="review-modal-actions">
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => setIsReviewModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold-submit-review">
                    <span>Submit Client Review</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px", marginLeft: "6px" }}></i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
