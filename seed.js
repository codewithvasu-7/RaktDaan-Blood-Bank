const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const userModel = require("./models/userModel");
const inventoryModel = require("./models/inventoryModel");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for seeding...");

    // Check if data already exists
    const existingUsers = await userModel.countDocuments();
    if (existingUsers > 0) {
      console.log(`Database already has ${existingUsers} users. Skipping seeder or updating donors...`);
    }

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash("123456", salt);

    // 1. Create Admin
    const admin = await userModel.findOneAndUpdate(
      { email: "admin@bloodbank.org" },
      {
        name: "Super Admin",
        role: "admin",
        email: "admin@bloodbank.org",
        password: defaultPassword,
        phone: "9876543210",
        address: "HQ Central Medical Hub, Mumbai",
        city: "Mumbai",
        pincode: "400001",
      },
      { upsert: true, new: true }
    );

    // 2. Create Organisations
    const org = await userModel.findOneAndUpdate(
      { email: "redcross@bloodbank.org" },
      {
        organisationName: "Red Cross Blood Bank",
        role: "organisation",
        email: "redcross@bloodbank.org",
        password: defaultPassword,
        phone: "9822012345",
        address: "Andheri East, Blood Bank Center",
        city: "Mumbai",
        pincode: "400069",
        website: "https://redcross.org",
      },
      { upsert: true, new: true }
    );

    await userModel.findOneAndUpdate(
      { email: "jaipur.redcross@bloodbank.org" },
      {
        organisationName: "Jaipur Red Cross & Trauma Blood Bank",
        role: "organisation",
        email: "jaipur.redcross@bloodbank.org",
        password: defaultPassword,
        phone: "9829011223",
        address: "Near SMS Medical College, JLN Marg",
        city: "Jaipur",
        pincode: "302004",
        website: "https://jaipurbloodbank.org",
      },
      { upsert: true, new: true }
    );

    await userModel.findOneAndUpdate(
      { email: "rotary.delhi@bloodbank.org" },
      {
        organisationName: "Rotary Central Blood Bank",
        role: "organisation",
        email: "rotary.delhi@bloodbank.org",
        password: defaultPassword,
        phone: "9811099112",
        address: "Tughlakabad Institutional Area",
        city: "Delhi",
        pincode: "110062",
        website: "https://rotarybloodbank.org",
      },
      { upsert: true, new: true }
    );

    // 3. Create Hospitals
    const hospital1 = await userModel.findOneAndUpdate(
      { email: "apollo@hospital.com" },
      {
        hospitalName: "Apollo Emergency & Trauma Hospital",
        role: "hospital",
        email: "apollo@hospital.com",
        password: defaultPassword,
        phone: "9811099887",
        address: "Bandra West, Link Road",
        city: "Mumbai",
        pincode: "400050",
        website: "https://apollohospital.com",
      },
      { upsert: true, new: true }
    );

    const hospital2 = await userModel.findOneAndUpdate(
      { email: "maxcare@hospital.com" },
      {
        hospitalName: "MaxCare Super Specialty Hospital",
        role: "hospital",
        email: "maxcare@hospital.com",
        password: defaultPassword,
        phone: "9811022334",
        address: "Connaught Place",
        city: "Delhi",
        pincode: "110001",
        website: "https://maxcare.org",
      },
      { upsert: true, new: true }
    );

    // 4. Create Diverse Donors with Blood Groups, Cities, and Availability
    const sampleDonors = [
      {
        name: "Rahul Sharma",
        email: "rahul.donor@gmail.com",
        bloodGroup: "O+",
        phone: "9876543211",
        city: "Mumbai",
        pincode: "400050",
        address: "Bandra West, Pali Hill",
        isAvailable: true,
        lastDonationDate: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000), // 110 days ago (eligible)
      },
      {
        name: "Pooja Verma",
        email: "pooja.donor@gmail.com",
        bloodGroup: "O-",
        phone: "9876543212",
        city: "Mumbai",
        pincode: "400069",
        address: "Andheri East, Chakala",
        isAvailable: true,
        lastDonationDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), // 150 days ago (eligible)
      },
      {
        name: "Amit Patel",
        email: "amit.donor@gmail.com",
        bloodGroup: "A+",
        phone: "9876543213",
        city: "Mumbai",
        pincode: "400058",
        address: "Andheri West, Lokhandwala",
        isAvailable: true,
        lastDonationDate: null, // First time donor (eligible)
      },
      {
        name: "Sneha Gupta",
        email: "sneha.donor@gmail.com",
        bloodGroup: "B+",
        phone: "9876543214",
        city: "Mumbai",
        pincode: "400001",
        address: "Fort, South Mumbai",
        isAvailable: true,
        lastDonationDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago (recent donation)
      },
      {
        name: "Vikram Malhotra",
        email: "vikram.donor@gmail.com",
        bloodGroup: "AB+",
        phone: "9876543215",
        city: "Delhi",
        pincode: "110001",
        address: "Connaught Place, Central Delhi",
        isAvailable: true,
        lastDonationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Ananya Iyer",
        email: "ananya.donor@gmail.com",
        bloodGroup: "AB-",
        phone: "9876543216",
        city: "Bengaluru",
        pincode: "560001",
        address: "Indiranagar 100 Feet Road",
        isAvailable: true,
        lastDonationDate: null,
      },
    ];

    for (const d of sampleDonors) {
      const createdDonor = await userModel.findOneAndUpdate(
        { email: d.email },
        {
          ...d,
          role: "donar",
          password: defaultPassword,
        },
        { upsert: true, new: true }
      );

      // Seed a sample inventory record for donors who have donated
      if (d.lastDonationDate) {
        await inventoryModel.findOneAndUpdate(
          { donar: createdDonor._id, inventoryType: "in" },
          {
            inventoryType: "in",
            bloodGroup: d.bloodGroup,
            quantity: 450,
            email: d.email,
            organisation: org._id,
            donar: createdDonor._id,
            createdAt: d.lastDonationDate,
          },
          { upsert: true }
        );
      }
    }

    // 5. Seed Sample Blood Donation Camps (RaktDaan / BloodDonor style)
    const campModel = require("./models/campModel");
    const sampleCamps = [
      {
        title: "Mega Voluntary Blood Donation Camp 2026",
        organisation: org._id,
        organisationName: org.organisationName,
        venue: "Shivaji Park Community Center, Dadar",
        city: "Mumbai",
        state: "Maharashtra",
        campDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // in 4 days
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        contactPhone: "9822012345",
        contactEmail: "camp@redcross.org",
        description: "Annual voluntary blood donation drive organized in collaboration with local medical trusts. Refreshments & donor certificate provided.",
        targetUnits: 250,
      },
      {
        title: "Youth Lifesaver Blood Drive",
        organisation: org._id,
        organisationName: org.organisationName,
        venue: "University Campus Sports Complex, Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        campDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // in 10 days
        startTime: "10:00 AM",
        endTime: "05:00 PM",
        contactPhone: "9822012345",
        contactEmail: "youth@bloodbank.org",
        description: "Join hands to eliminate blood shortages in city emergency wards. All blood groups needed.",
        targetUnits: 150,
      },
      {
        title: "Rotary Club Emergency Blood Mission",
        organisation: org._id,
        organisationName: org.organisationName,
        venue: "Rotary Hall, Connaught Place",
        city: "Delhi",
        state: "Delhi NCR",
        campDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // in 6 days
        startTime: "09:30 AM",
        endTime: "04:30 PM",
        contactPhone: "9811022334",
        contactEmail: "rotary@delhiblood.org",
        description: "Dedicated drive for Thalassemia and accident trauma emergencies.",
        targetUnits: 300,
      },
      {
        title: "Jaipur Lifesaver Blood Donation Camp 2026",
        organisation: org._id,
        organisationName: org.organisationName,
        venue: "Birla Auditorium, Statue Circle",
        city: "Jaipur",
        state: "Rajasthan",
        campDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        contactPhone: "9829012345",
        contactEmail: "jaipur.camp@raktdaan.org",
        description: "Voluntary community donation drive for trauma care & Thalassemia patients.",
        targetUnits: 200,
      },
      {
        title: "SMS Hospital Blood Transfusion Wing Drive",
        organisation: org._id,
        organisationName: "SMS Medical College & Hospital",
        venue: "Auditorium Hall, Sawai Man Singh Hospital",
        city: "Jaipur",
        state: "Rajasthan",
        campDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        startTime: "08:30 AM",
        endTime: "04:30 PM",
        contactPhone: "9829098765",
        contactEmail: "smshospital.blood@rajasthan.gov.in",
        description: "Emergency accident response donor drive in Jaipur.",
        targetUnits: 350,
      },
    ];

    for (const c of sampleCamps) {
      await campModel.findOneAndUpdate({ title: c.title }, c, { upsert: true });
    }

    // 6. Seed Sample Live Emergency Blood Requirements (RaktDaan Live Board)
    const emergencyRequestModel = require("./models/emergencyRequestModel");
    const sampleReqs = [
      {
        patientName: "Vikas Deshmukh (Accident ICU)",
        hospital: hospital1._id,
        hospitalName: hospital1.hospitalName,
        hospitalPhone: hospital1.phone,
        bloodGroup: "O-",
        unitsRequired: 2,
        urgency: "Critical",
        accidentLocation: "Highway Collision, Western Express Highway, Trauma OT 2",
        city: "Mumbai",
        notes: "Immediate requirement. Rare O- negative blood needed within 1 hour.",
        status: "OPEN",
      },
      {
        patientName: "Sunita Mehra (Cardiac Surgery)",
        hospital: hospital1._id,
        hospitalName: hospital1.hospitalName,
        hospitalPhone: hospital1.phone,
        bloodGroup: "A+",
        unitsRequired: 3,
        urgency: "Urgent",
        accidentLocation: "Apollo Hospital Main Surgical Block",
        city: "Mumbai",
        notes: "Scheduled bypass surgery emergency replacement.",
        status: "OPEN",
      },
    ];

    for (const r of sampleReqs) {
      await emergencyRequestModel.findOneAndUpdate({ patientName: r.patientName }, r, { upsert: true });
    }

    console.log("Database Seeded Successfully with Admin, Hospitals, Org, Donors, Camps & Live SOS Requests!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
