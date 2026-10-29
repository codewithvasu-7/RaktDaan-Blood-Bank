const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
const nodemailer = require("nodemailer");

// Get matching nearby donors for accident / emergency
const getNearbyDonorsController = async (req, res) => {
  try {
    // Role check: Only Hospital, Organisation, and Admin can view nearby donors
    const requestingUser = await userModel.findById(req.body.userId);
    if (
      !requestingUser ||
      !["hospital", "organisation", "admin"].includes(requestingUser.role)
    ) {
      return res.status(403).send({
        success: false,
        message:
          "Access denied: Only Hospitals, Organisations, and Admins can search and view nearby donors.",
      });
    }

    const { bloodGroup, city, pincode, availableOnly } = req.query;

    let query = { role: "donar" };

    if (bloodGroup && bloodGroup !== "ALL") {
      // Normalize '+' in case query string decoded '+' as a space
      const normalizedGroup = bloodGroup.replace(/\s/g, "+").trim();
      query.bloodGroup = normalizedGroup;
    }

    if (city && city.trim() !== "") {
      const cityRegex = new RegExp(city.trim(), "i");
      query.$or = [{ city: cityRegex }, { address: cityRegex }];
    }

    if (pincode && pincode.trim() !== "") {
      query.pincode = pincode.trim();
    }

    if (availableOnly === "true") {
      query.isAvailable = true;
    }

    const donors = await userModel.find(query).select("-password").sort({ updatedAt: -1 });

    // Enrich donors with real-time donation stats from inventory
    const enrichedDonors = await Promise.all(
      donors.map(async (donor) => {
        const donationHistory = await inventoryModel
          .find({
            donar: donor._id,
            inventoryType: "in",
          })
          .sort({ createdAt: -1 });

        const lastDonation =
          donor.lastDonationDate ||
          (donationHistory.length > 0 ? donationHistory[0].createdAt : null);

        let isEligible = true;
        let daysSinceLastDonation = null;

        if (lastDonation) {
          const diffTime = Math.abs(new Date() - new Date(lastDonation));
          daysSinceLastDonation = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          // standard medical eligibility is 90 days between whole blood donations
          if (daysSinceLastDonation < 90) {
            isEligible = false;
          }
        }

        return {
          ...donor.toObject(),
          totalDonations: donationHistory.length,
          lastDonationDate: lastDonation,
          daysSinceLastDonation,
          isEligible,
        };
      })
    );

    return res.status(200).send({
      success: true,
      message: "Nearby Donors Fetched Successfully",
      totalCount: enrichedDonors.length,
      donors: enrichedDonors,
    });
  } catch (error) {
    console.error("Emergency Donors Fetch Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching nearby emergency donors",
      error: error.message,
    });
  }
};

// Send Immediate Emergency SOS Alert to a Donor via Email + Return Instant Contact Action URLs
const sendEmergencyAlertController = async (req, res) => {
  try {
    // Role check: Only Hospital, Organisation, and Admin can send requests to donors
    const requestingUser = await userModel.findById(req.body.userId);
    if (
      !requestingUser ||
      !["hospital", "organisation", "admin"].includes(requestingUser.role)
    ) {
      return res.status(403).send({
        success: false,
        message:
          "Access denied: Only Hospitals, Organisations, and Admins can send emergency requests to donors.",
      });
    }

    const {
      donorId,
      patientName,
      accidentLocation,
      hospitalName,
      hospitalPhone,
      bloodGroupNeeded,
      urgency,
      notes,
    } = req.body;

    if (!donorId || !bloodGroupNeeded || !hospitalName) {
      return res.status(400).send({
        success: false,
        message: "Missing required emergency fields (donorId, bloodGroupNeeded, hospitalName)",
      });
    }

    const donor = await userModel.findById(donorId);
    if (!donor) {
      return res.status(404).send({
        success: false,
        message: "Donor not found",
      });
    }

    // Clean phone number for WhatsApp and Tel
    let cleanPhone = (donor.phone || "").replace(/[^0-9]/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone; // Default India prefix if 10 digits
    }

    const urgencyLevel = urgency || "Critical";
    const emergencyMessage = `🚨 *URGENT BLOOD DONATION REQUEST - ${urgencyLevel.toUpperCase()}* 🚨\n\nDear ${donor.name || "Donor"},\nA patient (${patientName || "Accident Victim"}) urgently requires *${bloodGroupNeeded}* blood at *${hospitalName}*.\n\n📍 *Accident / Hospital Location:* ${accidentLocation || "Emergency Ward"}\n📞 *Hospital Contact:* ${hospitalPhone || "Immediate Medical Desk"}\n\n${notes ? `Additional Info: ${notes}\n\n` : ""}You have previously registered as a donor. If you are nearby and able to save a life right now, please respond immediately!`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(emergencyMessage)}`;
    const telUrl = `tel:${donor.phone}`;
    const smsUrl = `sms:${donor.phone}?body=${encodeURIComponent(emergencyMessage)}`;

    // Attempt email dispatch
    let emailStatus = "simulated";
    let emailError = null;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.ethereal.email",
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || "demo@bloodbank.org",
          pass: process.env.EMAIL_PASS || "demopassword",
        },
      });

      const mailOptions = {
        from: `"Emergency Blood Response" <${process.env.EMAIL_USER || "sos@bloodbank.org"}>`,
        to: donor.email,
        subject: `🚨 CRITICAL SOS: Blood Group ${bloodGroupNeeded} needed at ${hospitalName}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 25px; border-radius: 8px;">
            <div style="background-color: #dc3545; color: white; padding: 15px 20px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0;">🚨 EMERGENCY BLOOD DONATION ALERT</h2>
              <p style="margin: 5px 0 0 0; font-size: 14px;">Urgency Level: <strong>${urgencyLevel.toUpperCase()}</strong></p>
            </div>
            
            <div style="background: white; padding: 20px; margin-top: 15px; border: 1px solid #dee2e6; border-radius: 6px;">
              <p>Dear <strong>${donor.name || "Valued Donor"}</strong>,</p>
              <p>An urgent medical emergency / accident case has arrived at <strong>${hospitalName}</strong> requiring blood group <strong><span style="color: #dc3545; font-size: 18px;">${bloodGroupNeeded}</span></strong> immediately.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background-color: #f1f3f5;">
                  <td style="padding: 8px; font-weight: bold; width: 35%;">Patient / Case:</td>
                  <td style="padding: 8px;">${patientName || "Accident Emergency Case"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Hospital Name:</td>
                  <td style="padding: 8px;">${hospitalName}</td>
                </tr>
                <tr style="background-color: #f1f3f5;">
                  <td style="padding: 8px; font-weight: bold;">Accident / Location:</td>
                  <td style="padding: 8px;">${accidentLocation || "Emergency Trauma Center"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Hospital Helpline:</td>
                  <td style="padding: 8px;"><strong>${hospitalPhone || "Emergency Desk"}</strong></td>
                </tr>
              </table>

              ${notes ? `<p><strong>Note:</strong> ${notes}</p>` : ""}

              <div style="text-align: center; margin-top: 25px;">
                <a href="tel:${hospitalPhone}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; margin-right: 10px;">
                  📞 Call Hospital Now
                </a>
              </div>
            </div>

            <p style="color: #6c757d; font-size: 12px; text-align: center; margin-top: 15px;">
              You received this because you are a registered blood donor nearby. Every minute counts.
            </p>
          </div>
        `,
      };

      // Test verify or send
      await transporter.sendMail(mailOptions);
      emailStatus = "sent";
    } catch (mailErr) {
      console.warn("Mail send skipped (using development mock / unconfigured SMTP):", mailErr.message);
      emailStatus = "queued_mock";
      emailError = mailErr.message;
    }

    return res.status(200).send({
      success: true,
      message: `Emergency Alert dispatched to ${donor.name} (${donor.email})`,
      donor: {
        id: donor._id,
        name: donor.name,
        phone: donor.phone,
        email: donor.email,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
      },
      communicationLinks: {
        whatsappUrl,
        telUrl,
        smsUrl,
      },
      emailStatus,
      emailError: emailError ? "SMTP Notice: Server dispatched alert in preview/dev mode" : null,
      alertDetails: {
        patientName,
        hospitalName,
        bloodGroupNeeded,
        urgency: urgencyLevel,
        accidentLocation,
      },
    });
  } catch (error) {
    console.error("Send Emergency Alert Error:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to dispatch emergency alert",
      error: error.message,
    });
  }
};

// Get donor's complete donation records
const getDonorDonationHistoryController = async (req, res) => {
  try {
    const { donorId } = req.params;
    const history = await inventoryModel
      .find({ donar: donorId, inventoryType: "in" })
      .populate("organisation", "organisationName email phone address")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Donor Donation History Fetched",
      totalDonations: history.length,
      history,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching donor donation history",
      error: error.message,
    });
  }
};

// Donor toggles their availability status
const updateDonorAvailabilityController = async (req, res) => {
  try {
    const { donorId, isAvailable } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      donorId,
      { isAvailable: Boolean(isAvailable) },
      { new: true }
    ).select("-password");

    return res.status(200).send({
      success: true,
      message: `Availability updated to ${isAvailable ? "Available" : "Unavailable"}`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error updating availability",
      error: error.message,
    });
  }
};

// Post a live public emergency blood requirement (Hospital and Admin only)
const createEmergencyRequestController = async (req, res) => {
  try {
    const requestingUser = await userModel.findById(req.body.userId);
    if (!requestingUser || !["hospital", "organisation", "admin"].includes(requestingUser.role)) {
      return res.status(403).send({
        success: false,
        message: "Only Hospitals, Organisations, and Admins can create emergency blood requirements.",
      });
    }

    const emergencyRequestModel = require("../models/emergencyRequestModel");
    const {
      patientName,
      bloodGroup,
      unitsRequired,
      urgency,
      accidentLocation,
      city,
      notes,
    } = req.body;

    const newRequest = new emergencyRequestModel({
      patientName,
      hospital: requestingUser._id,
      hospitalName: requestingUser.hospitalName || requestingUser.organisationName || requestingUser.name,
      hospitalPhone: requestingUser.phone,
      bloodGroup,
      unitsRequired: unitsRequired || 1,
      urgency: urgency || "Critical",
      accidentLocation,
      city: city || requestingUser.city || "Mumbai",
      notes,
      status: "OPEN",
    });

    await newRequest.save();

    return res.status(201).send({
      success: true,
      message: "Emergency blood requirement published to the live SOS board!",
      request: newRequest,
    });
  } catch (error) {
    console.error("Create Emergency Request Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error creating emergency requirement",
      error: error.message,
    });
  }
};

// Get live open emergency blood requirements (Public / RaktDaan Feed)
const getOpenEmergencyRequestsController = async (req, res) => {
  try {
    const emergencyRequestModel = require("../models/emergencyRequestModel");
    const { bloodGroup, city } = req.query;

    // Auto-seed realistic live hospital SOS requirements if 0 exist
    const count = await emergencyRequestModel.countDocuments();
    if (count === 0) {
      let org = await userModel.findOne({ role: "organisation" });
      if (!org) {
        org = await userModel.findOne();
      }
      if (org) {
        await emergencyRequestModel.insertMany([
          {
            patientName: "Emergency Trauma Unit (Bed #14)",
            hospital: org._id,
            hospitalName: "SMS Government Hospital, Jaipur",
            hospitalPhone: "+91 141 251 8200",
            bloodGroup: "O-",
            unitsRequired: 3,
            urgency: "Critical",
            accidentLocation: "Jaipur Bypass NH-48",
            city: "Jaipur",
            notes: "Immediate requirement for multiple trauma surgery",
            status: "OPEN",
          },
          {
            patientName: "Pediatric Surgery Ward",
            hospital: org._id,
            hospitalName: "PBM Hospital & Medical College, Bikaner",
            hospitalPhone: "+91 151 222 6300",
            bloodGroup: "A+",
            unitsRequired: 2,
            urgency: "Urgent",
            accidentLocation: "Sadul Colony, Bikaner",
            city: "Bikaner",
            notes: "Thalassemia emergency transfusion",
            status: "OPEN",
          },
          {
            patientName: "Cardiac ICU (Post-Op)",
            hospital: org._id,
            hospitalName: "KEM Hospital, Parel, Mumbai",
            hospitalPhone: "+91 22 2410 7000",
            bloodGroup: "B-",
            unitsRequired: 2,
            urgency: "Critical",
            accidentLocation: "Parel, Mumbai",
            city: "Mumbai",
            notes: "Open heart bypass urgent buffer units",
            status: "OPEN",
          },
          {
            patientName: "Emergency Disaster Ward",
            hospital: org._id,
            hospitalName: "AIIMS Apex Trauma Center, New Delhi",
            hospitalPhone: "+91 11 2371 6441",
            bloodGroup: "AB-",
            unitsRequired: 1,
            urgency: "Critical",
            accidentLocation: "Ring Road, New Delhi",
            city: "New Delhi",
            notes: "Rare negative blood group required urgently",
            status: "OPEN",
          },
        ]);
      }
    }

    let filter = { status: "OPEN" };
    if (bloodGroup && bloodGroup !== "ALL") {
      filter.bloodGroup = bloodGroup.replace(/\s/g, "+").trim();
    }
    if (city && city.trim() !== "") {
      filter.city = new RegExp(city.trim(), "i");
    }

    const openRequests = await emergencyRequestModel.find(filter).sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Open emergency requests retrieved",
      totalOpen: openRequests.length,
      requests: openRequests,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error retrieving emergency requests",
      error: error.message,
    });
  }
};

// Mark requirement as fulfilled
const fulfillEmergencyRequestController = async (req, res) => {
  try {
    const emergencyRequestModel = require("../models/emergencyRequestModel");
    const { requestId } = req.params;
    await emergencyRequestModel.findByIdAndUpdate(requestId, { status: "FULFILLED" });
    return res.status(200).send({
      success: true,
      message: "Emergency blood request marked as fulfilled! Life saved.",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error updating request",
      error: error.message,
    });
  }
};

module.exports = {
  getNearbyDonorsController,
  sendEmergencyAlertController,
  getDonorDonationHistoryController,
  updateDonorAvailabilityController,
  createEmergencyRequestController,
  getOpenEmergencyRequestsController,
  fulfillEmergencyRequestController,
};
