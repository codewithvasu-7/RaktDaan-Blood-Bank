import React, { useState, useEffect, useCallback } from "react";
import API from "../../services/API";
import moment from "moment";
import { Link } from "react-router-dom";

const ExpiryAlertsWidget = () => {
  const [data, setData] = useState({
    totalBatches: 0,
    highRiskCount: 0,
    expiredCount: 0,
    items: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchExpiryAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/inventory/expiry-alerts");
      if (res.data?.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Error fetching expiry risk alerts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpiryAlerts();
  }, [fetchExpiryAlerts]);

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4 border-start border-warning border-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-warning bg-opacity-25 text-warning p-2 rounded-circle fs-5">
            ⏳
          </div>
          <div>
            <h5 className="fw-bold text-dark mb-0">Zero-Wastage Blood Expiry Risk Monitor</h5>
            <small className="text-muted">
              Auto-calculates shelf-life (35 days) to ensure zero blood units expire unutilized
            </small>
          </div>
        </div>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={fetchExpiryAlerts}
          title="Refresh expiry alerts"
        >
          <i className="fa-solid fa-rotate me-1"></i> Check Expiry
        </button>
      </div>

      {/* Metric Cards */}
      <div className="row g-3 mb-3">
        <div className="col-sm-4">
          <div className="p-3 bg-light rounded-3 text-center border">
            <span className="small text-muted text-uppercase fw-bold">Total Batches in Storage</span>
            <h3 className="fw-bold text-dark mb-0 mt-1">{data.totalBatches}</h3>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="p-3 bg-warning bg-opacity-10 rounded-3 text-center border border-warning border-opacity-50">
            <span className="small text-warning text-uppercase fw-bold">Critical Expiry Risk (&le; 7 Days)</span>
            <h3 className="fw-bold text-warning mb-0 mt-1">{data.highRiskCount}</h3>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="p-3 bg-danger bg-opacity-10 rounded-3 text-center border border-danger border-opacity-50">
            <span className="small text-danger text-uppercase fw-bold">Expired / Quarantined</span>
            <h3 className="fw-bold text-danger mb-0 mt-1">{data.expiredCount}</h3>
          </div>
        </div>
      </div>

      {/* Table of Batches */}
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border spinner-border-sm text-warning" role="status"></div>
          <span className="small text-muted ms-2">Calculating remaining shelf-life...</span>
        </div>
      ) : data.items.length === 0 ? (
        <div className="alert alert-light border mb-0 text-center py-3 text-muted small">
          No blood units currently in inventory. As new voluntary donations are logged, their shelf-life countdown will appear here.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th>Blood Group</th>
                <th>Quantity</th>
                <th>Collected Date</th>
                <th>Age</th>
                <th>Remaining Shelf-Life</th>
                <th>Risk Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.items.slice(0, 5).map((item) => {
                let badgeClass = "badge bg-success";
                if (item.daysRemaining <= 0) badgeClass = "badge bg-dark";
                else if (item.daysRemaining <= 5) badgeClass = "badge bg-danger";
                else if (item.daysRemaining <= 10) badgeClass = "badge bg-warning text-dark";

                return (
                  <tr key={item._id}>
                    <td>
                      <span className="badge bg-danger fs-6 px-2">{item.bloodGroup}</span>
                    </td>
                    <td className="fw-semibold">{item.quantity} ML</td>
                    <td>{moment(item.collectedDate).format("DD/MM/YYYY")}</td>
                    <td>{item.ageDays} Days Old</td>
                    <td className="fw-bold">
                      {item.daysRemaining > 0 ? `${item.daysRemaining} Days Left` : "Expired"}
                    </td>
                    <td>
                      <span className={badgeClass}>{item.riskLevel}</span>
                    </td>
                    <td className="text-end">
                      {item.daysRemaining > 0 && item.daysRemaining <= 10 ? (
                        <Link
                          to="/emergency-donors"
                          className="btn btn-sm btn-outline-danger py-0 px-2 fw-semibold"
                          title="Allocate to emergency accident request"
                        >
                          ⚡ Dispatch to Trauma
                        </Link>
                      ) : (
                        <span className="text-muted small">Safe in Storage</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpiryAlertsWidget;
