import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      // store token
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        let redirectPath = "/dashboard";
        if (data.user?.role === "hospital") {
          redirectPath = "/emergency-donors";
        } else if (data.user?.role === "donar") {
          redirectPath = "/donor-profile";
        } else if (data.user?.role === "admin") {
          redirectPath = "/admin";
        }
        window.location.replace(redirectPath);
      }
      return data;
    } catch (error) {
      const msg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message || "Login Failed";
      alert(msg);
      return rejectWithValue(msg);
    }
  }
);

// register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
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
      pincode,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
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
        pincode,
      });
      if (data?.success) {
        alert("User Registered Successfully! Please log in.");
        window.location.replace("/login");
      }
      return data;
    } catch (error) {
      console.log(error);
      const msg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message || "Registration Failed";
      alert(msg);
      return rejectWithValue(msg);
    }
  }
);

// current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
