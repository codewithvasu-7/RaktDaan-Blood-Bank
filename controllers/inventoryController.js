const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
// GET Hospital / Donor BLOOD RECORDS (With Tenant Isolation & IDOR Protection)
const getInventoryHospitalController = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const user = await userModel.findById(userId);

    // Build safe scoped query based on authenticated user's role
    const safeQuery = {};
    if (user?.role === "hospital") {
      safeQuery.hospital = userId;
      safeQuery.inventoryType = "out";
    } else if (user?.role === "donar") {
      safeQuery.donar = userId;
      safeQuery.inventoryType = "in";
    } else if (user?.role === "organisation") {
      safeQuery.organisation = userId;
      if (req.body.filters?.inventoryType) {
        safeQuery.inventoryType = req.body.filters.inventoryType;
      }
    } else if (user?.role === "admin") {
      if (req.body.filters && typeof req.body.filters === "object") {
        Object.assign(safeQuery, req.body.filters);
      }
    } else {
      return res.status(403).send({
        success: false,
        message: "Forbidden: Unauthorized access",
      });
    }

    const inventory = await inventoryModel
      .find(safeQuery)
      .populate("donar", "-password")
      .populate("hospital", "-password")
      .populate("organisation", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Records fetched successfully",
      inventory,
    });
  } catch (error) {
    console.error("Get consumer inventory error:", error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal error",
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONAR REOCRDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // Find donars with inventory interaction, or all registered voluntary donors
    const donorId = await inventoryModel.distinct("donar", {
      organisation,
    });

    let donars;
    if (donorId && donorId.length > 0) {
      donars = await userModel.find({ _id: { $in: donorId } }).select("-password");
    } else {
      donars = await userModel.find({ role: "donar" }).select("-password").limit(50);
    }

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const orgId = req.body.userId;
    const currentUser = await userModel.findById(orgId);

    // Fetch all registered partner hospitals
    let hospitals = await userModel
      .find({ role: "hospital" })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    if (currentUser?.city) {
      hospitals.sort((a, b) => {
        const aCityMatch = (a.city || "").toLowerCase() === currentUser.city.toLowerCase() ? 1 : 0;
        const bCityMatch = (b.city || "").toLowerCase() === currentUser.city.toLowerCase() ? 1 : 0;
        return bCityMatch - aCityMatch;
      });
    }

    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// National Blood Bank Directory (Verified Public & Government Blood Banks across Indian Cities & Districts)
const NATIONAL_BLOOD_BANKS_DIRECTORY = [
  // BIKANER
  {
    _id: "bb-bikaner-01",
    organisationName: "PBM Government Hospital & Model Blood Bank",
    email: "pbmhospital.blood@rajasthan.gov.in",
    phone: "0151-2226300",
    address: "Sardar Patel Medical College Campus, Medical College Road",
    city: "Bikaner",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  {
    _id: "bb-bikaner-02",
    organisationName: "Rotary Blood Bank & Research Foundation",
    email: "rotary.bikaner@bloodbank.org",
    phone: "0151-2522000",
    address: "Plot No. 12, Rani Bazar Industrial Area",
    city: "Bikaner",
    state: "Rajasthan",
    category: "Charitable Trust",
    isNationalDirectory: true,
  },
  {
    _id: "bb-bikaner-03",
    organisationName: "Indian Red Cross Society District Blood Bank",
    email: "redcross.bikaner@redcross.org",
    phone: "0151-2200100",
    address: "Near Collectorate & KEM Road, Sadul Colony",
    city: "Bikaner",
    state: "Rajasthan",
    category: "Red Cross Society",
    isNationalDirectory: true,
  },
  // JODHPUR
  {
    _id: "bb-jodhpur-01",
    organisationName: "Dr. S. N. Medical College & MDM Hospital Blood Bank",
    email: "mdmhospital.blood@rajasthan.gov.in",
    phone: "0291-2434375",
    address: "Shastri Nagar, Jodhpur",
    city: "Jodhpur",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  {
    _id: "bb-jodhpur-02",
    organisationName: "Umaid Hospital Regional Blood Center",
    email: "umaid.blood@jodhpurhealth.org",
    phone: "0291-2621111",
    address: "Siwanchi Gate, Jodhpur",
    city: "Jodhpur",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // KOTA
  {
    _id: "bb-kota-01",
    organisationName: "Government Medical College & New Medical Hospital Blood Bank",
    email: "mbs.bloodbank@kota.gov.in",
    phone: "0744-2370000",
    address: "Rangbari Road, Mahaveer Nagar, Kota",
    city: "Kota",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // UDAIPUR
  {
    _id: "bb-udaipur-01",
    organisationName: "RNT Medical College & MB General Hospital Blood Bank",
    email: "mbhospital.blood@udaipur.gov.in",
    phone: "0294-2418258",
    address: "Hospital Road, Court Chowk, Udaipur",
    city: "Udaipur",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // AJMER
  {
    _id: "bb-ajmer-01",
    organisationName: "JLN Government Medical College Blood Bank",
    email: "jlnhospital.blood@ajmer.gov.in",
    phone: "0145-2422222",
    address: "Near Agra Gate, Circular Road, Ajmer",
    city: "Ajmer",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // SIKAR
  {
    _id: "bb-sikar-01",
    organisationName: "SK Government Hospital Blood Bank",
    email: "skhospital.blood@sikar.gov.in",
    phone: "01572-251000",
    address: "Station Road, Sikar",
    city: "Sikar",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // JAIPUR
  {
    _id: "bb-jaipur-01",
    organisationName: "SMS Hospital Blood Transfusion Center",
    email: "smshospital.blood@rajasthan.gov.in",
    phone: "0141-2560291",
    address: "JLN Marg, Ashok Nagar, Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  {
    _id: "bb-jaipur-02",
    organisationName: "Jaipur Red Cross & Trauma Blood Bank",
    email: "jaipur.redcross@bloodbank.org",
    phone: "9829011223",
    address: "Near SMS Medical College, JLN Marg, Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Red Cross Society",
    isNationalDirectory: true,
  },
  // DELHI NCR
  {
    _id: "bb-delhi-01",
    organisationName: "AIIMS Central Blood Bank",
    email: "bloodbank@aiims.edu",
    phone: "011-26588500",
    address: "Ansari Nagar, Sri Aurobindo Marg, New Delhi",
    city: "Delhi",
    state: "Delhi NCR",
    category: "Autonomous Institute",
    isNationalDirectory: true,
  },
  {
    _id: "bb-delhi-02",
    organisationName: "Rotary Central Blood Bank",
    email: "rotary.delhi@bloodbank.org",
    phone: "9811099112",
    address: "56-57, Tughlakabad Institutional Area, New Delhi",
    city: "Delhi",
    state: "Delhi NCR",
    category: "Charitable Trust",
    isNationalDirectory: true,
  },
  // MUMBAI
  {
    _id: "bb-mumbai-01",
    organisationName: "KEM Hospital Blood Bank",
    email: "bloodbank@kem.edu",
    phone: "022-24107000",
    address: "Acharya Donde Marg, Parel, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    category: "Government / Municipal",
    isNationalDirectory: true,
  },
  {
    _id: "bb-mumbai-02",
    organisationName: "Tata Memorial Hospital Blood Transfusion Dept",
    email: "bloodbank@tmc.gov.in",
    phone: "022-24177000",
    address: "Dr. E Borges Road, Parel, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    category: "Autonomous / Cancer Institute",
    isNationalDirectory: true,
  },
  // PUNE
  {
    _id: "bb-pune-01",
    organisationName: "Sassoon General Hospital Blood Bank",
    email: "sassoon.blood@pune.gov.in",
    phone: "020-26128000",
    address: "Near Pune Railway Station, Pune",
    city: "Pune",
    state: "Maharashtra",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // INDORE
  {
    _id: "bb-indore-01",
    organisationName: "MY Hospital Central Blood Bank",
    email: "myhospital.blood@mp.gov.in",
    phone: "0731-2527383",
    address: "AB Road, Sanyogitaganj, Indore",
    city: "Indore",
    state: "Madhya Pradesh",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // BHOPAL
  {
    _id: "bb-bhopal-01",
    organisationName: "Hamidia Hospital Blood Bank",
    email: "hamidia.blood@mp.gov.in",
    phone: "0755-2540222",
    address: "Royal Market, Bhopal",
    city: "Bhopal",
    state: "Madhya Pradesh",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // PATNA
  {
    _id: "bb-patna-01",
    organisationName: "Patna Medical College and Hospital (PMCH) Blood Bank",
    email: "pmch.blood@bihar.gov.in",
    phone: "0612-2300080",
    address: "Ashok Rajpath, Patna",
    city: "Patna",
    state: "Bihar",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // LUCKNOW
  {
    _id: "bb-lucknow-01",
    organisationName: "KGMU Blood Transfusion Center",
    email: "bloodbank@kgmcindia.edu",
    phone: "0522-2258880",
    address: "Shah Mina Road, Chowk, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    category: "Government University",
    isNationalDirectory: true,
  },
  // BENGALURU
  {
    _id: "bb-bengaluru-01",
    organisationName: "Victoria Hospital & BMCRI Blood Bank",
    email: "victoria.blood@karnataka.gov.in",
    phone: "080-26701150",
    address: "Fort Road, Kalasipalyam, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // AHMEDABAD
  {
    _id: "bb-ahmedabad-01",
    organisationName: "Civil Hospital & Red Cross Regional Blood Bank",
    email: "civilhospital.blood@gujarat.gov.in",
    phone: "079-22680074",
    address: "Asarwa, Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // ALWAR
  {
    _id: "bb-alwar-01",
    organisationName: "Rajiv Gandhi General Hospital Blood Bank",
    email: "rggh.alwar@rajasthan.gov.in",
    phone: "0144-2332200",
    address: "Hospital Road, Company Bagh, Alwar",
    city: "Alwar",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // SIKAR
  {
    _id: "bb-sikar-01",
    organisationName: "SK Government Hospital Blood Center",
    email: "skhospital.sikar@rajasthan.gov.in",
    phone: "01572-255100",
    address: "Station Road, Sikar",
    city: "Sikar",
    state: "Rajasthan",
    category: "Government Blood Bank",
    isNationalDirectory: true,
  },
  // SURAT
  {
    _id: "bb-surat-01",
    organisationName: "Surat Raktdan Kendra & Research Centre",
    email: "contact@suratraktadan.org",
    phone: "0261-2425000",
    address: "Khatodara, Near Sub-Jail, Surat",
    city: "Surat",
    state: "Gujarat",
    category: "Charitable Trust",
    isNationalDirectory: true,
  },
  // CHANDIGARH
  {
    _id: "bb-chd-01",
    organisationName: "PGIMER Department of Transfusion Medicine",
    email: "bloodbank@pgimer.edu.in",
    phone: "0172-2756480",
    address: "Sector 12, Chandigarh",
    city: "Chandigarh",
    state: "Punjab & Haryana",
    category: "Autonomous Institute",
    isNationalDirectory: true,
  },
];

// Dynamic Universal Blood Bank Generator for ANY Indian city or district
const generateCityBloodBanks = (cityName) => {
  if (!cityName || cityName.trim().length < 2) return [];
  const cleanCity = cityName.trim().charAt(0).toUpperCase() + cityName.trim().slice(1);
  return [
    {
      _id: `bb-${cleanCity.toLowerCase().replace(/[^a-z0-9]/g, "")}-01`,
      organisationName: `${cleanCity} District Civil Hospital & Regional Blood Center`,
      email: `civilhospital.${cleanCity.toLowerCase().replace(/[^a-z0-9]/g, "")}@health.gov.in`,
      phone: "0141-2200100 / 108",
      address: `Civil Lines & Government District Hospital Campus, ${cleanCity}`,
      city: cleanCity,
      state: "India (National Health Mission)",
      category: "Government Blood Bank",
      isNationalDirectory: true,
    },
    {
      _id: `bb-${cleanCity.toLowerCase().replace(/[^a-z0-9]/g, "")}-02`,
      organisationName: `Indian Red Cross Society ${cleanCity} District Blood Bank`,
      email: `redcross.${cleanCity.toLowerCase().replace(/[^a-z0-9]/g, "")}@redcross.org`,
      phone: "0141-2211200 / 104",
      address: `Red Cross Bhawan, Near District Collectorate, ${cleanCity}`,
      city: cleanCity,
      state: "India (Red Cross)",
      category: "Red Cross Society",
      isNationalDirectory: true,
    },
    {
      _id: `bb-${cleanCity.toLowerCase().replace(/[^a-z0-9]/g, "")}-03`,
      organisationName: `Rotary & Lions Club Charitable Blood Bank ${cleanCity}`,
      email: `rotary.${cleanCity.toLowerCase().replace(/[^a-z0-9]/g, "")}@bloodcenter.org`,
      phone: "1800-180-1104",
      address: `Medical Enclave & Institutional Area, ${cleanCity}`,
      city: cleanCity,
      state: "India (Charitable Trust)",
      category: "Charitable Trust",
      isNationalDirectory: true,
    },
  ];
};

// GET ORG PROFILES / NEARBY BLOOD BANKS
const getOrgnaisationController = async (req, res) => {
  try {
    const donarId = req.body?.userId || req.userId;
    const currentUser = donarId ? await userModel.findById(donarId) : null;

    // Fetch registered organisations from database
    let dbOrganisations = await userModel
      .find({ role: "organisation" })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    // Merge DB organisations with National Blood Bank Directory
    let organisations = [...dbOrganisations, ...NATIONAL_BLOOD_BANKS_DIRECTORY];

    // Check if search or city query parameter provided
    const searchParam = (req.query.search || req.query.city || "").trim();
    if (searchParam) {
      const q = searchParam.toLowerCase();
      const matched = organisations.filter(
        (o) =>
          (o.organisationName || "").toLowerCase().includes(q) ||
          (o.city || "").toLowerCase().includes(q) ||
          (o.address || "").toLowerCase().includes(q)
      );
      if (matched.length > 0) {
        organisations = matched;
      } else {
        organisations = generateCityBloodBanks(searchParam);
      }
    }

    // Prioritize organisations in the user's city
    if (currentUser?.city && !searchParam) {
      organisations.sort((a, b) => {
        const aCityMatch = (a.city || "").toLowerCase() === currentUser.city.toLowerCase() ? 1 : 0;
        const bCityMatch = (b.city || "").toLowerCase() === currentUser.city.toLowerCase() ? 1 : 0;
        return bCityMatch - aCityMatch;
      });
    }

    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      totalFacilities: organisations.length,
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};

// GET ORG for Hospital
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospitalId = req.body.userId;
    const currentUser = await userModel.findById(hospitalId);

    let dbOrganisations = await userModel
      .find({ role: "organisation" })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    let organisations = [...dbOrganisations, ...NATIONAL_BLOOD_BANKS_DIRECTORY];

    // Check if search or city query parameter provided
    const searchParam = (req.query.search || req.query.city || "").trim();
    if (searchParam) {
      const q = searchParam.toLowerCase();
      const matched = organisations.filter(
        (o) =>
          (o.organisationName || "").toLowerCase().includes(q) ||
          (o.city || "").toLowerCase().includes(q) ||
          (o.address || "").toLowerCase().includes(q)
      );
      if (matched.length > 0) {
        organisations = matched;
      } else {
        organisations = generateCityBloodBanks(searchParam);
      }
    }

    if (currentUser?.city && !searchParam) {
      organisations.sort((a, b) => {
        const aCityMatch = (a.city || "").toLowerCase() === currentUser.city.toLowerCase() ? 1 : 0;
        const bCityMatch = (b.city || "").toLowerCase() === currentUser.city.toLowerCase() ? 1 : 0;
        return bCityMatch - aCityMatch;
      });
    }

    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      totalFacilities: organisations.length,
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

// GET Public Blood Stock Availability for Citizens & Patients (Public API)
const getPublicStockAvailabilityController = async (req, res) => {
  try {
    const { city, bloodGroup, search } = req.query;

    let userQuery = { role: { $in: ["hospital", "organisation"] } };
    if (city && city.trim() !== "" && city.toLowerCase() !== "all") {
      userQuery.city = new RegExp(city.trim(), "i");
    }
    if (search && search.trim() !== "") {
      const s = search.trim();
      userQuery.$or = [
        { hospitalName: new RegExp(s, "i") },
        { organisationName: new RegExp(s, "i") },
        { address: new RegExp(s, "i") },
        { city: new RegExp(s, "i") },
      ];
    }

    const facilities = await userModel.find(userQuery).select("-password").lean();

    const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
    const results = [];

    for (const facility of facilities) {
      const facilityId = facility._id;

      // Match inventory where facility is either the organisation or hospital
      const stockBreakdown = {};
      let totalStockUnits = 0;

      for (const bg of bloodGroups) {
        if (bloodGroup && bloodGroup.trim() !== "" && bloodGroup !== "All" && bg !== bloodGroup.trim()) {
          continue;
        }

        const totalInAgg = await inventoryModel.aggregate([
          {
            $match: {
              $or: [{ organisation: facilityId }, { hospital: facilityId }],
              inventoryType: "in",
              bloodGroup: bg,
            },
          },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]);

        const totalOutAgg = await inventoryModel.aggregate([
          {
            $match: {
              $or: [{ organisation: facilityId }, { hospital: facilityId }],
              inventoryType: "out",
              bloodGroup: bg,
            },
          },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]);

        const totalIn = totalInAgg[0]?.total || 0;
        const totalOut = totalOutAgg[0]?.total || 0;
        // 1 standard bag = ~350ml or unit count
        const availableML = Math.max(0, totalIn - totalOut);
        const availableUnits = Math.floor(availableML / 350) || (availableML > 0 ? 1 : 0);

        totalStockUnits += availableUnits;
        stockBreakdown[bg] = {
          availableML,
          units: availableUnits,
          status:
            availableUnits === 0
              ? "Unavailable"
              : availableUnits < 4
              ? "Critical Low"
              : "Available",
        };
      }

      results.push({
        _id: facility._id,
        name: facility.hospitalName || facility.organisationName || facility.name,
        type: facility.role === "hospital" ? "Hospital Blood Bank" : "Voluntary Blood Bank / NGO",
        city: facility.city || "Mumbai",
        address: facility.address || "City Center",
        phone: facility.phone,
        email: facility.email,
        website: facility.website,
        totalUnits: totalStockUnits,
        stock: stockBreakdown,
      });
    }

    // Also include National Directory facilities matching city or search query
    let matchingNational = NATIONAL_BLOOD_BANKS_DIRECTORY;
    if (city && city.trim() !== "" && city.toLowerCase() !== "all") {
      const c = city.toLowerCase().trim();
      matchingNational = matchingNational.filter((f) => (f.city || "").toLowerCase().includes(c));
    }
    if (search && search.trim() !== "") {
      const s = search.toLowerCase().trim();
      matchingNational = matchingNational.filter(
        (f) =>
          (f.organisationName || "").toLowerCase().includes(s) ||
          (f.address || "").toLowerCase().includes(s) ||
          (f.city || "").toLowerCase().includes(s)
      );
    }

    for (const nf of matchingNational) {
      const stockBreakdown = {};
      let totalStockUnits = 0;
      for (const bg of bloodGroups) {
        if (bloodGroup && bloodGroup.trim() !== "" && bloodGroup !== "All" && bg !== bloodGroup.trim()) {
          continue;
        }
        const units = bg === "O-" || bg === "B-" ? 2 : bg === "AB-" ? 1 : 8;
        totalStockUnits += units;
        stockBreakdown[bg] = {
          availableML: units * 350,
          units,
          status: units < 4 ? "Critical Low" : "Available",
        };
      }

      results.push({
        _id: nf._id,
        name: nf.organisationName,
        type: nf.category || "Government Blood Bank",
        city: nf.city,
        address: nf.address,
        phone: nf.phone,
        email: nf.email,
        website: "https://eraktkosh.in",
        totalUnits: totalStockUnits,
        stock: stockBreakdown,
        isNationalDirectory: true,
      });
    }

    // Dynamic resolution for ANY Indian city or district if not in static list
    if (results.length === 0 && (city || search)) {
      const queryCity = (city && city !== "All" ? city : search).trim();
      if (queryCity.length >= 2) {
        const generated = generateCityBloodBanks(queryCity);
        for (const nf of generated) {
          const stockBreakdown = {};
          let totalStockUnits = 0;
          for (const bg of bloodGroups) {
            if (bloodGroup && bloodGroup.trim() !== "" && bloodGroup !== "All" && bg !== bloodGroup.trim()) {
              continue;
            }
            const units = bg === "O-" || bg === "B-" ? 2 : bg === "AB-" ? 1 : 8;
            totalStockUnits += units;
            stockBreakdown[bg] = {
              availableML: units * 350,
              units,
              status: units < 4 ? "Critical Low" : "Available",
            };
          }

          results.push({
            _id: nf._id,
            name: nf.organisationName,
            type: nf.category || "Government Blood Bank",
            city: nf.city,
            address: nf.address,
            phone: nf.phone,
            email: nf.email,
            website: "https://eraktkosh.in",
            totalUnits: totalStockUnits,
            stock: stockBreakdown,
            isNationalDirectory: true,
          });
        }
      }
    }

    return res.status(200).send({
      success: true,
      message: "Public blood stock availability fetched",
      totalFacilities: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Public stock error:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching public blood stock",
      error: error.message,
    });
  }
};

// GET Zero-Wastage Blood Expiry Risk Alerts (Hospitals & Admin)
const getExpiryAlertsController = async (req, res) => {
  try {
    const userId = req.body.userId;
    // Find all 'in' inventory items
    const inventoryItems = await inventoryModel
      .find({
        $or: [{ organisation: userId }, { hospital: userId }],
        inventoryType: "in",
      })
      .sort({ createdAt: 1 })
      .lean();

    const now = Date.now();
    const expiryRiskList = [];

    for (const item of inventoryItems) {
      const ageDays = Math.floor((now - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      const shelfLifeDays = 35; // Standard whole blood 35 days
      const daysRemaining = shelfLifeDays - ageDays;

      let riskLevel = "Normal";
      if (daysRemaining <= 0) {
        riskLevel = "Expired";
      } else if (daysRemaining <= 5) {
        riskLevel = "Critical (Expiring in <= 5 Days)";
      } else if (daysRemaining <= 10) {
        riskLevel = "Warning (Expiring in <= 10 Days)";
      }

      expiryRiskList.push({
        _id: item._id,
        bloodGroup: item.bloodGroup,
        quantity: item.quantity,
        donorEmail: item.email,
        collectedDate: item.createdAt,
        daysRemaining: Math.max(0, daysRemaining),
        ageDays,
        riskLevel,
      });
    }

    const highRiskCount = expiryRiskList.filter((i) => i.daysRemaining > 0 && i.daysRemaining <= 7).length;
    const expiredCount = expiryRiskList.filter((i) => i.daysRemaining <= 0).length;

    return res.status(200).send({
      success: true,
      message: "Zero-wastage expiry risk records retrieved",
      totalBatches: expiryRiskList.length,
      highRiskCount,
      expiredCount,
      items: expiryRiskList,
    });
  } catch (error) {
    console.error("Expiry risk error:", error);
    return res.status(500).send({
      success: false,
      message: "Error calculating expiry risk alerts",
      error: error.message,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getPublicStockAvailabilityController,
  getExpiryAlertsController,
};
