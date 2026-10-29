import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  // Fetch Blood Group Analytical Stats
  const getBloodGroupData = useCallback(async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch Recent Transactions
  const getBloodRecords = useCallback(async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, [getBloodGroupData, getBloodRecords]);

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-1">
            📊 Blood Stock & Analytics Dashboard
          </h3>
          <p className="text-muted small mb-0">
            Real-time visual monitoring of available blood units, total donations, and hospital dispatches.
          </p>
        </div>

        {/* Blood Groups Stats Grid */}
        <div className="row g-3 mb-4">
          {data?.map((record, i) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-danger fs-5 px-3 py-2 rounded">
                      {record.bloodGroup}
                    </span>
                    <span className="text-muted small fw-semibold">
                      Stock Level
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>Total In (Donated):</span>
                      <strong className="text-success">{record.totalIn} ML</strong>
                    </div>
                    <div className="d-flex justify-content-between small text-muted">
                      <span>Total Out (Dispensed):</span>
                      <strong className="text-danger">{record.totalOut} ML</strong>
                    </div>
                  </div>

                  <div className="p-2 bg-light rounded text-center border">
                    <span className="small text-muted d-block">Available Stock</span>
                    <span
                      className={`fs-5 fw-bold ${
                        record.availabeBlood > 0 ? "text-primary" : "text-muted"
                      }`}
                    >
                      {record.availabeBlood} ML
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Blood Transactions */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-secondary">
              Recent Blood Inventory Movements
            </h5>
            <span className="badge bg-secondary">
              Showing Last {inventoryData?.length || 0} Records
            </span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-3">Blood Group</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donor / Recipient Email</th>
                    <th scope="col">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No recent transactions found.
                      </td>
                    </tr>
                  ) : (
                    inventoryData?.map((record) => (
                      <tr key={record._id}>
                        <td className="ps-3">
                          <span className="badge bg-danger fs-6 px-3 py-1">
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          {record.inventoryType === "in" ? (
                            <span className="badge bg-success px-2 py-1">
                              <i className="fa-solid fa-arrow-down me-1"></i> IN (Donation)
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark px-2 py-1">
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
      </div>
    </Layout>
  );
};

export default Analytics;
