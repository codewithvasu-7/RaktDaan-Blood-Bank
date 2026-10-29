import React, { useState, useEffect } from "react";
import { BiDonateBlood, BiUserCircle, BiLogOut, BiPlusCircle } from "react-icons/bi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageSelector from "../LanguageSelector";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const canRequestBlood =
    user?.role === "hospital" ||
    user?.role === "organisation" ||
    user?.role === "admin";

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="sticky-top spatial-header-wrapper" style={{ zIndex: 1040 }}>
      <nav className="navbar spatial-header-nav py-2">
        <div className="container-fluid px-2 px-sm-3 px-lg-4 d-flex align-items-center justify-content-between">
          {/* Logo Brand: RaktDaan */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center text-white text-decoration-none me-2"
            onClick={closeMobile}
          >
            <div
              className="bg-danger text-white p-2 rounded-circle me-2 d-inline-flex align-items-center justify-content-center shadow"
              style={{ boxShadow: "0 0 14px rgba(220, 53, 69, 0.6)", width: "36px", height: "36px" }}
            >
              <BiDonateBlood size={20} />
            </div>
            <div>
              <span className="fw-bold fs-4 tracking-wide text-white">
                Rakt<span className="text-danger">Daan</span>
              </span>
              <span
                className="badge bg-danger ms-2 d-none d-xxl-inline-block small"
                style={{ fontSize: "10px", letterSpacing: "0.5px" }}
              >
                {t("brandTagline", "Donate Blood, Save Lives")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Row (Screens >= 1280px) */}
          <div className="spatial-desktop-nav align-items-center gap-1 gap-xxl-2">
            {/* Links */}
            <Link
              to="/"
              className={`spatial-nav-link ${isActive("/") ? "active" : ""}`}
            >
              <i className="fa-solid fa-house"></i>
              <span>{t("nav.home", "Home")}</span>
            </Link>

            {user && (
              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "hospital"
                    ? "/emergency-donors"
                    : user.role === "donar"
                    ? "/donor-profile"
                    : "/dashboard"
                }
                className={`spatial-nav-link ${
                  isActive("/dashboard") ||
                  isActive("/admin") ||
                  isActive("/donor-profile")
                    ? "active"
                    : ""
                }`}
              >
                <i className="fa-solid fa-gauge-high"></i>
                <span>{t("nav.dashboard", "Dashboard")}</span>
              </Link>
            )}

            <Link
              to="/blood-stock"
              className={`spatial-nav-link ${isActive("/blood-stock") ? "active" : ""}`}
            >
              <i className="fa-solid fa-hospital"></i>
              <span>{t("nav.bloodStock", "Blood Stock")}</span>
            </Link>

            <Link
              to="/orgnaisation"
              className={`spatial-nav-link ${
                isActive("/orgnaisation") || isActive("/organisation") ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-building-ngo"></i>
              <span>{t("nav.bloodBanks", "Blood Banks")}</span>
            </Link>

            <Link
              to="/donation-camps"
              className={`spatial-nav-link ${isActive("/donation-camps") ? "active" : ""}`}
            >
              <i className="fa-solid fa-tents"></i>
              <span>{t("nav.camps", "Camps")}</span>
            </Link>

            <Link
              to="/blood-compatibility"
              className={`spatial-nav-link ${isActive("/blood-compatibility") ? "active" : ""}`}
            >
              <i className="fa-solid fa-dna"></i>
              <span>{t("nav.compatibility", "Compatibility")}</span>
            </Link>

            <Link
              to="/eligibility-check"
              className={`spatial-nav-link ${isActive("/eligibility-check") ? "active" : ""}`}
            >
              <i className="fa-solid fa-vial"></i>
              <span>{t("nav.eligibility", "Eligibility")}</span>
            </Link>

            {/* Analytics for Organisations and Admins */}
            {(user?.role === "organisation" || user?.role === "admin") && (
              <Link
                to="/analytics"
                className={`spatial-nav-link ${isActive("/analytics") ? "active" : ""}`}
              >
                <i className="fa-solid fa-chart-line"></i>
                <span>{t("nav.analytics", "Analytics")}</span>
              </Link>
            )}

            {/* Language Selector */}
            <div className="ms-1 me-1">
              <LanguageSelector variant="header" />
            </div>

            {/* Auth Actions (Desktop) */}
            {user ? (
              <div className="d-flex align-items-center gap-1 gap-xxl-2 ms-1">
                {canRequestBlood && (
                  <Link
                    to="/emergency-donors"
                    className="btn btn-sm btn-danger fw-bold spatial-btn-glow px-2 py-1 spatial-header-cta-btn"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    🚨 {t("nav.sosDispatch", "SOS")}
                  </Link>
                )}

                {user?.role === "donar" && (
                  <Link
                    to="/donor-profile"
                    className="btn btn-sm btn-outline-danger fw-bold px-2 py-1 text-white border-danger spatial-header-cta-btn"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <i className="fa-solid fa-id-card me-1 text-danger"></i>
                    {t("nav.donorCard", "Card")}
                  </Link>
                )}

                <span
                  className="text-white small d-flex align-items-center bg-white bg-opacity-10 py-1 px-2 rounded-pill border border-white border-opacity-20"
                  style={{ whiteSpace: "nowrap", fontSize: "11px" }}
                >
                  <BiUserCircle size={16} className="me-1 text-danger" />
                  <span className="text-white fw-semibold me-1 text-truncate" style={{ maxWidth: "90px" }}>
                    {user?.name || user?.hospitalName || user?.organisationName || "User"}
                  </span>
                  <span className="badge bg-danger text-uppercase" style={{ fontSize: "9px" }}>
                    {user?.role}
                  </span>
                </span>

                <button
                  className="btn btn-sm btn-outline-light px-2 py-1 rounded-pill spatial-header-cta-btn"
                  onClick={handleLogout}
                  title={t("nav.logout", "Logout")}
                >
                  <BiLogOut />
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-1 ms-1">
                <Link
                  to="/login"
                  className="btn btn-sm btn-outline-light px-3 py-1 rounded-pill spatial-header-cta-btn"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {t("nav.login", "Login")}
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm btn-danger fw-bold px-3 py-1 rounded-pill spatial-btn-glow shadow-sm spatial-header-cta-btn"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <BiPlusCircle className="me-1" />
                  <span>{t("nav.registerDonor", "Register as Donor")}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Language Selector + Hamburger (< 1280px) */}
          <div className="spatial-mobile-toggle align-items-center gap-2">
            <LanguageSelector variant="header" />
            <button
              className="navbar-toggler border-0 shadow-none text-white p-1"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                borderRadius: "10px",
                width: "42px",
                height: "42px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark fs-4" : "fa-bars fs-5"} text-white`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Down Drawer (< 1280px) */}
      {mobileMenuOpen && (
        <div className="spatial-mobile-drawer">
          <div className="container px-2">
            {/* Nav Links Grid */}
            <div className="mb-3">
              <span className="text-white-50 fw-bold small text-uppercase d-block mb-2 ps-1" style={{ fontSize: "11px", letterSpacing: "1px" }}>
                Navigation
              </span>
              <div className="row g-2">
                <div className="col-6">
                  <Link
                    to="/"
                    onClick={closeMobile}
                    className={`spatial-mobile-nav-item ${isActive("/") ? "active" : ""}`}
                  >
                    <i className="fa-solid fa-house text-danger"></i>
                    <span>{t("nav.home", "Home")}</span>
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/blood-stock"
                    onClick={closeMobile}
                    className={`spatial-mobile-nav-item ${isActive("/blood-stock") ? "active" : ""}`}
                  >
                    <i className="fa-solid fa-hospital text-danger"></i>
                    <span>{t("nav.bloodStock", "Blood Stock")}</span>
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/orgnaisation"
                    onClick={closeMobile}
                    className={`spatial-mobile-nav-item ${
                      isActive("/orgnaisation") || isActive("/organisation") ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-building-ngo text-danger"></i>
                    <span>{t("nav.bloodBanks", "Blood Banks")}</span>
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/donation-camps"
                    onClick={closeMobile}
                    className={`spatial-mobile-nav-item ${isActive("/donation-camps") ? "active" : ""}`}
                  >
                    <i className="fa-solid fa-tents text-danger"></i>
                    <span>{t("nav.camps", "Camps")}</span>
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/blood-compatibility"
                    onClick={closeMobile}
                    className={`spatial-mobile-nav-item ${isActive("/blood-compatibility") ? "active" : ""}`}
                  >
                    <i className="fa-solid fa-dna text-danger"></i>
                    <span>{t("nav.compatibility", "Compatibility")}</span>
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/eligibility-check"
                    onClick={closeMobile}
                    className={`spatial-mobile-nav-item ${isActive("/eligibility-check") ? "active" : ""}`}
                  >
                    <i className="fa-solid fa-vial text-danger"></i>
                    <span>{t("nav.eligibility", "Eligibility")}</span>
                  </Link>
                </div>
                {user && (
                  <div className="col-12">
                    <Link
                      to={
                        user.role === "admin"
                          ? "/admin"
                          : user.role === "hospital"
                          ? "/emergency-donors"
                          : user.role === "donar"
                          ? "/donor-profile"
                          : "/dashboard"
                      }
                      onClick={closeMobile}
                      className="spatial-mobile-nav-item"
                    >
                      <i className="fa-solid fa-gauge-high text-danger"></i>
                      <span>{t("nav.dashboard", "Dashboard")}</span>
                    </Link>
                  </div>
                )}
                {(user?.role === "organisation" || user?.role === "admin") && (
                  <div className="col-12">
                    <Link
                      to="/analytics"
                      onClick={closeMobile}
                      className={`spatial-mobile-nav-item ${isActive("/analytics") ? "active" : ""}`}
                    >
                      <i className="fa-solid fa-chart-line text-danger"></i>
                      <span>{t("nav.analytics", "Analytics")}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* User Account / Auth Section */}
            <div className="pt-2 border-top border-white border-opacity-10">
              {user ? (
                <div>
                  <div className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-white bg-opacity-10 mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <BiUserCircle size={24} className="text-danger" />
                      <div>
                        <div className="text-white fw-bold small">
                          {user?.name || user?.hospitalName || user?.organisationName || "User"}
                        </div>
                        <span className="badge bg-danger text-uppercase" style={{ fontSize: "9px" }}>
                          {user?.role}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-light rounded-pill px-3"
                      onClick={() => {
                        closeMobile();
                        handleLogout();
                      }}
                    >
                      <BiLogOut className="me-1" />
                      {t("nav.logout", "Logout")}
                    </button>
                  </div>

                  <div className="d-flex gap-2">
                    {canRequestBlood && (
                      <Link
                        to="/emergency-donors"
                        onClick={closeMobile}
                        className="btn btn-danger btn-sm w-100 fw-bold spatial-btn-glow"
                      >
                        🚨 {t("nav.sosDispatch", "Emergency SOS Dispatch")}
                      </Link>
                    )}
                    {user?.role === "donar" && (
                      <Link
                        to="/donor-profile"
                        onClick={closeMobile}
                        className="btn btn-outline-danger btn-sm w-100 fw-bold text-white border-danger"
                      >
                        <i className="fa-solid fa-id-card me-1 text-danger"></i>
                        {t("nav.donorCard", "Smart Donor Card")}
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="btn btn-danger btn-lg w-100 fw-bold spatial-btn-glow shadow text-center"
                  >
                    <BiPlusCircle className="me-1" />
                    {t("nav.registerDonor", "Register as Donor")}
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="btn btn-outline-light btn-md w-100 rounded-pill text-center"
                  >
                    {t("nav.login", "Login to Account")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
