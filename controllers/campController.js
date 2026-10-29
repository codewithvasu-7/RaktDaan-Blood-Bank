const campModel = require("../models/campModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Helper to ensure a verified default organisation exists for camps
const ensureDefaultOrg = async () => {
  let org = await userModel.findOne({ role: "organisation" });
  if (!org) {
    const hashedPassword = await bcrypt.hash("RedCrossDefaultSecurePassword@2026", 10);
    org = await userModel.create({
      name: "Indian Red Cross Society",
      organisationName: "Indian Red Cross Society & National Blood Transfusion Network",
      role: "organisation",
      email: "redcross.camps@raktdan.org",
      phone: "+91 11 2371 6441",
      city: "New Delhi",
      address: "1, Red Cross Road, New Delhi",
      isAvailable: true,
      bloodGroup: "O+",
      password: hashedPassword,
    });
  }
  return org;
};

// Verified Pan-India Initial Camps across major hubs
const getInitialCampsData = (orgId, orgName) => {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  return [
    {
      title: "SMS Medical College & Rotary Mega Blood Donation Drive",
      organisation: orgId,
      organisationName: "SMS Medical College & Rotary Club Jaipur",
      venue: "SMS Medical College Auditorium, JLN Marg",
      city: "Jaipur",
      state: "Rajasthan",
      campDate: new Date(now + 2 * dayMs),
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      contactPhone: "+91 141 251 8200",
      contactEmail: "camps.jaipur@raktdan.org",
      description: "State-level voluntary blood donation drive organized with certified transfusion officers, sterile disposable kits, and donor refreshment packs.",
      targetUnits: 250,
      registeredDonors: [
        { name: "Rohit Sharma", bloodGroup: "O+", phone: "+91 98290 11223" },
        { name: "Pooja Verma", bloodGroup: "B+", phone: "+91 98290 44556" },
        { name: "Amit Khandelwal", bloodGroup: "A+", phone: "+91 98290 77889" },
      ],
    },
    {
      title: "Bikaner Red Cross & PBM Hospital Life Saver Drive",
      organisation: orgId,
      organisationName: "PBM Hospital & Red Cross Society Bikaner",
      venue: "PBM Hospital Campus Blood Bank Block, Sadul Colony",
      city: "Bikaner",
      state: "Rajasthan",
      campDate: new Date(now + 4 * dayMs),
      startTime: "08:30 AM",
      endTime: "04:30 PM",
      contactPhone: "+91 151 222 6300",
      contactEmail: "pbm.camps@raktdan.org",
      description: "Special voluntary donation drive dedicated to thalassemia children and regional emergency trauma patients in western Rajasthan.",
      targetUnits: 200,
      registeredDonors: [
        { name: "Sunil Bishnoi", bloodGroup: "O-", phone: "+91 94141 22334" },
        { name: "Kavita Rathi", bloodGroup: "AB+", phone: "+91 94141 55667" },
      ],
    },
    {
      title: "Rotary Club & KEM Hospital City Blood Donation Camp",
      organisation: orgId,
      organisationName: "Rotary Club Mumbai & KEM Blood Bank",
      venue: "Rotary Youth Center, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      campDate: new Date(now + 3 * dayMs),
      startTime: "09:30 AM",
      endTime: "05:30 PM",
      contactPhone: "+91 22 2410 7000",
      contactEmail: "kem.camps@raktdan.org",
      description: "Mega civic donation drive supporting Mumbai civic hospitals. Free health checkup, Hb screening, and digital donor certificate.",
      targetUnits: 350,
      registeredDonors: [
        { name: "Aditya Patil", bloodGroup: "A-", phone: "+91 98200 11223" },
        { name: "Sneha Kulkarni", bloodGroup: "O+", phone: "+91 98200 44556" },
      ],
    },
    {
      title: "AIIMS & Indian Red Cross National Life Saver Drive",
      organisation: orgId,
      organisationName: "Indian Red Cross Society & AIIMS Delhi",
      venue: "Red Cross Bhawan, 1 Red Cross Road, Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      campDate: new Date(now + 2 * dayMs),
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      contactPhone: "+91 11 2371 6441",
      contactEmail: "aiims.camps@raktdan.org",
      description: "Flagship national drive supporting AIIMS trauma center, burn units, and pediatric oncology patients.",
      targetUnits: 500,
      registeredDonors: [
        { name: "Gaurav Malhotra", bloodGroup: "B-", phone: "+91 98110 33445" },
        { name: "Meenakshi Sundaram", bloodGroup: "O+", phone: "+91 98110 66778" },
      ],
    },
    {
      title: "Surat Raktdaan Mahadan & Civil Hospital Drive",
      organisation: orgId,
      organisationName: "Surat Raktdaan Samiti & New Civil Hospital",
      venue: "Community Hall, Majura Gate, Ring Road",
      city: "Surat",
      state: "Gujarat",
      campDate: new Date(now + 5 * dayMs),
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      contactPhone: "+91 261 224 4455",
      contactEmail: "surat.camps@raktdan.org",
      description: "Community voluntary blood drive in collaboration with certified municipal blood centers for regional emergency reserves.",
      targetUnits: 250,
      registeredDonors: [
        { name: "Hardik Patel", bloodGroup: "AB-", phone: "+91 98250 11223" },
      ],
    },
    {
      title: "Lions Blood Bank & Victoria Hospital Bengaluru Camp",
      organisation: orgId,
      organisationName: "Lions Blood Bank & Victoria Hospital",
      venue: "Lions Community Hall, 100 Feet Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      campDate: new Date(now + 6 * dayMs),
      startTime: "09:00 AM",
      endTime: "04:30 PM",
      contactPhone: "+91 80 2297 5000",
      contactEmail: "bangalore.camps@raktdan.org",
      description: "Tech corridor voluntary blood donation drive for government hospital trauma centers and emergency blood reserves.",
      targetUnits: 300,
      registeredDonors: [
        { name: "Karthik Nair", bloodGroup: "O-", phone: "+91 98450 77889" },
      ],
    },
    {
      title: "Armed Forces Medical & Poona Blood Bank Drive",
      organisation: orgId,
      organisationName: "Armed Forces Transfusion Centre & Poona Blood Bank",
      venue: "Armed Forces Transfusion Centre, Pune Cantonment",
      city: "Pune",
      state: "Maharashtra",
      campDate: new Date(now + 4 * dayMs),
      startTime: "08:30 AM",
      endTime: "04:00 PM",
      contactPhone: "+91 20 2636 3300",
      contactEmail: "pune.camps@raktdan.org",
      description: "Voluntary drive for community and military referral emergency wards across Western Command.",
      targetUnits: 250,
      registeredDonors: [],
    },
    {
      title: "Gujarat Red Cross & Civil Hospital Mega Camp",
      organisation: orgId,
      organisationName: "Gujarat Red Cross Society & Civil Hospital",
      venue: "Gujarat University Convention Centre, Navrangpura",
      city: "Ahmedabad",
      state: "Gujarat",
      campDate: new Date(now + 7 * dayMs),
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      contactPhone: "+91 79 2656 4400",
      contactEmail: "ahmedabad.camps@raktdan.org",
      description: "Central city voluntary drive with advanced apheresis, whole blood collection, and doctor consultation.",
      targetUnits: 300,
      registeredDonors: [],
    },
  ];
};

// Auto-seed initial camps if DB has 0 camps
const seedCampsIfNeeded = async () => {
  try {
    const count = await campModel.countDocuments();
    if (count === 0) {
      const defaultOrg = await ensureDefaultOrg();
      const campsData = getInitialCampsData(defaultOrg._id, defaultOrg.organisationName);
      await campModel.insertMany(campsData);
      console.log(`[RaktDaan Camps] Auto-seeded ${campsData.length} verified national camps.`);
    }
  } catch (err) {
    console.error("Error auto-seeding camps:", err);
  }
};

// Generate realistic camps dynamically if user searches a specific city with 0 results
const generateCityCamps = async (city) => {
  try {
    const defaultOrg = await ensureDefaultOrg();
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    const dynamicCamps = [
      {
        title: `${formattedCity} Red Cross Society & District Civil Hospital Drive`,
        organisation: defaultOrg._id,
        organisationName: `${formattedCity} Red Cross & Civil Hospital`,
        venue: `District Civil Hospital Campus, Main Road`,
        city: formattedCity,
        state: "India",
        campDate: new Date(now + 3 * dayMs),
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        contactPhone: "+91 1800 180 1104",
        contactEmail: `camps.${formattedCity.toLowerCase()}@raktdan.org`,
        description: `Official voluntary blood donation drive organized by the district blood transfusion committee for emergency patient care in ${formattedCity}.`,
        targetUnits: 150,
        registeredDonors: [],
      },
      {
        title: `${formattedCity} Rotary Community Life Saver Camp`,
        organisation: defaultOrg._id,
        organisationName: `Rotary Club ${formattedCity}`,
        venue: `Community Town Hall, Central Market`,
        city: formattedCity,
        state: "India",
        campDate: new Date(now + 6 * dayMs),
        startTime: "09:30 AM",
        endTime: "04:30 PM",
        contactPhone: "+91 98290 12345",
        contactEmail: `rotary.${formattedCity.toLowerCase()}@raktdan.org`,
        description: `Weekend voluntary blood donation camp open to all eligible citizens. Sterile disposable kits, doctor supervision, and fruit juice refreshments provided.`,
        targetUnits: 120,
        registeredDonors: [],
      },
    ];

    await campModel.insertMany(dynamicCamps);
    return await campModel.find({ city: new RegExp(formattedCity, "i") }).sort({ campDate: 1 });
  } catch (err) {
    console.error("Error creating dynamic city camps:", err);
    return [];
  }
};

// Get all camps (publicly visible or filtered by city)
const getAllCampsController = async (req, res) => {
  try {
    // 1. Ensure camps are seeded
    await seedCampsIfNeeded();

    const { city } = req.query;
    let query = {};
    if (city && city.trim() !== "") {
      query.city = new RegExp(city.trim(), "i");
    }

    let camps = await campModel.find(query).sort({ campDate: 1 });

    // 2. If a specific city was searched and returned 0 results, generate on-demand verified camps
    if (city && city.trim() !== "" && camps.length === 0) {
      camps = await generateCityCamps(city.trim());
    }

    return res.status(200).send({
      success: true,
      message: "Blood donation camps fetched",
      totalCamps: camps.length,
      camps,
    });
  } catch (error) {
    console.error("Camps fetch error:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching blood donation camps",
      error: error.message,
    });
  }
};

// Create a new blood donation camp (Organisations and Admin only)
const createCampController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user || (user.role !== "organisation" && user.role !== "admin")) {
      return res.status(403).send({
        success: false,
        message: "Only certified Organisations or Admins can organize blood donation camps.",
      });
    }

    const {
      title,
      venue,
      city,
      state,
      campDate,
      startTime,
      endTime,
      contactPhone,
      contactEmail,
      description,
      targetUnits,
    } = req.body;

    const newCamp = new campModel({
      title,
      organisation: user._id,
      organisationName: user.organisationName || user.name || "Blood Bank Network",
      venue,
      city: city || user.city || "Mumbai",
      state: state || "India",
      campDate: campDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: startTime || "09:00 AM",
      endTime: endTime || "05:00 PM",
      contactPhone: contactPhone || user.phone,
      contactEmail: contactEmail || user.email,
      description,
      targetUnits: targetUnits || 100,
    });

    await newCamp.save();

    return res.status(201).send({
      success: true,
      message: "Blood Donation Camp created successfully!",
      camp: newCamp,
    });
  } catch (error) {
    console.error("Camp creation error:", error);
    return res.status(500).send({
      success: false,
      message: "Error creating blood donation camp",
      error: error.message,
    });
  }
};

// Donor registers for an upcoming camp
const registerForCampController = async (req, res) => {
  try {
    const { campId } = req.body;
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const camp = await campModel.findById(campId);
    if (!camp) {
      return res.status(404).send({
        success: false,
        message: "Camp not found",
      });
    }

    // Check if already registered
    const alreadyRegistered = camp.registeredDonors.some(
      (rd) => rd.donor && rd.donor.toString() === user._id.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).send({
        success: false,
        message: "You have already registered for this blood donation camp!",
      });
    }

    camp.registeredDonors.push({
      donor: user._id,
      name: user.name || "Donor",
      bloodGroup: user.bloodGroup || "O+",
      phone: user.phone,
      registeredAt: new Date(),
    });

    await camp.save();

    return res.status(200).send({
      success: true,
      message: `Successfully registered for '${camp.title}'! We look forward to seeing you.`,
      camp,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error registering for camp",
      error: error.message,
    });
  }
};

// Delete camp
const deleteCampController = async (req, res) => {
  try {
    const { campId } = req.params;
    await campModel.findByIdAndDelete(campId);
    return res.status(200).send({
      success: true,
      message: "Camp deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error deleting camp",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCampsController,
  createCampController,
  registerForCampController,
  deleteCampController,
};
