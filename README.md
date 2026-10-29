# 🩸 RaktDaan - Emergency Blood Bank & Donor Network
*(Inspired by **BloodDonor.in** & **RaktaSetu**)*

A full-stack Indian digital blood management and emergency trauma assistance ecosystem built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🌟 Key Features Inspired by BloodDonor.in & RaktDaan Ecosystem

### 1. 🌐 Public Blood Portal & Live SOS Feed (`/`)
- **Hero Search Widget**: Fast lookup for available blood donors by **Blood Group** and **City**.
- **Live Emergency SOS Ticker**: Real-time display of critical trauma & surgery requirements published by verified medical centers with 1-click hospital helpline dialer.
- **Impact Statistics**: Live counters for Voluntary Donors, Units Available, and Partner Hospitals.
- **4-Step Lifesaver Pipeline**: Clear visual walkthrough explaining how donors and hospitals are bridged in emergencies.

### 2. 🧬 Blood Compatibility Tool (`/blood-compatibility`)
- Interactive compatibility calculator showing:
  - Universal Red Cell Donor (`O-`) and Universal Recipient (`AB+`).
  - Safe donor-to-recipient transfusion matrix.
  - Prevalence percentages of each blood type in India.

### 3. 🏕️ Community Blood Donation Camps (`/donation-camps`)
- Search and discover upcoming blood donation drives by city.
- Blood Banks & Organisations can schedule and publish new camps with target units, venue, and timings.
- Voluntary donors can register for camps with 1 click.

### 4. 🚨 Emergency SOS & Nearby Donor Finder (`/emergency-donors`)
- **Restricted Access**: Strictly authorized for **Hospitals**, **Organisations**, and **Admins**.
- Search nearby registered donors filtered by city, pincode, and the **90-day medical donation interval**.
- **Instant 3-Way Contact Dispatch**:
  - 📞 **1-Click Direct Phone Call** (`tel:${phone}`)
  - 💬 **1-Click WhatsApp & SMS Alert**: Pre-composed message with accident location and hospital desk contact.
  - 📧 **Automated Nodemailer Email**: Emergency HTML notification dispatched directly to donor's email.
- **Broadcast Live Requirement**: Hospital can publish urgent requirements to the public RaktDaan live board.

---

## 🔑 Demo Credentials (Password for all: `123456`)

| Role | Email | Password | Features Accessible |
|---|---|---|---|
| **Hospital** | `apollo@hospital.com` | `123456` | Emergency SOS, Donor Finder, Broadcast Requirements, Consumed Blood |
| **Organisation** | `redcross@bloodbank.org` | `123456` | Organize Blood Camps, Inventory IN/OUT, Donors, Hospitals |
| **Admin** | `admin@bloodbank.org` | `123456` | Admin Dashboard, User & Camp Management, Full Access |
| **Donor** | `rahul.donor@gmail.com` | `123456` | Availability Toggle (`Available`/`Unavailable`), Donation Records, Camp Signups |

---

## 🚀 Running the Project

```bash
# Run both Backend & Frontend concurrently
npm run dev
```

- **Web Portal**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **MongoDB**: `mongodb://127.0.0.1:27017/bloodbank`
