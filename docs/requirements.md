# Business Requirements Document (BRD)
## UrbanNest Interiors — Level 1 Website Development Project
**Client:** UrbanNest Interiors  
**Location:** 12, Lake View Road, Anna Nagar, Chennai, Tamil Nadu 600040  
**Program:** CYVEXA Project-Based Internship Program (October 2026)  
**Author:** Senior Web Developer & UI/UX Designer  

---

## 1. Executive Summary & Brand Background
UrbanNest Interiors is a residential and small-office interior design studio founded in 2018 in Anna Nagar, Chennai. Over eight years of operation, the studio has grown to a 14-member full-time team comprising principal architects, interior designers, 3D visualizers, and civil site engineers. Having completed over 250 projects across Chennai, Coimbatore, and Bengaluru, UrbanNest is known for its warm, modern, trustworthy, and minimal aesthetic, anchored by the tagline: **"Spaces that feel like you."**

---

## 2. Audience Analysis & Visitor Personas

| Persona Profile | Demographics & Context | Goals & Motivations | Pain Points & Hesitations | Website Requirements |
| :--- | :--- | :--- | :--- | :--- |
| **New Homeowner (First-Time Buyer)** | Age 28–42, IT professional or doctor, recently bought a 2BHK/3BHK in Velachery, Porur, or OMR. | Wants a functional, aesthetic home delivered before housewarming; needs durable modular kitchen and bedroom wardrobes. | Fear of contractor delays, hidden costs, and sub-par plywood quality. | Clear 45-day handover guarantee, transparent package pricing, 10-year warranty proof, real client reviews. |
| **Home Renovator** | Age 38–55, owns an independent house or older flat in Anna Nagar, T. Nagar, or Mylapore. | Wants modern flooring, modular kitchen overhaul, false ceiling with ambient cove lighting, and repainting. | Living in the home during renovation; afraid of endless dust, disruption, and spiraling budgets. | Room-by-room makeover packages, dust-managed process explanation, before/after showcases, direct consultation booking. |
| **Startup Founder / Small Business Owner** | Age 26–45, tech or creative entrepreneur setting up an office in Guindy, Taramani, or Nungambakkam. | Needs 20–50 collaborative workstations, acoustic meeting rooms, ergonomic furniture, and high-impact reception area. | Strict lease launch deadlines, need for scalable furniture, cable management, commercial electrical compliance. | Dedicated commercial services section, turnkey scope breakdown, responsive site visit booking, clear corporate credentials. |
| **Non-Resident Indian (NRI) Property Owner** | Age 35–60, living in US, UAE, or Singapore, owning investment property in Chennai. | Needs reliable turnkey execution with minimal physical oversight and complete remote accountability. | Cannot visit the site frequently; needs total transparency, photo/video progress updates, digital contracts. | 3D walkthroughs, remote consultation process, clear milestones, digital enquiry channel. |

---

## 3. Business Goals for the Website
1. **Establish Immediate Trust & Credibility:** Highlight 8 years in business, 250+ completed homes, 14 in-house specialists, and 4.8/5 client satisfaction across Tamil Nadu.
2. **Promote Service Transparency:** Clearly articulate the 6 core design offerings with realistic starting prices and scope breakdowns to eliminate client hesitation.
3. **Drive High-Intent Lead Generation:** Offer a frictionless, multi-channel consultation request flow ("Book a Free 30-Minute Consultation") as the primary Call to Action (CTA) on every page.
4. **Deliver Mobile-First Performance:** Ensure sub-2-second load times on 4G mobile networks, zero horizontal scrolling, and touch-optimized navigation (minimum 44px tap targets).
5. **Differentiate Through Contextual Utility:** Integrate live Chennai weather telemetry via Open-Meteo to advise clients on ideal days for on-site room measurements and daylight inspections.

---

## 4. Page-by-Page Specifications & Core Goals

### Page 1: Home (`index.html`)
* **Primary Objective:** Deliver immediate brand positioning, convey the "Spaces that feel like you" ethos, showcase signature work, and capture initial consultation leads.
* **Essential Content Sections:**
  * **Hero Section:** Impactful serif headline, sub-headline emphasizing time and budget adherence, dual CTAs ("Book a Free Consultation" & "Explore Our Services"), floating social proof badge (4.8★ rating), and high-resolution hero image (`hero.jpg`).
  * **Services Preview Grid:** Top 3 featured services (Full Home Interiors, Modular Kitchen, Living & Bedroom Design) with starting prices and link to full catalogue.
  * **The UrbanNest Advantage (Why Us):** 4 core pillars — Personalized Design, Transparent Pricing, In-House Execution, and 1-Year Post-Handover Warranty.
  * **Live Chennai Field Weather Feed:** Live temperature, wind, humidity, and on-site consultation recommendation index via Open-Meteo API.
  * **Interactive Testimonial Carousel:** Real reviews from Velachery, Porur, and Guindy clients with auto-rotation, dot indicators, and touch swipe.
  * **High-Impact CTA Banner:** Direct prompt to schedule a discovery session.
  * **Global Footer:** Studio address, phone, email, working hours, social links, sitemap, and credits.

### Page 2: About (`about.html`)
* **Primary Objective:** Build deep emotional connection and professional authority by sharing the founding journey, design philosophy, leadership team, and verifiable track record.
* **Essential Content Sections:**
  * **Founding Story:** Narrative tracing the 2018 origins with two passionate designers to today’s 14-member multi-city studio.
  * **Animated Milestones Counter:** Interactive dynamic counters for 250+ projects, 8 years, 180+ families, and 4.8/5 rating.
  * **Core Principles:** Human-centered design, millimeter precision, radical transparency, and punctual delivery.
  * **Leadership Profiles:** 4 key team members with photos/initials, roles, and expertise:
    * *Ananya Iyer* (Founder & Principal Designer)
    * *Rohit Menon* (Head of Projects)
    * *Sneha Pillai* (Senior 3D Visualizer)
    * *Vijay Kumar* (Site Operations Lead)
  * **Studio Gallery:** Visual showcase of finished residential work.

### Page 3: Services (`services.html`)
* **Primary Objective:** Educate prospects on available packages, establish budget expectations, demystify the design-to-handover journey, and address common objections through an FAQ accordion.
* **Essential Content Sections:**
  * **Interactive Category Filter:** Filter buttons ("All", "Residential", "Modular & Rooms", "Commercial & Renovation").
  * **6 Comprehensive Service Cards:**
    1. *Full Home Interiors* (from ₹ 4,50,000)
    2. *Modular Kitchen* (from ₹ 1,20,000)
    3. *Living & Bedroom Design* (from ₹ 65,000)
    4. *Office Interiors* (from ₹ 3,00,000)
    5. *3D Design & Visualization* (from ₹ 15,000)
    6. *Renovation & Makeover* (from ₹ 80,000)
  * **4-Step Execution Workflow:** Consult &rarr; Design &rarr; Build &rarr; Handover with milestone expectations.
  * **Transparent Package Tiers:** Essential Nest (₹ 2.8L), Signature Nest (₹ 4.5L), and Luxury Villa (₹ 8.5L).
  * **Interactive FAQ Accordion:** Expandable answers covering handover timelines (45 days), material warranties, payment milestones, and customization.

### Page 4: Contact (`contact.html`)
* **Primary Objective:** Convert motivated visitors into booked consultations through a robust, validated enquiry form while providing clear physical and digital contact channels.
* **Essential Content Sections:**
  * **Interactive Consultation Form:** Complete validation for Full Name, Email, Phone, Service, Budget, Message (with live character counter), and Consent checkbox.
  * **Inline Error Feedback & Success Confirmation:** Zero modal alert boxes; accessible error states and personalized confirmation banners.
  * **Studio Information Panel:** 12 Lake View Road address, telephone +91 90000 00000, email, and operating hours (Mon–Sat 9:30 AM – 6:30 PM).
  * **Embedded Interactive Map:** Google Maps iframe centered on Anna Nagar, Chennai.
  * **Live Weather Advisory:** Contextual weather advisory for clients planning a physical visit to the studio.

---

## 5. Technical, Design & Compliance Specifications

| Specification Area | Standard / Implementation Requirement |
| :--- | :--- |
| **Technology Stack** | Semantic HTML5, Modular Modern CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+). Zero external framework overhead. |
| **Design Palette** | Deep Green `#2F5D50`, Warm Gold `#E9C46A`, Cream `#F4F1EA`, Charcoal `#264653`, White `#FFFFFF`. |
| **Typography** | Headings: *Playfair Display* (Google Fonts); Body: *Inter* (Google Fonts). |
| **Responsive Standards** | Verified at 360px (Mobile), 768px (Tablet), and 1280px (Desktop). No horizontal scrollbar at any viewport. |
| **Accessibility (WCAG 2.1 AA)** | Skip navigation links, minimum 4.5:1 text contrast, 44x44px minimum touch targets, ARIA tags, keyboard focus rings. |
| **Public API Integration** | Open-Meteo REST API (Latitude 13.0827, Longitude 80.2707) with loading skeleton, error fallback, and retry controls. |
| **Security Standards** | HTML escaping on dynamic output, `rel="noopener noreferrer"` on external links, HTTPS URLs only, no hardcoded secrets. |
| **SEO & Performance** | Unique `<title>` and `<meta name="description">` per page, Open Graph metadata, semantic heading hierarchy (`h1` through `h4`), lazy-loaded images under 200 KB. |

---
*Document approved for CYVEXA Level 1 Internship submission.*

