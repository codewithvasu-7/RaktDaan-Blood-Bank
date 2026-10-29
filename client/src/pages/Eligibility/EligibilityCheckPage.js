import React from "react";
import Header from "../../components/shared/Layout/Header";
import Footer from "../../components/shared/Layout/Footer";
import EligibilityQuiz from "../../components/shared/EligibilityQuiz";
import { Link } from "react-router-dom";

const EligibilityCheckPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1 py-5">
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Breadcrumb / Top info */}
          <div className="mb-4">
            <Link to="/" className="text-danger small text-decoration-none">
              ← Return to RaktDaan Home
            </Link>
          </div>

          <EligibilityQuiz />

          {/* Quick FAQ info */}
          <div className="mt-5 p-4 bg-white rounded-4 shadow-sm border">
            <h5 className="fw-bold mb-3">❓ Frequently Asked Questions (FAQ)</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <h6 className="fw-bold text-danger mb-1">How often can I donate blood?</h6>
                <p className="text-muted small">
                  Healthy males can donate every 90 days (3 months), and females can donate every 120 days (4 months).
                </p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold text-danger mb-1">Does donating blood hurt?</h6>
                <p className="text-muted small">
                  Only a brief pinch when the sterilized needle is inserted. The process takes less than 10 minutes.
                </p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold text-danger mb-1">Can I donate after drinking coffee or tea?</h6>
                <p className="text-muted small">
                  Yes, but drink plenty of water and have a light meal before donation. Avoid alcohol 24 hours prior.
                </p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold text-danger mb-1">Can diabetic patients donate?</h6>
                <p className="text-muted small">
                  Yes, if your blood sugar is well-controlled through diet or oral medication (non-insulin dependent).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EligibilityCheckPage;
