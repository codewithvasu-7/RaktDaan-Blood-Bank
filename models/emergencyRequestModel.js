const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient/Case name is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    hospitalPhone: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    },
    unitsRequired: {
      type: Number,
      default: 1,
    },
    urgency: {
      type: String,
      enum: ["Critical", "Urgent", "Standard"],
      default: "Critical",
    },
    accidentLocation: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["OPEN", "FULFILLED", "CLOSED"],
      default: "OPEN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyRequest", emergencyRequestSchema);
