import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiDonateBlood, BiHeart } from "react-icons/bi";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageSelector from "../LanguageSelector";

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [footerGroup, setFooterGroup] = useState("O-");
  const [quickCity, setQuickCity] = useState("");

  const bloodTips = {
    "O-": "⭐ Universal Red Cell Donor — Critical for all trauma emergencies & accidents!",
    "O+": "🩸 O+ can donate to all positive groups (O+, A+, B+, AB+). Most transfused group!",
    "A-": "🧬 A- can donate safely to A-, A+, AB-, AB+ patients.",
    "A+": "🩸 A+ gives to A+ and AB+. High demand across general hospital surgeries.",
    "B-": "⚠️ B- is rare and essential for emergency thalassemia & pediatric patients.",
    "B+": "🇮🇳 B+ is the 2nd most common group in India (~32% of our population).",
    "AB-": "🧪 AB- is the rarest blood type in India (~1% of all citizens).",
    "AB+": "🌟 Universal Recipient — Can safely accept transfusions from EVERY blood group!",
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickCity.trim()) {
      navigate(`/blood-stock?search=${encodeURIComponent(quickCity.trim())}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="spatial-footer text-white pt-5 pb-3 mt-auto">
      {/* Ambient background glow orbs */}
      <div className="spatial-orb spatial-orb-red" style={{ width: 350, height: 350, opacity: 0.12, bottom: -100, right: 0 }} />
      <div className="spatial-orb spatial-orb-blue" style={{ width: 300, height: 300, opacity: 0.1, top: -50, left: -50 }} />

      <div className="container-fluid px-lg-5 px-3 position-relative" style={{ zIndex: 2 }}>
        {/* Top Interactive Feature: Live Telemetry Bar & Quick City Finder */}
        <div className="p-3 p-md-4 rounded-4 mb-4 spatial-glass-dark border border-white border-opacity-10 shadow-lg">
          <div className="row g-3 align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="spatial-radar-bead"></span>
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-2 py-1 small">
                  MoHFW data.gov.in Live Sync Active
                </span>
                <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 px-2 py-1 small">
                  36 States & UTs Connected
                </span>
              </div>
              <h5 className="fw-bold mb-1 text-white">
                RaktDaan National Blood Intelligence Grid
              </h5>
              <p className="small text-white-50 mb-0">
                Direct nationwide voluntary donor matching, certified model blood bank directories & zero-wastage monitoring.
              </p>
            </div>

            {/* Interactive City Stock Finder */}
            <div className="col-lg-5">
              <form onSubmit={handleQuickSearch}>
                <label className="form-label small text-white-50 fw-semibold mb-1">
                  🔍 Check Blood Stock for Any Indian City:
                </label>
                <div className="input-group spatial-input-capsule p-1 bg-white bg-opacity-10 border-white-50">
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent text-white shadow-none ps-3 small"
                    placeholder="e.g. Bikaner, Jaipur, Surat, Ranchi..."
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    style={{ color: "#fff" }}
                  />
                  <button type="submit" className="btn btn-danger btn-sm spatial-btn-glow px-3 py-1">
                    Find Stock →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Column 1: Brand & 24x7 Helplines */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <div
                className="bg-danger text-white p-2 rounded-circle me-2 d-inline-flex align-items-center justify-content-center shadow"
                style={{ boxShadow: "0 0 16px rgba(220, 53, 69, 0.7)" }}
              >
                <BiDonateBlood size={28} />
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-white tracking-wide">
                  Rakt<span className="text-danger">Daan</span>
                </h4>
                <small className="text-danger fw-semibold" style={{ fontSize: "11px", letterSpacing: "1px" }}>
                  {t("brandTagline", "Donate Blood, Save Lives")}
                </small>
              </div>
            </div>

            <p className="text-white-50 small mb-3 pe-lg-3" style={{ lineHeight: "1.7" }}>
              India's non-commercial voluntary blood platform. Empowering accident trauma victims, thalassemia patients, and hospitals with verified instant donor connections.
            </p>

            {/* Interactive 24x7 Emergency Helpline Dials */}
            <h6 className="small fw-bold text-uppercase text-danger mb-2">
              🚨 24x7 Emergency Medical Helplines:
            </h6>
            <div className="d-grid gap-2">
              <a href="tel:108" className="spatial-dial-pill">
                <i className="fa-solid fa-truck-medical text-danger fs-5"></i>
                <div className="lh-sm">
                  <strong className="d-block text-white">108 / 102</strong>
                  <small className="text-white-50" style={{ fontSize: "11px" }}>National Ambulance Emergency</small>
                </div>
              </a>
              <a href="tel:18001801104" className="spatial-dial-pill">
                <i className="fa-solid fa-phone-volume text-primary fs-5"></i>
                <div className="lh-sm">
                  <strong className="d-block text-white">1800-180-1104</strong>
                  <small className="text-white-50" style={{ fontSize: "11px" }}>National Blood Bank Helpline (Toll-Free)</small>
                </div>
              </a>
              <a href="tel:104" className="spatial-dial-pill">
                <i className="fa-solid fa-hospital text-success fs-5"></i>
                <div className="lh-sm">
                  <strong className="d-block text-white">104</strong>
                  <small className="text-white-50" style={{ fontSize: "11px" }}>Red Cross Blood Dispatch Service</small>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-white mb-3 border-bottom border-danger pb-2 d-inline-block">
              Quick Portals
            </h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2">
                <Link to="/" className="spatial-footer-link">
                  <i className="fa-solid fa-house text-danger me-1"></i> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blood-stock" className="spatial-footer-link">
                  <i className="fa-solid fa-hospital text-danger me-1"></i> Live Blood Stock
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/orgnaisation" className="spatial-footer-link">
                  <i className="fa-solid fa-building-ngo text-danger me-1"></i> Blood Banks
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donation-camps" className="spatial-footer-link">
                  <i className="fa-solid fa-tents text-danger me-1"></i> Camps Directory
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blood-compatibility" className="spatial-footer-link">
                  <i className="fa-solid fa-dna text-danger me-1"></i> 3D Compatibility
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/eligibility-check" className="spatial-footer-link">
                  <i className="fa-solid fa-vial text-danger me-1"></i> Eligibility Quiz
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/emergency-donors" className="spatial-footer-link text-danger fw-bold">
                  <i className="fa-solid fa-truck-medical text-danger me-1"></i> Emergency SOS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Healthcare Network */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="fw-bold text-white mb-3 border-bottom border-danger pb-2 d-inline-block">
              Healthcare Network
            </h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2">
                <Link to="/login" className="spatial-footer-link">
                  <i className="fa-solid fa-user-doctor text-primary me-1"></i> Hospital Portal
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="spatial-footer-link">
                  <i className="fa-solid fa-building text-primary me-1"></i> Blood Bank Transfusion Wing
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="spatial-footer-link">
                  <i className="fa-solid fa-user-plus text-primary me-1"></i> Register as Voluntary Donor
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donor-profile" className="spatial-footer-link">
                  <i className="fa-solid fa-id-card text-primary me-1"></i> Smart Donor Card & History
                </Link>
              </li>
              <li className="mb-2">
                <a href="https://eraktkosh.in" target="_blank" rel="noreferrer" className="spatial-footer-link">
                  <i className="fa-solid fa-arrow-up-right-from-square text-primary me-1"></i> e-RaktKosh (MoHFW)
                </a>
              </li>
              <li className="mb-2">
                <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="spatial-footer-link">
                  <i className="fa-solid fa-database text-primary me-1"></i> Open Government Data India
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Interactive Blood Compatibility Mini-Pills */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-2 border-bottom border-danger pb-2 d-inline-block">
              Interactive Blood Selector
            </h6>
            <p className="small text-white-50 mb-2">
              Hover/click any blood group to preview emergency significance:
            </p>

            <div className="d-flex flex-wrap gap-1 mb-3">
              {Object.keys(bloodTips).map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setFooterGroup(bg)}
                  onMouseEnter={() => setFooterGroup(bg)}
                  className={`spatial-footer-pill-tag ${footerGroup === bg ? "bg-danger text-white border-danger" : ""}`}
                >
                  {bg}
                </button>
              ))}
            </div>

            {/* Interactive Live Tooltip Display */}
            <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15 small text-white shadow-sm">
              <strong className="text-danger d-block mb-1">
                <i className="fa-solid fa-circle-info me-1"></i> Blood Group {footerGroup}:
              </strong>
              <span className="text-white-50" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                {bloodTips[footerGroup]}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-secondary border-opacity-50 my-4" />

        {/* Bottom Bar with Interactive Language Selector & Scroll-to-Top Button */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 text-white-50 small">
          <div>
            © {new Date().getFullYear()} <strong>RaktDaan Network ({t("brandTagline", "Donate Blood, Save Lives")})</strong>. {t("footer.rights", "Certified Open Health Mission across India.")}
          </div>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-1">
              <span className="text-white-50 me-1" style={{ fontSize: "12px" }}>Language:</span>
              <LanguageSelector variant="header" />
            </div>
            <span>Made with <BiHeart className="text-danger mx-1" /> for humanitarian life-saving</span>
            <button
              onClick={scrollToTop}
              className="spatial-scroll-top-btn"
              title={t("footer.scrollTop", "Scroll to Top")}
              type="button"
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
