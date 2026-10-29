import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/":
      return "Inventory Records";
    case "/donar":
      return "Donors List";
    case "/hospital":
      return "Registered Hospitals";
    case "/consumer":
      return "Blood Consumed";
    case "/donation":
      return "My Donation History";
    case "/donor-profile":
      return "Availability Status";
    case "/orgnaisation":
    case "/organisation":
      return "Nearby Blood Banks";
    case "/admin":
      return "Admin Dashboard";
    case "/donar-list":
      return "All Donors";
    case "/hospital-list":
      return "All Hospitals";
    case "/org-list":
      return "All Organisations";
    case "/emergency-donors":
      return "Emergency SOS Dispatch";
    case "/donation-camps":
      return "Blood Donation Camps";
    case "/blood-compatibility":
      return "Blood Compatibility";
    default:
      return "Dashboard";
  }
};

const Layout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Auto-close drawer on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Global Modern Header */}
      <Header />

      {/* Mobile Top Dashboard Action Bar (< 768px) */}
      <div
        className="d-md-none bg-dark text-white px-3 py-2 d-flex justify-content-between align-items-center border-bottom border-danger border-opacity-25 sticky-top"
        style={{ top: "54px", zIndex: 1025, backdropFilter: "blur(12px)", backgroundColor: "rgba(18, 22, 31, 0.95)" }}
      >
        <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
          <span className="badge bg-danger text-uppercase" style={{ fontSize: "10px" }}>
            DASHBOARD
          </span>
          <span className="small text-white fw-semibold text-truncate">
            {getPageTitle(location.pathname)}
          </span>
        </div>
        <button
          className="btn btn-sm btn-outline-danger text-white border-danger d-flex align-items-center gap-1 shadow-sm px-2 py-1"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          style={{ borderRadius: "8px", fontSize: "12px", whiteSpace: "nowrap" }}
        >
          <i className={`fa-solid ${mobileSidebarOpen ? "fa-xmark" : "fa-bars-staggered"} text-danger`}></i>
          <span>{mobileSidebarOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {/* Mobile Offcanvas Sidebar Drawer with Backdrop (< 768px) */}
      {mobileSidebarOpen && (
        <>
          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-60"
            style={{ zIndex: 1050, backdropFilter: "blur(4px)" }}
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className="d-md-none position-fixed top-0 start-0 h-100 bg-dark shadow-2xl d-flex flex-column"
            style={{
              width: "280px",
              maxWidth: "80vw",
              zIndex: 1060,
              animation: "slideInLeft 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center bg-black bg-opacity-25">
              <span className="fw-bold text-white small text-uppercase" style={{ letterSpacing: "1px" }}>
                <i className="fa-solid fa-gauge-high text-danger me-2"></i>Dashboard Navigation
              </span>
              <button
                className="btn btn-sm btn-outline-light rounded-circle"
                style={{ width: "30px", height: "30px", padding: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex-grow-1 overflow-auto">
              <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}

      {/* Main Workspace Container */}
      <div className="flex-grow-1 container-fluid px-0">
        <div className="row g-0">
          {/* Desktop Left Sidebar (>= 768px ONLY) */}
          <aside className="d-none d-md-block col-md-3 col-xl-2 px-0 bg-dark sidebar-wrapper">
            <Sidebar />
          </aside>

          {/* Center Main Content Container (Full width 100% on mobile, responsive on desktop) */}
          <main className="col-12 col-md-9 col-xl-10 ps-md-3 py-3 px-2 px-sm-3 px-md-4 main-content-wrapper">
            <div className="container-fluid px-0">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Global Unified Modern Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
