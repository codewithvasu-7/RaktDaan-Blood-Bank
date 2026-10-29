import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/features/auth/authActions";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";
import EmergencyDonors from "./pages/Emergency/EmergencyDonors";
import DonorProfile from "./pages/Donor/DonorProfile";
import DonationCamps from "./pages/Camps/DonationCamps";
import BloodCompatibility from "./pages/Compatibility/BloodCompatibility";
import BloodStockAvailability from "./pages/PublicStock/BloodStockAvailability";
import EligibilityCheckPage from "./pages/Eligibility/EligibilityCheckPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public RaktaSetu / BloodDonor Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Education, Citizen Stock & Community Drives */}
        <Route path="/donation-camps" element={<DonationCamps />} />
        <Route path="/blood-compatibility" element={<BloodCompatibility />} />
        <Route path="/blood-stock" element={<BloodStockAvailability />} />
        <Route path="/eligibility-check" element={<EligibilityCheckPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />

        {/* Core Management & Emergency SOS (Hospital / Org / Admin) */}
        <Route
          path="/emergency-donors"
          element={
            <ProtectedRoute>
              <EmergencyDonors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Role Specific Routes */}
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-profile"
          element={
            <ProtectedRoute>
              <DonorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgnaisation"
          element={<OrganisationPage />}
        />
        <Route
          path="/organisation"
          element={<OrganisationPage />}
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
