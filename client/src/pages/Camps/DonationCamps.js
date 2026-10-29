import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import Header from "../../components/shared/Layout/Header";
import Footer from "../../components/shared/Layout/Footer";
import API from "../../services/API";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiCalendar, BiTime, BiMap, BiPhone, BiPlusCircle, BiSearch, BiX } from "react-icons/bi";
import { useLanguage } from "../../context/LanguageContext";

// Top-level PageWrapper to prevent re-mounting and focus loss during state changes
const PageWrapper = ({ user, children }) => {
  return user ? (
    <Layout>{children}</Layout>
  ) : (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

const DonationCamps = () => {
  const { t } = useLanguage();
  const { user } = useSelector((state) => state.auth);
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registering, setRegistering] = useState(false);

  // New camp form fields
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState(user?.city || "");
  const [stateName, setStateName] = useState("Maharashtra");
  const [campDate, setCampDate] = useState("");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [contactPhone, setContactPhone] = useState(user?.phone || "");
  const [targetUnits, setTargetUnits] = useState(150);
  const [description, setDescription] = useState("");

  const fetchCamps = useCallback(async (query = "") => {
    try {
      setLoading(true);
      const { data } = await API.get(`/camps/all?city=${encodeURIComponent(query.trim())}`);
      if (data?.success) {
        setCamps(data.camps);
      }
    } catch (error) {
      console.error("Error fetching camps:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search on typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCamps(searchCity);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchCity, fetchCamps]);

  // Handle donor camp registration
  const handleRegisterCamp = async (campId) => {
    if (!user) {
      alert("Please login to register for this blood donation camp.");
      window.location.href = "/login";
      return;
    }

    try {
      setRegistering(true);
      const { data } = await API.post("/camps/register", { campId });
      if (data?.success) {
        alert(data.message);
        fetchCamps(searchCity);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  // Create new camp (Org/Admin)
  const handleCreateCamp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/camps/create", {
        title,
        venue,
        city,
        state: stateName,
        campDate,
        startTime,
        endTime,
        contactPhone,
        targetUnits,
        description,
      });

      if (data?.success) {
        alert("Blood Donation Camp created successfully!");
        setIsModalOpen(false);
        fetchCamps(searchCity);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create camp");
    }
  };

  const isOrganiser = user?.role === "organisation" || user?.role === "admin";

  return (
    <PageWrapper user={user}>
      <div className="container-fluid py-4 px-4">
        {/* Banner */}
        <div className="card shadow-sm border-0 mb-4 bg-danger text-white">
          <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <span className="badge bg-light text-danger fw-bold mb-2">
                {t("camps.badge", "RAKTDAAN DRIVES & CAMPS")}
              </span>
              <h2 className="fw-bold mb-1">
                🩸 {t("camps.title", "Community Blood Donation Camps")}
              </h2>
              <p className="mb-0 text-white-50">
                {t("camps.subtitle", "Discover and participate in voluntary blood donation camps organized by certified blood banks, trusts, and hospitals across India.")}
              </p>
            </div>
            {isOrganiser && (
              <button
                className="btn btn-light text-danger fw-bold shadow-sm px-4 py-2"
                onClick={() => setIsModalOpen(true)}
              >
                <BiPlusCircle className="me-1 fs-5" />
                Organize New Camp
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchCamps(searchCity);
                  }}
                  className="w-100"
                >
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <BiMap className="text-danger fs-5" />
                    </span>
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder={t("camps.searchPlaceholder", "Search by city (e.g. Jaipur, Mumbai, Delhi)...")}
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      autoComplete="off"
                    />
                    {searchCity && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setSearchCity("");
                          fetchCamps("");
                        }}
                        title="Clear filter"
                      >
                        <BiX className="fs-5" />
                      </button>
                    )}
                    <button type="submit" className="btn btn-danger px-4 fw-semibold d-flex align-items-center gap-1">
                      <BiSearch /> {t("camps.viewAll", "Search Camps")}
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 text-md-end text-start">
                <span className="text-muted small">
                  Showing <strong>{camps.length}</strong> upcoming donation drives
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Camps Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
            <p className="text-muted mt-2">Loading upcoming donation camps...</p>
          </div>
        ) : camps.length === 0 ? (
          <div className="card shadow-sm border-0 text-center py-5">
            <div className="card-body">
              <h4 className="text-secondary">No upcoming camps found in this area</h4>
              <p className="text-muted">
                Try searching another city (e.g. Jaipur, Mumbai, Delhi) or check back soon for newly scheduled drives.
              </p>
              {isOrganiser && (
                <button
                  className="btn btn-danger"
                  onClick={() => setIsModalOpen(true)}
                >
                  Schedule a Camp Now
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {camps.map((camp) => {
              const isAlreadyRegistered = camp.registeredDonors?.some(
                (rd) => rd.donor && user && rd.donor.toString() === user._id?.toString()
              );

              return (
                <div className="col-lg-4 col-md-6" key={camp._id}>
                  <div className="card shadow-sm border-0 h-100 rounded-3 border-top border-danger border-4">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-danger bg-opacity-10 text-danger fw-bold">
                          Target: {camp.targetUnits} Units
                        </span>
                        <span className="badge bg-secondary">
                          {camp.registeredDonors?.length || 0} Registered Donors
                        </span>
                      </div>

                      <h5 className="fw-bold text-dark mb-2">{camp.title}</h5>
                      <p className="small text-muted mb-3">
                        Organized by: <strong>{camp.organisationName}</strong>
                      </p>

                      <div className="small text-muted mb-3">
                        <div className="mb-1">
                          <BiCalendar className="text-danger me-2" />
                          <strong>Date:</strong> {moment(camp.campDate).format("DD MMMM YYYY (dddd)")}
                        </div>
                        <div className="mb-1">
                          <BiTime className="text-danger me-2" />
                          <strong>Time:</strong> {camp.startTime} - {camp.endTime}
                        </div>
                        <div className="mb-1">
                          <BiMap className="text-danger me-2" />
                          <strong>Venue:</strong> {camp.venue}, {camp.city} ({camp.state})
                        </div>
                        <div>
                          <BiPhone className="text-danger me-2" />
                          <strong>Helpline:</strong> {camp.contactPhone}
                        </div>
                      </div>

                      {camp.description && (
                        <p className="small text-secondary bg-light p-2 rounded mb-3">
                          {camp.description}
                        </p>
                      )}

                      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <a
                          href={`tel:${camp.contactPhone}`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          📞 Contact
                        </a>

                        {isAlreadyRegistered ? (
                          <span className="badge bg-success py-2 px-3">
                            ✓ Registered for Camp
                          </span>
                        ) : (
                          <button
                            className="btn btn-sm btn-danger fw-bold px-3 py-1"
                            onClick={() => handleRegisterCamp(camp._id)}
                            disabled={registering}
                          >
                            {registering ? "Registering..." : "Volunteer / Register"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Creating Camp (Organisations & Admin only) */}
        {isModalOpen && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title fw-bold">
                    Organize a New Blood Donation Camp
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
                <form onSubmit={handleCreateCamp}>
                  <div className="modal-body p-4">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold">Camp / Drive Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Life-Saver Voluntary Blood Drive 2026"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Venue / Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Shivaji Park Community Hall, Dadar"
                          value={venue}
                          onChange={(e) => setVenue(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Camp Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={campDate}
                          onChange={(e) => setCampDate(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Start Time</label>
                        <input
                          type="text"
                          className="form-control"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">End Time</label>
                        <input
                          type="text"
                          className="form-control"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Contact Helpline Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Target Units</label>
                        <input
                          type="number"
                          className="form-control"
                          value={targetUnits}
                          onChange={(e) => setTargetUnits(e.target.value)}
                          min="10"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Drive Description</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Refreshments, certificates provided. All voluntary donors welcome."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-danger fw-bold px-4">
                      Publish Camp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default DonationCamps;
