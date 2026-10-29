import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // find hospital consumption records
  const getConsumptionRecords = useCallback(async () => {
    try {
      if (!user?._id) return;
      setLoading(true);
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
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
    getConsumptionRecords();
  }, [getConsumptionRecords]);

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-1">
            📦 Hospital Blood Consumption Log
          </h3>
          <p className="text-muted small mb-0">
            Records of all blood units received and dispensed for medical cases.
          </p>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-secondary">Dispensed Units</h5>
            <span className="badge bg-secondary">Total: {data?.length || 0}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-3">Blood Group</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Blood Bank / Contact</th>
                    <th scope="col">Dispensed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        Loading records...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No blood consumption records found yet.
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
                          <span className="badge bg-warning text-dark px-2 py-1">
                            OUT (Consumed)
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

export default Consumer;
