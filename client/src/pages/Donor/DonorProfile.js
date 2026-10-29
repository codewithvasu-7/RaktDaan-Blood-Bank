import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
import moment from "moment";
import DonorCard from "../../components/shared/DonorCard";
import DonationCertificate from "../../components/shared/DonationCertificate";

const DonorProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "card" | "certificate"
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchDonationHistory = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/emergency/history/${user._id}`);
      if (data?.success) {
        setHistory(data.history);
      }
    } catch (error) {
      console.error("Error fetching donation records:", error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      fetchDonationHistory();
    }
  }, [user?._id, fetchDonationHistory]);

  const handleToggleAvailability = async (newVal) => {
    try {
      setUpdating(true);
      setStatusMessage("");
      const { data } = await API.put("/emergency/toggle-availability", {
        donorId: user._id,
        isAvailable: newVal,
      });
      if (data?.success) {
        setIsAvailable(newVal);
        setStatusMessage(
          `Your status is now ${newVal ? "AVAILABLE 🟢" : "UNAVAILABLE 🔴"} for emergency calls.`
        );
      }
    } catch (error) {
      alert("Failed to update availability");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        {/* Navigation Tabs Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">
              🩸 Voluntary Donor Portal & Rewards
            </h3>
            <p className="text-muted small mb-0">
              Manage your emergency availability, view digital credentials, and download your life-saving certificates.
            </p>
          </div>

          <div className="d-flex flex-wrap gap-1 shadow-sm p-1 bg-white rounded-3 border">
            <button
              className={`btn btn-sm px-3 fw-semibold flex-fill ${
                activeTab === "overview" ? "btn-danger text-white" : "btn-light text-secondary"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <i className="fa-solid fa-user-circle me-1"></i> Profile & Status
            </button>
            <button
              className={`btn btn-sm px-3 fw-semibold flex-fill ${
                activeTab === "card" ? "btn-danger text-white" : "btn-light text-secondary"
              }`}
              onClick={() => setActiveTab("card")}
            >
              <i className="fa-solid fa-id-card me-1"></i> Digital Donor Card
            </button>
            <button
              className={`btn btn-sm px-3 fw-semibold flex-fill ${
                activeTab === "certificate" ? "btn-danger text-white" : "btn-light text-secondary"
              }`}
              onClick={() => setActiveTab("certificate")}
            >
              <i className="fa-solid fa-award me-1"></i> Appreciation Certificate
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & STATUS */}
        {activeTab === "overview" && (
          <div className="row g-4">
            <div className="col-md-5">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-danger text-white py-3">
                  <h5 className="mb-0 fw-bold">🩸 Donor Profile & Status</h5>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div
                      className="rounded-circle bg-danger text-white d-inline-flex justify-content-center align-items-center mb-2 shadow"
                      style={{ width: "70px", height: "70px", fontSize: "28px" }}
                    >
                      {user?.bloodGroup || "🩸"}
                    </div>
                    <h4 className="fw-bold mb-0">{user?.name}</h4>
                    <p className="text-muted small">{user?.email}</p>
                  </div>

                  <div className="list-group list-group-flush mb-4">
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Blood Group:</span>
                      <span className="fw-bold text-danger fs-5">
                        {user?.bloodGroup || "Not specified"}
                      </span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Phone Number:</span>
                      <span className="fw-semibold">{user?.phone}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">City / Area:</span>
                      <span className="fw-semibold">{user?.city || user?.address}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                      <span className="text-muted">Total Donations:</span>
                      <span className="badge bg-danger rounded-pill fs-6">
                        {history.length}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded border mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">Emergency Availability:</div>
                        <small className="text-muted">
                          Allow hospitals to contact you during accident emergencies
                        </small>
                      </div>
                      <div className="form-check form-switch fs-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isAvailable}
                          disabled={updating}
                          onChange={(e) => handleToggleAvailability(e.target.checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {statusMessage && (
                    <div className="alert alert-success py-2 small mb-0">
                      {statusMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white py-3">
                  <h5 className="mb-0 fw-bold">📜 Your Complete Blood Donation History</h5>
                </div>
                <div className="card-body p-4">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-danger" role="status"></div>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="text-center py-5">
                      <h5 className="text-muted">No donation history records yet</h5>
                      <p className="text-muted small">
                        When you donate blood at a registered blood bank or hospital drive, it will show up here.
                      </p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Blood Group</th>
                            <th>Quantity</th>
                            <th>Organisation / Hospital</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map((record) => (
                            <tr key={record._id}>
                              <td>{moment(record.createdAt).format("DD/MM/YYYY")}</td>
                              <td>
                                <span className="badge bg-danger">{record.bloodGroup}</span>
                              </td>
                              <td>{record.quantity} ML</td>
                              <td>
                                {record.organisation?.organisationName ||
                                  "National Blood Service"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL DONOR CARD */}
        {activeTab === "card" && (
          <div className="py-3">
            <DonorCard user={user} />
          </div>
        )}

        {/* TAB 3: DONATION CERTIFICATE */}
        {activeTab === "certificate" && (
          <div className="py-3">
            <DonationCertificate user={user} historyCount={history.length} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DonorProfile;
