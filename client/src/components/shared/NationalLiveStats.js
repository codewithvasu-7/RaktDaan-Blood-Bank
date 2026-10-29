import React, { useState, useEffect, useCallback } from "react";
import API from "../../services/API";
import { Link } from "react-router-dom";
import SpatialCard from "./SpatialCard";

const NationalLiveStats = () => {
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [availableStates, setAvailableStates] = useState([]);
  const [showApiGuide, setShowApiGuide] = useState(false);

  // Fetch National Summary
  const fetchSummary = useCallback(async () => {
    try {
      const { data } = await API.get("/national-stats/summary");
      if (data?.success) {
        setSummary(data.data);
      }
    } catch (err) {
      console.error("Error fetching national summary:", err);
    }
  }, []);

  // Fetch National Events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      let url = `/national-stats/events?state=${encodeURIComponent(
        selectedState === "All" ? "" : selectedState
      )}&search=${encodeURIComponent(searchQuery)}`;
      const { data } = await API.get(url);
      if (data?.success) {
        setEvents(data.events);
        if (data.availableStates) {
          setAvailableStates(data.availableStates);
        }
      }
    } catch (err) {
      console.error("Error fetching national events:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedState, searchQuery]);

  useEffect(() => {
    fetchSummary();
    fetchEvents();
    // Auto-refresh summary every 60 seconds for live feel
    const interval = setInterval(fetchSummary, 60000);
    return () => clearInterval(interval);
  }, [fetchSummary, fetchEvents]);

  return (
    <section id="national-tracker" className="py-5 bg-light border-top border-bottom">
      <div className="container">
        {/* Header & Status Indicator */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-danger bg-opacity-10 text-danger rounded-pill fw-bold small mb-2">
              <span className="spatial-radar-bead"></span>
              🇮🇳 MoHFW & State Blood Transfusion Council Public Registry
            </div>
            <h2 className="fw-bold text-dark mb-1">
              National Blood Donation Tracker & Certified Events
            </h2>
            <p className="text-muted small mb-0">
              Live public records directly synchronized with Ministry of Health & Family Welfare (data.gov.in)
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {summary?.apiKeyConfigured ? (
              <span className="badge bg-success py-2 px-3 d-flex align-items-center gap-2 shadow-sm">
                <i className="fa-solid fa-circle-check"></i>
                <span>Official data.gov.in API Connected</span>
                <span className="badge bg-dark bg-opacity-25 text-white fw-normal" style={{ fontSize: "11px" }}>
                  Active Key: {summary?.activeKeyPreview || "579b...31ae"}
                </span>
              </span>
            ) : (
              <button
                onClick={() => setShowApiGuide(!showApiGuide)}
                className="btn btn-sm btn-outline-danger fw-semibold d-flex align-items-center gap-1"
              >
                <i className="fa-solid fa-key"></i> How to add Real-Time API Key?
              </button>
            )}
            <button
              onClick={() => {
                fetchSummary();
                fetchEvents();
              }}
              className="btn btn-sm btn-dark d-flex align-items-center gap-1 shadow-sm"
              title="Refresh live data"
            >
              <i className="fa-solid fa-rotate"></i> Refresh
            </button>
          </div>
        </div>

        {/* API Key Modal / Explainer Accordion */}
        {showApiGuide && (
          <div className="alert alert-dark bg-white border border-danger border-2 p-4 rounded-3 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-danger mb-0">
                <i className="fa-solid fa-code me-2"></i> Real-Time API Key Setup Guide (Data.gov.in / e-RaktKosh)
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowApiGuide(false)}
              ></button>
            </div>
            <p className="text-secondary small mb-3">
              This platform integrates directly with official Ministry of Health & Family Welfare (MoHFW) Open Government Data (data.gov.in / e-RaktKosh) APIs to display certified statewise blood donation camps and donor registrations in real-time.
            </p>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-3 h-100 border">
                  <span className="badge bg-danger mb-2">Step 1</span>
                  <h6 className="fw-bold">Register on Data.gov.in</h6>
                  <p className="small text-muted mb-0">
                    Go to <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="text-danger fw-bold">data.gov.in</a> and create a free citizen account.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-3 h-100 border">
                  <span className="badge bg-danger mb-2">Step 2</span>
                  <h6 className="fw-bold">Copy Your API Key</h6>
                  <p className="small text-muted mb-0">
                    Navigate to <strong>My Account → API Key</strong> and generate your secure API token.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-3 h-100 border">
                  <span className="badge bg-danger mb-2">Step 3</span>
                  <h6 className="fw-bold">Save in .env File</h6>
                  <p className="small text-muted mb-0">
                    Add the API key to your root <code>.env</code> file:<br />
                    <code>DATA_GOV_IN_API_KEY=your_key_here</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4 NATIONAL SUMMARY STAT CARDS WITH SPATIAL 3D TILT */}
        {summary && (
          <div className="row g-3 mb-4">
            {/* Today's Daily Collection */}
            <div className="col-sm-6 col-lg-3">
              <SpatialCard tiltFactor={10} className="p-3 h-100 border-start border-danger border-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small fw-semibold text-uppercase">Today's Donations</span>
                  <span className="badge bg-danger bg-opacity-10 text-danger small d-flex align-items-center gap-1">
                    <span className="spatial-radar-bead spatial-radar-bead-danger"></span> Live
                  </span>
                </div>
                <h3 className="fw-bold text-dark mb-1 spatial-counter-val">
                  {summary.daily.unitsCollectedToday.toLocaleString()} <span className="fs-6 text-muted fw-normal">Units</span>
                </h3>
                <div className="progress mt-2 mb-1" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-danger progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${Math.min(100, summary.daily.percentageToday)}%` }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>Target: {summary.daily.targetToday.toLocaleString()}</span>
                  <span className="fw-bold text-danger">{summary.daily.percentageToday}% met</span>
                </div>
              </SpatialCard>
            </div>

            {/* Current Year Total Collection */}
            <div className="col-sm-6 col-lg-3">
              <SpatialCard tiltFactor={10} className="p-3 h-100 border-start border-primary border-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small fw-semibold text-uppercase">{summary.yearly.currentYear} Yearly Total</span>
                  <span className="badge bg-primary bg-opacity-10 text-primary small">YTD Collection</span>
                </div>
                <h3 className="fw-bold text-dark mb-1 spatial-counter-val">
                  {(summary.yearly.totalUnitsCollectedYTD / 100000).toFixed(2)} <span className="fs-6 text-muted fw-normal">Lakh Units</span>
                </h3>
                <div className="progress mt-2 mb-1" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${Math.min(100, summary.yearly.percentageAnnual)}%` }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>Target: {(summary.yearly.targetAnnualUnits / 100000).toFixed(0)} Lakh</span>
                  <span className="fw-bold text-primary">{summary.yearly.percentageAnnual}% of Year</span>
                </div>
              </SpatialCard>
            </div>

            {/* National Daily Demand vs Supply */}
            <div className="col-sm-6 col-lg-3">
              <SpatialCard tiltFactor={10} className="p-3 h-100 border-start border-warning border-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small fw-semibold text-uppercase">Emergency Shortages</span>
                  <span className="badge bg-warning text-dark small fw-bold">Critical Demand</span>
                </div>
                <h3 className="fw-bold text-dark mb-1 spatial-counter-val-red">
                  {summary.criticalShortageGroups.join(", ")}
                </h3>
                <p className="small text-muted mb-0 mt-2">
                  <i className="fa-solid fa-triangle-exclamation text-warning me-1"></i>
                  Universal donor (O-) & negative groups in urgent demand today.
                </p>
              </SpatialCard>
            </div>

            {/* Nationwide Active Camps */}
            <div className="col-sm-6 col-lg-3">
              <SpatialCard tiltFactor={10} className="p-3 h-100 border-start border-success border-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small fw-semibold text-uppercase">Active Drives Today</span>
                  <span className="badge bg-success bg-opacity-10 text-success small d-flex align-items-center gap-1">
                    <span className="spatial-radar-bead"></span> Nationwide
                  </span>
                </div>
                <h3 className="fw-bold text-dark mb-1 spatial-counter-val">
                  {summary.totalActiveCampsNationwide}+ <span className="fs-6 text-muted fw-normal">Camps</span>
                </h3>
                <p className="small text-muted mb-0 mt-2">
                  <i className="fa-solid fa-hospital-user text-success me-1"></i>
                  Organized by verified NGOs, Hospitals & Red Cross.
                </p>
              </SpatialCard>
            </div>
          </div>
        )}

        {/* STATE-WISE BLOOD BANK & DONATION MATRIX */}
        {summary?.stateWiseStats && summary.stateWiseStats.length > 0 && (
          <SpatialCard variant="light" tiltFactor={4} className="p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 border-bottom pb-3">
              <div>
                <span className="badge bg-danger mb-1">
                  OFFICIAL MoHFW / OGD INDIA DATASET
                </span>
                <h5 className="fw-bold text-dark mb-1">
                  <i className="fa-solid fa-map-location-dot text-danger me-2"></i>
                  State/UT-wise Approved Blood Camps, Registered Donors & Total Donations
                </h5>
                <small className="text-muted d-block">
                  Live API: <strong>data.gov.in (MoHFW)</strong> | Active Key: <strong className="text-dark">{summary?.activeKeyPreview || "579b...31ae"}</strong>
                  {summary?.officialTotals && (
                    <span className="ms-2 text-danger fw-semibold">
                      • {summary.officialTotals.totalApprovedCamps?.toLocaleString()} Camps | {summary.officialTotals.totalRegisteredDonors?.toLocaleString()} Registered Donors | {summary.officialTotals.totalBloodDonations?.toLocaleString()} Units Donated
                    </span>
                  )}
                </small>
              </div>
              <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 fw-bold d-flex align-items-center gap-1">
                <span className="spatial-radar-bead"></span>
                {summary.stateWiseStats.length} States & UTs Live
              </span>
            </div>
            <div className="table-responsive spatial-table-container" style={{ maxHeight: "420px", overflowY: "auto" }}>
              <table className="table table-sm table-hover align-middle mb-0 spatial-table text-nowrap">
                <thead className="table-light sticky-top">
                  <tr>
                    <th className="ps-3 text-nowrap">State / UT</th>
                    <th className="text-end text-nowrap">Approved Camps Held</th>
                    <th className="text-end text-nowrap">Registered Donors</th>
                    <th className="text-end text-nowrap">Total Blood Donations</th>
                    <th className="text-center text-nowrap">Live Status</th>
                    <th className="text-end pe-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.stateWiseStats.map((st) => (
                    <tr key={st.state}>
                      <td className="ps-3 fw-bold text-dark">
                        <i className="fa-solid fa-location-dot text-danger me-2"></i>
                        {st.state}
                      </td>
                      <td className="text-end fw-semibold text-secondary">
                        {st.approvedCamps?.toLocaleString() || "—"}
                      </td>
                      <td className="text-end fw-semibold text-primary">
                        {st.registeredDonors?.toLocaleString() || "—"}
                      </td>
                      <td className="text-end fw-bold text-danger">
                        {st.bloodDonations ? `${st.bloodDonations.toLocaleString()} units` : "—"}
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2 py-1">
                          ● {st.activeCampsToday || 1} Active Today
                        </span>
                      </td>
                      <td className="text-end pe-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger py-0 px-2 fw-semibold"
                          onClick={() => {
                            setSelectedState(st.state);
                            const el = document.getElementById("events-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Find Events
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SpatialCard>
        )}

        {/* SECTION: KAHA KAHA PAR KONSA EVENT HO RAHA HAI */}
        <SpatialCard id="events-section" variant="light" tiltFactor={3} className="p-4 mt-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 border-bottom pb-3">
            <div>
              <span className="badge bg-danger mb-1">LIVE EVENTS & CAMPS</span>
              <h4 className="fw-bold text-dark mb-0">
                📍 Where Are Blood Donation Events Happening Near You?
              </h4>
              <small className="text-muted">
                Find ongoing & upcoming voluntary donation drives near your location across India
              </small>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* State Filter */}
              <select
                className="form-select form-select-sm"
                style={{ width: "170px" }}
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {availableStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* Keyword / City Search */}
              <div className="input-group input-group-sm" style={{ width: "220px" }}>
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-magnifying-glass text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search City or Venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Link to="/donation-camps" className="btn btn-sm btn-danger fw-semibold spatial-btn-glow">
                + Organize New Camp
              </Link>
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status"></div>
              <p className="text-muted small mt-2">Fetching live nationwide events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fa-solid fa-calendar-xmark fs-1 text-secondary mb-2"></i>
              <p>No donation events found for the selected filter. Try choosing "All States".</p>
            </div>
          ) : (
            <div className="row g-3">
              {events.map((ev, idx) => (
                <div className="col-md-6 col-lg-4" key={ev._id || idx}>
                  <SpatialCard tiltFactor={8} className="h-100 p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-danger bg-opacity-10 text-danger fw-bold">
                        {ev.type}
                      </span>
                      <span className="badge bg-light text-secondary border">
                        🎯 Target: {ev.targetUnits} Units
                      </span>
                    </div>

                    <h6 className="fw-bold text-dark mb-1 text-truncate" title={ev.title}>
                      {ev.title}
                    </h6>
                    <small className="text-muted d-block mb-2">
                      <i className="fa-solid fa-building-ngo text-secondary me-1"></i>
                      {ev.organizer}
                    </small>

                    <div className="bg-light p-2 rounded-2 small text-secondary mb-3">
                      <div className="text-truncate mb-1">
                        <i className="fa-solid fa-location-dot text-danger me-1"></i>
                        <strong>Venue:</strong> {ev.venue}
                      </div>
                      <div className="d-flex justify-content-between text-muted">
                        <span>
                          <i className="fa-solid fa-city me-1"></i>
                          {ev.city}, {ev.state}
                        </span>
                        <span>
                          <i className="fa-solid fa-users me-1 text-success"></i>
                          {ev.registeredDonors} Registered
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      <div>
                        <span className="small text-danger fw-bold d-block">
                          <i className="fa-regular fa-calendar-days me-1"></i>
                          {ev.date}
                        </span>
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                          {ev.time}
                        </small>
                      </div>

                      <a
                        href={`tel:${ev.contactPhone}`}
                        className="btn btn-outline-danger btn-sm"
                        title="Call organizer"
                      >
                        <i className="fa-solid fa-phone me-1"></i> Contact
                      </a>
                    </div>
                  </SpatialCard>
                </div>
              ))}
            </div>
          )}
        </SpatialCard>
      </div>
    </section>
  );
};

export default NationalLiveStats;
