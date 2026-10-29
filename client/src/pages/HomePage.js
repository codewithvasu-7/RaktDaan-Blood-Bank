import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import ExpiryAlertsWidget from "../components/shared/ExpiryAlertsWidget";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Role redirection
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "donar") {
      navigate("/donor-profile");
    } else if (user?.role === "hospital") {
      navigate("/emergency-donors");
    }
  }, [user, navigate]);

  // Fetch blood records
  const getBloodRecords = useCallback(async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBloodRecords();
  }, [getBloodRecords]);

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold mb-1 text-dark">
                Blood Inventory Management
              </h3>
              <p className="text-muted small mb-0">
                Track all incoming donations and outgoing hospital dispatches.
              </p>
            </div>
            {user?.role === "organisation" && (
              <button
                className="btn btn-danger fw-bold shadow-sm px-4 py-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fa-solid fa-plus me-2"></i>
                Add Blood Inventory
              </button>
            )}
          </div>

          {/* Zero-Wastage Blood Expiry Risk Alert System */}
          <ExpiryAlertsWidget />

          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-secondary">
                Recent Blood Inventory Transactions
              </h5>
              <span className="badge bg-secondary">
                Total Records: {data?.length || 0}
              </span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-3">Blood Group</th>
                      <th scope="col">Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Donor / Hospital Email</th>
                      <th scope="col">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No blood inventory transactions recorded yet. Click "Add Blood Inventory" to record one.
                        </td>
                      </tr>
                    ) : (
                      data?.map((record) => (
                        <tr key={record._id}>
                          <td className="ps-3">
                            <span className="badge bg-danger fs-6 px-3 py-2">
                              {record.bloodGroup}
                            </span>
                          </td>
                          <td>
                            {record.inventoryType === "in" ? (
                              <span className="badge bg-success px-3 py-1">
                                <i className="fa-solid fa-arrow-down me-1"></i> IN (Donation)
                              </span>
                            ) : (
                              <span className="badge bg-warning text-dark px-3 py-1">
                                <i className="fa-solid fa-arrow-up me-1"></i> OUT (Dispensed)
                              </span>
                            )}
                          </td>
                          <td className="fw-semibold">{record.quantity} ML</td>
                          <td>{record.email}</td>
                          <td className="text-muted small">
                            {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
