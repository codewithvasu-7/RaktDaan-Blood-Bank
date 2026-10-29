import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // find hospital records
  const getHospitals = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/admin/hospital-list");
      if (data?.success) {
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getHospitals();
  }, [getHospitals]);

  // DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to permanently delete this hospital account?"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message || "Hospital deleted successfully");
      getHospitals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4">
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-1">
            🏥 All Registered Hospitals (Admin)
          </h3>
          <p className="text-muted small mb-0">
            System-wide overview of all partner hospitals.
          </p>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-secondary">Hospitals Directory</h5>
            <span className="badge bg-secondary">Total: {data?.length || 0}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-3">Hospital Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Registered</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        Loading hospitals...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No hospitals registered in the database.
                      </td>
                    </tr>
                  ) : (
                    data?.map((record) => (
                      <tr key={record._id}>
                        <td className="ps-3 fw-semibold text-dark">
                          {record.hospitalName}
                        </td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>{record.address}</td>
                        <td className="text-muted small">
                          {moment(record.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handelDelete(record._id)}
                          >
                            <i className="fa-solid fa-trash me-1"></i> Delete
                          </button>
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

export default HospitalList;
