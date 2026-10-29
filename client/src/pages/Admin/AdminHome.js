import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        {/* Welcome Banner */}
        <div className="card shadow-sm border-0 mb-4 bg-dark text-white">
          <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <span className="badge bg-danger mb-2">SYSTEM ADMINISTRATOR</span>
              <h2 className="fw-bold mb-1">
                Welcome back, {user?.name || "Administrator"}
              </h2>
              <p className="mb-0 text-white-50">
                Blood Bank Central Management Console. Supervise all donors, hospitals, organizations, and emergency operations.
              </p>
            </div>
            <div>
              <Link to="/emergency-donors" className="btn btn-danger fw-bold shadow-sm px-4 py-2">
                <i className="fa-solid fa-truck-medical me-2"></i>
                Emergency SOS Console
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Management Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4 text-center">
                <div
                  className="rounded-circle bg-danger bg-opacity-10 text-danger d-inline-flex justify-content-center align-items-center mb-3"
                  style={{ width: "60px", height: "60px", fontSize: "24px" }}
                >
                  <i className="fa-solid fa-users"></i>
                </div>
                <h5 className="fw-bold text-dark">Donors Management</h5>
                <p className="text-muted small mb-3">
                  View and manage all registered blood donors, their blood groups, and eligibility records.
                </p>
                <Link to="/donar-list" className="btn btn-outline-danger btn-sm px-4">
                  Manage Donors
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4 text-center">
                <div
                  className="rounded-circle bg-primary bg-opacity-10 text-primary d-inline-flex justify-content-center align-items-center mb-3"
                  style={{ width: "60px", height: "60px", fontSize: "24px" }}
                >
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <h5 className="fw-bold text-dark">Hospitals Network</h5>
                <p className="text-muted small mb-3">
                  Manage partner hospital accounts, medical clearances, and blood consumption requests.
                </p>
                <Link to="/hospital-list" className="btn btn-outline-primary btn-sm px-4">
                  Manage Hospitals
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4 text-center">
                <div
                  className="rounded-circle bg-success bg-opacity-10 text-success d-inline-flex justify-content-center align-items-center mb-3"
                  style={{ width: "60px", height: "60px", fontSize: "24px" }}
                >
                  <i className="fa-solid fa-building-ngo"></i>
                </div>
                <h5 className="fw-bold text-dark">Blood Bank Organisations</h5>
                <p className="text-muted small mb-3">
                  Supervise affiliated blood banks, storage centers, and donation inventory balances.
                </p>
                <Link to="/org-list" className="btn btn-outline-success btn-sm px-4">
                  Manage Organisations
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Guidelines Card */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold text-secondary">
              📋 Administrator Standard Operating Guidelines
            </h5>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border">
                  <h6 className="fw-bold text-danger mb-1">
                    🚨 Emergency Request Authorization
                  </h6>
                  <p className="small text-muted mb-0">
                    Emergency blood requests are restricted to <strong>Hospitals</strong>, <strong>Organisations</strong>, and <strong>Admins</strong>. Individual donors cannot trigger outbound mass requests.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border">
                  <h6 className="fw-bold text-success mb-1">
                    🩺 90-Day Medical Rule Compliance
                  </h6>
                  <p className="small text-muted mb-0">
                    The platform enforces safe donation intervals. Donors who have donated within the last 90 days are flagged as recent donors to safeguard donor health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
