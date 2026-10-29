import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = ({ onNavigate }) => {
  // GET USER STATE
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const canRequestBlood =
    user?.role === "hospital" ||
    user?.role === "organisation" ||
    user?.role === "admin";

  const handleLinkClick = () => {
    if (typeof onNavigate === "function") {
      onNavigate();
    }
  };

  return (
    <div className="h-100">
      <div className="sidebar shadow-sm h-100">
        <div className="menu py-2">
          {/* Organisation Navigation */}
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/dashboard" || location.pathname === "/home" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/dashboard" onClick={handleLinkClick}>Inventory Records</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar" onClick={handleLinkClick}>Donors List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital" onClick={handleLinkClick}>Registered Hospitals</Link>
              </div>
            </>
          )}

          {/* Admin Navigation */}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/admin" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-user-gear"></i>
                <Link to="/admin" onClick={handleLinkClick}>Admin Dashboard</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-users"></i>
                <Link to="/donar-list" onClick={handleLinkClick}>All Donors</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital-list" onClick={handleLinkClick}>All Hospitals</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/org-list" onClick={handleLinkClick}>All Organisations</Link>
              </div>
            </>
          )}

          {/* Hospital Navigation */}
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/consumer" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-hand-holding-droplet"></i>
                <Link to="/consumer" onClick={handleLinkClick}>Blood Consumed</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/orgnaisation" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/orgnaisation" onClick={handleLinkClick}>Blood Banks</Link>
              </div>
            </>
          )}

          {/* Donor Navigation (User) */}
          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donation" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-droplet text-danger"></i>
                <Link to="/donation" onClick={handleLinkClick}>My Donation History</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donor-profile" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-id-card text-success"></i>
                <Link to="/donor-profile" onClick={handleLinkClick}>Availability Status</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/orgnaisation" || location.pathname === "/organisation" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/orgnaisation" onClick={handleLinkClick}>Nearby Blood Banks</Link>
              </div>
            </>
          )}

          {/* Emergency SOS Donor Request: ONLY for Hospital, Organisation, and Admin */}
          {canRequestBlood && (
            <div
              className={`menu-item emergency-menu-item ${
                location.pathname === "/emergency-donors" ? "active-emergency" : ""
              }`}
            >
              <i className="fa-solid fa-truck-medical text-danger"></i>
              <Link to="/emergency-donors" onClick={handleLinkClick} className="fw-bold">
                🚨 Emergency SOS
              </Link>
            </div>
          )}

          {/* Blood Donation Camps & Drives */}
          <div
            className={`menu-item ${
              location.pathname === "/donation-camps" ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-tent text-danger"></i>
            <Link to="/donation-camps" onClick={handleLinkClick}>🏕️ Blood Camps</Link>
          </div>

          {/* Blood Compatibility Guide */}
          <div
            className={`menu-item ${
              location.pathname === "/blood-compatibility" ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-dna text-info"></i>
            <Link to="/blood-compatibility" onClick={handleLinkClick}>🧬 Compatibility</Link>
          </div>

          {/* Public Portal Link */}
          <div className="menu-item border-top border-secondary mt-3 pt-3">
            <i className="fa-solid fa-globe text-warning"></i>
            <Link to="/" onClick={handleLinkClick} className="text-white-50 small">
              🌐 RaktDaan Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
