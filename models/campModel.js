const mongoose = require("mongoose");

const campSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Camp title is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    organisationName: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      default: "India",
    },
    campDate: {
      type: Date,
      required: [true, "Camp date is required"],
    },
    startTime: {
      type: String,
      default: "09:00 AM",
    },
    endTime: {
      type: String,
      default: "05:00 PM",
    },
    contactPhone: {
      type: String,
      required: [true, "Contact phone is required"],
    },
    contactEmail: {
      type: String,
    },
    description: {
      type: String,
      default: "Voluntary Blood Donation Drive organized to help local hospitals and critical trauma patients.",
    },
    targetUnits: {
      type: Number,
      default: 100,
    },
    registeredDonors: [
      {
        donor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        name: String,
        bloodGroup: String,
        phone: String,
        registeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Camp", campSchema);
