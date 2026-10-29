import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleLogin, handleRegister } from "../../../services/authService";
import { toast } from "react-toastify";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const bloodGroupsList = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const allRoles = [
    { id: "donar", label: "Donor", sub: "रक्तदाता", icon: "fa-solid fa-droplet" },
    { id: "hospital", label: "Hospital", sub: "अस्पताल", icon: "fa-solid fa-hospital" },
    { id: "organisation", label: "Org", sub: "संस्था", icon: "fa-solid fa-building-ngo" },
    { id: "admin", label: "Admin", sub: "व्यवस्थापक", icon: "fa-solid fa-shield-halved" },
  ];

  // Restrict self-registration of Admin accounts (OWASP Privilege Escalation Protection)
  const roles = formType === "register" ? allRoles.filter((r) => r.id !== "admin") : allRoles;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "login") {
      if (!email || !password) {
        toast.warning("Please enter your email and password");
        return;
      }
      return handleLogin(e, email, password, role);
    }

    if (formType === "register") {
      if (role === "donar") {
        if (!name || !email || !password || !phone || !bloodGroup) {
          toast.warning("Please fill all required donor fields (Name, Email, Password, Phone, Blood Group)");
          return;
        }
      } else if (role === "hospital") {
        if (!hospitalName || !email || !password || !phone) {
          toast.warning("Please fill all required hospital fields");
          return;
        }
      } else if (role === "organisation") {
        if (!organisationName || !email || !password || !phone) {
          toast.warning("Please fill all required organisation fields");
          return;
        }
      } else if (role === "admin") {
        if (!name || !email || !password) {
          toast.warning("Please fill name, email and password for Admin registration");
          return;
        }
      }

      return handleRegister(
        e,
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
        bloodGroup,
        city,
        pincode
      );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger rounded-circle mb-2" style={{ width: 52, height: 52 }}>
          <i className={formType === "login" ? "fa-solid fa-arrow-right-to-bracket fs-4" : "fa-solid fa-user-plus fs-4"}></i>
        </div>
        <h2 className="fw-bold text-dark mb-1">{formTitle}</h2>
        <p className="text-muted small mb-0">
          {formType === "login"
            ? "Sign in to access your RaktDaan portal & emergency services"
            : "Join the RaktDaan life-saving voluntary donor network"}
        </p>
      </div>

      {/* Role Tabs */}
      <div className="mb-3">
        <label className="form-label fw-bold text-secondary small text-uppercase letter-spacing-1">
          Select Your Role <span className="text-danger">*</span>
        </label>
        <div className="role-tabs-grid">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`role-pill-btn ${role === r.id ? "active" : ""}`}
              onClick={() => setRole(r.id)}
            >
              <i className={`${r.icon} role-icon`}></i>
              <span className="role-title">{r.label}</span>
              <span className="role-sub">{r.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Role Notice Pill */}
      <div className="alert alert-light border d-flex align-items-center gap-2 py-2 px-3 mb-4 rounded-3 text-secondary small">
        <i className="fa-solid fa-circle-info text-danger fs-6"></i>
        <div>
          {role === "donar" && (
            <span>
              <strong>Donor Mode:</strong> Manage donation history & respond to hospital emergency requests.
            </span>
          )}
          {role === "hospital" && (
            <span>
              <strong>Hospital Mode:</strong> Direct access to find emergency blood donors & broadcast SOS alerts.
            </span>
          )}
          {role === "organisation" && (
            <span>
              <strong>Organisation Mode:</strong> Manage blood drives, donation camps & community donors.
            </span>
          )}
          {role === "admin" && (
            <span>
              <strong>Admin Mode:</strong> Central governance, hospital validation & platform analytics.
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* LOGIN FORM FIELDS */}
        {formType === "login" && (
          <>
            <InputType
              labelText={"Email Address"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              icon="fa-solid fa-envelope"
              required={true}
            />

            <div className="mb-3">
              <label htmlFor="forPassword" className="form-label fw-semibold small text-secondary mb-1">
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  id="forPassword"
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2 border-start-0 border-end-0"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-light border border-start-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
              </div>
            </div>
          </>
        )}

        {/* REGISTER FORM FIELDS */}
        {formType === "register" && (
          <>
            {(role === "admin" || role === "donar") && (
              <InputType
                labelText={"Full Name"}
                labelFor={"forName"}
                inputType={"text"}
                name={"name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                icon="fa-solid fa-user"
                required={true}
              />
            )}

            {role === "organisation" && (
              <InputType
                labelText={"Organisation Name"}
                labelFor={"fororganisationName"}
                inputType={"text"}
                name={"organisationName"}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                placeholder="e.g. Red Cross Society"
                icon="fa-solid fa-building-ngo"
                required={true}
              />
            )}

            {role === "hospital" && (
              <InputType
                labelText={"Hospital Name"}
                labelFor={"forHospitalName"}
                inputType={"text"}
                name={"hospitalName"}
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g. Apollo Hospital"
                icon="fa-solid fa-hospital"
                required={true}
              />
            )}

            {/* Blood Group Selector for Donor */}
            {role === "donar" && (
              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary mb-1">
                  Blood Group <span className="text-danger">*</span>
                </label>
                <div className="bg-grid">
                  {bloodGroupsList.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      className={`bg-pill-btn ${bloodGroup === bg ? "active" : ""}`}
                      onClick={() => setBloodGroup(bg)}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="row g-2">
              <div className="col-md-6">
                <InputType
                  labelText={"City"}
                  labelFor={"forCity"}
                  inputType={"text"}
                  name={"city"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  icon="fa-solid fa-city"
                  required={role === "donar"}
                />
              </div>
              <div className="col-md-6">
                <InputType
                  labelText={"Pincode"}
                  labelFor={"forPincode"}
                  inputType={"text"}
                  name={"pincode"}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 400001"
                  icon="fa-solid fa-location-dot"
                  required={role === "donar"}
                />
              </div>
            </div>

            <InputType
              labelText={"Email Address"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              icon="fa-solid fa-envelope"
              required={true}
            />

            <div className="mb-3">
              <label htmlFor="forPasswordRegister" className="form-label fw-semibold small text-secondary mb-1">
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  id="forPasswordRegister"
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2 border-start-0 border-end-0"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-light border border-start-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
              </div>
            </div>

            <InputType
              labelText={"Phone Number"}
              labelFor={"forPhone"}
              inputType={"text"}
              name={"phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              icon="fa-solid fa-phone"
              required={true}
            />

            <InputType
              labelText={"Address"}
              labelFor={"forAddress"}
              inputType={"text"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street / Landmark / Area"
              icon="fa-solid fa-map-marker-alt"
              required={true}
            />

            {(role === "organisation" || role === "hospital") && (
              <InputType
                labelText={"Official Website"}
                labelFor={"forWebsite"}
                inputType={"text"}
                name={"website"}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.org"
                icon="fa-solid fa-globe"
              />
            )}
          </>
        )}

        {/* Submit Button */}
        <button
          className="auth-submit-btn w-100 mt-2 mb-3 d-flex align-items-center justify-content-center gap-2"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{submitBtn}</span>
              <i className="fa-solid fa-arrow-right small"></i>
            </>
          )}
        </button>

        {/* Toggle between Login and Register */}
        <div className="text-center pt-2 border-top">
          {formType === "login" ? (
            <p className="text-secondary small mb-2">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-danger fw-bold text-decoration-none">
                Register as Donor or Hospital <i className="fa-solid fa-chevron-right small"></i>
              </Link>
            </p>
          ) : (
            <p className="text-secondary small mb-2">
              Already registered on RaktDaan?{" "}
              <Link to="/login" className="text-danger fw-bold text-decoration-none">
                Sign In to Your Account <i className="fa-solid fa-chevron-right small"></i>
              </Link>
            </p>
          )}

          <div className="mt-3">
            <Link to="/" className="text-muted small text-decoration-none">
              <i className="fa-solid fa-arrow-left me-1"></i> Return to RaktDaan Public Portal
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
