import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Donar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // find donor records
  const getDonars = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) {
        setData(data?.donars);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDonars();
  }, [getDonars]);

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-1">
            🩸 Registered Blood Donors
          </h3>
          <p className="text-muted small mb-0">
            List of donors who have participated in blood drives and donations.
          </p>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-secondary">Donors Directory</h5>
            <span className="badge bg-secondary">Total: {data?.length || 0}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-3">Name</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">City</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        Loading donors...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No donor records found.
                      </td>
                    </tr>
                  ) : (
                    data?.map((record) => (
                      <tr key={record._id}>
                        <td className="ps-3 fw-semibold">
                          {record.name || record.organisationName + " (ORG)"}
                        </td>
                        <td>
                          <span className="badge bg-danger rounded-pill px-2 py-1 fs-6">
                            {record.bloodGroup || "O+"}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            {record.city || "Verified"}
                          </span>
                        </td>
                        <td>{record.email}</td>
                        <td>
                          <a href={`tel:${record.phone}`} className="text-decoration-none">
                            {record.phone}
                          </a>
                        </td>
                        <td className="text-muted small">
                          {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donar;
