import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/shared/Layout/Header";
import Footer from "../../components/shared/Layout/Footer";
import API from "../../services/API";
import { Link } from "react-router-dom";
import SpatialCard from "../../components/shared/SpatialCard";

const BloodStockAvailability = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const cities = [
    "All",
    "Bikaner",
    "Jaipur",
    "Jodhpur",
    "Kota",
    "Udaipur",
    "Ajmer",
    "Sikar",
    "Alwar",
    "Delhi",
    "Mumbai",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Lucknow",
    "Kanpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Ranchi",
    "Chandigarh",
  ];

  const fetchStock = useCallback(async () => {
    try {
      setLoading(true);
      const cityParam = selectedCity === "All" ? "" : selectedCity;
      const groupParam = selectedGroup === "All" ? "" : selectedGroup;
      const { data } = await API.get(
        `/inventory/public-stock?city=${encodeURIComponent(cityParam)}&bloodGroup=${encodeURIComponent(
          groupParam
        )}&search=${encodeURIComponent(searchQuery)}`
      );
      if (data?.success) {
        setFacilities(data.data);
      }
    } catch (err) {
      console.error("Error fetching stock:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCity, selectedGroup, searchQuery]);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <main className="flex-grow-1 py-4">
        <div className="container">
          {/* Header Banner with Spatial Depth */}
          <SpatialCard variant="crimson" tiltFactor={4} className="mb-4 p-4 p-md-5 shadow-xl">
            <div className="spatial-hud-bar mb-2 bg-white bg-opacity-25 text-white border-white-50">
              <span className="spatial-radar-bead"></span>
              <span className="small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                CITIZEN ACCESS PORTAL • e-RaktKosh Standard
              </span>
            </div>
            <h2 className="display-6 fw-bold mb-2 text-white">
              🏥 Live Blood Stock Availability Checker
            </h2>
            <p className="lead text-white-50 mb-0" style={{ maxWidth: "680px" }}>
              Check real-time available blood units across verified hospital blood banks and licensed transfusion centers in your city before visiting.
            </p>
          </SpatialCard>

          {/* Filter Bar */}
          <SpatialCard variant="light" tiltFactor={3} className="p-3 mb-4 shadow-sm">
            <div className="row g-3 align-items-center">
              {/* City Filter */}
              <div className="col-md-3">
                <label className="form-label small fw-semibold text-secondary mb-1">Select City</label>
                <select
                  className="form-select shadow-none"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c === "All" ? "All Cities" : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Group Filter */}
              <div className="col-md-3">
                <label className="form-label small fw-semibold text-secondary mb-1">Blood Group Needed</label>
                <select
                  className="form-select shadow-none"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <option value="All">All Blood Groups</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keyword Search */}
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary mb-1">Search Hospital or ANY Indian City</label>
                <div className="input-group spatial-input-capsule p-1">
                  <span className="input-group-text bg-transparent border-0 ps-2">
                    <i className="fa-solid fa-magnifying-glass text-danger"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent shadow-none"
                    placeholder="Search ANY city (e.g. Alwar, Surat, Ranchi, Patna...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Refresh Button */}
              <div className="col-md-2 d-flex align-items-end">
                <button
                  className="btn btn-dark w-100 fw-semibold spatial-btn-glow d-flex align-items-center justify-content-center gap-2"
                  onClick={fetchStock}
                  style={{ height: "42px" }}
                >
                  <i className="fa-solid fa-rotate"></i> Refresh
                </button>
              </div>
            </div>
          </SpatialCard>

          {/* Results Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status"></div>
              <p className="text-muted mt-2">Checking real-time hospital stocks...</p>
            </div>
          ) : facilities.length === 0 ? (
            <div className="card shadow-sm border-0 text-center py-5 rounded-4 bg-white">
              <div className="card-body">
                <div className="display-4 text-secondary mb-3">🏥</div>
                <h4 className="fw-bold text-dark">No Blood Banks Found for Selected Filter</h4>
                <p className="text-muted">
                  Try changing the city or blood group filter to view all available medical centers.
                </p>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setSelectedCity("All");
                    setSelectedGroup("All");
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {facilities.map((fac) => (
                <div className="col-lg-6" key={fac._id}>
                  <SpatialCard variant="light" tiltFactor={7} className="h-100 p-4 shadow-sm border">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-danger bg-opacity-10 text-danger fw-bold mb-1">
                          {fac.type}
                        </span>
                        <h5 className="fw-bold text-dark mb-0">{fac.name}</h5>
                      </div>
                      <span className="badge bg-light text-dark border px-3 py-2 fw-bold">
                        Total Stock: {fac.totalUnits} Units
                      </span>
                    </div>

                    <p className="small text-muted mb-3">
                      <i className="fa-solid fa-location-dot text-danger me-1"></i>
                      {fac.address}, {fac.city}
                    </p>

                    {/* Stock Pills Grid */}
                    <div className="mb-3">
                      <small className="fw-bold text-secondary text-uppercase d-block mb-2" style={{ fontSize: "11px" }}>
                        Real-Time Units Available by Blood Group:
                      </small>
                      <div className="row g-2">
                        {Object.entries(fac.stock).map(([bg, info]) => {
                          let badgeBg = "bg-light text-muted border";
                          if (info.units > 3) badgeBg = "bg-success text-white shadow-sm";
                          else if (info.units > 0) badgeBg = "bg-warning text-dark";

                          return (
                            <div className="col-3" key={bg}>
                              <div className={`p-1 p-sm-2 rounded-3 text-center ${badgeBg}`}>
                                <div className="fw-bold fs-6 lh-1">{bg}</div>
                                <small style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                                  {info.units > 0 ? `${info.units} U` : "0"}
                                </small>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                      <a
                        href={`tel:${fac.phone}`}
                        className="btn btn-outline-danger btn-sm fw-semibold d-flex align-items-center gap-1"
                      >
                        <i className="fa-solid fa-phone"></i> Call: {fac.phone}
                      </a>

                      <Link
                        to="/login"
                        className="btn btn-danger btn-sm fw-semibold spatial-btn-glow shadow-sm"
                      >
                        🚨 Request Emergency Units
                      </Link>
                    </div>
                  </SpatialCard>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BloodStockAvailability;
