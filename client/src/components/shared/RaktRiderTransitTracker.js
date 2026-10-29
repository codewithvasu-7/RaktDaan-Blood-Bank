import React, { useState } from "react";

const RaktRiderTransitTracker = () => {
  const [stage, setStage] = useState(3); // 1: Requested, 2: Packed, 3: In Transit, 4: Delivered
  const temperature = 3.8;

  const steps = [
    { num: 1, title: "SOS Approved", time: "10:15 AM", icon: "fa-solid fa-file-circle-check" },
    { num: 2, title: "Cold Bag Packed", time: "10:22 AM", icon: "fa-solid fa-box-tissue" },
    { num: 3, title: "In Transit (Rakt-Rider 🚑)", time: "10:30 AM", icon: "fa-solid fa-truck-medical" },
    { num: 4, title: "Delivered to ICU", time: "Pending", icon: "fa-solid fa-hospital-user" },
  ];

  const handleNextStage = () => {
    if (stage < 4) setStage(stage + 1);
    else setStage(1);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4 border-start border-danger border-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-circle fs-5">
            🚑
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h5 className="fw-bold text-dark mb-0">Rakt-Rider: Live Emergency Blood Transit Tracking</h5>
              <span className="badge bg-danger">ACTIVE TRANSIT</span>
            </div>
            <small className="text-muted">
              Cold-chain temperature & vehicle tracking for urgent accident trauma dispatches
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-light text-dark border px-3 py-2 font-monospace">
            Tracking ID: <strong>RR-SOS-8821</strong>
          </span>
          <button
            className="btn btn-sm btn-outline-danger fw-semibold"
            onClick={handleNextStage}
            title="Advance courier simulation step"
          >
            {stage === 4 ? "Reset Simulation" : "Advance Step ➔"}
          </button>
        </div>
      </div>

      {/* Transit Details Summary */}
      <div className="row g-3 bg-light p-3 rounded-3 mb-4">
        <div className="col-md-3">
          <small className="text-muted d-block text-uppercase" style={{ fontSize: "10px" }}>Emergency Patient</small>
          <strong className="text-dark">Suresh Patel (ICU Bed 03)</strong>
        </div>
        <div className="col-md-3">
          <small className="text-muted d-block text-uppercase" style={{ fontSize: "10px" }}>Blood Units</small>
          <strong className="text-danger">2 Bags • O-Negative (O-)</strong>
        </div>
        <div className="col-md-3">
          <small className="text-muted d-block text-uppercase" style={{ fontSize: "10px" }}>Transit Vehicle</small>
          <strong className="text-dark">Ambulance Unit 04 (MH-01-AX-9912)</strong>
        </div>
        <div className="col-md-3">
          <small className="text-muted d-block text-uppercase" style={{ fontSize: "10px" }}>Cold Chain Monitor</small>
          <strong className="text-success">
            ❄️ {temperature}°C <span className="badge bg-success" style={{ fontSize: "9px" }}>SAFE TEMP</span>
          </strong>
        </div>
      </div>

      {/* 4-Step Visual Timeline */}
      <div className="position-relative my-4 px-2">
        <div className="row text-center g-2 position-relative" style={{ zIndex: 2 }}>
          {steps.map((st) => {
            const isCompleted = st.num <= stage;
            const isCurrent = st.num === stage;

            let circleClass = "bg-light text-muted border";
            if (isCompleted) circleClass = "bg-danger text-white shadow";
            if (isCurrent) circleClass = "bg-danger text-white shadow ring-danger animate-pulse";

            return (
              <div className="col-3" key={st.num}>
                <div
                  className={`rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 ${circleClass}`}
                  style={{ width: "46px", height: "46px", fontSize: "18px" }}
                >
                  <i className={st.icon}></i>
                </div>
                <h6 className={`small fw-bold mb-0 ${isCompleted ? "text-dark" : "text-muted"}`}>
                  {st.title}
                </h6>
                <small className="text-muted" style={{ fontSize: "11px" }}>
                  {st.num < stage ? "Completed" : st.num === stage ? "In Progress" : st.time}
                </small>
              </div>
            );
          })}
        </div>

        {/* Connecting Progress Line */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y w-100 px-4"
          style={{ zIndex: 1, marginTop: "-16px" }}
        >
          <div className="progress" style={{ height: "4px" }}>
            <div
              className="progress-bar bg-danger"
              style={{ width: `${((stage - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Driver & ETA Callout */}
      {stage === 3 && (
        <div className="alert alert-danger bg-danger bg-opacity-10 border border-danger border-opacity-25 d-flex justify-content-between align-items-center py-2 px-3 mb-0 rounded-3">
          <div className="d-flex align-items-center gap-2">
            <span className="spinner-grow spinner-grow-sm text-danger" role="status"></span>
            <small className="text-danger fw-semibold">
              Ambulance is currently <strong>3.2 km away</strong> • Estimated Arrival in <strong>9 Minutes</strong>
            </small>
          </div>
          <a href="tel:9811022334" className="btn btn-danger btn-sm py-1 px-3 fw-bold">
            <i className="fa-solid fa-phone me-1"></i> Call Driver
          </a>
        </div>
      )}
    </div>
  );
};

export default RaktRiderTransitTracker;
