import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiDonateBlood, BiMapPin, BiTimeFive } from "react-icons/bi";
import Header from "../components/shared/Layout/Header";
import Footer from "../components/shared/Layout/Footer";
import NationalLiveStats from "../components/shared/NationalLiveStats";
import EligibilityQuiz from "../components/shared/EligibilityQuiz";
import SpatialCard from "../components/shared/SpatialCard";
import API from "../services/API";
import moment from "moment";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

const LandingPage = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("O+");
  const [searchCity, setSearchCity] = useState("");
  const [openRequests, setOpenRequests] = useState([]);
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [activeCompatGroup, setActiveCompatGroup] = useState("O-");
  const [activeMythTab, setActiveMythTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic language-sensitive content arrays (100% English when lang="en")
  const currentLangData = translations[lang] || translations.en;
  const testimonials = currentLangData.testimonials?.list || translations.en.testimonials.list;
  const mythsAndFacts = currentLangData.myths?.list || translations.en.myths.list;
  const faqs = currentLangData.faqs?.list || translations.en.faqs.list;
  const stepsList = currentLangData.steps?.list || translations.en.steps.list;

  const defaultFeaturedCamps = [
    {
      _id: "default-camp-1",
      title: "SMS Medical College & Rotary Mega Blood Donation Drive",
      organisationName: "SMS Medical College & Rotary Club Jaipur",
      venue: "SMS Medical College Auditorium, JLN Marg",
      city: "Jaipur",
      targetUnits: 250,
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      campDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      _id: "default-camp-2",
      title: "AIIMS & Indian Red Cross National Life Saver Drive",
      organisationName: "Indian Red Cross Society & AIIMS Delhi",
      venue: "Red Cross Bhawan, 1 Red Cross Road, Connaught Place",
      city: "New Delhi",
      targetUnits: 500,
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      campDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      _id: "default-camp-3",
      title: "Rotary Club & KEM Hospital City Blood Donation Camp",
      organisationName: "Rotary Club Mumbai & KEM Blood Bank",
      venue: "Rotary Youth Center, Bandra West",
      city: "Mumbai",
      targetUnits: 350,
      startTime: "09:30 AM",
      endTime: "05:30 PM",
      campDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    },
  ];

  const displayedCamps = upcomingCamps && upcomingCamps.length > 0 ? upcomingCamps : defaultFeaturedCamps;

  useEffect(() => {
    // Fetch live emergency requests & upcoming camps
    const fetchLandingData = async () => {
      try {
        const [reqRes, campRes] = await Promise.all([
          API.get("/emergency/open-requests"),
          API.get("/camps/all"),
        ]);
        if (reqRes.data?.success) {
          setOpenRequests(reqRes.data.requests.slice(0, 4));
        }
        if (campRes.data?.success) {
          setUpcomingCamps(campRes.data.camps.slice(0, 3));
        }
      } catch (err) {
        console.error("Landing data load error:", err);
      }
    };
    fetchLandingData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login or register to contact nearby donors directly.");
      navigate("/login");
    } else {
      navigate(
        `/emergency-donors?bloodGroup=${encodeURIComponent(
          selectedGroup
        )}&city=${encodeURIComponent(searchCity)}`
      );
    }
  };

  const compatibilityData = [
    { group: "O-", givesTo: "Everyone (Universal Donor)", receivesFrom: "O- only", isUniversalDonor: true },
    { group: "O+", givesTo: "O+, A+, B+, AB+", receivesFrom: "O+, O-" },
    { group: "A-", givesTo: "A-, A+, AB-, AB+", receivesFrom: "A-, O-" },
    { group: "A+", givesTo: "A+, AB+", receivesFrom: "A+, A-, O+, O-" },
    { group: "B-", givesTo: "B-, B+, AB-, AB+", receivesFrom: "B-, O-" },
    { group: "B+", givesTo: "B+, AB+", receivesFrom: "B+, B-, O+, O-" },
    { group: "AB-", givesTo: "AB-, AB+", receivesFrom: "AB-, A-, B-, O-" },
    { group: "AB+", givesTo: "AB+ only", receivesFrom: "Everyone (Universal Recipient)", isUniversalRecipient: true },
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Global Header with RaktDaan branding */}
      <Header />

      {/* Live Community Feed Banner */}
      <div className="bg-dark border-bottom border-danger border-opacity-25 py-2 text-white-50 small">
        <div className="container d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-danger text-uppercase px-2 py-1 shadow-sm" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
              <i className="fa-solid fa-heart-pulse me-1"></i> {t("hero.liveCommunity", "Live Community")}
            </span>
            <span className="text-white small">
              🩸 {t("hero.tickerText", "Rohit M. (Jaipur) donated B+ • PBM Hospital (Bikaner) verified 8 units O- • Rotary Camp collected 45 units • Pooja S. joined as O- donor")}
            </span>
          </div>
          <span className="text-white-50 small d-none d-md-flex align-items-center gap-1">
            <span className="spatial-radar-bead"></span>
            <span>{t("hero.activity", "Real-time Pan-India Volunteer Activity")}</span>
          </span>
        </div>
      </div>

      {/* Hero Section with Warm Human Tone & Spatial Depth */}
      <section
        className="py-5 text-white position-relative overflow-hidden spatial-canvas"
        style={{
          background: "linear-gradient(135deg, #140407 0%, #20060c 45%, #0f131a 100%)",
          minHeight: "560px",
        }}
      >
        {/* Spatial Floating Orbs */}
        <div className="spatial-orb spatial-orb-red" />
        <div className="spatial-orb spatial-orb-blue" />
        <div className="spatial-orb spatial-orb-purple" />

        <div className="container py-lg-5 py-3 position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              {/* Trust Badge */}
              <div className="spatial-hud-bar-dark mb-3">
                <span className="spatial-radar-bead"></span>
                <span className="small fw-bold text-uppercase" style={{ letterSpacing: "0.06em", fontSize: "0.78rem" }}>
                  {t("hero.trustBadge", "RaktDaan • 100% Free & Verified Voluntary Blood Network")}
                </span>
              </div>

              <h1 className="display-4 fw-bold lh-sm mb-3 text-white">
                {t("hero.title", "One Donation Can Save Up to 3 Lives.")}
              </h1>
              <p className="lead text-white-50 mb-4" style={{ maxWidth: "600px", lineHeight: "1.7" }}>
                {t("hero.subtitle", "RaktDaan connects voluntary donors, certified government hospital blood centers, and families in critical emergencies across every city in India. No middlemen, no commercial selling — just pure humanity.")}
              </p>

              <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 gap-sm-3 mb-4">
                <Link to="/register" className="btn btn-danger btn-lg px-3 px-sm-4 py-3 fw-bold spatial-btn-glow shadow text-center">
                  🩸 {t("hero.btnDonate", "Become a Voluntary Donor")}
                </Link>
                <Link to="/blood-stock" className="btn btn-outline-light btn-lg px-3 px-sm-4 py-3 rounded-pill text-center">
                  🏥 {t("hero.btnFindStock", "Check City Blood Stock")}
                </Link>
                <Link to="/donation-camps" className="btn btn-outline-danger btn-lg px-3 px-sm-4 py-3 rounded-pill text-white border-white-50 text-center">
                  🏕️ {t("nav.camps", "Find Blood Camps")}
                </Link>
              </div>

              {/* Trust Pillars */}
              <div className="d-flex flex-wrap gap-4 pt-2 text-white-50 small border-top border-white border-opacity-10">
                <span>
                  <i className="fa-solid fa-check text-success me-1"></i> {t("hero.guidelines", "MoHFW / NBTC Guidelines Compliant")}
                </span>
                <span>
                  <i className="fa-solid fa-check text-success me-1"></i> {t("hero.coordination", "Direct Hospital & Doctor Coordination")}
                </span>
                <span>
                  <i className="fa-solid fa-check text-success me-1"></i> {t("hero.card", "Instant Digital Lifesaver Card")}
                </span>
              </div>
            </div>

            {/* Quick Emergency Search Widget in 3D SpatialCard */}
            <div className="col-lg-5">
              <SpatialCard
                variant="light"
                tiltFactor={9}
                className="p-4 p-md-5 rounded-4 shadow-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.94)",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-danger text-white p-3 rounded-circle me-3 shadow" style={{ boxShadow: "0 0 16px rgba(220, 53, 69, 0.5)" }}>
                    <BiDonateBlood size={26} />
                  </div>
                  <div>
                    <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-1" style={{ fontSize: "11px" }}>
                      DIRECT PATIENT FINDER
                    </span>
                    <h5 className="fw-bold mb-0 text-dark">{t("quickFinder.title", "Find Blood Near You")}</h5>
                    <small className="text-muted">Instant certified blood bank & donor search</small>
                  </div>
                </div>

                <form onSubmit={handleHeroSearch}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">
                      {t("quickFinder.selectBloodGroup", "Required Blood Group")}
                    </label>
                    <select
                      className="form-select form-select-lg border-danger shadow-none"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      <option value="O+">O Positive (O+)</option>
                      <option value="O-">O Negative (O-) - Universal Donor</option>
                      <option value="A+">A Positive (A+)</option>
                      <option value="A-">A Negative (A-)</option>
                      <option value="B+">B Positive (B+)</option>
                      <option value="B-">B Negative (B-)</option>
                      <option value="AB+">AB Positive (AB+) - Universal Recipient</option>
                      <option value="AB-">AB Negative (AB-)</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary">
                      {t("quickFinder.enterCity", "Enter City / District / Area")}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg shadow-none"
                      placeholder={t("quickFinder.placeholder", "e.g. Bikaner, Jaipur, Jodhpur, Kota, Surat...")}
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-danger btn-lg w-100 fw-bold spatial-btn-glow shadow">
                    🔍 {t("quickFinder.btnSearch", "Search Verified Blood Stock")}
                  </button>
                  <p className="text-muted text-center small mt-2 mb-0" style={{ fontSize: "12px" }}>
                    <i className="fa-solid fa-lock text-success me-1"></i>
                    {t("quickFinder.certified", "Certified Government & Charitable Blood Centers • 100% Free")}
                  </p>
                </form>
              </SpatialCard>
            </div>
          </div>
        </div>
      </section>

      {/* Live Emergency Board (RaktDaan Live Feed) */}
      {openRequests.length > 0 && (
        <section className="py-4 bg-danger bg-opacity-10 border-bottom border-danger">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <span className="badge bg-danger me-2">LIVE SOS</span>
                <strong className="text-danger fs-5">Active Emergency Blood Requirements</strong>
              </div>
              <span className="small text-muted">
                Immediate patient blood requirements posted by registered medical centers
              </span>
            </div>

            <div className="row g-3">
              {openRequests.map((req) => (
                <div className="col-md-6 col-lg-3" key={req._id}>
                  <div className="card shadow-sm border-0 h-100 p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-danger fs-6">{req.bloodGroup}</span>
                      <span className={`badge ${req.urgency === "Critical" ? "bg-danger" : "bg-warning text-dark"}`}>
                        {req.urgency}
                      </span>
                    </div>
                    <h6 className="fw-bold mb-1 text-truncate">{req.patientName}</h6>
                    <small className="text-muted d-block text-truncate">
                      🏥 {req.hospitalName}
                    </small>
                    <small className="text-muted d-block text-truncate mb-3">
                      📍 {req.city} ({req.accidentLocation})
                    </small>
                    <div className="mt-auto">
                      <a
                        href={`tel:${req.hospitalPhone}`}
                        className="btn btn-outline-danger btn-sm w-100 fw-semibold"
                      >
                        📞 Call Hospital: {req.hospitalPhone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Real-Time National Blood Stats & Events Tracker */}
      <NationalLiveStats />

      {/* Impact Statistics Counter */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-danger mb-0">1,250+</h2>
              <p className="text-muted fw-semibold small text-uppercase">Voluntary Donors</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-primary mb-0">8</h2>
              <p className="text-muted fw-semibold small text-uppercase">Blood Groups Covered</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-success mb-0">45+</h2>
              <p className="text-muted fw-semibold small text-uppercase">Partner Hospitals</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-warning mb-0">100%</h2>
              <p className="text-muted fw-semibold small text-uppercase">Voluntary & Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Spatial Blood Compatibility Hologram */}
      <section className="py-5 bg-white border-bottom position-relative overflow-hidden">
        <div className="spatial-orb spatial-orb-red" style={{ opacity: 0.12 }} />
        <div className="spatial-orb spatial-orb-blue" style={{ opacity: 0.12 }} />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="text-center mb-4">
            <div className="spatial-hud-bar mb-2 mx-auto">
              <span className="spatial-radar-bead"></span>
              <span className="small fw-bold text-danger text-uppercase" style={{ letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                Interactive Spatial Compatibility Engine
              </span>
            </div>
            <h2 className="display-6 fw-bold text-dark">
              🩸 Interactive 3D Blood Compatibility Hologram
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "680px" }}>
              Click any blood group button below to project live compatibility and emergency transfusion pathways in 3D.
            </p>

            {/* 8 Interactive Blood Group Pills */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mt-3 mb-4">
              {compatibilityData.map((item) => (
                <button
                  key={item.group}
                  type="button"
                  onClick={() => setActiveCompatGroup(item.group)}
                  className={`spatial-tab-pill px-3 py-2 fs-6 shadow-sm ${
                    activeCompatGroup === item.group ? "active" : ""
                  }`}
                  style={{
                    border: activeCompatGroup === item.group ? "none" : "1.5px solid #e2e8f0",
                    background: activeCompatGroup === item.group ? undefined : "#ffffff",
                  }}
                >
                  <i className="fa-solid fa-droplet me-1"></i> {item.group}
                </button>
              ))}
            </div>
          </div>

          {/* Active 3D Spatial Hologram Projection Card */}
          {(() => {
            const currentItem =
              compatibilityData.find((x) => x.group === activeCompatGroup) ||
              compatibilityData[0];
            return (
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <SpatialCard
                    variant="light"
                    tiltFactor={10}
                    className="p-4 p-md-5 rounded-4 shadow-xl border"
                  >
                    <div className="row align-items-center g-4">
                      <div className="col-md-4 text-center border-bottom border-bottom-md-0 border-end-md pb-4 pb-md-0">
                        <span className="badge bg-danger bg-opacity-10 text-danger fs-6 px-3 py-1 mb-2">
                          SELECTED PROFILE
                        </span>
                        <div className="display-1 fw-black text-danger my-1 spatial-counter-val-red">
                          {currentItem.group}
                        </div>
                        <h6 className="fw-bold text-dark mb-2">
                          Blood Group {currentItem.group}
                        </h6>
                        {currentItem.isUniversalDonor && (
                          <span className="badge bg-success px-3 py-2 d-inline-block shadow-sm">
                            ⭐ Universal Red Cell Donor
                          </span>
                        )}
                        {currentItem.isUniversalRecipient && (
                          <span className="badge bg-primary px-3 py-2 d-inline-block shadow-sm">
                            🌟 Universal Recipient
                          </span>
                        )}
                        {!currentItem.isUniversalDonor &&
                          !currentItem.isUniversalRecipient && (
                            <span className="badge bg-light text-secondary border px-3 py-2 d-inline-block">
                              Standard Compatible
                            </span>
                          )}
                      </div>

                      <div className="col-md-8">
                        <div className="mb-4">
                          <span className="small text-muted fw-bold text-uppercase d-block mb-1">
                            <i className="fa-solid fa-hand-holding-medical text-danger me-2"></i>
                            Can Donate Blood To (Recipients):
                          </span>
                          <div className="p-3 bg-light rounded-3 border">
                            <h5 className="fw-bold text-danger mb-1">
                              {currentItem.givesTo}
                            </h5>
                            <small className="text-muted">
                              Patients with these blood groups can safely receive red blood cells from {currentItem.group} donors.
                            </small>
                          </div>
                        </div>

                        <div>
                          <span className="small text-muted fw-bold text-uppercase d-block mb-1">
                            <i className="fa-solid fa-heart-pulse text-primary me-2"></i>
                            Can Receive Blood From (Donors):
                          </span>
                          <div className="p-3 bg-light rounded-3 border">
                            <h5 className="fw-bold text-primary mb-1">
                              {currentItem.receivesFrom}
                            </h5>
                            <small className="text-muted">
                              In emergencies or surgeries, a person with {currentItem.group} can safely accept transfusions from these donors.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpatialCard>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Upcoming Blood Donation Camps */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <span className="badge bg-danger mb-1">{t("camps.badge", "COMMUNITY DRIVES")}</span>
              <h2 className="fw-bold text-dark mb-0">{t("camps.title", "Upcoming Blood Donation Camps")}</h2>
            </div>
            <Link to="/donation-camps" className="btn btn-outline-danger fw-semibold">
              {t("camps.viewAll", "View All Camps →")}
            </Link>
          </div>

          <div className="row g-4">
            {displayedCamps.map((camp) => (
              <div className="col-12 col-md-6 col-lg-4" key={camp._id}>
                <div className="card shadow-sm border-0 h-100 p-4 rounded-3 border-top border-danger border-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-danger bg-opacity-10 text-danger fw-bold">
                      {t("camps.target", "Target")}: {camp.targetUnits} {t("camps.units", "Units")}
                    </span>
                    <span className="small text-muted">
                      <BiTimeFive className="me-1" />
                      {camp.startTime} - {camp.endTime}
                    </span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{camp.title}</h5>
                  <p className="text-muted small mb-2">
                    <strong>{t("camps.organisedBy", "Organised By")}:</strong> {camp.organisationName}
                  </p>
                  <p className="text-muted small mb-3">
                    <BiMapPin className="text-danger me-1" />
                    <strong>{t("camps.venue", "Venue")}:</strong> {camp.venue}, {camp.city}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <span className="fw-bold text-danger">
                      📅 {moment(camp.campDate).format("DD MMMM YYYY")}
                    </span>
                    <Link to="/donation-camps" className="btn btn-sm btn-danger px-3">
                      {t("camps.registerNow", "Register Now")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps to Save a Life: High-Tech Spatial Workflow */}
      <section className="py-5 bg-light border-top position-relative overflow-hidden">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="text-center mb-5">
            <div className="spatial-hud-bar mb-2 bg-white shadow-sm border">
              <span className="spatial-radar-bead"></span>
              <span className="small fw-bold text-uppercase text-danger" style={{ fontSize: "11px", letterSpacing: "1px" }}>
                {t("steps.badge", "SIMPLE • TRANSPARENT • SAFE")}
              </span>
            </div>
            <h2 className="display-6 fw-bold text-dark mb-2">{t("steps.title", "How Voluntary Blood Donation Works")}</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              {t("steps.subtitle", "A compassionate 4-step journey from kind heart to saved life — safe, painless, and medically supervised.")}
            </p>
          </div>

          <div className="row g-4 text-center">
            {stepsList.map((step, idx) => (
              <div className="col-12 col-sm-6 col-lg-3" key={idx}>
                <SpatialCard variant="light" tiltFactor={7} className="p-4 rounded-4 h-100 shadow-sm border position-relative">
                  <div
                    className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{
                      width: "56px",
                      height: "56px",
                      background:
                        idx === 0
                          ? "linear-gradient(135deg, #dc3545, #b02a37)"
                          : idx === 1
                          ? "linear-gradient(135deg, #0d6efd, #0a58ca)"
                          : idx === 2
                          ? "linear-gradient(135deg, #198754, #146c43)"
                          : "linear-gradient(135deg, #ffc107, #d39e00)",
                    }}
                  >
                    <i className={`${step.icon || "fa-solid fa-droplet"} fs-5 ${idx === 3 ? "text-dark" : ""}`}></i>
                  </div>
                  <span
                    className={`badge bg-${step.color || "danger"} bg-opacity-15 text-${step.color || "danger"} fw-bold mb-2`}
                  >
                    {step.num || `STEP 0${idx + 1}`}
                  </span>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    {step.desc}
                  </p>
                </SpatialCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Myths vs Facts: Interactive Educational Guide */}
      <section className="py-5 bg-white border-top position-relative">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge bg-danger mb-2 px-3 py-1 fw-bold">{t("myths.badge", "AWARENESS • MEDICAL FACTS")}</span>
            <h2 className="display-6 fw-bold text-dark mb-2">{t("myths.title", "Myths & Medical Facts About Blood Donation")}</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
              {t("myths.subtitle", "Separate popular misconceptions from verified medical science. Click any tab to view certified facts by doctors:")}
            </p>

            {/* Myth Selector Tabs */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mt-3 mb-4">
              {mythsAndFacts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMythTab(idx)}
                  className={`spatial-tab-pill px-4 py-2 fw-bold transition-all ${
                    activeMythTab === idx ? "active bg-danger text-white shadow" : "bg-light text-secondary border"
                  }`}
                  style={{
                    borderRadius: "9999px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa-solid fa-circle-question me-1"></i>
                  {t("myths.tabPrefix", "Myth #")}{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Myth Card */}
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9">
              <SpatialCard variant="light" tiltFactor={5} className="p-4 p-md-5 rounded-4 shadow-lg border">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-3 py-2 fs-6">
                    <i className="fa-solid fa-triangle-exclamation me-1"></i> {t("myths.commonBadge", "Common Myth")} #{activeMythTab + 1}
                  </span>
                  <span className="badge bg-success bg-opacity-15 text-success fw-bold px-3 py-2 fs-6 border border-success border-opacity-25">
                    <i className="fa-solid fa-circle-check me-1"></i> {mythsAndFacts[activeMythTab]?.badge || t("myths.factVerified", "Doctor-Certified Medical Fact")}
                  </span>
                </div>

                <h4 className="fw-bold text-danger mb-4 pb-2 border-bottom" style={{ lineHeight: "1.5" }}>
                  ❌ "{mythsAndFacts[activeMythTab]?.myth}"
                </h4>

                <div className="p-4 bg-success bg-opacity-10 rounded-4 border border-success border-opacity-25 shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="bg-success text-white rounded-circle p-1 d-inline-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px" }}>
                      <i className="fa-solid fa-stethoscope small"></i>
                    </div>
                    <strong className="text-success fs-6">
                      {t("myths.factVerified", "Doctor-Certified Medical Fact")}:
                    </strong>
                  </div>
                  <p className="text-dark mb-0 fs-6" style={{ lineHeight: "1.8" }}>
                    {mythsAndFacts[activeMythTab]?.fact}
                  </p>
                </div>
              </SpatialCard>
            </div>
          </div>
        </div>
      </section>

      {/* Community Lifesavers: Real Human Stories */}
      <section className="py-5 bg-light border-top">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger mb-2 px-3 py-1 fw-bold">{t("testimonials.badge", "COMMUNITY STORIES")}</span>
            <h2 className="display-6 fw-bold text-dark mb-2">{t("testimonials.title", "Our Real Heroes — Lifesavers of RaktDaan")}</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              {t("testimonials.subtitle", "Every day, ordinary citizens do extraordinary things by donating blood voluntarily and saving precious lives.")}
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((tItem, idx) => (
              <div className="col-12 col-md-6 col-lg-4" key={idx}>
                <SpatialCard variant="light" tiltFactor={7} className="p-4 h-100 shadow-sm border rounded-4 d-flex flex-column bg-white">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 shadow"
                        style={{ width: "48px", height: "48px", boxShadow: "0 4px 12px rgba(220, 53, 69, 0.4)" }}
                      >
                        {tItem.name?.charAt(0) || "D"}
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-0">{tItem.name}</h6>
                        <small className="text-muted d-block">{tItem.city}</small>
                      </div>
                    </div>
                    <span className="badge bg-danger bg-opacity-10 text-danger fw-bold" style={{ fontSize: "11px" }}>
                      {tItem.badge}
                    </span>
                  </div>

                  <p className="text-secondary small fst-italic mb-3 flex-grow-1" style={{ lineHeight: "1.8" }}>
                    "{tItem.quote}"
                  </p>

                  <div className="pt-3 border-top d-flex justify-content-between align-items-center small text-muted">
                    <span>
                      <i className="fa-solid fa-user-check text-success me-1"></i> {tItem.role}
                    </span>
                    <span className="fw-bold text-danger">
                      🩸 {tItem.donations}
                    </span>
                  </div>
                </SpatialCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQs Accordion */}
      <section className="py-5 bg-white border-top">
        <div className="container" style={{ maxWidth: "920px" }}>
          <div className="text-center mb-5">
            <span className="badge bg-danger mb-2 px-3 py-1 fw-bold">{t("faqs.badge", "COMMON QUESTIONS")}</span>
            <h2 className="display-6 fw-bold text-dark mb-2">{t("faqs.title", "Frequently Asked Questions (FAQs)")}</h2>
            <p className="text-muted">{t("faqs.subtitle", "Everything you need to know about voluntary donation, safety, and procedures.")}</p>
          </div>

          <div className="d-grid gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card border rounded-4 overflow-hidden shadow-sm transition"
                  style={{
                    borderColor: isOpen ? "#dc3545" : "#e2e8f0",
                    transition: "all 0.25s ease",
                  }}
                >
                  <button
                    type="button"
                    className="p-3 p-md-4 w-100 text-start bg-transparent border-0 d-flex justify-content-between align-items-center fw-bold text-dark"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="d-flex align-items-center gap-3">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${
                          isOpen ? "bg-danger text-white" : "bg-light text-danger"
                        }`}
                        style={{ width: "32px", height: "32px", minWidth: "32px" }}
                      >
                        <i className="fa-regular fa-circle-question"></i>
                      </div>
                      <span className="fs-6">{faq.q}</span>
                    </span>
                    <i
                      className={`fa-solid ${isOpen ? "fa-minus text-danger" : "fa-plus text-muted"}`}
                      style={{ transition: "transform 0.2s ease" }}
                    ></i>
                  </button>
                  {isOpen && (
                    <div
                      className="px-4 pb-4 pt-1 text-secondary border-top bg-light"
                      style={{ lineHeight: "1.8", fontSize: "0.95rem" }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 60-Second Blood Donation Eligibility Check */}
      <section className="py-5 bg-light border-top">
        <div className="container" style={{ maxWidth: "800px" }}>
          <EligibilityQuiz />
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
