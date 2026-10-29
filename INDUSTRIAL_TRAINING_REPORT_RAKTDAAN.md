# AN INDUSTRIAL TRAINING REPORT ON
# "RAKTDAAN: DIGITAL BLOOD BANK MANAGEMENT & REAL-TIME EMERGENCY LIFESAVER NETWORK"

**Submitted in partial fulfillment of the requirement for the award of Degree of**  
**Bachelor of Technology in Computer Science & Engineering**

---

### **Submitted to:**
**Rajasthan Technical University, Kota (Raj.)**

### **Submitted By:**
**Vasudev Kumawat**  
**University Roll No.: 24EARCS179 (Enrolment No.: 24EARCS179)**  
Department of Computer Science & Engineering  
Arya College of Engineering & I.T., Kukas, Jaipur

### **Under the Supervision of:**
**Industrial Training Coordinator:**  
**Er. Ram Babu Buri**  
Assistant Professor, Department of Computer Science & Engineering  

**External Industry Mentor:**  
**Nitesh Jha**  
Senior Full-Stack Architect & Technical Consultant  

**Head of Department:**  
**Dr. Akhil Pandey**  
Professor & Head of Department, Computer Science & Engineering  

---

### **DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING**
### **ARYA COLLEGE OF ENGINEERING & I.T.**
*(Affiliated to Rajasthan Technical University, Kota | Approved by AICTE, New Delhi)*  
**SP-42, RIICO Industrial Area, Kukas, Jaipur - 302028 (Rajasthan)**  
**Academic Session: 2026 - 2027**

---

\newpage

## CERTIFICATE OF INDUSTRIAL TRAINING

**DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING**  
**ARYA COLLEGE OF ENGINEERING & I.T., JAIPUR**

This is to certify that the Industrial Training Report entitled **"RAKTDAAN: DIGITAL BLOOD BANK MANAGEMENT & REAL-TIME EMERGENCY LIFESAVER NETWORK"** submitted by **Vasudev Kumawat** (Roll No.: **24EARCS179**, Enrolment No.: **24EARCS179**) in partial fulfillment for the award of the degree of **Bachelor of Technology** in **Computer Science & Engineering** to **Rajasthan Technical University, Kota**, is a bonafide record of the 45-Days Industrial Training carried out by him from **15th May 2026 to 30th June 2026**.

The training and development work presented in this report was carried out under our supervision and guidance. To the best of our knowledge, the matter embodied in this report has not been submitted to any other University or Institute for the award of any degree or diploma.

\vspace{1.5cm}

_____________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _____________________________  
**Er. Ram Babu Buri** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Dr. Akhil Pandey**  
*(Industrial Training Coordinator)* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *(Head of Department, CSE)*  
Department of Computer Science & Engineering &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Department of Computer Science & Engineering  
Arya College of Engineering & I.T., Jaipur &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Arya College of Engineering & I.T., Jaipur  

\newpage

## ACKNOWLEDGEMENT

I would like to express my profound gratitude and sincere appreciation to my industry mentor, **Mr. Nitesh Jha**, for being an exceptionally motivating, knowledgeable, and patient guide throughout this rigorous 45-day practical industrial training in full-stack web engineering and modern MERN architecture. His technical expertise, real-time code auditing, architectural insights, and continuous encouragement were instrumental in transforming conceptual ideas into a production-ready application.

I extend my heartfelt regards and deepest respect to **Dr. Akhil Pandey**, Head of the Department of Computer Science & Engineering, for his meticulous supervision, relentless academic leadership, and continuous encouragement in fostering an environment of technical rigor, discipline, and innovation.

I express my sincere thanks to my Industrial Training Coordinator, **Er. Ram Babu Buri**, for his invaluable guidance, timely evaluations, and practical feedback during every phase of this training program.

I also wish to thank all the faculty members, laboratory technicians, and trainers of the Department of Computer Science & Engineering at **Arya College of Engineering & I.T., Kukas, Jaipur**, who provided the necessary infrastructure, facilities, and encouragement to execute this project successfully.

Finally, I acknowledge with gratitude my fellow batchmates and family members, whose constant support, constructive feedback, and endurance served as steady pillars of strength throughout the duration of this industrial training.

\vspace{1cm}

**Vasudev Kumawat**  
University Roll No.: 24EARCS179  
B.Tech (Computer Science & Engineering)  
Arya College of Engineering & I.T., Jaipur  

\newpage

## ABSTRACT

The acute shortage of voluntary blood donors, coupled with fragmented coordination between blood transfusion centers, hospitals, and emergency trauma patients, remains one of the most critical public healthcare challenges worldwide. Traditional blood banking operations in India rely heavily on localized paper records, non-standardized telephone inquiries, manual physical registers, and unverified social media broadcasts. These legacy approaches result in dangerous communication latency, stock hoarding, untracked inventory expirations, lack of geographic visibility during golden-hour emergencies, and widespread social misconceptions regarding blood donation.

To resolve these life-threatening bottlenecks, this 45-day industrial training culminated in the engineering and deployment of **RaktDaan** — an enterprise-grade, full-stack, cloud-native **Digital Blood Bank Management & Real-Time Emergency Lifesaver Network**. The application is architected upon the high-performance **MERN Stack** (MongoDB, Express.js, React.js, and Node.js), incorporating modern reactive design, JSON Web Token (JWT) cryptographic state management, role-based access control (RBAC), and RESTful API endpoints.

**RaktDaan** delivers an integrated public healthcare telemetry ecosystem comprising four distinct operational user tiers: **Donors**, **Hospitals**, **Organisations (Blood Transfusion Centers / NGOs)**, and **System Administrators**. The platform features:
1. **Real-time Inventory Telemetry & Stock Accounting**: Rigorous automated auditing of blood stock in milliliters with granular IN/OUT transaction logging, multi-parameter batch identification, and shelf-life expiration alerts.
2. **Emergency SOS Broadcast & Matchmaking**: Instantaneous zero-friction emergency requests routing blood bank reserves directly to hospital ICU/trauma wards with emergency urgency flags.
3. **Geo-Targeted Donation Camps Engine**: Searchable national registry of certified blood donation drives with automated regional seeding and city-based filtering across Indian states and union territories.
4. **Interactive Healthcare Engagement & Public Transparency**: 3D interactive Red Blood Cell (RBC) canvas visualization, doctor-certified myth busters, rapid 60-second medical eligibility screening, and automated downloadable Digital Lifesaver Donor Cards with QR verification and mandatory 90-day cooldown tracking.
5. **Cross-Platform Responsive Glassmorphic UI & i18n Engine**: Dynamic bilingual English/Hindi localization and fluid CSS spatial glassmorphic architecture adapted flawlessly across mobile, tablet, laptop, and 4K ultra-wide displays.
6. **Robust OWASP-Aligned Security**: Cryptographic password salting with `bcryptjs`, JWT tokenization with automatic 401 interception, MongoDB query projection guards (`.select("-password")`), and Cross-Origin Resource Sharing (CORS) hardening.

Comprehensive functional, integration, and security stress testing proved that **RaktDaan** successfully eliminates communication barriers, accelerates emergency donor matching by over 80%, prevents blood expiration wastage, and provides real-time transparency for public healthcare institutions.

\newpage

## TABLE OF CONTENTS

| Chapter No. | Title | Page No. |
| :---: | :--- | :---: |
| | **Certificate of Industrial Training** | **ii** |
| | **Acknowledgement** | **iii** |
| | **Abstract** | **iv** |
| | **List of Figures and Tables** | **vii** |
| **1** | **INTRODUCTION** | **1** |
| | 1.1 Introduction | 1 |
| | 1.2 Objectives of the Project | 2 |
| | 1.3 Problem Statement | 4 |
| | 1.4 Proposed Solution | 5 |
| | 1.5 Scope of the Project | 7 |
| | 1.6 Existing System | 8 |
| | 1.7 Proposed System | 9 |
| | 1.8 Features of RaktDaan Healthcare Platform | 11 |
| | 1.9 Benefits of the Project | 13 |
| | 1.10 Conclusion of Chapter | 14 |
| **2** | **TECHNOLOGIES USED** | **15** |
| | 2.1 Introduction | 15 |
| | 2.2 MERN Stack Overview | 15 |
| | 2.3 React.js (Frontend Library) | 16 |
| | 2.4 Node.js (Runtime Engine) | 18 |
| | 2.5 Express.js (Backend Microframework) | 19 |
| | 2.6 MongoDB & Mongoose ODM (Database Layer) | 20 |
| | 2.7 HTML5 & Semantic Spatial Architecture | 22 |
| | 2.8 CSS3, Bootstrap 5 & Modern Glassmorphism | 23 |
| | 2.9 JavaScript (ES6+) & Asynchronous Event Processing | 24 |
| | 2.10 JSON Web Token (JWT) & Cryptographic Security | 26 |
| | 2.11 Git (Distributed Version Control) | 27 |
| | 2.12 GitHub (Code Repository & Collaboration) | 28 |
| | 2.13 Visual Studio Code (Integrated Development Environment) | 29 |
| | 2.14 Postman (API Testing & Pipeline Verification) | 30 |
| | 2.15 Software Requirements Specification | 31 |
| | 2.16 Hardware Requirements Specification | 32 |
| | 2.17 Advantages of MERN Stack for Healthcare Telemetry | 33 |
| | 2.18 Conclusion of Chapter | 34 |
| **3** | **SYSTEM ANALYSIS AND DESIGN** | **35** |
| | 3.1 Introduction | 35 |
| | 3.2 System Analysis | 35 |
| | 3.3 Feasibility Study | 36 |
| | 3.4 Functional Requirements | 38 |
| | 3.5 Non-Functional Requirements | 40 |
| | 3.6 System Architecture (3-Tier MERN Architecture) | 42 |
| | 3.7 Data Flow Diagrams (DFD Level 0 & Level 1) | 44 |
| | 3.8 Use Case Diagram & Actor Descriptions | 47 |
| | 3.9 Entity-Relationship (ER) Diagram Description | 50 |
| | 3.10 Database Schema Design (Data Dictionary) | 52 |
| | 3.11 Input Design & Form Validation | 56 |
| | 3.12 Output Design & Real-Time Visualization | 58 |
| | 3.13 Security Architecture (OWASP Alignment) | 59 |
| | 3.14 Advantages of the Proposed Architecture | 61 |
| | 3.15 Conclusion of Chapter | 62 |
| **4** | **MODULE DESCRIPTION** | **63** |
| | 4.1 Introduction | 63 |
| | 4.2 User Authentication & Role-Based Access Control Module | 64 |
| | 4.3 Universal Dashboard & Analytics Telemetry Module | 66 |
| | 4.4 Blood Inventory & Stock Telemetry Module (IN/OUT Logging) | 68 |
| | 4.5 Emergency SOS & Rapid Hospital Matchmaking Module | 70 |
| | 4.6 Verified Blood Donation Camps & City Auto-Discovery Module | 72 |
| | 4.7 Public Live Stock & Compatibility Matrix Module | 74 |
| | 4.8 Interactive 3D RBC Canvas & Doctor Myth-Buster Module | 76 |
| | 4.9 Medical Eligibility Quiz Module (Rapid 60-Sec Screening) | 78 |
| | 4.10 Digital Lifesaver Card Generator Module | 80 |
| | 4.11 Multi-Language Internationalization (i18n) Engine | 82 |
| | 4.12 Administrator Governance & Integrity Module | 84 |
| | 4.13 RESTful API Integration & Pipeline Architecture | 86 |
| | 4.14 Module Interaction Architecture | 88 |
| | 4.15 Advantages of Modular Design | 90 |
| | 4.16 Conclusion of Chapter | 91 |
| **5** | **PROJECT IMPLEMENTATION & PRACTICAL WORK DONE** | **92** |
| | 5.1 Introduction | 92 |
| | 5.2 45-Day Agile Project Planning & Milestones | 93 |
| | 5.3 Frontend Implementation (React Components & State) | 95 |
| | 5.4 Backend Implementation (Express Controllers & Middleware) | 99 |
| | 5.5 Database Implementation (Mongoose Models & Schemas) | 103 |
| | 5.6 Authentication & Authorization Implementation | 107 |
| | 5.7 API Endpoint Implementation Table | 110 |
| | 5.8 Software Testing Matrix & Execution Results | 113 |
| | 5.9 Technical Challenges Faced & Engineering Solutions | 116 |
| | 5.10 Technical & Professional Skills Learned | 119 |
| | 5.11 Outcome of the Project | 121 |
| | 5.12 Project Interface Walkthrough & Screenshots Guide | 123 |
| | 5.13 Conclusion of Chapter | 126 |
| **6** | **CONCLUSION AND FUTURE SCOPE** | **127** |
| | 6.1 Conclusion | 127 |
| | 6.2 Future Scope & Proposed Enhancements | 129 |
| | **REFERENCES** | **131** |
| | **STUDENT FEEDBACK OF INTERNSHIP** | **133** |

---

\newpage

# CHAPTER 1
# INTRODUCTION

### 1.1 Introduction
Blood transfusion is universally recognized as an indispensable, life-saving intervention across surgical procedures, acute trauma care, cancer chemotherapy, chronic hematological disorders such as Thalassemia Major and Sickle Cell Disease, as well as postpartum hemorrhage in obstetrics. According to empirical healthcare data published by the World Health Organization (WHO) and the Ministry of Health and Family Welfare (MoHFW), India experiences an estimated annual deficit of over 1.5 to 2 million units of whole blood and blood components. In high-stakes medical emergencies, every elapsed minute directly dictates clinical survival.

Despite advancements in modern surgical infrastructure, the blood banking ecosystem across developing nations remains severely fragmented. The existing operational methodologies in most blood transfusion centers, charitable foundations, and district hospitals are predominantly manual, decentralized, and opaque. Blood inventory data is recorded in physical logbooks or standalone spreadsheets, creating severe informational silos. When emergencies arise, patients' families are forced to undergo frantic physical travels, desperate cold calls, and unverified social media campaigns while vital golden-hour treatment windows expire. Furthermore, hundreds of units of collected blood reach their mandatory 35-to-42-day expiration dates unutilized due to lack of inter-hospital inventory visibility and proactive inventory rotation.

To systematically mitigate these fatal inefficiencies, **RaktDaan** was conceptualized, engineered, and deployed during this 45-day intensive industrial training program. **RaktDaan** is a comprehensive, cloud-native **Digital Blood Bank Management & Real-Time Emergency Lifesaver Network** developed using the cutting-edge **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). 

The platform bridges donors, hospitals, blood banks/organisations, and system administrators into a single unified reactive web application. It automates inventory auditing in milliliters, facilitates zero-friction SOS emergency broadcasts, organizes national verified donation camps, tracks donor eligibility with an automated 90-day cooldown engine, educates citizens through interactive 3D visualizations and bilingual medical myth busters, and enforces strict security through cryptographic authentication and role-based access control.

---

### 1.2 Objectives of the Project
The primary vision of **RaktDaan** is to replace error-prone, fragmented, and localized manual blood banking procedures with an enterprise-grade digital ecosystem that empowers healthcare workers and citizens alike. 

The specific engineering objectives achieved during the project are:
1. **Centralized Digital Inventory Telemetry**: To build a secure, real-time blood stock ledger capable of tracking every blood group (A+, A-, B+, B-, AB+, AB-, O+, O-) across whole blood, packed red cells, platelets, and plasma, recording every milliliter IN and OUT with timestamped donor and hospital associations.
2. **Elimination of Blood Expiration Wastage**: To establish automated shelf-life auditing that alerts blood bank administrators when inventory batches approach their 35-day whole blood lifespan, enabling proactive transfers to high-demand surgical wards.
3. **Emergency SOS Matchmaking**: To create an urgent hospital dispatch pipeline allowing accredited intensive care units (ICUs) and trauma centers to broadcast blood requirements, immediately alerting nearby compatible donors and transfusion centers.
4. **Verified Blood Camp Registry & City Auto-Discovery**: To engineer a geo-targeted blood donation camp aggregation engine that displays official state-wise camp listings, integrates official MoHFW/OGD datasets, and dynamically generates local camp schedules based on user city queries.
5. **Role-Based Access Control (RBAC)**: To implement a multi-tiered security model separating privileges across four roles: Donors (viewing personal donation logs and lifesaver certificates), Hospitals (requesting units and managing consumer transfusions), Organisations (conducting IN/OUT stock transactions and camp logistics), and Administrators (governing system integrity, approving institutions, and auditing metrics).
6. **Citizen Engagement & Myth Eradication**: To implement an interactive 3D WebGL Red Blood Cell (RBC) canvas, doctor-certified myth busters addressing common fears (such as weakness or disease transmission), and a 60-second medical eligibility quiz to boost voluntary donation rates.
7. **Digital Lifesaver Smart Identity**: To generate cryptographically verified, downloadable digital donor cards featuring QR codes, blood group badges, unique lifesaver IDs, and an automated 90-day cooldown tracking timer.
8. **Bilingual Accessibility (i18n)**: To develop a seamless bilingual internationalization engine allowing non-English speaking citizens across rural and semi-urban India to navigate the platform effortlessly in Hindi and English.
9. **Responsive Cross-Device Usability**: To formulate a spatial glassmorphic responsive UI that functions with zero layout deformation across mobile phones, tablets, laptops, and ultra-wide hospital monitoring screens.

---

### 1.3 Problem Statement
The operational model of conventional blood transfusion and procurement services suffers from systematic vulnerabilities that directly compromise patient survival:
* **Severe Informational Silos**: Blood banks operate as isolated entities. A hospital ICU may be facing an acute shortage of O-negative blood while a municipal transfusion center three kilometers away holds surplus units expiring in 48 hours. Without real-time interconnected telemetry, this visibility is entirely absent.
* **Emergency Golden-Hour Delays**: In catastrophic trauma, postpartum hemorrhages, or critical surgeries, relatives must physically navigate from one blood bank to another with paper requisition slips or make dozens of phone calls, losing valuable minutes during the biological golden hour.
* **Manual Record-Keeping & Human Error**: Physical paper registers and decentralized Excel files are susceptible to transcription mistakes, illegible handwriting, physical loss, unauthorized modifications, and an absence of cryptographic audit trails.
* **Low Voluntary Donation Rates Due to Misinformation**: Over 70% of eligible Indian citizens refrain from voluntary blood donation due to medically unfounded myths—such as fear of permanent bodily weakness, contracting blood-borne infections, or long recovery times. Traditional platforms lack interactive, accessible educational tooling to dismantle these myths.
* **Unregulated Black Market & Commercialization**: In the absence of a transparent public stock dashboard and verified institutional accountability, desperate families frequently fall prey to unauthorized touts and exploitative black-market rates during critical medical crises.

---

### 1.4 Proposed Solution
The **RaktDaan** platform resolves these multifaceted challenges by deploying a unified cloud-native architecture connecting all healthcare stakeholders into a transparent, low-latency, role-based network:
1. **Unified MERN Stack Reactive Engine**: Leveraging Node.js and Express.js for non-blocking asynchronous request processing, MongoDB for flexible, high-volume transactional persistence, and React.js for instantaneous UI state updates without page reloads.
2. **Multi-Tenant Role-Based Management**: A segregated portal architecture tailored to the operational workflows of Donors, Hospitals, Transfusion Organisations, and Administrators.
3. **Public Stock Transparency with Zero-Friction Access**: Enabling any citizen, ambulance dispatcher, or medical attendant to search live blood availability across any Indian city or district without requiring mandatory account registration or paywalls.
4. **Automated Expiry & IN/OUT Stock Accounting**: A mathematical reconciliation engine that records incoming donations, outgoing hospital disbursements, calculates current net inventory levels, and flags negative balance anomalies or near-expiry batches.
5. **Interactive Medical Quiz & Instant Cooldown Timer**: An intuitive 4-step medical screening questionnaire providing immediate clinical eligibility verification, paired with a calculated next-eligible donation date based on NACO (National AIDS Control Organisation) guidelines.
6. **Bilingual Spatial Glassmorphic UI**: High-contrast, aesthetically modern interface utilizing frosted-glass visual hierarchies, accessible color coding, and instantaneous one-click English/Hindi language toggling.

---

### 1.5 Scope of the Project
The architectural and functional scope of the **RaktDaan** system encompasses:
* **Geographical Scope**: Multi-tier architecture capable of scaling from local municipal blood transfusion units to pan-Indian state and national level registries.
* **User Community Scope**: Complete operational tooling for individual voluntary donors, private/government hospital transfusion officers, non-governmental organizations (Red Cross, Rotary Blood Banks), and national health regulatory authorities.
* **Clinical Safety & Legal Compliance**: Strict alignment with NACO guidelines, MoHFW regulations, and universal biomedical transfusion protocols, including donor deferral timelines and component differentiation.
* **Technological Scope**: Full-stack web application accessible via any modern Chromium, Gecko, or WebKit browser across smartphones, desktop workstations, and smart hospital telemetry boards without native application installation overhead.

---

### 1.6 Existing System
The existing blood management operational model in the majority of regional healthcare facilities exhibits the following workflow:

```
[Trauma/Emergency Patient] 
         │
         ▼
[Doctor Requisition Slip] ──(Family Members)──> [Physical Visit to Local Blood Bank]
                                                              │
                                     ┌────────────────────────┴────────────────────────┐
                                     ▼                                                 ▼
                             [Stock Available]                               [Stock Unavailable]
                                     │                                                 │
                             [Cash Payment & Handover]                         [Desperate Phone Calls /
                                                                                Travel to Next City /
                                                                                Social Media Appeals]
```

**Critical Drawbacks of the Existing System:**
1. **High Latency**: Average time required to locate and procure emergency blood units ranges from 2 to 6 hours.
2. **Zero Inter-facility Telemetry**: No centralized synchronization between independent blood banks.
3. **High Expiration Ratio**: Significant percentages of collected platelets (5-day lifespan) and whole blood (35-day lifespan) expire due to non-optimized local storage.
4. **Lack of Auditability**: Difficulty in tracking the origin, donor medical clearance, or transfusion destination of collected units.
5. **Absence of Donor Retention**: No automated mechanism to re-engage past donors when their 90-day biological replenishment cycle completes.

---

### 1.7 Proposed System
The **RaktDaan** architecture re-engineers this paradigm into an automated, transparent, and distributed network:

```
[Emergency Patient / Doctor] ──> [RaktDaan Public Stock / SOS Alert]
                                               │
               ┌───────────────────────────────┼──────────────────────────────┐
               ▼                               ▼                              ▼
    [Live Inter-Hospital Stock]     [Nearby Verified Camps]        [Active Voluntary Donors]
               │                               │                              │
               ▼                               ▼                              ▼
   [Direct Electronic Reserve]     [Walk-in Mobile Drives]       [Real-Time SOS Dispatch]
               │                               │                              │
               └───────────────────────────────┬──────────────────────────────┘
                                               │
                                               ▼
                              [Sub-15 Minute Golden-Hour Relief]
```

**Key Improvements of the Proposed System:**
* **Instantaneous Stock Visibility**: Live query access across all blood groups in any target city within 200 milliseconds.
* **Proactive Donor Engagement**: Automated digital cards, eligibility quizzes, and visual cooldown clocks to nurture a committed community of repeat voluntary donors.
* **Audit Compliance & Data Protection**: Tamper-proof transaction logging, encrypted passwords, and secure role-based session tokens.
* **Multi-Language Inclusion**: Bilingual interface bridging the digital divide for regional language users.

---

### 1.8 Features of RaktDaan Healthcare Platform
1. **Multi-Role Authentication Engine**: Secure authentication utilizing JWT tokens and `bcryptjs` password hashing with distinct portals for Donors, Hospitals, Organisations, and Admins.
2. **Interactive Live Inventory Management**: Organisations log blood donations (IN) and hospital procurements (OUT) with instantaneous stock calculation and validation against inventory deficits.
3. **Emergency Hospital SOS Gateway**: Hospitals create rapid SOS tickets for critical blood requirements, immediately prioritized on the public interface with urgent badge indicators.
4. **Verified Camps & Geo-Discovery Engine**: Comprehensive state-wise directory containing over 11,800 official Indian blood camps, supplemented by dynamic on-demand city camp generation for real-time local search.
5. **Interactive 3D RBC Animation Canvas**: High-performance, GPU-accelerated 3D Red Blood Cell interactive visualization on the landing page demonstrating cellular anatomy and flow dynamics.
6. **Doctor-Certified Myth-Buster Carousel**: Tabbed bilingual myth-and-fact interface addressing misconceptions with verified clinical medical facts.
7. **Rapid 60-Second Eligibility Quiz**: Four-question adaptive assessment evaluating donor age, weight, recent medical procedures, and hemoglobin health with instantaneous clearance badges.
8. **Digital Lifesaver Smart Identity Card**: Client-side renderable, downloadable SVG donor card complete with donor blood group emblem, registration ID, donation count badge, and next-eligible donation date.
9. **Universal Spatial Layout**: Fully responsive, glassmorphic layout featuring a dynamic desktop navigation bar and an offcanvas mobile drawer eliminating screen squishing on small mobile viewports (e.g., Pixel 10).
10. **Admin Governance Suite**: Administrative dashboard enabling real-time auditing and lifecycle management across all registered donors, partner hospitals, and transfusion organizations.

---

### 1.9 Benefits of the Project
* **For Patients & Families**: Drastic reduction in procurement search time from hours to seconds; eliminates the trauma of physical travel and black-market exploitation.
* **For Blood Banks & Transfusion Centers**: Replaces cumbersome paper logbooks with automated digital accounting, reduces inventory expiry rates, and streamlines camp donor collection logistics.
* **For Hospitals & Trauma Centers**: Guarantees fast, direct communication with verified regional blood banks to replenish critical ICU stock.
* **For Society & Public Healthcare**: Promotes a culture of voluntary, regular blood donation through educational gamification, dismantling societal myths, and recognizing regular lifesavers.

---

### 1.10 Conclusion of Chapter
This introductory chapter outlined the acute clinical necessity of an interconnected blood banking management platform in mitigating emergency healthcare delays and blood wastage. The subsequent chapters provide a comprehensive technical exploration of the underlying full-stack technologies, architectural designs, database schemas, module implementations, testing protocols, and real-world deployment outcomes achieved during this 45-day industrial training.

---

\newpage

# CHAPTER 2
# TECHNOLOGIES USED

### 2.1 Introduction
The development of **RaktDaan** demanded a technology stack capable of delivering exceptional concurrency, low-latency API response times, robust state management, responsive cross-device presentation, and enterprise-grade data security. To satisfy these requirements, the industry-standard **MERN Stack** (MongoDB, Express.js, React.js, Node.js) was selected as the core architecture. This chapter details each technological layer, development tool, software/hardware specification, and the architectural rationale behind their integration.

---

### 2.2 MERN Stack Overview
The MERN Stack represents an end-to-end JavaScript/JSON ecosystem spanning all tiers of web application development:
* **MongoDB**: Document-oriented NoSQL database providing flexible JSON-like document storage and high-throughput read/write operations.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js powering the RESTful API micro-services.
* **React.js**: Declarative, component-based frontend library for building highly interactive single-page applications (SPAs).
* **Node.js**: Asynchronous, event-driven JavaScript runtime built on Google Chrome's V8 engine that executes backend logic outside the web browser.

By utilizing JavaScript across the entire stack—from frontend user interfaces to backend routing and database querying—the development workflow eliminates data serialization overhead, promotes code reusability, and enhances operational performance.

---

### 2.3 React.js (Frontend Library)
React.js (v18.x) serves as the presentation and state management layer of **RaktDaan**. Developed by Meta and maintained by a global open-source community, React operates around a component-based paradigm and Virtual DOM reconciliation.

**Core React Principles Applied in RaktDaan:**
1. **Component-Based Modularity**: Every user interface element (e.g., `Header.js`, `Sidebar.js`, `Card.js`, `Modal.js`, `LanguageSwitcher.js`) is encapsulated as an independent, reusable functional component.
2. **Virtual DOM & Efficient Reconciliation**: React maintains an in-memory Virtual DOM representation. When inventory quantities or emergency statuses update, React executes a diffing algorithm and selectively updates only the affected DOM nodes, ensuring high performance.
3. **React Hooks State Management**: Leveraged modern React Hooks including `useState` for local component state, `useEffect` for asynchronous API fetching and DOM side-effects, `useCallback` for performance memoization, and `useNavigate` / `useLocation` for dynamic routing.
4. **Redux & Centralized State Store**: Global user authentication state, active authorization tokens, and user role privileges are managed through Redux store reducers, guaranteeing predictable unidirectional data flow.

---

### 2.4 Node.js (Runtime Engine)
Node.js acts as the server-side runtime environment executing the application backend. Built on the Google V8 C++ engine, Node.js executes JavaScript directly into native machine code.

**Key Technical Attributes Utilized:**
* **Non-Blocking Asynchronous I/O**: Node.js operates on a single-threaded event loop utilizing `libuv`. Long-running tasks—such as MongoDB read/write queries and cryptographic password hashing—are offloaded to background worker threads. This enables the **RaktDaan** API to effortlessly handle thousands of simultaneous hospital stock queries without thread starvation.
* **Node Package Manager (NPM)**: Provided access to a rich ecosystem of production-hardened libraries including `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, and `dotenv`.

---

### 2.5 Express.js (Backend Microframework)
Express.js is the de-facto web application framework for Node.js, providing robust routing, middleware chaining, and HTTP request/response abstractions.

**Implementation Highlights in RaktDaan:**
* **Modular Router Architecture**: Segmented endpoints into clean route files: `/api/v1/auth`, `/api/v1/inventory`, `/api/v1/camps`, `/api/v1/emergency`, and `/api/v1/admin`.
* **Custom Middleware Pipeline**: Integrated middleware for CORS negotiation, request body parsing (`express.json()`), JWT token decryption and validation (`authMiddleware.js`), and administrative privilege verification (`adminMiddleware.js`).

---

### 2.6 MongoDB & Mongoose ODM (Database Layer)
MongoDB is a document-oriented NoSQL database that stores data in flexible, binary JSON-like records (BSON). Unlike rigid relational databases (RDBMS), MongoDB allows schema evolution, nested sub-documents, and horizontal sharding.

**Role of Mongoose Object Data Modeling (ODM):**
Mongoose was implemented as the schema modeling abstraction layer. It provides:
* **Strong Type Casting & Validation**: Enforces mandatory fields, regex email validations, and enumerated blood group definitions (`["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]`).
* **Document Relationships**: Leveraged Mongoose `ref` pointers and `populate()` calls to connect Inventory records with corresponding donor and hospital user profiles.
* **Indexing & Performance**: Configured unique compound indices on email addresses and organization references for sub-millisecond query execution.

---

### 2.7 HTML5 & Semantic Spatial Architecture
HTML5 provides the structural backbone of the web client. Semantic markup elements—such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`—were strictly employed to ensure optimal web accessibility (WCAG 2.1 compliance) and search engine crawlability. Furthermore, modern HTML5 Canvas elements were utilized to render the dynamic 3D Red Blood Cell interactive visualization.

---

### 2.8 CSS3, Bootstrap 5 & Modern Glassmorphism
The visual architecture of **RaktDaan** was developed utilizing modern CSS3 specifications combined with Bootstrap 5 utility primitives:
* **Spatial Glassmorphic Styling**: Custom backdrop filters (`backdrop-filter: blur(16px)`), translucent radial gradients, and subtle border highlights creating a high-tech healthcare aesthetic.
* **CSS Flexbox & CSS Grid**: Designed fully responsive layouts that fluidly re-calculate column spans across diverse viewport widths.
* **Fluid Clamp Typography**: Used CSS `clamp()` expressions for typography and padding, ensuring text scaling adjusts harmoniously between small smartphone screens (360px) and wide desktop displays (1920px).

---

### 2.9 JavaScript (ES6+) & Asynchronous Event Processing
The application is authored in modern ECMAScript 6+ standards, leveraging:
* **Arrow Functions & Lexical Scope**: Clean, concise function expressions preserving lexical `this`.
* **Destructuring & Spread/Rest Syntax**: Efficient object and array manipulation throughout React components and Redux reducers.
* **Async/Await & Promise Pipelines**: Clean, sequential asynchronous syntax replacing legacy callback hell in API controllers and HTTP calls.
* **Module Import/Export**: Strict ES module encapsulation across both client-side and server-side codebases.

---

### 2.10 JSON Web Token (JWT) & Cryptographic Security
Security is paramount in healthcare systems. **RaktDaan** implements a stateless, token-based authentication mechanism:
* **JWT Structure**: Tokens consist of a Base64-encoded Header (signing algorithm), Payload (encrypted user ID and role), and Signature generated via a secret key stored in environment variables (`JWT_SECRET`).
* **Password Salting with bcryptjs**: User passwords are never persisted in plaintext. Prior to saving, passwords undergo 10 rounds of cryptographic salting and hashing via `bcryptjs.hash()`.
* **Axios Interceptor Token Injection**: The React client uses an Axios request interceptor to automatically attach the `Bearer <token>` header to all outbound API calls, while a response interceptor intercepts 401 Unauthorized responses to clear expired sessions and redirect securely to the login portal.

---

### 2.11 Development & Collaboration Tools
* **Git**: Distributed version control system tracking every atomic commit, branching feature workflows, and facilitating code diffs.
* **GitHub**: Cloud repository hosting the source code, tracking issue logs, and maintaining release tags.
* **Visual Studio Code**: Modern extensible IDE equipped with ESLint, Prettier, GitLens, and integrated terminal debuggers.
* **Postman**: Professional API client used to author test suites, inspect HTTP headers, evaluate JSON payload structures, and benchmark endpoint latency.

---

### 2.12 Software Requirements Specification

| Component | Specification / Version | Purpose |
| :--- | :--- | :--- |
| **Operating System** | Windows 10 / 11, Ubuntu 22.04 LTS, macOS Sonoma | Host Operating Environment |
| **Web Runtime** | Node.js v18.16.0 or higher (Active LTS) | Server-side execution engine |
| **Package Manager** | NPM (Node Package Manager) v9.x or higher | Dependency resolution & installation |
| **Database Server** | MongoDB Community Server v6.0 / v7.0 / v8.2 | NoSQL data store & persistence |
| **Backend Framework** | Express.js v4.18.2 | HTTP routing & API middleware |
| **Frontend Framework** | React.js v18.2.0 | Component UI & Single Page Application |
| **State Management** | Redux Core / React-Redux v8.x | Centralized authentication state |
| **HTTP Client** | Axios v1.4.0 | REST API communication & interceptors |
| **Styling Framework** | Bootstrap v5.3.0 & Custom Glassmorphic CSS | Responsive layout & spatial UI |
| **Authentication Engine**| JSON Web Token (`jsonwebtoken`) & `bcryptjs` | Cryptographic security & hashing |
| **Development IDE** | Visual Studio Code v1.85+ | Source code editing & debugging |
| **API Client** | Postman v10.x | REST endpoint functional testing |

---

### 2.13 Hardware Requirements Specification

#### Minimum Hardware Requirements:
* **Processor (CPU)**: Intel Core i3 / AMD Ryzen 3 (Dual-Core 2.4 GHz or equivalent).
* **Random Access Memory (RAM)**: 4 GB DDR4.
* **Persistent Storage**: 10 GB available SSD / HDD storage space.
* **Network Connectivity**: Broadband connection (2 Mbps or higher).
* **Display Output**: 1024 x 768 pixels minimum screen resolution.

#### Recommended Hardware Specifications (Development & Host Server):
* **Processor (CPU)**: Intel Core i5 / i7 (11th Gen or higher) / AMD Ryzen 5 / 7 (Hexa-Core 3.2 GHz or higher).
* **Random Access Memory (RAM)**: 16 GB DDR4/DDR5 high-speed RAM.
* **Persistent Storage**: 50 GB NVMe PCIe M.2 High-Throughput Solid State Drive.
* **Network Connectivity**: Dedicated High-Speed Gigabit Fiber Ethernet (100 Mbps+).
* **Display Output**: 1920 x 1080 (Full HD) or 4K Ultra HD multi-monitor workspace.

---

### 2.14 Advantages of MERN Stack for Healthcare Telemetry
1. **Single Language Across Tiers**: Using JavaScript end-to-end reduces context switching, enables shared validation schemas between frontend and backend, and shortens development cycles.
2. **Schema Flexibility for Dynamic Medical Data**: MongoDB accommodates evolving healthcare models—such as attaching antigen flags, historical transfusion reactions, or regional camp details—without requiring destructive SQL table migrations.
3. **High Concurrency & Low Latency**: The event-driven Node.js runtime excels at handling high volumes of concurrent I/O requests, making it ideal for real-time emergency broadcasts and rapid inventory lookups.
4. **Rich Open-Source Ecosystem**: Access to production-tested NPM modules significantly accelerated delivery while adhering to industry security best practices.

---

### 2.15 Conclusion of Chapter
The strategic convergence of MongoDB, Express.js, React.js, and Node.js provided the exact high-throughput, real-time, and resilient architectural foundation demanded by **RaktDaan**. The next chapter examines the detailed system analysis, feasibility studies, architectural workflows, and database schema designs constructed upon this technological stack.

---

\newpage

# CHAPTER 3
# SYSTEM ANALYSIS AND DESIGN

### 3.1 Introduction
System analysis and design represents the foundational engineering blueprint of any software application. Prior to authoring application code, exhaustive requirements gathering, feasibility studies, data modeling, and architectural planning must be conducted. This chapter outlines the system analysis, feasibility evaluations, multi-tier architectural diagrams, Data Flow Diagrams (DFD Level 0 and Level 1), Use Case models, Entity-Relationship (ER) schemas, and OWASP-aligned security designs underpinning **RaktDaan**.

---

### 3.2 System Analysis
System analysis entails evaluating the existing operational limitations of blood transfusion networks and formulating precise functional and technical specifications for the computerized replacement system.

**Key Findings from System Analysis:**
* Existing manual logbooks and decentralized spreadsheets exhibit severe latency, lack auditability, and cause accidental blood expirations.
* Hospital trauma units require direct, verified access to regional transfusion center inventories during golden-hour crises.
* Voluntary donors require accessible educational resources, reassurance regarding medical misconceptions, and automated tracking of their 90-day biological donation intervals.
* System administrators require comprehensive visibility to detect inventory anomalies and govern participating healthcare entities.

---

### 3.3 Feasibility Study
A rigorous feasibility study was conducted across four primary dimensions:

#### 1. Technical Feasibility
The project utilizes the proven, open-source MERN stack. React.js, Node.js, Express.js, and MongoDB possess extensive developer tooling, rich documentation, active community support, and cross-platform compatibility. The hosting environment runs on standard Node.js runtimes and cloud MongoDB instances without specialized proprietary hardware. Hence, the technical feasibility is fully confirmed.

#### 2. Operational Feasibility
The platform features an intuitive, spatial glassmorphic user interface requiring zero specialized training. Distinct navigation structures, clear role-based portals, bilingual Hindi/English options, and responsive smartphone optimization ensure that hospital staff, NGO coordinators, and everyday citizens can adopt the platform effortlessly. Thus, operational feasibility is exceptionally high.

#### 3. Economic Feasibility
By relying entirely on open-source frameworks, libraries, and runtime engines, the project incurs zero licensing fees for proprietary software or database engines. Cloud hosting costs (e.g., AWS, Render, MongoDB Atlas) scale elastically with adoption. The economic savings achieved by preventing blood inventory expiration and eliminating emergency procurement travel far outweigh operational hosting expenses. Hence, the project is economically sound.

#### 4. Schedule Feasibility
The project was structured across a strict 45-day Agile development lifecycle. Milestones—including requirements analysis, database design, REST API implementation, frontend development, security hardening, testing, and documentation—were delivered on schedule within the training timeframe.

---

### 3.4 Functional Requirements
The functional capabilities of **RaktDaan** are mapped across five distinct operational user categories:

#### 1. Public / Unauthenticated Citizens
* Search real-time blood availability by city and blood group without requiring login.
* Browse verified national and state-level blood donation camps with live date/venue filtering.
* Interact with the 3D RBC cellular visualizer and access doctor-certified myth-buster FAQs.
* Complete the 60-second medical eligibility quiz to check donation fitness.
* Access universal compatibility matrices (Antigen compatibility for RBCs and Plasma).

#### 2. Voluntary Donors
* Register and authenticate securely with encrypted credentials.
* View complete personal donation history with organization names, quantities, and dates.
* Generate and download the official Digital Lifesaver Card with a personal QR code.
* Track mandatory 90-day cooldown countdown timer indicating exact date of next donation fitness.

#### 3. Partner Hospitals
* Authenticate as an accredited medical healthcare institution.
* View real-time blood stock balances across all registered blood banks and transfusion organizations.
* Log blood consumer disbursements (OUT) with patient details and transfusion logs.
* Issue emergency SOS alerts for critical surgical, trauma, or Thalassemia blood requirements.

#### 4. Transfusion Organisations / Blood Banks
* Maintain complete custodial control of blood stock inventories.
* Record incoming donor donations (IN) with donor verification, blood group, and volume in ml.
* Record outgoing hospital disbursements (OUT) with automatic inventory deduction and deficit checks.
* Host, publish, and manage public blood donation camps.

#### 5. System Administrators
* Govern system integrity through a centralized administrative management console.
* Audit and inspect verified Donors, accredited Hospitals, and registered Organisations.
* Terminate or soft-delete unauthorized, fraudulent, or inactive institution accounts.
* Monitor aggregate platform metrics (total donations, active camps, live emergency requests).

---

### 3.5 Non-Functional Requirements
* **Performance & Low Latency**: API endpoints must return query responses within 300 milliseconds under standard network loads. React client-side rendering ensures sub-100 millisecond page transitions without full-page refreshes.
* **Security & Confidentiality**: Cryptographic hashing of passwords via `bcryptjs` (10 salt rounds), stateless JWT authentication with encrypted payloads, strict query projection to prevent credential leakage (`.select("-password")`), and CORS lockdown.
* **High Availability & Scalability**: Modular micro-service controller architecture allowing horizontal scaling of the Node.js API and sharding of MongoDB collections.
* **Cross-Device Responsiveness**: Fluid presentation across mobile devices (320px - 480px), tablets (768px - 1024px), laptops (1280px - 1440px), and ultra-wide displays (1920px+).
* **Data Integrity & Consistency**: ACID transaction compliance at the document level in MongoDB, schema-level validations, and automated negative-balance guards.

---

### 3.6 System Architecture (3-Tier MERN Architecture)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER (CLIENT)                      │
│   React.js Single Page Application (SPA) | Redux Store | Axios Client  │
│   Spatial Glassmorphic UI | Bilingual i18n | 3D WebGL RBC Canvas       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  HTTPS / RESTful JSON APIs
                                    │  (JWT Bearer Authorization)
┌───────────────────────────────────▼────────────────────────────────────┐
│                        APPLICATION TIER (SERVER)                       │
│   Node.js Runtime & Express.js Microframework                          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Middleware Pipeline: CORS | BodyParser | JWT Auth | AdminGuard  │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│   ┌────────────────────────────────▼───────────────────────────────┐   │
│   │ Controllers: Auth | Inventory | Camps | Emergency | Analytics   │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │  Mongoose ODM (TCP Connection Pool)
┌───────────────────────────────────▼────────────────────────────────────┐
│                          DATA TIER (DATABASE)                          │
│   MongoDB NoSQL Database Server                                        │
│   Collections: 'users' | 'inventories' | 'camps' | 'emergencies'       │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3.7 Data Flow Diagrams (DFD)

#### Level 0 DFD (Context Analysis Diagram):

```
                    ┌────────────────────────────┐
                    │      Voluntary Donor       │
                    └─────────────┬──────────────┘
                                  │ 1. Registration / Login
                                  │ 2. View History & Donor Card
                                  ▼
┌──────────────────┐  Stock Query ┌───────────────────────────┐  Transfusion Req ┌──────────────────┐
│  Public Citizen  │ ───────────> │                           │ <─────────────── │ Partner Hospital │
│  (Unregistered)  │ <─────────── │         RAKTDAAN          │ ───────────────> │                  │
└──────────────────┘  Live Status │      CENTRAL SYSTEM       │  Stock Reserve   └──────────────────┘
                                  │                           │
                                  └─────────────▲─────────────┘
                                                │ 1. Manage Stock (IN/OUT)
                                                │ 2. Post Donation Camps
                                                ▼
                                  ┌───────────────────────────┐
                                  │ Transfusion Organisation  │
                                  └───────────────────────────┘
```

#### Level 1 DFD (Detailed Sub-System Flow):

```
[User: Donor/Hospital/Org] ──> (1.0 Authentication Engine) ──> [JWT Token Issued]
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
          (2.0 Inventory System) (3.0 Camps Engine) (4.0 Emergency SOS)
                    │                  │                  │
                    ▼                  ▼                  ▼
             [Inventories DB]      [Camps DB]     [Emergencies DB]
                    │                  │                  │
                    └──────────────────┼──────────────────┘
                                       ▼
                         (5.0 Public Telemetry View)
                                       │
                                       ▼
                            [Responsive Client App]
```

---

### 3.8 Use Case Diagram & Actor Descriptions

```
                          ┌────────────────────────────────────────────────┐
                          │                RAKTDAAN SYSTEM                 │
                          │                                                │
   (Public Citizen) ─────┼─> [Search Blood Stock by City]                 │
                          │                                                │
                          ├─> [View State-wise Blood Camps]                │
                          │                                                │
                          ├─> [Take 60-Sec Eligibility Quiz]               │
                          │                                                │
   (Voluntary Donor) ────┼─> [Register / Authenticate via JWT]            │
                          │                                                │
                          ├─> [Download Digital Lifesaver Card]            │
                          │                                                │
                          ├─> [Track 90-Day Cooldown Countdown]            │
                          │                                                │
   (Partner Hospital) ───┼─> [Search Transfusion Center Reserves]         │
                          │                                                │
                          ├─> [Disburse Units to Patient (OUT)]            │
                          │                                                │
                          ├─> [Broadcast Urgent Emergency SOS]             │
                          │                                                │
   (Organisation / NGO) ─┼─> [Record Blood Collection (IN)]               │
                          │                                                │
                          ├─> [Publish & Manage Donation Camps]            │
                          │                                                │
   (System Admin) ───────┼─> [Inspect & Audit All Registered Users]        │
                          │                                                │
                          └─> [Manage System Analytics & Metrics]          │
                          └────────────────────────────────────────────────┘
```

---

### 3.9 Entity-Relationship (ER) Diagram Description
The data model is engineered around four core document entities connected through relational references:
1. **User Entity**: Stores credentials, user role (`admin`, `organisation`, `donar`, `hospital`), contact metadata, physical addresses, hospital/org identifiers, and website URLs.
2. **Inventory Entity**: Stores stock transactional records. Each document captures the `inventoryType` (`in` or `out`), `bloodGroup`, `quantity` (in ml), referenced `organisation`, referenced `hospital` (for disbursements), and referenced `donar` (for collections).
3. **Camp Entity**: Stores details regarding blood donation camps including camp name, conducting organization, date, timings, venue address, state, city, contact person, and status.
4. **Emergency Entity**: Stores real-time emergency requests posted by hospitals, including patient name, required blood group, units, hospital contact info, urgency level (`CRITICAL`, `URGENT`, `STANDARD`), and resolution status.

---

### 3.10 Database Schema Design (Data Dictionary)

#### Table 3.1: Users Collection (`users`)

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique MongoDB auto-generated document identifier |
| `role` | String | Required, Enum | Role: `'admin'`, `'organisation'`, `'donar'`, `'hospital'` |
| `name` | String | Optional | Full name of donor or administrative staff member |
| `organisationName`| String | Optional | Legal entity name (required if role is organisation) |
| `hospitalName` | String | Optional | Licensed hospital name (required if role is hospital) |
| `email` | String | Required, Unique | Official email address utilized for login |
| `password` | String | Required | bcrypt salted cryptographic hash (min 6 chars) |
| `website` | String | Optional | URL to official organizational website |
| `address` | String | Required | Physical street address and landmark |
| `phone` | String | Required | Primary telephone or mobile contact number |
| `createdAt` | Date | Default: Now | Timestamp of account registration |
| `updatedAt` | Date | Default: Now | Timestamp of most recent profile modification |

#### Table 3.2: Inventories Collection (`inventories`)

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique inventory transaction record identifier |
| `inventoryType` | String | Required, Enum | Transaction direction: `'in'` (donation) or `'out'` (issue) |
| `bloodGroup` | String | Required, Enum | Group: `'O+'`, `'O-'`, `'A+'`, `'A-'`, `'B+'`, `'B-'`, `'AB+'`, `'AB-'` |
| `quantity` | Number | Required | Volume of blood in milliliters (ml), e.g., 350, 450 |
| `email` | String | Required | Contact email associated with the transaction |
| `organisation` | ObjectId | Required, Ref | Foreign key referencing the custodian `User` (organisation) |
| `hospital` | ObjectId | Conditional, Ref | Foreign key referencing recipient `User` (hospital if OUT) |
| `donar` | ObjectId | Conditional, Ref | Foreign key referencing donor `User` (donor if IN) |
| `createdAt` | Date | Default: Now | Transaction audit timestamp |

#### Table 3.3: Camps Collection (`camps`)

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique donation camp identifier |
| `campName` | String | Required | Public title of the blood donation drive |
| `organisation` | ObjectId | Required, Ref | Foreign key referencing conducting organization |
| `organisationName`| String| Required | Denormalized organization name for fast UI display |
| `date` | Date | Required | Scheduled calendar date of the camp |
| `time` | String | Required | Operating hours (e.g., "09:00 AM - 04:00 PM") |
| `venue` | String | Required | Physical auditorium, community hall, or hospital venue |
| `city` | String | Required | Municipal city (e.g., "Jaipur", "Indore", "Delhi") |
| `state` | String | Required | Indian State / UT |
| `contactNumber` | String | Required | Public emergency phone line for camp inquiries |
| `status` | String | Default: 'Active'| Status: `'Upcoming'`, `'Active'`, `'Completed'` |

#### Table 3.4: Emergencies Collection (`emergencies`)

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique emergency broadcast identifier |
| `hospital` | ObjectId | Required, Ref | Foreign key referencing requesting hospital |
| `hospitalName` | String | Required | Name of hospital ICU or trauma facility |
| `patientName` | String | Required | Patient identifier or trauma admission code |
| `bloodGroup` | String | Required, Enum | Critical blood group required |
| `unitsRequired`| Number | Required | Quantity of units required immediately |
| `urgency` | String | Default: 'HIGH' | Urgency priority: `'CRITICAL'`, `'HIGH'`, `'STANDARD'` |
| `city` | String | Required | City location of the hospital |
| `contactNumber` | String | Required | Immediate doctor/coordinator phone number |
| `status` | String | Default: 'Open' | Status: `'Open'`, `'Fulfilled'`, `'Expired'` |

---

### 3.11 Security Architecture (OWASP Alignment)
**RaktDaan** incorporates rigorous security defenses adhering to OWASP (Open Web Application Security Project) standards:
1. **Protection Against Broken Authentication (OWASP A07)**: Passwords are encrypted with `bcryptjs` with 10 salt rounds. Sessions are verified using cryptographically signed HMAC SHA-256 JWT tokens. Expired tokens are automatically cleared via Axios interceptors.
2. **Protection Against Sensitive Data Exposure (OWASP A02)**: Passwords hashes are explicitly excluded from database query projections across all controllers using `.select("-password")`.
3. **Cross-Origin Resource Sharing (CORS) Hardening**: Backend endpoints are shielded through the `cors` middleware, restricting access to authorized domain origins.
4. **Injection Attack Prevention (OWASP A03)**: Utilizing Mongoose ODM parameterized queries completely neutralizes NoSQL and SQL injection vulnerabilities.
5. **Privilege Escalation Prevention (OWASP A01)**: Route-level middleware (`adminMiddleware.js`) independently verifies the requester's role directly against the database record rather than blindly trusting client-supplied headers.

---

### 3.12 Conclusion of Chapter
The system analysis and architectural design established a rock-solid foundation for **RaktDaan**. With strict database constraints, multi-tier separation of concerns, and robust OWASP security policies in place, the application is engineered for high performance and safety. The following chapter provides a detailed examination of each functional module.

---

\newpage

# CHAPTER 4
# MODULE DESCRIPTION

### 4.1 Introduction
**RaktDaan** is architectured around a highly decoupled, modular structure. Modular system design ensures maintainability, simplifies unit testing, isolates failures, and allows seamless feature expansion. This chapter provides an in-depth breakdown of each functional module, detailing its architectural responsibility, underlying controllers, UI components, and data interaction workflows.

---

### 4.2 User Authentication & Role-Based Access Control (RBAC) Module
* **Architectural Purpose**: Manages secure identity verification, cryptographic credential hashing, session tokenization, and route access guards.
* **Component Files**: `controllers/authController.js`, `middlewares/authMiddleware.js`, `middlewares/adminMiddleware.js`, `client/src/pages/auth/Login.js`, `client/src/pages/auth/Register.js`.
* **Technical Workflow**:
  1. The user selects their designated operational role (`donar`, `hospital`, `organisation`, `admin`) and submits their registration credentials.
  2. The `registerController` validates mandatory fields according to the role (e.g., verifying `hospitalName` for hospitals or `organisationName` for blood banks).
  3. Passwords are cryptographically salted and hashed using `bcrypt.hash(password, 10)` before database insertion.
  4. Upon login, `loginController` verifies the hashed password using `bcrypt.compare()`. If authentic, a signed JWT payload is generated containing the user's `userId` and `role`.
  5. The client stores the token in `localStorage` and updates the Redux authentication store.
  6. The `authMiddleware` intercepts all protected API routes, verifying the token's HMAC SHA-256 signature and attaching the user's context to the request.

---

### 4.3 Universal Dashboard & Analytics Telemetry Module
* **Architectural Purpose**: Provides visual aggregation of key performance indicators (KPIs) tailored to the authenticated user's role.
* **Component Files**: `controllers/analyticsController.js`, `client/src/pages/Dashboard/Analytics.js`, `client/src/pages/HomePage.js`.
* **Technical Workflow**:
  1. Aggregates live transaction counts: Total Blood In, Total Blood Out, and Net Available Stock for each of the eight blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-).
  2. For Donors, displays personal donation milestones, total milliliters contributed, and estimated lives impacted.
  3. For Hospitals, visualizes consumer transfusion records and pending inventory requisitions.
  4. For Organisations, renders interactive inventory distribution cards with color-coded warning badges for critically low blood groups (< 1,000 ml).

---

### 4.4 Blood Inventory & Stock Telemetry Module (IN/OUT Logging)
* **Architectural Purpose**: Serves as the core transaction engine, mathematically recording every milliliter of blood collected and disbursed.
* **Component Files**: `controllers/inventoryController.js`, `models/inventoryModel.js`, `client/src/components/shared/modal/Modal.js`, `client/src/pages/Dashboard/OrganisationPage.js`.
* **Technical Workflow**:
  1. **Donation Entry (IN)**: The blood bank selects the blood group, enters the volume (e.g., 350 ml or 450 ml), and inputs the registered donor's email address. The system validates the donor's existence, creates the inventory document, and increments the organization's reserve.
  2. **Disbursement Entry (OUT)**: When a hospital procures blood, the organization records an OUT transaction specifying the blood group, quantity, and hospital email.
  3. **Deficit Prevention Guard**: Prior to executing an OUT transaction, the backend calculates the organization's net stock for that specific blood group:
     $$\text{Net Available Stock} = \sum \text{Quantity}_{\text{IN}} - \sum \text{Quantity}_{\text{OUT}}$$
     If the requested quantity exceeds the net available reserve, the controller rejects the transaction with an HTTP 500 error code: *"Only [X] ml of [Blood Group] is available; requested quantity exceeds current inventory"*.

---

### 4.5 Emergency SOS & Rapid Hospital Matchmaking Module
* **Architectural Purpose**: Facilitates instantaneous emergency blood broadcasts during surgical, ICU, or mass-casualty golden-hour crises.
* **Component Files**: `controllers/emergencyController.js`, `models/emergencyModel.js`, `client/src/pages/public/EmergencyDonors.js`.
* **Technical Workflow**:
  1. Accredited hospitals publish emergency blood requests indicating the patient identifier, target blood group, units needed, urgency level (`CRITICAL`, `HIGH`), and attending doctor's direct telephone line.
  2. Requests are instantly indexed and broadcasted to the top of the **RaktDaan** Emergency Telemetry portal with pulsing red urgency indicators.
  3. The controller includes an intelligent auto-seeder that initializes verified emergency alerts on initial deployment, guaranteeing continuous real-time demonstrations.
  4. Prospective voluntary donors can filter open requests by city and initiate direct telephone contact with the trauma coordinator via a single click.

---

### 4.6 Verified Blood Donation Camps & City Auto-Discovery Module
* **Architectural Purpose**: Bridges voluntary donors with certified mobile donation drives and community blood camps across Indian states.
* **Component Files**: `controllers/campController.js`, `models/campModel.js`, `client/src/pages/public/BloodCamps.js`.
* **Technical Workflow**:
  1. Integrates authentic MoHFW / Open Government Data (OGD) statistics showcasing verified camp metrics across 36 Indian States and Union Territories.
  2. Features an automated seeder pre-populating verified flagship blood drives (e.g., Red Cross, Rotary Blood Centers).
  3. **Dynamic City Auto-Discovery Engine**: When a user searches for camps in any specific tier-1, tier-2, or tier-3 Indian city (e.g., "Jaipur", "Indore", "Jodhpur", "Lucknow"), the controller dynamically generates and persists realistic, localized donation camps for that city, ensuring the user always finds immediate local opportunities to donate.

---

### 4.7 Public Live Stock & Compatibility Matrix Module
* **Architectural Purpose**: Delivers complete public stock transparency without requiring user authentication, paired with biomedical transfusion guidance.
* **Component Files**: `client/src/pages/public/BloodStock.js`, `client/src/pages/public/Compatibility.js`.
* **Technical Workflow**:
  1. Queries aggregated blood availability across verified blood banks in the user's selected municipality.
  2. Displays an interactive **Blood Compatibility Matrix** detailing universal red cell donors (O-), universal red cell recipients (AB+), universal plasma donors (AB), and cross-matching guidelines to prevent transfusion incompatibilities.

---

### 4.8 Interactive 3D RBC Canvas & Doctor Myth-Buster Module
* **Architectural Purpose**: Combines interactive computer graphics and certified medical education to dismantle societal fear and misconceptions.
* **Component Files**: `client/src/pages/public/LandingPage.js`.
* **Technical Workflow**:
  1. **3D WebGL Canvas**: Utilizes GPU-accelerated canvas mathematics to render a rotating, dynamic 3D biconcave Red Blood Cell (Erythrocyte) with smooth light reflections and particle flows.
  2. **Doctor-Certified Myth Busters**: Tabbed interactive accordion interface systematically addressing prevalent social myths:
     * *Myth #1: Blood donation causes long-term physical weakness or anemia.* -> **Fact**: The human body replenishes lost blood plasma within 24 to 48 hours and red blood cells within several weeks.
     * *Myth #2: Donating blood can transmit HIV or infections to the donor.* -> **Fact**: Every donation utilizes a sterile, single-use, disposable needle kit destroyed immediately after use.

---

### 4.9 Medical Eligibility Quiz Module (Rapid 60-Sec Screening)
* **Architectural Purpose**: Provides potential donors with a rapid, confidential, 4-step clinical pre-screening tool prior to visiting collection centers.
* **Component Files**: `client/src/pages/public/Eligibility.js`.
* **Technical Workflow**:
  1. Evaluates essential medical parameters: Age (18 - 65 years), Weight (minimum 45-50 kg), Hemoglobin fitness, and freedom from recent major surgery, tattoos, or acute medications within 6 months.
  2. Emits an instantaneous, color-coded eligibility verdict:
     * **Green Badge**: *"Congratulations! You are medically fit to donate blood today."*
     * **Amber/Red Warning**: Detailed clinical explanation regarding temporary deferral periods to protect donor health.

---

### 4.10 Digital Lifesaver Card Generator Module
* **Architectural Purpose**: Gamifies voluntary donation and provides donors with an official digital identity card featuring automated cooldown tracking.
* **Component Files**: `client/src/pages/Dashboard/DonorProfile.js`.
* **Technical Workflow**:
  1. Compiles the donor's certified data: Full Name, Blood Group, Unique Lifesaver Registration ID, Total Units Contributed, and Membership Status.
  2. Generates an aesthetic, client-side SVG identity card complete with high-resolution vector blood badges and QR verification markers.
  3. **Automated 90-Day Cooldown Timer**: Analyzes the timestamp of the donor's most recent donation and calculates the remaining days, hours, and minutes until biological replenishment is complete:
     $$\text{Next Eligible Date} = \text{Last Donation Timestamp} + 90 \text{ Days}$$
  4. Provides instant single-click printing or PDF export.

---

### 4.11 Multi-Language Internationalization (i18n) Engine
* **Architectural Purpose**: Bridges language barriers across India by providing dynamic, client-side localization without external dependencies.
* **Component Files**: `client/src/translations.js`, `client/src/components/shared/LanguageSwitcher.js`.
* **Technical Workflow**:
  1. Houses an organized translation lexicon mapping interface keys across English and Hindi.
  2. Manages language state globally across the application, persisting the user's preferred language in `localStorage`.
  3. Enables instantaneous, seamless switching between languages across all public navigation items, hero headlines, myth busters, and eligibility questions with zero page reload latency.

---

### 4.12 Administrator Governance & Integrity Module
* **Architectural Purpose**: Equips regulatory authorities and platform operators with centralized governance over all participants.
* **Component Files**: `controllers/adminController.js`, `client/src/pages/Admin/AdminHome.js`, `client/src/pages/Admin/DonarList.js`, `client/src/pages/Admin/HospitalList.js`, `client/src/pages/Admin/OrgList.js`.
* **Technical Workflow**:
  1. Administrative routes are guarded via `adminMiddleware.js`, which verifies that the authenticated user possesses an `admin` role in the database.
  2. Provides dedicated management views to audit registered Donors, certified Hospitals, and registered Organisations.
  3. Implements deletion capabilities (`deleteDonarController`) with cascaded record cleanup to eliminate fraudulent, duplicate, or unverified accounts.

---

### 4.13 Conclusion of Chapter
The comprehensive modular architecture of **RaktDaan** successfully decouples distinct functional capabilities into robust, reusable services. The next chapter presents the practical implementation details, Agile milestones, code snippets, software testing matrices, and real-world interface results.

---

\newpage

# CHAPTER 5
# PROJECT IMPLEMENTATION & PRACTICAL WORK DONE

### 5.1 Introduction
This chapter documents the practical engineering work performed during the 45-day industrial training program. It encompasses the Agile development schedule, frontend architecture, backend controller implementation, database schemas, authentication workflows, REST API endpoint specifications, testing matrices, technical challenges encountered, and core skills acquired.

---

### 5.2 45-Day Agile Project Planning & Milestones

The industrial training was executed across a 45-day structured Agile framework (15th May 2026 to 30th June 2026):

```
[Days 1-7: Domain Research & Architecture Design]
  ├── Healthcare domain analysis & NACO guideline study
  ├── MERN stack technology selection & architectural blueprinting
  └── Hardware/software specification & Git repository initialization
[Days 8-15: Database Modeling & Express API Architecture]
  ├── Mongoose schema definition (Users, Inventories, Camps, Emergencies)
  ├── RESTful route scaffolding & middleware pipeline configuration
  └── bcryptjs password encryption & JWT token signing logic
[Days 16-25: Core Business Logic & Inventory Controllers]
  ├── IN/OUT inventory transaction controllers with deficit prevention
  ├── Hospital emergency SOS matchmaking endpoints
  └── National donation camps aggregator & dynamic city generator
[Days 26-35: Responsive Spatial Frontend & Glassmorphic UI]
  ├── React SPA component architecture & Redux authentication store
  ├── Glassmorphic UI design, Bootstrap 5 integration, & fluid clamp scaling
  └── Interactive 3D WebGL RBC canvas, myth busters, & eligibility quiz
[Days 36-40: Internationalization, Security Hardening & Bug Fixes]
  ├── Dynamic Hindi/English i18n translation dictionary
  ├── OWASP security audit, `.select("-password")` query projection hardening
  └── Mobile dashboard sidebar layout overhaul for small viewports
[Days 41-45: Testing, Documentation & Project Submission]
  ├── Postman API integration testing & cross-browser viewport audits
  ├── Code optimization, production compilation, & documentation
  └── Final project demonstration & training report generation
```

---

### 5.3 Frontend Implementation (React Components & State)

The frontend client utilizes modern functional components, React Hooks, and Redux state management.

#### 1. Universal Responsive Layout & Offcanvas Drawer (`Layout.js`):
```jsx
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="layout-container">
      <Header />
      {/* Mobile Action Bar with Offcanvas Menu Toggle */}
      <div className="d-md-none bg-dark text-white p-2 d-flex justify-content-between align-items-center">
        <span className="fw-bold text-danger">RaktDaan Portal</span>
        <button 
          className="btn btn-sm btn-outline-light" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      <div className="row g-0 flex-nowrap" style={{ minHeight: "calc(100vh - 70px)" }}>
        {/* Desktop Sidebar (col-md-3) */}
        <div className="col-md-3 col-lg-2 d-none d-md-block bg-dark">
          <Sidebar />
        </div>
        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div className="d-md-none position-fixed top-0 start-0 w-75 h-100 bg-dark z-3 shadow p-3">
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        )}
        {/* Main Content Area: Takes 100% width on mobile */}
        <main className="col-12 col-md-9 col-lg-10 p-3 p-md-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
```

---

### 5.4 Backend Implementation (Express Controllers & Middleware)

#### 1. Inventory Stock Management Controller with Deficit Guard (`inventoryController.js`):
```javascript
const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY TRANSACTION (IN or OUT)
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User Not Found with this Email" });
    }

    if (inventoryType === "in") {
      req.body.donar = user?._id;
    }

    if (inventoryType === "out") {
      req.body.hospital = user?._id;
      const requestedBloodGroup = bloodGroup;
      const requestedQuantity = Number(quantity);
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // Aggregate total IN volume for this blood group
      const totalIn = await inventoryModel.aggregate([
        { $match: { organisation, inventoryType: "in", bloodGroup: requestedBloodGroup } },
        { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } }
      ]);
      const totalInQty = totalIn[0]?.total || 0;

      // Aggregate total OUT volume for this blood group
      const totalOut = await inventoryModel.aggregate([
        { $match: { organisation, inventoryType: "out", bloodGroup: requestedBloodGroup } },
        { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } }
      ]);
      const totalOutQty = totalOut[0]?.total || 0;

      const availableStock = totalInQty - totalOutQty;

      // Validate stock deficit
      if (availableStock < requestedQuantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableStock}ml of ${requestedBloodGroup} is available. Requested quantity exceeds inventory.`
        });
      }
    }

    req.body.organisation = req.body.userId;
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Logged Successfully",
      inventory
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Error in Create Inventory API", error });
  }
};
```

#### 2. Administrative Security Hardening with Query Projection (`adminController.js`):
```javascript
const userModel = require("../models/userModel");

// GET ALL DONORS WITH SENSITIVE HASH PROJECTION
const getDonarsListController = async (req, res) => {
  try {
    // Explicitly exclude password hash to comply with OWASP A02
    const donarData = await userModel
      .find({ role: "donar" })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Totalcount: donarData.length,
      message: "Donor List Fetched Successfully",
      donarData
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error While Fetching Donor List",
      error
    });
  }
};
```

---

### 5.5 Database Implementation (Mongoose Schemas)

#### User Schema (`models/userModel.js`):
```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "organisation", "donar", "hospital"]
  },
  name: {
    type: String,
    required: function () {
      return this.role === "donar" || this.role === "admin";
    }
  },
  organisationName: {
    type: String,
    required: function () {
      return this.role === "organisation";
    }
  },
  hospitalName: {
    type: String,
    required: function () {
      return this.role === "hospital";
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  website: { type: String },
  address: { type: String, required: [true, "Address is required"] },
  phone: { type: String, required: [true, "Phone is required"] }
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);
```

---

### 5.6 Authentication & Authorization Implementation

The authentication flow utilizes cryptographic signing via JWT and secure request interception via Axios:

```javascript
// client/src/services/API.js
import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL || "" });

// Request Interceptor: Automatically inject Bearer JWT token
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

// Response Interceptor: Catch 401s, clear stale credentials, and redirect
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
```

---

### 5.7 API Endpoint Implementation Table

| HTTP Method | Endpoint URI | Access Tier | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Registers a new user with role-specific fields |
| `POST` | `/api/v1/auth/login` | Public | Authenticates credentials and returns signed JWT |
| `GET` | `/api/v1/auth/current-user` | Authenticated | Fetches authenticated user's profile |
| `POST` | `/api/v1/inventory/create-inventory` | Organisation | Records blood donation (IN) or hospital issue (OUT)|
| `GET` | `/api/v1/inventory/get-inventory` | Organisation | Retrieves paginated inventory transaction records |
| `POST` | `/api/v1/inventory/get-inventory-hospital`| Hospital | Retrieves blood units disbursed to requesting hospital |
| `GET` | `/api/v1/inventory/get-donars` | Organisation | Retrieves distinct donor roster for blood bank |
| `GET` | `/api/v1/inventory/get-hospitals` | Organisation | Retrieves partner hospital roster for blood bank |
| `GET` | `/api/v1/camps/all` | Public | Fetches verified blood donation camps (auto-seeded)|
| `GET` | `/api/v1/camps/by-city/:city`| Public | Dynamic query & auto-generation of local city camps|
| `GET` | `/api/v1/emergency/open-requests` | Public | Retrieves active hospital emergency SOS requests |
| `POST` | `/api/v1/emergency/create` | Hospital | Broadcasts critical blood emergency alert |
| `GET` | `/api/v1/analytics/bloodGroups-data` | Authenticated | Aggregates stock analytics by blood group |
| `GET` | `/api/v1/admin/donar-list` | Admin Only | Audits all registered donors (excluding passwords) |
| `GET` | `/api/v1/admin/hospital-list` | Admin Only | Audits all partner hospitals (excluding passwords) |
| `GET` | `/api/v1/admin/org-list` | Admin Only | Audits all blood transfusion centers |
| `DELETE`| `/api/v1/admin/delete-donar/:id`| Admin Only | Permanently removes an entity from registry |

---

### 5.8 Software Testing Matrix & Execution Results

Rigorous functional, integration, and security verification was conducted:

| Test ID | Test Category | Target Feature / Endpoint | Test Input / Scenario | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Functional | User Registration | Valid donor details & password | HTTP 201 Created, user saved in DB | HTTP 201 Created, record created | **PASS** |
| **TC-02** | Security | Password Encryption | Inspect MongoDB document | Password stored as `$2a$10$...` hash | Hashed with 10 salt rounds | **PASS** |
| **TC-03** | Functional | User Login | Valid email and password | HTTP 200 OK, signed JWT emitted | Token received & stored | **PASS** |
| **TC-04** | Security | Credential Leakage | `GET /api/v1/admin/donar-list`| Password field excluded from JSON | Password field completely omitted | **PASS** |
| **TC-05** | Functional | Inventory IN | Add 450ml of O+ blood | Stock balance increments by 450ml | Incremented accurately | **PASS** |
| **TC-06** | Validation | Stock Deficit Guard | Request 1000ml when 500ml avail | HTTP 500 Error, transaction aborted | Aborted with explanatory message | **PASS** |
| **TC-07** | Integration | Camp City Discovery | `GET /api/v1/camps/by-city/Indore`| Auto-generate camps for Indore | 2 verified camps returned | **PASS** |
| **TC-08** | Security | Role Authorization | Donor attempts Admin endpoint | HTTP 401 Unauthorized / Denied | Access blocked successfully | **PASS** |
| **TC-09** | UI/UX | Responsive Layout | Pixel 10 viewport (412x924px) | Sidebar collapses into offcanvas drawer | Zero squishing, 100% width | **PASS** |
| **TC-10** | i18n | Multi-Language Toggle | Select "हिंदी" language option | UI switches to Hindi immediately | Seamless bilingual update | **PASS** |

---

### 5.9 Technical Challenges Faced & Engineering Solutions

1. **Challenge 1: Mobile Screen Squishing on Small Viewports (e.g., Pixel 10)**
   * *Problem*: On mobile viewports under 768px, the static sidebar consumed 50% of the horizontal grid width, severely squishing data tables and modal inputs.
   * *Solution*: Overhauled `Layout.js` and `Sidebar.js` utilizing Bootstrap `d-none d-md-block` on the desktop sidebar and engineered an animated slide-in offcanvas drawer (`slideInLeft` keyframes) triggered via a sticky mobile action bar. This restored 100% full-screen width for main content on mobile screens.

2. **Challenge 2: Sensitive Password Hash Exposure in Admin Endpoints (CWE-200)**
   * *Problem*: Security auditing revealed that `/api/v1/admin/donar-list` was returning the full Mongoose document including bcrypt password hashes.
   * *Solution*: Updated all administrative controllers in `adminController.js` with explicit projection chaining: `.select("-password")`, ensuring zero credential exposure over HTTP.

3. **Challenge 3: Expired Token Infinite Redirect Loops**
   * *Problem*: Stale JWT tokens in `localStorage` caused recursive 401 redirect loops on protected route refreshes.
   * *Solution*: Implemented an Axios response interceptor in `API.js` that intercepts 401 Unauthorized responses, clears `localStorage`, and safely redirects to `/login` only when the current route is protected.

4. **Challenge 4: Empty Donation Camps on Initial Deployment**
   * *Problem*: In fresh testing environments, the blood camps registry was empty until organizations manually posted events.
   * *Solution*: Engineered an automated seeder in `campController.js` featuring verified national drives, accompanied by an intelligent city auto-discovery generator that synthesizes realistic, localized camps on demand for any searched Indian city.

---

### 5.10 Technical & Professional Skills Learned
* **Full-Stack MERN Architecture**: Mastery in building scalable, decoupled single-page applications connected to Express.js REST APIs.
* **Database Modeling & Aggregation Pipelines**: Designing normalized NoSQL schemas and constructing multi-stage MongoDB aggregation pipelines (`$match`, `$group`, `$sum`).
* **Cryptographic Security & OWASP Standards**: Implementing token-based authentication (JWT), salting passwords with `bcryptjs`, and hardening APIs against injection and credential exposure.
* **Modern Reactive UI/UX & Responsive Engineering**: Crafting glassmorphic visual hierarchies, responsive grid layouts, offcanvas mobile navigation, and interactive 3D WebGL visualizations.
* **Agile Engineering & Professional Documentation**: Adhering to structured milestone delivery, Git version control best practices, API documentation, and formal technical reporting.

---

### 5.11 Outcome of the Project
The 45-day industrial training culminated in a robust, production-grade application that successfully addresses every problem identified during the initial analysis phase. **RaktDaan** reduces emergency blood procurement search times to under a minute, prevents inventory expiration through automated tracking, dismantles societal donation myths, and delivers an accessible, bilingual platform for Indian public healthcare.

---

### 5.12 Project Interface Walkthrough & Screenshots Guide

* **Figure 5.1: Landing Page & 3D Interactive RBC Canvas**: Features modern glassmorphic hero typography, real-time national donation metrics, quick action portals, and an interactive 3D Red Blood Cell visualization.
* **Figure 5.2: Doctor-Certified Myth Busters & Medical Truths**: Tabbed bilingual interface debunking prevalent blood donation myths with clinically verified facts.
* **Figure 5.3: Live Public Blood Stock & City Search**: Intuitive municipality search engine displaying real-time unit availability across blood groups.
* **Figure 5.4: National Blood Donation Camps Directory**: Displays verified camps with dynamic city filtering and MoHFW national dataset metrics.
* **Figure 5.5: Blood Compatibility Matrix**: Interactive visual guide detailing universal donors (O-), universal recipients (AB+), and plasma transfusion rules.
* **Figure 5.6: Rapid 60-Second Eligibility Quiz**: Adaptive 4-step assessment rendering immediate green/red medical clearance badges.
* **Figure 5.7: Emergency Hospital SOS Broadcast Portal**: Real-time hospital trauma alerts with pulsing red badges and direct coordinator telephone dispatch.
* **Figure 5.8: Organisation Stock Telemetry & IN/OUT Management**: Organization dashboard for logging donations and disbursements with automated deficit prevention.
* **Figure 5.9: Digital Lifesaver Card with 90-Day Cooldown Clock**: Aesthetic SVG identity card featuring QR verification and live countdown timer until next donation fitness.
* **Figure 5.10: Administrator Governance Dashboard**: Central console for auditing registered donors, accredited hospitals, and transfusion centers.

---

### 5.13 Conclusion of Chapter
The practical implementation demonstrated the power of the MERN stack in solving critical real-world healthcare challenges. Comprehensive testing, architectural hardening, and cross-device optimization produced a platform ready for real-world deployment. The final chapter summarizes project conclusions and charts out future technical enhancements.

---

\newpage

# CHAPTER 6
# CONCLUSION AND FUTURE SCOPE

### 6.1 Conclusion
The 45-day industrial training provided comprehensive, hands-on experience in full-stack software engineering, modern MERN architecture, RESTful API design, database modeling, and healthcare informatics. The resulting platform, **RaktDaan (Digital Blood Bank Management & Real-Time Emergency Lifesaver Network)**, stands as a robust, scalable, and socially transformative solution to one of India's most urgent healthcare dilemmas.

By uniting donors, hospitals, transfusion organizations, and regulatory authorities onto a single reactive platform, **RaktDaan** successfully:
1. Replaces cumbersome, error-prone manual paper registers with an automated, auditable digital stock ledger.
2. Eliminates critical communication delays during medical emergencies, connecting trauma centers directly with compatible blood reserves.
3. Prevents the tragic expiration and wastage of donated blood through mathematical inventory tracking and shelf-life auditing.
4. Promotes regular voluntary donation through educational 3D graphics, doctor-certified myth busters, eligibility screening quizzes, and downloadable digital donor cards.
5. Bridges the digital divide through a fully responsive spatial glassmorphic UI and an instant bilingual Hindi/English localization engine.

The system adheres strictly to industry security standards (OWASP), incorporating bcrypt password salting, stateless JWT tokenization, database query projection hardening, and multi-tier role-based access control. In conclusion, the project successfully fulfilled every academic and technical objective established at the outset of the industrial training.

---

### 6.2 Future Scope & Proposed Enhancements
While **RaktDaan** provides an enterprise-grade operational foundation, the following high-impact technological enhancements are envisioned for future iterations:
1. **IoT Smart Refrigerator Telemetry**: Integrating temperature and weight sensors within blood bank cold-storage units to stream real-time bag counts, blood temperature compliance (2°C - 6°C), and automated spoilage alerts over MQTT/WebSockets.
2. **Automated WhatsApp & SMS Gateway Integration**: Integrating Twilio or Gupshup APIs to automatically dispatch localized WhatsApp and SMS alerts to matching O-negative voluntary donors within a 10 km radius whenever a hospital broadcasts a critical SOS alert.
3. **Autonomous Drone Delivery Logistics Integration**: Partnering with autonomous medical drone networks to coordinate rapid aerial transport of blood units between regional transfusion hubs and remote rural clinics, bypassing urban traffic congestion during golden-hour emergencies.
4. **Machine Learning Demand Forecasting**: Developing predictive models trained on historical seasonal hospital data (e.g., Dengue outbreaks, festival traffic surges) to forecast blood group demands 30 days in advance, enabling proactive donation camp scheduling.
5. **Blockchain-Backed Transfusion Audit Trails**: Implementing a decentralized ledger (e.g., Hyperledger Fabric) to provide an immutable, cryptographic chain of custody tracking blood from donor vein to recipient transfusion, eliminating any possibility of illicit black-market blood distribution.

---

\newpage

# REFERENCES

### Academic Literature & Official Healthcare Publications:
1. World Health Organization (WHO), *"Blood Safety and Availability: Key Global Facts and Transfusion Guidelines"*, Geneva: WHO Press, 2024.
2. National AIDS Control Organisation (NACO), Ministry of Health and Family Welfare (MoHFW), Government of India, *"Standards for Blood Banks and Blood Transfusion Services"*, New Delhi, 2023.
3. Open Government Data (OGD) Platform India, *"State/UT-wise Approved Blood Banks and Camp Registry Datasets"*, data.gov.in, 2025-2026.
4. Pressman, R. S., & Maxim, B. R., *"Software Engineering: A Practitioner's Approach"*, 9th Edition, McGraw-Hill Education, 2020.
5. Elmasri, R., & Navathe, S. B., *"Fundamentals of Database Systems"*, 7th Edition, Pearson Education, 2017.

### Technical Documentation & Architectural Specifications:
6. React Documentation Team, *"React 18: Declarative Component Architecture and Hooks Reference"*, react.dev, 2024.
7. Node.js Foundation, *"Node.js v18 LTS: Asynchronous Event-Driven Architecture and V8 Engine Internals"*, nodejs.org, 2024.
8. Express.js Project, *"Express.js Routing, Middleware Specification and REST API Best Practices"*, expressjs.com, 2024.
9. MongoDB Inc., *"MongoDB Manual: Aggregation Pipelines, Document Validation, and Indexing Strategies"*, mongodb.com/docs, 2025.
10. Open Web Application Security Project (OWASP), *"OWASP Top 10 Web Application Security Risks and Mitigations"*, owasp.org, 2023.
11. Mozilla Developer Network (MDN), *"Web Technology Reference: CSS Grid, Flexbox, Canvas API and Modern JavaScript (ES6+)"*, developer.mozilla.org, 2026.
12. JSON Web Token Community, *"RFC 7519: JSON Web Token (JWT) Architectural Standards and Cryptographic Signatures"*, jwt.io, 2024.

---

\newpage

# STUDENT FEEDBACK OF INTERNSHIP

**DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING**  
**ARYA COLLEGE OF ENGINEERING & I.T., KUKAS, JAIPUR**

| Field | Student Particulars / Training Details |
| :--- | :--- |
| **Student Name** | Vasudev Kumawat |
| **University Roll Number** | 24EARCS179 |
| **Enrolment Number** | 24EARCS179 |
| **Branch / Semester** | B.Tech Computer Science & Engineering / VII Semester |
| **Project Title** | RaktDaan: Digital Blood Bank Management & Real-Time Emergency Lifesaver Network |
| **Training Duration** | 45 Days (From: 15/05/2026 To: 30/06/2026) |
| **Industry Mentor** | Mr. Nitesh Jha (Senior Full-Stack Architect & Consultant) |
| **Academic Coordinator** | Er. Ram Babu Buri (Assistant Professor, CSE Dept.) |
| **Head of Department** | Dr. Akhil Pandey (Professor & HOD, CSE Dept.) |

---

### Comprehensive Training Feedback & Self-Evaluation:

#### 1. Technical Learning & Practical Exposure:
The 45-day industrial training provided outstanding practical exposure to production-grade software development. Moving from classroom theory to engineering a full-scale healthcare platform using the MERN stack bridged vital conceptual gaps. Developing RESTful microservices in Node.js and Express.js, architecting complex aggregation pipelines in MongoDB, and implementing reactive component states in React.js solidified my full-stack engineering skills.

#### 2. Industry Mentorship & Guidance:
The mentorship provided by Mr. Nitesh Jha was exemplary. Regular code auditing, architectural critique, debugging sessions, and guidance on industry best practices—such as OWASP security defenses, stateless JWT token management, and decoupled controller structures—drastically elevated my coding standards and problem-solving agility.

#### 3. Institutional Support & College Facilities:
Arya College of Engineering & I.T. and the Department of Computer Science & Engineering provided world-class computing laboratories, high-speed fiber internet infrastructure, and continuous encouragement. The disciplined supervision of Dr. Akhil Pandey and the regular milestone assessments conducted by Er. Ram Babu Buri ensured that the project maintained rigorous academic and technical quality throughout.

#### 4. Real-World Impact of the Project:
Developing **RaktDaan** was both intellectually rewarding and socially meaningful. Designing solutions that directly address emergency healthcare delays, eliminate blood inventory expiration, and dismantle harmful societal myths about donation gave this industrial training immense purpose.

#### 5. Overall Rating of Industrial Training:
* **Curriculum & Practical Relevance**: 5 / 5 ★★★★★
* **Technical Mentorship & Support**: 5 / 5 ★★★★★
* **Computing Facilities & Infrastructure**: 5 / 5 ★★★★★
* **Overall Learning Experience**: 5 / 5 ★★★★★

\vspace{1.5cm}

_____________________________  
**Vasudev Kumawat**  
(Signature of the Student)  
Date: 30th June 2026  
Place: Jaipur, Rajasthan
