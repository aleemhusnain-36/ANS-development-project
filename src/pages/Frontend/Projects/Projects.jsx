import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  selectFilteredProjects,
  setCategory,
  setListingType,
  setSearchQuery
} from "../../../redux/slices/projectsSlice";
import "./Projects.css";

const LISTING_TYPES = [
  { key: "All",         label: "All Listings",  icon: "fa-solid fa-grip" },
  { key: "For Sale",    label: "For Sale",       icon: "fa-solid fa-tag" },
  { key: "For Rent",    label: "For Rent",       icon: "fa-solid fa-key" },
  { key: "New Project", label: "New Projects",   icon: "fa-solid fa-building-flag" },
];

const CATEGORY_MAP = {
  "All":         ["All", "Residential", "Commercial", "Development"],
  "For Sale":    ["All", "Residential", "Commercial"],
  "For Rent":    ["All", "Residential", "Commercial"],
  "New Project": ["All", "Residential", "Development"],
};

const FURNISHING_COLOR = {
  "Fully Furnished": "#16a34a",
  "Semi Furnished":  "#d97706",
  "Unfurnished":     "#64748b",
};

export default function Projects() {
  const dispatch = useDispatch();
  const filteredProjects = useSelector(selectFilteredProjects);
  const selectedCategory = useSelector((state) => state.projects.selectedCategory);
  const selectedListing  = useSelector((state) => state.projects.selectedListingType);
  const searchQuery      = useSelector((state) => state.projects.searchQuery);

  useEffect(() => {
    AOS.refresh();
  }, [filteredProjects]);

  const categories = CATEGORY_MAP[selectedListing] || CATEGORY_MAP["All"];

  return (
    <div className="projects-page">
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner projects-hero-banner">
        <div className="banner-content" data-aos="fade-up">
          <h1 className="banner-title">Our Properties</h1>
        </div>
      </section>

      {/* Projects Showcase Container */}
      <section className="projects-catalog-section">
        <div className="projects-page-container">

          {/* ── Listing Type Tabs (For Sale / For Rent / New Projects) ── */}
          <div className="listing-type-bar" data-aos="fade-up">
            {LISTING_TYPES.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`listing-type-btn ${selectedListing === key ? "active" : ""}`}
                onClick={() => dispatch(setListingType(key))}
              >
                <i className={icon} style={{ marginRight: "7px" }}></i>
                {label}
              </button>
            ))}
          </div>

          {/* Controls Bar: Category Filters + Search */}
          <div className="projects-controls-bar" data-aos="fade-up">
            <div className="category-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => dispatch(setCategory(cat))}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="project-search-box">
              <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: "#94a3b8" }}></i>
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="project-search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => dispatch(setSearchQuery(""))}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="results-meta-bar">
            <span>
              Showing <strong>{filteredProjects.length}</strong> propert{filteredProjects.length !== 1 ? "ies" : "y"}
              {selectedListing !== "All" && (
                <> · <span className="listing-badge-inline">{selectedListing}</span></>
              )}
            </span>
          </div>

          {/* Projects Grid */}
          <div className="projects-main-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="catalog-card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="catalog-image-box">
                  <img src={project.image} alt={project.title} loading="lazy" />

                  {/* Listing Type Badge */}
                  <div className={`listing-type-badge lt-${project.listingType?.replace(/\s+/g, "-").toLowerCase()}`}>
                    {project.listingType === "For Sale"    && <><i className="fa-solid fa-tag"></i> For Sale</>}
                    {project.listingType === "For Rent"    && <><i className="fa-solid fa-key"></i> For Rent</>}
                    {project.listingType === "New Project" && <><i className="fa-solid fa-building-flag"></i> New Project</>}
                  </div>

                  <div className="catalog-category-tag">{project.category}</div>
                  <div className="catalog-status-tag">{project.status}</div>

                  {/* Furnishing badge */}
                  {project.furnishing && (
                    <div
                      className="catalog-furnishing-tag"
                      style={{ background: FURNISHING_COLOR[project.furnishing] || "#64748b" }}
                    >
                      <i className="fa-solid fa-couch" style={{ marginRight: "4px" }}></i>
                      {project.furnishing}
                    </div>
                  )}
                </div>

                <div className="catalog-content">
                  <div className="catalog-location">
                    <i className="fa-solid fa-location-dot" style={{ color: "#dfb776", marginRight: "4px" }}></i>
                    <span>{project.location}</span>
                  </div>

                  {/* Property type chip */}
                  {project.propertyType && (
                    <span className="property-type-chip">
                      <i className="fa-solid fa-house-chimney" style={{ marginRight: "4px" }}></i>
                      {project.propertyType}
                    </span>
                  )}

                  <h3 className="catalog-title">{project.title}</h3>
                  <p className="catalog-desc">{project.description}</p>

                  <div className="catalog-specs-row">
                    {project.beds > 0 && (
                      <span>
                        <i className="fa-solid fa-bed" style={{ color: "#dfb776", marginRight: "4px" }}></i> {project.beds} Beds
                      </span>
                    )}
                    {project.baths > 0 && (
                      <span>
                        <i className="fa-solid fa-bath" style={{ color: "#dfb776", marginRight: "4px" }}></i> {project.baths} Baths
                      </span>
                    )}
                    <span>
                      <i className="fa-solid fa-ruler-combined" style={{ color: "#dfb776", marginRight: "4px" }}></i> {project.area}
                    </span>
                  </div>

                  <div className="catalog-card-footer">
                    <div className="catalog-price">
                      {project.listingType === "For Rent" ? (
                        <>
                          <span className="c-price-label">Monthly Rent</span>
                          <span className="c-price-val rent-price">{project.rentPrice}</span>
                        </>
                      ) : (
                        <>
                          <span className="c-price-label">Price starting from</span>
                          <span className="c-price-val">{project.price}</span>
                        </>
                      )}
                    </div>

                    <Link to={`/projects/${project.id}`} className="btn-view-project">
                      <span>View Details</span>
                      <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects-box">
              <i className="fa-solid fa-magnifying-glass-chart" style={{ fontSize: "42px", color: "#94a3b8", marginBottom: "14px" }}></i>
              <h3>No properties found</h3>
              <p>Try selecting a different listing type, category, or clearing your search term.</p>
              <button
                className="btn-gold"
                onClick={() => {
                  dispatch(setListingType("All"));
                  dispatch(setCategory("All"));
                  dispatch(setSearchQuery(""));
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Banner */}
      <section className="projects-cta-section">
        <div className="projects-page-container">
          <div className="projects-cta-box" data-aos="zoom-in">
            <h2>Looking for a Customized Plot or Bespoke Construction?</h2>
            <p>Our consulting architects and sales advisors will guide you through tailored options.</p>
            <Link to="/contact" className="btn-gold">
              <span>Schedule a Consultation</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
