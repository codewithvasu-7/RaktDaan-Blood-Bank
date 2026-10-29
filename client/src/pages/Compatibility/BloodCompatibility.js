import React, { useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import Header from "../../components/shared/Layout/Header";
import Footer from "../../components/shared/Layout/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Top-level PageWrapper to prevent re-mounting and focus loss
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

const BloodCompatibility = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedType, setSelectedType] = useState("O+");

  const compatibilityMap = {
    "O-": {
      canDonateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      canReceiveFrom: ["O-"],
      description: "O-Negative is the Universal Red Cell Donor. It can be transfused to patients of all blood types in immediate trauma situations when there is no time to test blood types.",
      rarityInIndia: "~2.0% (Rare)",
    },
    "O+": {
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"],
      description: "O-Positive is the most common blood type in India. Very high demand in daily surgeries, deliveries, and trauma centers.",
      rarityInIndia: "~37.1% (Most Common)",
    },
    "A-": {
      canDonateTo: ["A-", "A+", "AB-", "AB+"],
      canReceiveFrom: ["A-", "O-"],
      description: "A-Negative donors can give to both Rh-positive and Rh-negative A and AB patients.",
      rarityInIndia: "~0.8% (Very Rare)",
    },
    "A+": {
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      description: "A-Positive is a major blood group frequently required in planned surgeries and cancer therapies.",
      rarityInIndia: "~21.4% (Common)",
    },
    "B-": {
      canDonateTo: ["B-", "B+", "AB-", "AB+"],
      canReceiveFrom: ["B-", "O-"],
      description: "B-Negative is relatively rare but can donate to any B or AB patient.",
      rarityInIndia: "~1.8% (Rare)",
    },
    "B+": {
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      description: "B-Positive is the second most common blood type in India, playing a critical role in emergency preparedness.",
      rarityInIndia: "~32.2% (Very Common)",
    },
    "AB-": {
      canDonateTo: ["AB-", "AB+"],
      canReceiveFrom: ["AB-", "A-", "B-", "O-"],
      description: "AB-Negative is the rarest blood type in India. Universal platelet and plasma donor.",
      rarityInIndia: "~0.5% (Extremely Rare)",
    },
    "AB+": {
      canDonateTo: ["AB+"],
      canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      description: "AB-Positive is the Universal Red Cell Recipient. A person with AB+ can receive red blood cells from any blood type.",
      rarityInIndia: "~4.2% (Uncommon)",
    },
  };

  const currentInfo = compatibilityMap[selectedType];

  return (
    <PageWrapper user={user}>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-lg-4">
        {/* Banner */}
        <div className="card shadow-sm border-0 mb-4 bg-danger text-white">
          <div className="card-body p-3 p-md-4">
            <span className="badge bg-light text-danger fw-bold mb-2">
              RAKTDAAN COMPATIBILITY GUIDE
            </span>
            <h2 className="fw-bold mb-1">
              🧬 Blood Type Compatibility & Matching Tool
            </h2>
            <p className="mb-0 text-white-50">
              Check who you can donate blood to and which blood groups you can receive in emergency scenarios.
            </p>
          </div>
        </div>

        {/* Interactive Compatibility Selector */}
        <div className="row g-4 mb-4">
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 p-3 p-md-4 h-100">
              <h5 className="fw-bold text-dark mb-3">Select Your Blood Group:</h5>
              <div className="row g-2 mb-4">
                {Object.keys(compatibilityMap).map((grp) => (
                  <div className="col-3" key={grp}>
                    <button
                      type="button"
                      className={`btn w-100 py-3 fw-bold fs-5 shadow-sm ${
                        selectedType === grp ? "btn-danger" : "btn-outline-secondary"
                      }`}
                      onClick={() => setSelectedType(grp)}
                    >
                      {grp}
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-light rounded border">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Prevalence in India:</span>
                  <span className="badge bg-dark">{currentInfo.rarityInIndia}</span>
                </div>
                <p className="small text-secondary mb-0">{currentInfo.description}</p>
              </div>

              <div className="mt-4 text-center">
                <Link to="/register" className="btn btn-danger fw-bold px-4">
                  🩸 Register with Blood Group {selectedType}
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4 h-100">
              <h5 className="fw-bold text-dark mb-4">
                Compatibility Breakdown for Group:{" "}
                <span className="badge bg-danger fs-5 px-3">{selectedType}</span>
              </h5>

              {/* Can Donate To */}
              <div className="mb-4">
                <h6 className="fw-bold text-success text-uppercase small mb-2">
                  ✅ You Can Donate Red Blood Cells To:
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {currentInfo.canDonateTo.map((grp) => (
                    <span
                      key={grp}
                      className="badge bg-success bg-opacity-10 text-success border border-success fs-6 px-3 py-2"
                    >
                      🩸 {grp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Can Receive From */}
              <div className="mb-4">
                <h6 className="fw-bold text-primary text-uppercase small mb-2">
                  💉 You Can Safely Receive Blood From:
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {currentInfo.canReceiveFrom.map((grp) => (
                    <span
                      key={grp}
                      className="badge bg-primary bg-opacity-10 text-primary border border-primary fs-6 px-3 py-2"
                    >
                      🩸 {grp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Universal Badges */}
              <div className="p-3 bg-light rounded border mt-auto">
                {selectedType === "O-" && (
                  <div className="alert alert-danger mb-0 py-2">
                    ⭐ <strong>Universal Donor Alert:</strong> O-Negative blood is carried in ambulances and emergency trauma helicopters because anyone can safely receive it!
                  </div>
                )}
                {selectedType === "AB+" && (
                  <div className="alert alert-primary mb-0 py-2">
                    🌟 <strong>Universal Recipient Alert:</strong> AB-Positive individuals can receive red blood cells from every other blood group in an emergency!
                  </div>
                )}
                {selectedType !== "O-" && selectedType !== "AB+" && (
                  <div className="small text-muted">
                    💡 <strong>Medical Rule:</strong> Rh-Negative individuals should strictly receive Rh-Negative blood, while Rh-Positive individuals can receive both Rh-Positive and Rh-Negative.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete Matrix Reference Table */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold text-secondary">
              Complete Blood Donor Compatibility Grid (All Groups)
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0 text-center">
                <thead className="table-light">
                  <tr>
                    <th>Recipient ↓ \ Donor →</th>
                    <th>O-</th>
                    <th>O+</th>
                    <th>A-</th>
                    <th>A+</th>
                    <th>B-</th>
                    <th>B+</th>
                    <th>AB-</th>
                    <th>AB+</th>
                  </tr>
                </thead>
                <tbody>
                  {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map((rec) => (
                    <tr key={rec}>
                      <td className="fw-bold bg-light">{rec}</td>
                      {["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map((don) => {
                        const canDonate = compatibilityMap[don].canDonateTo.includes(rec);
                        return (
                          <td
                            key={don}
                            className={canDonate ? "bg-success bg-opacity-10 text-success fw-bold" : "text-muted"}
                          >
                            {canDonate ? "✔" : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BloodCompatibility;
