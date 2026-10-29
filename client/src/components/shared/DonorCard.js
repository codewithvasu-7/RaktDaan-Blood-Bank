import React, { useRef } from "react";

const DonorCard = ({ user }) => {
  const cardRef = useRef();

  const donorId = user?._id
    ? `RD-${user._id.slice(-6).toUpperCase()}`
    : "RD-DONOR-001";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://raktdaan.org/verify/donor/${donorId}&color=ffffff&bgcolor=1a1a24`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="donor-card-container">
      {/* Smart ID Card */}
      <div
        ref={cardRef}
        className="card border-0 shadow-lg text-white mx-auto position-relative overflow-hidden"
        style={{
          maxWidth: "460px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #1e2530 0%, #11151c 60%, #8b111e 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
        }}
      >
        {/* Hologram Accent Bar */}
        <div
          style={{
            height: "5px",
            background: "linear-gradient(90deg, #ff4d4d, #f9cb28, #ff4d4d)",
          }}
        ></div>

        <div className="card-body p-4">
          {/* Card Top Branding */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-4">🩸</span>
              <div>
                <h6 className="fw-bolder mb-0 text-white tracking-wide" style={{ letterSpacing: "1px" }}>
                  Rakt<span className="text-danger">Daan</span>
                </h6>
                <small className="text-white-50" style={{ fontSize: "10px" }}>
                  NATIONAL VOLUNTARY LIFE-SAVER ID
                </small>
              </div>
            </div>
            <span className="badge bg-danger px-3 py-1 shadow-sm" style={{ fontSize: "11px", letterSpacing: "1px" }}>
              VERIFIED DONOR
            </span>
          </div>

          {/* Chip & Status */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div
              style={{
                width: "42px",
                height: "32px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #d4af37, #f7e7a9, #aa7c11)",
                border: "1px solid #775c13",
              }}
            ></div>
            <small className="text-white-50" style={{ fontSize: "11px" }}>
              <i className="fa-solid fa-wifi text-success me-1"></i> Emergency Active
            </small>
          </div>

          {/* Main Card Content */}
          <div className="row align-items-center g-3">
            <div className="col-8">
              <small className="text-white-50 d-block" style={{ fontSize: "10px" }}>
                DONOR FULL NAME
              </small>
              <h5 className="fw-bold mb-2 text-white text-truncate">{user?.name || "Life Saver Donor"}</h5>

              <div className="row g-2 mb-2">
                <div className="col-6">
                  <small className="text-white-50 d-block" style={{ fontSize: "10px" }}>
                    DONOR ID
                  </small>
                  <span className="fw-bold text-light" style={{ fontSize: "13px", letterSpacing: "1px" }}>
                    {donorId}
                  </span>
                </div>
                <div className="col-6">
                  <small className="text-white-50 d-block" style={{ fontSize: "10px" }}>
                    CITY / REGION
                  </small>
                  <span className="fw-semibold text-light text-truncate d-block" style={{ fontSize: "12px" }}>
                    {user?.city || "India"}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 mt-2">
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50" style={{ fontSize: "10px" }}>
                  Universal Network Access
                </span>
              </div>
            </div>

            {/* Blood Group & QR Code */}
            <div className="col-4 text-center">
              <div
                className="bg-danger text-white rounded-3 shadow py-2 px-1 mb-2 d-inline-block"
                style={{ minWidth: "75px" }}
              >
                <div className="display-6 fw-extrabold mb-0 lh-1">{user?.bloodGroup || "O+"}</div>
                <small style={{ fontSize: "9px", letterSpacing: "1px" }}>BLOOD GROUP</small>
              </div>

              <div className="p-1 bg-white bg-opacity-10 rounded d-inline-block">
                <img
                  src={qrUrl}
                  alt="Donor QR"
                  style={{ width: "65px", height: "65px", borderRadius: "4px" }}
                />
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-3 pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
            <small className="text-white-50" style={{ fontSize: "9px" }}>
              Helpline: 1800-RAKT-HELP (24/7)
            </small>
            <small className="text-white-50" style={{ fontSize: "9px" }}>
              Valid Lifetime • Ministry of Health Standards
            </small>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-3 d-flex justify-content-center gap-2">
        <button className="btn btn-danger btn-sm px-4 fw-semibold shadow-sm" onClick={handlePrint}>
          <i className="fa-solid fa-print me-2"></i> Print / Save Smart Card
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
