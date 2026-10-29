import React, { useEffect } from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="auth-page-wrapper container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* LEFT BRANDING & INFORMATION PANEL */}
        <div className="col-lg-6 col-xl-7 d-none d-lg-flex auth-banner-side">
          <img
            src="/assets/images/banner1.jpg"
            alt="RaktDaan Life Saving Network"
            className="auth-banner-bg-img"
          />
          <div className="auth-banner-overlay"></div>

          {/* Top Brand Nav */}
          <div className="auth-banner-content">
            <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-4">
              <span className="badge bg-danger p-2 fs-5 rounded-circle shadow-sm">
                🩸
              </span>
              <div>
                <span className="fs-3 fw-bolder text-white tracking-wide">RaktDaan</span>
                <span className="d-block text-white-50 small" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                  रक्तदान महादान • EMERGENCY BLOOD NETWORK
                </span>
              </div>
            </Link>
          </div>

          {/* Center Brand Highlights */}
          <div className="auth-banner-content my-auto py-4">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white bg-opacity-10 rounded-pill mb-3 border border-white border-opacity-25 text-white small">
              <span className="spinner-grow spinner-grow-sm text-danger" role="status"></span>
              24/7 Emergency Accident SOS Dispatch System Active
            </div>

            <h1 className="display-6 fw-bold text-white mb-3">
              One Donation Can Save Up to <span className="text-danger fw-extrabold">Three Lives</span>.
            </h1>
            <p className="lead text-light text-opacity-90 mb-4" style={{ maxWidth: 540 }}>
              Welcome back to India's unified voluntary blood donation portal. Access your dashboard to manage emergency alerts, locate immediate donors, and save precious minutes during critical accidents.
            </p>

            <div className="row g-3" style={{ maxWidth: 580 }}>
              <div className="col-md-6">
                <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-10 backdrop-blur">
                  <div className="d-flex align-items-center gap-3">
                    <i className="fa-solid fa-truck-medical text-danger fs-3"></i>
                    <div>
                      <h6 className="text-white mb-0 fw-bold">Emergency Dispatch</h6>
                      <small className="text-white-50">Local hospital SOS alert</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-10 backdrop-blur">
                  <div className="d-flex align-items-center gap-3">
                    <i className="fa-solid fa-shield-heart text-danger fs-3"></i>
                    <div>
                      <h6 className="text-white mb-0 fw-bold">100% Voluntary</h6>
                      <small className="text-white-50">Direct verified contacts</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Live Metrics */}
          <div className="auth-banner-content pt-4 border-top border-white border-opacity-25">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div>
                <h4 className="fw-bold text-white mb-0">12,400+</h4>
                <small className="text-white-50">Registered Donors</small>
              </div>
              <div>
                <h4 className="fw-bold text-white mb-0">450+</h4>
                <small className="text-white-50">Verified Hospitals</small>
              </div>
              <div>
                <h4 className="fw-bold text-white mb-0">&lt; 15 Mins</h4>
                <small className="text-white-50">Avg SOS Response</small>
              </div>
              <div className="d-flex align-items-center gap-2 bg-danger bg-opacity-25 px-3 py-2 rounded-3 border border-danger border-opacity-50">
                <i className="fa-solid fa-phone-volume text-white"></i>
                <span className="small text-white fw-bold">SOS: 1800-RAKT-HELP</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="col-12 col-lg-6 col-xl-5 auth-form-side">
          <div className="auth-card">
            <Form
              formTitle={"Sign In to RaktDaan"}
              submitBtn={"Sign In"}
              formType={"login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
