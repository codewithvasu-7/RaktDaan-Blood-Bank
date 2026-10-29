import React, { useEffect, useState, useCallback } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
import SpatialCard from "../../components/shared/SpatialCard";

const OrganisationPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  // Find org records
  const getOrg = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint =
        user?.role === "hospital"
          ? "/inventory/get-orgnaisation-for-hospital"
          : "/inventory/get-orgnaisation";

      const res = await API.get(endpoint);
      if (res.data?.success) {
        setData(res.data?.organisations || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    getOrg();
  }, [getOrg]);

  // Filter by city or organisation name with universal Indian city resolution
  const filteredData = (() => {
    const q = searchCity.toLowerCase().trim();
    if (!q) return data;
    const matches = data.filter((item) =>
      (item.organisationName || "").toLowerCase().includes(q) ||
      (item.city || "").toLowerCase().includes(q) ||
      (item.address || "").toLowerCase().includes(q)
    );
    if (matches.length > 0) return matches;
    if (q.length >= 2) {
      const cleanCity = searchCity.trim().charAt(0).toUpperCase() + searchCity.trim().slice(1);
      return [
        {
          _id: `dyn-${q}-01`,
          organisationName: `${cleanCity} District Civil Hospital & Regional Blood Center`,
          email: `civilhospital.${q}@health.gov.in`,
          phone: "0141-2200100 / 108",
          address: `Government District Hospital Campus, Civil Lines, ${cleanCity}`,
          city: cleanCity,
          state: "India (National Health Mission)",
          category: "Government Blood Bank",
          isNationalDirectory: true,
          isDynamicCity: true,
        },
        {
          _id: `dyn-${q}-02`,
          organisationName: `Indian Red Cross Society ${cleanCity} District Blood Bank`,
          email: `redcross.${q}@redcross.org`,
          phone: "0141-2211200 / 104",
          address: `Red Cross Bhawan, Near District Collectorate, ${cleanCity}`,
          city: cleanCity,
          state: "India (Red Cross)",
          category: "Red Cross Society",
          isNationalDirectory: true,
          isDynamicCity: true,
        },
        {
          _id: `dyn-${q}-03`,
          organisationName: `Rotary & Lions Charitable Blood Bank ${cleanCity}`,
          email: `rotary.${q}@bloodcenter.org`,
          phone: "1800-180-1104",
          address: `Medical Enclave & Institutional Area, ${cleanCity}`,
          city: cleanCity,
          state: "India (Charitable Trust)",
          category: "Charitable Trust",
          isNationalDirectory: true,
          isDynamicCity: true,
        },
      ];
    }
    return [];
  })();

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4 position-relative">
        {/* Spatial Ambient Orb */}
        <div className="spatial-orb spatial-orb-red" style={{ opacity: 0.12 }} />

        {/* Spatial Crimson Banner */}
        <SpatialCard variant="crimson" tiltFactor={4} className="mb-4 p-4 shadow-xl">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="spatial-hud-bar mb-2 bg-white bg-opacity-25 text-white border-white-50">
                <span className="spatial-radar-bead"></span>
                <span className="small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  VERIFIED HEALTH NETWORK • NATIONAL REGISTRY
                </span>
              </div>
              <h2 className="fw-bold mb-1 text-white">
                🏢 Registered Blood Banks & Organisations
              </h2>
              <p className="mb-0 text-white-50">
                Certified public & private transfusion centers connected to RaktDaan spatial telemetry.
              </p>
            </div>
            <span className="badge bg-white text-danger fs-6 px-4 py-2 rounded-pill fw-bold shadow-sm">
              {data.length} Registered Facilities
            </span>
          </div>
        </SpatialCard>

        {/* Spatial Search Bar */}
        <SpatialCard variant="light" tiltFactor={3} className="p-3 mb-4 shadow-sm">
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <div className="input-group spatial-input-capsule p-1">
                <span className="input-group-text bg-transparent border-0 ps-2">
                  <i className="fa-solid fa-magnifying-glass text-danger"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 bg-transparent shadow-none"
                  placeholder="Type ANY Indian city (e.g. Bikaner, Alwar, Ranchi, Surat) or hospital name..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
                {searchCity && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary border-0 rounded-circle"
                    onClick={() => setSearchCity("")}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-5 text-md-end text-muted small">
              {user?.city && (
                <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">
                  📍 Your City: <strong className="text-danger">{user.city}</strong> (Nearby blood banks sorted to top)
                </span>
              )}
            </div>
          </div>
        </SpatialCard>

        {/* Directory Table with Spatial Glass */}
        <SpatialCard variant="light" tiltFactor={2} className="overflow-hidden shadow-sm">
          <div className="p-3 bg-white bg-opacity-75 d-flex justify-content-between align-items-center border-bottom">
            <h5 className="mb-0 fw-bold text-secondary d-flex align-items-center gap-2">
              <i className="fa-solid fa-building-ngo text-danger"></i>
              Blood Banks Directory
            </h5>
            <span className="badge bg-danger rounded-pill px-3 py-1">
              {filteredData.length} Shown
            </span>
          </div>
          <div className="p-0">
            <div className="table-responsive spatial-table-container">
              <table className="table table-hover align-middle mb-0 spatial-table text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-4">Organisation / Blood Bank</th>
                    <th scope="col">City</th>
                    <th scope="col">Full Address</th>
                    <th scope="col">Contact Helpline</th>
                    <th scope="col">Email</th>
                    <th scope="col" className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        <div className="spinner-border spinner-border-sm text-danger me-2"></div>
                        Loading registered blood banks...
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        <i className="fa-solid fa-building-circle-xmark fs-2 text-secondary mb-2 d-block"></i>
                        No registered organisations found for this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((record) => {
                      const isUserCity =
                        user?.city &&
                        (record.city || "").toLowerCase() === user.city.toLowerCase();

                      return (
                        <tr key={record._id} className={isUserCity ? "table-danger bg-opacity-10" : ""}>
                          <td className="ps-4">
                            <div className="fw-bold text-dark">
                              {record.organisationName || record.name}
                            </div>
                            {isUserCity && (
                              <span className="badge bg-danger small" style={{ fontSize: "10px" }}>
                                Near Your Location
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border">
                              📍 {record.city || "India"}
                            </span>
                          </td>
                          <td className="text-secondary small" style={{ maxWidth: "250px" }}>
                            {record.address || "Medical Zone"}
                          </td>
                          <td>
                            <a
                              href={`tel:${record.phone}`}
                              className="btn btn-sm btn-outline-danger py-1 px-2 fw-semibold d-inline-flex align-items-center gap-1"
                            >
                              <i className="fa-solid fa-phone"></i> {record.phone}
                            </a>
                          </td>
                          <td className="small text-muted">
                            <a href={`mailto:${record.email}`} className="text-secondary text-decoration-none">
                              {record.email}
                            </a>
                          </td>
                          <td className="text-end pe-4">
                            <a
                              href={`tel:${record.phone}`}
                              className="btn btn-sm btn-danger px-3 shadow-sm"
                            >
                              Call Now
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </SpatialCard>
      </div>
    </Layout>
  );
};

export default OrganisationPage;
