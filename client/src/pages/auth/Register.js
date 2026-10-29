import React, { useEffect } from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
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
            src="/assets/images/banner2.jpg"
            alt="RaktDaan Voluntary Blood Donor Network"
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
              <span className="badge bg-danger">NEW REGISTRATION</span>
              Join 12,000+ Voluntary Heroes Today
            </div>

            <h1 className="display-6 fw-bold text-white mb-3">
              Be the Reason Someone's <span className="text-danger fw-extrabold">Heart Beats</span> Tomorrow.
            </h1>
            <p className="lead text-light text-opacity-90 mb-4" style={{ maxWidth: 540 }}>
              Whether you are a voluntary donor, a licensed hospital, or a social organisation, joining RaktDaan connects you directly with lives that need immediate assistance during critical road accidents and surgeries.
            </p>

            <div className="row g-3" style={{ maxWidth: 580 }}>
              <div className="col-md-6">
                <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-10 backdrop-blur">
                  <div className="d-flex align-items-center gap-3">
                    <i className="fa-solid fa-map-location-dot text-danger fs-3"></i>
                    <div>
                      <h6 className="text-white mb-0 fw-bold">Hyperlocal Dispatch</h6>
                      <small className="text-white-50">Pin code & City matching</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-10 backdrop-blur">
                  <div className="d-flex align-items-center gap-3">
                    <i className="fa-solid fa-bell text-danger fs-3"></i>
                    <div>
                      <h6 className="text-white mb-0 fw-bold">Emergency SOS Only</h6>
                      <small className="text-white-50">Strictly authorized calls</small>
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
                <h4 className="fw-bold text-white mb-0">8,950+</h4>
                <small className="text-white-50">Units Donated</small>
              </div>
              <div>
                <h4 className="fw-bold text-white mb-0">100%</h4>
                <small className="text-white-50">Voluntary & Free</small>
              </div>
              <div>
                <h4 className="fw-bold text-white mb-0">28+</h4>
                <small className="text-white-50">States Covered</small>
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
              formTitle={"Join RaktDaan Network"}
              submitBtn={"Complete Registration"}
              formType={"register"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
