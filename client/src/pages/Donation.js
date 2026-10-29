import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // find donor records
  const getDonationRecords = useCallback(async () => {
    try {
      if (!user?._id) return;
      setLoading(true);
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    getDonationRecords();
  }, [getDonationRecords]);

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-1">
            🩸 My Blood Donation History
          </h3>
          <p className="text-muted small mb-0">
            Thank you for being a life saver! Here is the record of all your blood contributions.
          </p>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-secondary">Donation Entries</h5>
            <span className="badge bg-danger">
              Total Donated: {data?.length || 0} times
            </span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-3">Blood Group</th>
                    <th scope="col">Status</th>
                    <th scope="col">Donation Volume</th>
                    <th scope="col">Blood Bank / Contact</th>
                    <th scope="col">Donation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        Loading your donation history...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No blood donations recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data?.map((record) => (
                      <tr key={record._id}>
                        <td className="ps-3">
                          <span className="badge bg-danger fs-6 px-3 py-1">
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success px-2 py-1">
                            <i className="fa-solid fa-check me-1"></i> Donated
                          </span>
                        </td>
                        <td className="fw-semibold">{record.quantity} ML</td>
                        <td>{record.email}</td>
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

export default Donation;
