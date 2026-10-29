import React from "react";
import moment from "moment";

const DonationCertificate = ({ user, historyCount = 1 }) => {
  const certId = `CERT-RD-${user?._id ? user._id.slice(-6).toUpperCase() : "2026-001"}`;
  const currentDate = moment().format("DD MMMM YYYY");

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Proud to be an active voluntary blood donor on RaktDaan Network! 🩸 My blood group is ${
        user?.bloodGroup || "O+"
      }. A single donation saves up to 3 lives! Check your emergency eligibility on https://raktdaan.org`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="donation-certificate-wrapper">
      {/* Printable Certificate Frame */}
      <div
        className="certificate-frame bg-white text-dark mx-auto p-4 p-md-5 position-relative shadow"
        style={{
          maxWidth: "760px",
          border: "12px solid #85141b",
          outline: "4px solid #d4af37",
          outlineOffset: "-8px",
          borderRadius: "8px",
          background: "radial-gradient(circle, #ffffff 60%, #fffdf7 100%)",
        }}
      >
        {/* Corner Ornaments */}
        <div className="position-absolute top-0 start-0 m-3 text-warning fs-3">✦</div>
        <div className="position-absolute top-0 end-0 m-3 text-warning fs-3">✦</div>
        <div className="position-absolute bottom-0 start-0 m-3 text-warning fs-3">✦</div>
        <div className="position-absolute bottom-0 end-0 m-3 text-warning fs-3">✦</div>

        {/* Certificate Header */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center gap-2 mb-2">
            <span className="fs-1">🩸</span>
            <h2 className="fw-extrabold text-danger mb-0 tracking-wider">
              Rakt<span className="text-dark">Daan</span>
            </h2>
          </div>
          <p className="text-uppercase tracking-widest text-secondary fw-semibold small mb-1" style={{ letterSpacing: "3px" }}>
            National Emergency Blood Bank Network • भारत
          </p>
          <div
            className="mx-auto"
            style={{ width: "160px", height: "2px", background: "linear-gradient(90deg, transparent, #85141b, transparent)" }}
          ></div>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-4">
          <h1
            className="fw-bold mb-1"
            style={{
              fontFamily: "Georgia, serif",
              color: "#85141b",
              letterSpacing: "2px",
              fontSize: "1.9rem",
            }}
          >
            CERTIFICATE OF APPRECIATION
          </h1>
          <span className="text-muted fst-italic">This certificate is proudly awarded to</span>
        </div>

        {/* Recipient Name */}
        <div className="text-center mb-4 py-2 border-bottom border-warning border-2 w-75 mx-auto">
          <h2
            className="fw-bold text-dark mb-0"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "2.2rem",
              color: "#1a1e24",
            }}
          >
            {user?.name || "Life-Saving Voluntary Donor"}
          </h2>
        </div>

        {/* Citation */}
        <div className="text-center mb-4 px-md-4">
          <p className="lead text-secondary mb-3" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
            In profound gratitude and recognition of your voluntary, selfless service as a registered blood donor with Blood Group{" "}
            <strong className="text-danger fw-bold fs-5 px-2 py-0 bg-danger bg-opacity-10 rounded">
              {user?.bloodGroup || "O+"}
            </strong>
            . Your readiness to support trauma victims and emergency patients makes you an invaluable guardian of human life.
          </p>
          <p className="text-muted small fst-italic mb-0">
            "रक्तदान महादान • Every drop gives someone another tomorrow."
          </p>
        </div>

        {/* Bottom Details & Signatures */}
        <div className="row align-items-end mt-5 pt-3 g-3">
          <div className="col-4 text-center">
            <div className="fw-bold text-dark border-bottom border-dark pb-1 mb-1" style={{ fontSize: "14px" }}>
              {currentDate}
            </div>
            <small className="text-muted d-block text-uppercase" style={{ fontSize: "10px" }}>
              Date of Issue
            </small>
          </div>

          {/* Official Gold Seal */}
          <div className="col-4 text-center">
            <div
              className="rounded-circle d-inline-flex flex-column align-items-center justify-content-center p-2 shadow-sm"
              style={{
                width: "90px",
                height: "90px",
                border: "3px dashed #d4af37",
                background: "linear-gradient(135deg, #fff7db, #f7e18b)",
                color: "#7a5a00",
              }}
            >
              <i className="fa-solid fa-award fs-3 text-warning"></i>
              <span className="fw-bold" style={{ fontSize: "8px", letterSpacing: "1px" }}>
                OFFICIAL SEAL
              </span>
            </div>
          </div>

          <div className="col-4 text-center">
            <div className="fw-bold text-danger border-bottom border-dark pb-1 mb-1 font-monospace" style={{ fontSize: "14px" }}>
              Dr. R. K. Sharma
            </div>
            <small className="text-muted d-block text-uppercase" style={{ fontSize: "10px" }}>
              Medical Director, RaktDaan
            </small>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="text-center mt-4 pt-2 border-top border-light">
          <small className="text-muted font-monospace" style={{ fontSize: "10px" }}>
            Certificate Verification ID: {certId} • Valid across all partner hospitals
          </small>
        </div>
      </div>

      {/* Action Controls */}
      <div className="text-center mt-4 d-flex justify-content-center gap-2 flex-wrap">
        <button className="btn btn-danger px-4 fw-semibold shadow-sm" onClick={handlePrint}>
          <i className="fa-solid fa-print me-2"></i> Print / Download PDF
        </button>
        <button className="btn btn-success px-4 fw-semibold shadow-sm" onClick={handleShareWhatsApp}>
          <i className="fa-brands fa-whatsapp me-2"></i> Share Badge on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default DonationCertificate;
