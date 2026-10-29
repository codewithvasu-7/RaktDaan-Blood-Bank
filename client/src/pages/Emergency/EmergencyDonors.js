import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import InteractiveDonorMap from "../../components/shared/InteractiveDonorMap";
import RaktRiderTransitTracker from "../../components/shared/RaktRiderTransitTracker";

const EmergencyDonors = () => {
  const { user } = useSelector((state) => state.auth);

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("ALL");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [availableOnly, setAvailableOnly] = useState(true);
  const [viewMode, setViewMode] = useState("map"); // "map" or "list"

  // Modal states
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [donorHistory, setDonorHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Emergency form fields
  const [patientName, setPatientName] = useState("");
  const [urgency, setUrgency] = useState("Critical");
  const [accidentLocation, setAccidentLocation] = useState(user?.address || "");
  const [hospitalName, setHospitalName] = useState(
    user?.hospitalName || user?.organisationName || "Emergency Trauma Center"
  );
  const [hospitalPhone, setHospitalPhone] = useState(user?.phone || "");
  const [notes, setNotes] = useState("");
  const [alertSuccessData, setAlertSuccessData] = useState(null);
  const [sendingAlert, setSendingAlert] = useState(false);

  // Live Emergency Requirement Board states (RaktDaan reference)
  const [isPostReqModalOpen, setIsPostReqModalOpen] = useState(false);
  const [postingReq, setPostingReq] = useState(false);
  const [reqPatientName, setReqPatientName] = useState("");
  const [reqBloodGroup, setReqBloodGroup] = useState("O+");
  const [reqUnits, setReqUnits] = useState(2);
  const [reqUrgency, setReqUrgency] = useState("Critical");
  const [reqLocation, setReqLocation] = useState(user?.address || "");
  const [reqCity, setReqCity] = useState(user?.city || "Mumbai");
  const [reqNotes, setReqNotes] = useState("");

  // Fetch donors with current filters
  const fetchNearbyDonors = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        bloodGroup,
        city,
        pincode,
        availableOnly: availableOnly ? "true" : "false",
      }).toString();

      const { data } = await API.get(`/emergency/donors?${queryParams}`);
      if (data?.success) {
        setDonors(data.donors);
      }
    } catch (error) {
      console.error("Error fetching nearby donors:", error);
    } finally {
      setLoading(false);
    }
  }, [bloodGroup, city, pincode, availableOnly]);

  useEffect(() => {
    fetchNearbyDonors();
  }, [fetchNearbyDonors]);

  // Open SOS Modal for a specific donor
  const handleOpenAlertModal = (donor) => {
    setSelectedDonor(donor);
    setAlertSuccessData(null);
    setPatientName("");
    setNotes("");
    setIsAlertModalOpen(true);
  };

  // Submit Emergency Alert
  const handleSendEmergencyAlert = async (e) => {
    e.preventDefault();
    if (!selectedDonor) return;

    try {
      setSendingAlert(true);
      const { data } = await API.post("/emergency/send-alert", {
        donorId: selectedDonor._id,
        patientName,
        accidentLocation,
        hospitalName,
        hospitalPhone,
        bloodGroupNeeded: selectedDonor.bloodGroup || "Emergency",
        urgency,
        notes,
      });

      if (data?.success) {
        setAlertSuccessData(data);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to dispatch emergency alert");
    } finally {
      setSendingAlert(false);
    }
  };

  // View Donor History
  const handleViewHistory = async (donor) => {
    try {
      setSelectedDonor(donor);
      setIsHistoryModalOpen(true);
      setHistoryLoading(true);
      const { data } = await API.get(`/emergency/history/${donor._id}`);
      if (data?.success) {
        setDonorHistory(data.history);
      }
    } catch (error) {
      console.error("Error fetching donor history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Publish open requirement on RaktDaan Live Emergency Board
  const handlePublishRequirement = async (e) => {
    e.preventDefault();
    try {
      setPostingReq(true);
      const { data } = await API.post("/emergency/create-request", {
        patientName: reqPatientName,
        bloodGroup: reqBloodGroup,
        unitsRequired: reqUnits,
        urgency: reqUrgency,
        accidentLocation: reqLocation,
        city: reqCity,
        notes: reqNotes,
      });

      if (data?.success) {
        alert("Emergency blood requirement published successfully on the RaktDaan live board!");
        setIsPostReqModalOpen(false);
        setReqPatientName("");
        setReqNotes("");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to publish emergency requirement");
    } finally {
      setPostingReq(false);
    }
  };

  const canRequestBlood =
    user?.role === "hospital" ||
    user?.role === "organisation" ||
    user?.role === "admin";

  if (!canRequestBlood) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <div
            className="card shadow-sm border-0 p-5 mx-auto bg-white"
            style={{ maxWidth: "620px", borderRadius: "12px" }}
          >
            <div className="display-3 text-danger mb-3">
              <i className="fa-solid fa-hospital-user"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">
              Authorized Personnel Access Only
            </h3>
            <p className="text-muted mb-4 fs-6">
              To protect donor privacy and prevent misuse, emergency blood requests can only be dispatched by registered <strong>Hospitals</strong>, <strong>Blood Banks/Organisations</strong>, or <strong>System Administrators</strong>.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/donor-profile" className="btn btn-danger px-4 py-2 fw-semibold">
                <i className="fa-solid fa-id-card me-2"></i>My Donor Profile
              </Link>
              <Link to="/donation" className="btn btn-outline-secondary px-4 py-2 fw-semibold">
                <i className="fa-solid fa-droplet me-2"></i>Donation History
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-fluid py-3 px-2 px-sm-3 px-md-4">
        {/* Header Banner */}
        <div className="card shadow-sm border-0 mb-4 bg-danger text-white">
          <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="fw-bold mb-1">
                🚨 Accident & Emergency Nearby Donor Finder
              </h2>
              <p className="mb-0 text-white-50">
                Instantly identify and contact eligible blood donors near accident locations via Direct Call, SMS/WhatsApp, and Automated Email Alerts.
              </p>
            </div>
            <div className="text-end d-flex flex-column align-items-end gap-2">
              <span className="badge bg-light text-danger fs-6 px-3 py-2 shadow-sm">
                Active Role: {user?.role?.toUpperCase()}
              </span>
              <button
                className="btn btn-warning btn-sm fw-bold shadow-sm"
                onClick={() => setIsPostReqModalOpen(true)}
              >
                📢 Post Urgent Requirement on Live Board
              </button>
            </div>
          </div>
        </div>

        {/* Rakt-Rider: Live Emergency Blood Transit & Courier Tracker */}
        <RaktRiderTransitTracker />

        {/* Filter Controls */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">
                  🩸 Required Blood Group
                </label>
                <select
                  className="form-select border-danger"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="ALL">All Blood Groups</option>
                  <option value="O+">O positive (O+)</option>
                  <option value="O-">O negative (O-)</option>
                  <option value="A+">A positive (A+)</option>
                  <option value="A-">A negative (A-)</option>
                  <option value="B+">B positive (B+)</option>
                  <option value="B-">B negative (B-)</option>
                  <option value="AB+">AB positive (AB+)</option>
                  <option value="AB-">AB negative (AB-)</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">
                  📍 City / Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Mumbai, Delhi, Lucknow..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label fw-semibold small mb-1">
                  📮 Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <div className="form-check form-switch pt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="availableOnlySwitch"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                  />
                  <label
                    className="form-check-label fw-semibold small"
                    htmlFor="availableOnlySwitch"
                  >
                    Available Donors Only
                  </label>
                </div>
              </div>

              <div className="col-md-2 text-end pt-3">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={fetchNearbyDonors}
                >
                  <i className="fa-solid fa-arrows-rotate me-1"></i> Refresh List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="btn-group shadow-sm bg-white p-1 rounded-3 border">
            <button
              className={`btn btn-sm px-3 fw-semibold ${
                viewMode === "map" ? "btn-danger text-white" : "btn-light text-secondary"
              }`}
              onClick={() => setViewMode("map")}
            >
              <i className="fa-solid fa-map-location-dot me-1"></i> Live Radar Map
            </button>
            <button
              className={`btn btn-sm px-3 fw-semibold ${
                viewMode === "list" ? "btn-danger text-white" : "btn-light text-secondary"
              }`}
              onClick={() => setViewMode("list")}
            >
              <i className="fa-solid fa-list me-1"></i> List Table Only
            </button>
          </div>
        </div>

        {/* Interactive GPS Donor Radar Map */}
        {viewMode === "map" && (
          <InteractiveDonorMap
            hospitalCity={city || user?.city || "Mumbai"}
            hospitalName={hospitalName}
            donors={donors}
            onSelectDonor={handleOpenAlertModal}
          />
        )}

        {/* Results Counter */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0 text-secondary">
            Matching Donors in Area:{" "}
            <span className="badge bg-dark rounded-pill px-3">
              {donors.length} Found
            </span>
          </h5>
          <span className="text-muted small">
            Medical rule: Eligible donors have not donated in the last 90 days.
          </span>
        </div>

        {/* Donors Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Searching nearby blood donors...</p>
          </div>
        ) : donors.length === 0 ? (
          <div className="card shadow-sm text-center py-5">
            <div className="card-body">
              <h4 className="text-secondary">No matching donors found</h4>
              <p className="text-muted">
                Try expanding your search criteria or resetting filters to find available donors.
              </p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setBloodGroup("ALL");
                  setCity("");
                  setPincode("");
                  setAvailableOnly(false);
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="table-dark">
                <tr>
                  <th>Donor Name</th>
                  <th>Blood Group</th>
                  <th>City & Address</th>
                  <th>Contact Info</th>
                  <th>Availability</th>
                  <th>Donation Status</th>
                  <th className="text-center">Emergency Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor._id}>
                    <td>
                      <div className="fw-bold text-dark">{donor.name}</div>
                      <small className="text-muted">
                        Total Donations: {donor.totalDonations || 0}
                      </small>
                    </td>
                    <td>
                      <span className="badge bg-danger fs-6 px-3 py-2">
                        {donor.bloodGroup || "N/A"}
                      </span>
                    </td>
                    <td>
                      <div className="fw-semibold">{donor.city || "Not specified"}</div>
                      <small className="text-muted text-truncate d-block" style={{ maxWidth: "200px" }}>
                        {donor.address} {donor.pincode ? `(${donor.pincode})` : ""}
                      </small>
                    </td>
                    <td>
                      <div>
                        <i className="fa-solid fa-phone text-success me-1"></i>{" "}
                        <a href={`tel:${donor.phone}`} className="text-decoration-none fw-semibold">
                          {donor.phone}
                        </a>
                      </div>
                      <div className="small text-muted">
                        <i className="fa-solid fa-envelope text-primary me-1"></i>{" "}
                        {donor.email}
                      </div>
                    </td>
                    <td>
                      {donor.isAvailable ? (
                        <span className="badge bg-success">
                          <i className="fa-solid fa-check-circle me-1"></i> Available
                        </span>
                      ) : (
                        <span className="badge bg-secondary">
                          <i className="fa-solid fa-clock me-1"></i> Unavailable
                        </span>
                      )}
                    </td>
                    <td>
                      {donor.isEligible ? (
                        <span className="badge bg-info text-dark">
                          Eligible to Donate
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Recent ({donor.daysSinceLastDonation} days ago)
                        </span>
                      )}
                      {donor.lastDonationDate && (
                        <div className="text-muted" style={{ fontSize: "11px" }}>
                          Last: {moment(donor.lastDonationDate).format("DD/MM/YYYY")}
                        </div>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-danger fw-bold shadow-sm"
                          onClick={() => handleOpenAlertModal(donor)}
                          title="Trigger Emergency SOS Alert"
                        >
                          🚨 Send SOS
                        </button>
                        <a
                          href={`tel:${donor.phone}`}
                          className="btn btn-sm btn-outline-success"
                          title="Call Donor Now"
                        >
                          📞 Call
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?phone=${(donor.phone || "").replace(/[^0-9]/g, "")}&text=${encodeURIComponent(
                            `🚨 EMERGENCY: Critical request for ${donor.bloodGroup || "blood"} at ${hospitalName}. Please call us at ${hospitalPhone} immediately.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                          title="WhatsApp Alert"
                        >
                          💬 WhatsApp
                        </a>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleViewHistory(donor)}
                          title="View Past Donations"
                        >
                          📜 History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SOS Alert Modal */}
        {isAlertModalOpen && selectedDonor && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title fw-bold">
                    🚨 Send Emergency SOS Alert to {selectedDonor.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setIsAlertModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  {alertSuccessData ? (
                    <div className="text-center py-4">
                      <div className="display-4 text-success mb-3">✅</div>
                      <h4 className="fw-bold text-success mb-2">
                        Emergency Alert Dispatched Successfully!
                      </h4>
                      <p className="text-muted">
                        An email notification has been dispatched to{" "}
                        <strong>{alertSuccessData.donor?.email}</strong>.
                      </p>

                      <div className="card bg-light p-3 my-3 text-start border-0">
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <strong>Donor:</strong> {alertSuccessData.donor?.name} (
                            {alertSuccessData.donor?.bloodGroup})
                          </div>
                          <div className="col-md-6 mb-2">
                            <strong>Phone:</strong> {alertSuccessData.donor?.phone}
                          </div>
                          <div className="col-md-6 mb-2">
                            <strong>Urgency:</strong>{" "}
                            <span className="badge bg-danger">
                              {alertSuccessData.alertDetails?.urgency}
                            </span>
                          </div>
                          <div className="col-md-6 mb-2">
                            <strong>Email Status:</strong>{" "}
                            <span className="badge bg-primary">
                              {alertSuccessData.emailStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center gap-3 mt-4">
                        <a
                          href={alertSuccessData.communicationLinks?.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success fw-bold px-4"
                        >
                          💬 Open WhatsApp with Alert Text
                        </a>
                        <a
                          href={alertSuccessData.communicationLinks?.telUrl}
                          className="btn btn-primary fw-bold px-4"
                        >
                          📞 Call {alertSuccessData.donor?.phone}
                        </a>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setIsAlertModalOpen(false)}
                        >
                          Close Window
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSendEmergencyAlert}>
                      <div className="alert alert-warning py-2 small mb-3">
                        <strong>Target Donor:</strong> {selectedDonor.name} | Blood Group:{" "}
                        <strong>{selectedDonor.bloodGroup}</strong> | City:{" "}
                        {selectedDonor.city || "Not set"} | Phone: {selectedDonor.phone}
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Patient / Case Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Rahul Sharma (Accident Case)"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Urgency Level</label>
                          <select
                            className="form-select"
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value)}
                          >
                            <option value="Critical">Critical (Life Threatening)</option>
                            <option value="Urgent">Urgent (Needed within 2 hours)</option>
                            <option value="Standard">Standard (Surgery scheduled today)</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Hospital Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Hospital Helpline Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            value={hospitalPhone}
                            onChange={(e) => setHospitalPhone(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold">Accident / Hospital Ward Location</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. ICU Block 3, City Trauma Center, Main Ring Road"
                            value={accidentLocation}
                            onChange={(e) => setAccidentLocation(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold">Additional Emergency Notes</label>
                          <textarea
                            className="form-control"
                            rows="2"
                            placeholder="e.g. Patient in OT, 2 units needed immediately. Hospital will cover transportation."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          ></textarea>
                        </div>
                      </div>

                      <div className="modal-footer px-0 pb-0 mt-4">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setIsAlertModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-danger fw-bold px-4"
                          disabled={sendingAlert}
                        >
                          {sendingAlert ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                              ></span>
                              Dispatching Alert...
                            </>
                          ) : (
                            "🚨 Dispatch Emergency Alert Now"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donation History Modal */}
        {isHistoryModalOpen && selectedDonor && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title fw-bold">
                    📜 Donation History: {selectedDonor.name} ({selectedDonor.bloodGroup})
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setIsHistoryModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  {historyLoading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="text-muted mt-2">Loading past donation records...</p>
                    </div>
                  ) : donorHistory.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted mb-0">
                        No previous blood donation inventory entries found for this donor yet.
                      </p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Blood Group</th>
                            <th>Quantity (ML)</th>
                            <th>Organisation / Blood Bank</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donorHistory.map((rec) => (
                            <tr key={rec._id}>
                              <td>{moment(rec.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                              <td>
                                <span className="badge bg-danger">{rec.bloodGroup}</span>
                              </td>
                              <td>{rec.quantity} ML</td>
                              <td>
                                {rec.organisation?.organisationName || "Direct Hospital Drive"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsHistoryModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Publish Live Emergency Requirement Modal */}
        {isPostReqModalOpen && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title fw-bold">
                    📢 Post Emergency Requirement to RaktDaan Live Board
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setIsPostReqModalOpen(false)}
                  ></button>
                </div>
                <form onSubmit={handlePublishRequirement}>
                  <div className="modal-body p-4">
                    <p className="text-muted small mb-3">
                      This requirement will be broadcast immediately on the public emergency live ticker, notifying voluntary donors across the city.
                    </p>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Patient / Victim Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Anand Kulkarni (Trauma OT)"
                          value={reqPatientName}
                          onChange={(e) => setReqPatientName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Blood Group</label>
                        <select
                          className="form-select border-danger"
                          value={reqBloodGroup}
                          onChange={(e) => setReqBloodGroup(e.target.value)}
                        >
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Units (Bags)</label>
                        <input
                          type="number"
                          className="form-control"
                          min="1"
                          max="10"
                          value={reqUnits}
                          onChange={(e) => setReqUnits(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Urgency Level</label>
                        <select
                          className="form-select"
                          value={reqUrgency}
                          onChange={(e) => setReqUrgency(e.target.value)}
                        >
                          <option value="Critical">Critical (Immediate within 1 Hour)</option>
                          <option value="Urgent">Urgent (Within 4 Hours)</option>
                          <option value="Standard">Standard (Today)</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={reqCity}
                          onChange={(e) => setReqCity(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Hospital Ward / Emergency Location</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. ICU Block B, Apollo Trauma Center, Bandra West"
                          value={reqLocation}
                          onChange={(e) => setReqLocation(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Emergency Notes</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Accident victim with blood loss. Transportation can be assisted by hospital."
                          value={reqNotes}
                          onChange={(e) => setReqNotes(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsPostReqModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger fw-bold px-4"
                      disabled={postingReq}
                    >
                      {postingReq ? "Publishing..." : "🚨 Broadcast Emergency Requirement"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmergencyDonors;
