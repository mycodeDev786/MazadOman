import { assets } from "@/assets/assets";
const categories = [
  {
    id: "cat-101",
    title: "Consumer Electronics & Appliances",
    subcategories: [
      {
        id: "sub-101-1",
        title: "Home Appliance",
        iconSrc: assets.domest_app,
        bg: "bg-sky-100",
      },
      {
        id: "sub-101-2",
        title: "Kitchen Appliance",
        iconSrc: assets.kitchen,
        bg: "bg-emerald-100",
      },
      {
        id: "sub-101-3",
        title: "Phone & Tablet",
        iconSrc: assets.mobile,
        bg: "bg-rose-100",
      },
      {
        id: "sub-101-4",
        title: "Watches",
        iconSrc: assets.watches,
        bg: "bg-teal-100",
      },
    ],
  },
  {
    id: "cat-102",
    title: "Health, Beauty & Personal Care",
    subcategories: [
      {
        id: "sub-102-1",
        title: "Health & Beauty",
        iconSrc: assets.beauty,
        bg: "bg-violet-100",
      },
      {
        id: "sub-102-2",
        title: "Personal Care",
        iconSrc: assets.skin,
        bg: "bg-amber-100",
      },
    ],
  },
  {
    id: "cat-103",
    title: "Facility Services",
    subcategories: [
      {
        id: "sub-103-1",
        title: "Facility Management",
        iconSrc: assets.facility,
        bg: "bg-rose-100",
      },
    ],
  },
  {
    id: "cat-1",
    title: "Construction & Infrastructure",
    subcategories: [
      {
        id: "sub-1-1",
        title: "Civil Works",
      },
      {
        id: "sub-1-2",
        title: "Road Construction & Maintenance",
      },
      {
        id: "sub-1-3",
        title: "Bridges & Tunnels",
      },
      {
        id: "sub-1-4",
        title: "Building Construction (Commercial, Residential, Government)",
      },
      {
        id: "sub-1-5",
        title: "Landscaping & Urban Development",
      },
      {
        id: "sub-1-6",
        title: "Water & Wastewater Infrastructure",
      },
      {
        id: "sub-1-7",
        title: "Ports & Airports",
      },
    ],
  },
  {
    id: "cat-2",
    title: "Oil, Gas & Petrochemicals",
    subcategories: [
      {
        id: "sub-2-1",
        title: "Drilling Services",
      },
      {
        id: "sub-2-2",
        title: "Engineering, Procurement & Construction (EPC)",
      },
      {
        id: "sub-2-3",
        title: "Pipeline Construction & Maintenance",
      },
      {
        id: "sub-2-4",
        title: "Refinery & Petrochemical Services",
      },
      {
        id: "sub-2-5",
        title: "Oilfield Equipment & Services",
      },
      {
        id: "sub-2-6",
        title: "HSE (Health, Safety & Environment) Services",
      },
      {
        id: "sub-2-7",
        title: "Offshore & Onshore Support Services",
      },
    ],
  },
  {
    id: "cat-3",
    title: "Artificial Intelligence & Emerging Technologies",
    subcategories: [
      {
        id: "sub-3-1",
        title: "AI Solutions & Automation",
      },
      {
        id: "sub-3-2",
        title: "Machine Learning & Predictive Analytics",
      },
      {
        id: "sub-3-3",
        title: "IoT (Internet of Things) Solutions",
      },
      {
        id: "sub-3-4",
        title: "Blockchain Applications",
      },
      {
        id: "sub-3-5",
        title: "Augmented & Virtual Reality",
      },
      {
        id: "sub-3-6",
        title: "Smart City Solutions",
      },
    ],
  },
  {
    id: "cat-4",
    title: "Disaster Management & Emergency Services",
    subcategories: [
      {
        id: "sub-4-1",
        title: "Disaster Preparedness Planning",
      },
      {
        id: "sub-4-2",
        title: "Emergency Response Services",
      },
      {
        id: "sub-4-3",
        title: "Rescue Equipment Supply",
      },
      {
        id: "sub-4-4",
        title: "Medical Evacuation Services",
      },
      {
        id: "sub-4-5",
        title: "Fire & Flood Mitigation Solutions",
      },
      {
        id: "sub-4-6",
        title: "Risk Assessment & Resilience Consulting",
      },
    ],
  },
  {
    id: "cat-5",
    title: "Veterinary & Animal Services",
    subcategories: [
      {
        id: "sub-5-1",
        title: "Veterinary Clinics & Services",
      },
      {
        id: "sub-5-2",
        title: "Animal Feed & Nutrition",
      },
      {
        id: "sub-5-3",
        title: "Livestock Equipment",
      },
      {
        id: "sub-5-4",
        title: "Animal Breeding & Care",
      },
      {
        id: "sub-5-5",
        title: "Animal Health Pharmaceuticals",
      },
      {
        id: "sub-5-6",
        title: "Wildlife Management",
      },
    ],
  },
  {
    id: "cat-6",
    title: "Social & Community Services",
    subcategories: [
      {
        id: "sub-6-1",
        title: "NGO & Nonprofit Support Services",
      },
      {
        id: "sub-6-2",
        title: "Social Work & Welfare Services",
      },
      {
        id: "sub-6-3",
        title: "Community Outreach Programs",
      },
      {
        id: "sub-6-4",
        title: "Disability Services",
      },
      {
        id: "sub-6-5",
        title: "Elderly Care & Facilities",
      },
      {
        id: "sub-6-6",
        title: "Orphanage & Shelter Services",
      },
    ],
  },
  {
    id: "cat-7",
    title: "Meteorological & Geophysical Services",
    subcategories: [
      {
        id: "sub-7-1",
        title: "Weather Monitoring Equipment",
      },
      {
        id: "sub-7-2",
        title: "Seismic Monitoring Systems",
      },
      {
        id: "sub-7-3",
        title: "Environmental Sensors",
      },
      {
        id: "sub-7-4",
        title: "Oceanographic Survey Services",
      },
      {
        id: "sub-7-5",
        title: "Geological Mapping",
      },
      {
        id: "sub-7-6",
        title: "Satellite Imaging Services",
      },
    ],
  },
  {
    id: "cat-8",
    title: "Fire Protection & Safety Engineering",
    subcategories: [
      {
        id: "sub-8-1",
        title: "Fire Suppression Systems",
      },
      {
        id: "sub-8-2",
        title: "Fire Alarm & Detection Systems",
      },
      {
        id: "sub-8-3",
        title: "Fireproofing & Insulation Materials",
      },
      {
        id: "sub-8-4",
        title: "Safety Training & Drills",
      },
      {
        id: "sub-8-5",
        title: "Fire Safety Audits",
      },
      {
        id: "sub-8-6",
        title: "Fire Retardant Coatings",
      },
    ],
  },
  {
    id: "cat-9",
    title: "Academic & Research Institutions",
    subcategories: [
      {
        id: "sub-9-1",
        title: "Universities & Colleges",
      },
      {
        id: "sub-9-2",
        title: "Think Tanks & Research Institutes",
      },
      {
        id: "sub-9-3",
        title: "Academic Publishing",
      },
      {
        id: "sub-9-4",
        title: "Research Funding Bodies",
      },
      {
        id: "sub-9-5",
        title: "Educational Program Accreditation",
      },
      {
        id: "sub-9-6",
        title: "Laboratory Services",
      },
    ],
  },
  {
    id: "cat-10",
    title: "Cultural Affairs & Religious Services",
    subcategories: [
      {
        id: "sub-10-1",
        title: "Mosque Construction & Maintenance",
      },
      {
        id: "sub-10-2",
        title: "Quran Printing & Distribution",
      },
      {
        id: "sub-10-3",
        title: "Religious Training & Events",
      },
      {
        id: "sub-10-4",
        title: "Cultural Heritage Conservation",
      },
      {
        id: "sub-10-5",
        title: "Religious Travel Services (Hajj, Umrah)",
      },
      {
        id: "sub-10-6",
        title: "Religious Supplies",
      },
    ],
  },
  {
    id: "cat-11",
    title: "Custom Fabrication & Prototyping",
    subcategories: [
      {
        id: "sub-11-1",
        title: "CNC Machining & 3D Printing",
      },
      {
        id: "sub-11-2",
        title: "Steel & Metal Fabrication",
      },
      {
        id: "sub-11-3",
        title: "Industrial Prototyping",
      },
      {
        id: "sub-11-4",
        title: "Plastic & Composite Molding",
      },
      {
        id: "sub-11-5",
        title: "Precision Engineering Services",
      },
      {
        id: "sub-11-6",
        title: "Bespoke Design & Fabrication",
      },
    ],
  },
  {
    id: "cat-12",
    title: "Marine Biology & Fisheries Development",
    subcategories: [
      {
        id: "sub-12-1",
        title: "Aquaculture Equipment & Supplies",
      },
      {
        id: "sub-12-2",
        title: "Marine Research Services",
      },
      {
        id: "sub-12-3",
        title: "Hatchery Setup & Maintenance",
      },
      {
        id: "sub-12-4",
        title: "Sustainable Fishing Equipment",
      },
      {
        id: "sub-12-5",
        title: "Seafood Processing & Packaging",
      },
      {
        id: "sub-12-6",
        title: "Coastal Monitoring Systems",
      },
    ],
  },
  {
    id: "cat-13",
    title: "Space Technology & Satellite Services",
    subcategories: [
      {
        id: "sub-13-1",
        title: "Satellite Ground Station Equipment",
      },
      {
        id: "sub-13-2",
        title: "Remote Sensing & Imaging",
      },
      {
        id: "sub-13-3",
        title: "Space R&D Consulting",
      },
      {
        id: "sub-13-4",
        title: "Satellite Data Analysis",
      },
      {
        id: "sub-13-5",
        title: "National Space Program Support",
      },
      {
        id: "sub-13-6",
        title: "CubeSat & Microsatellite Services",
      },
    ],
  },
  {
    id: "cat-14",
    title: "Rehabilitation & Accessibility Services",
    subcategories: [
      {
        id: "sub-14-1",
        title: "Disability Aids & Equipment",
      },
      {
        id: "sub-14-2",
        title: "Accessibility Infrastructure (Ramps, Elevators)",
      },
      {
        id: "sub-14-3",
        title: "Occupational Therapy Services",
      },
      {
        id: "sub-14-4",
        title: "Prosthetics & Orthotics",
      },
      {
        id: "sub-14-5",
        title: "Home Modification Services",
      },
      {
        id: "sub-14-6",
        title: "Inclusive Design Consultancy",
      },
    ],
  },

  {
    id: "cat-16",
    title: "Banking & Financial Services",
    subcategories: [
      { id: "sub-16-1", title: "Commercial & Islamic Banking Services" },
      { id: "sub-16-2", title: "Insurance & Reinsurance" },
      { id: "sub-16-3", title: "Investment & Asset Management" },
      { id: "sub-16-4", title: "Payment Solutions & FinTech" },
      { id: "sub-16-5", title: "Financial Advisory & Consultancy" },
      { id: "sub-16-6", title: "Microfinance & Credit Services" },
    ],
  },
  {
    id: "cat-17",
    title: "Procurement & Supply Chain",
    subcategories: [
      { id: "sub-17-1", title: "General Trading & Supply" },
      { id: "sub-17-2", title: "Vendor Management" },
      { id: "sub-17-3", title: "Strategic Sourcing" },
      { id: "sub-17-4", title: "Inventory Management" },
      { id: "sub-17-5", title: "Procurement Consultancy" },
      { id: "sub-17-6", title: "Tender Management Services" },
    ],
  },
  {
    id: "cat-18",
    title: "Textiles, Garments & Uniforms",
    subcategories: [
      { id: "sub-18-1", title: "Industrial Uniforms" },
      { id: "sub-18-2", title: "School Uniforms" },
      { id: "sub-18-3", title: "Military & Security Apparel" },
      { id: "sub-18-4", title: "Hospital Garments" },
      { id: "sub-18-5", title: "Traditional Clothing" },
      { id: "sub-18-6", title: "Fabric & Raw Materials" },
    ],
  },
  {
    id: "cat-19",
    title: "Printing, Advertising & Media",
    subcategories: [
      { id: "sub-19-1", title: "Printing & Publishing" },
      { id: "sub-19-2", title: "Graphic Design" },
      { id: "sub-19-3", title: "Outdoor Advertising (Billboards, Hoardings)" },
      { id: "sub-19-4", title: "Digital Marketing" },
      { id: "sub-19-5", title: "Media Production & Broadcasting" },
      { id: "sub-19-6", title: "Corporate Branding Services" },
    ],
  },
  {
    id: "cat-20",
    title: "Automotive & Heavy Vehicles",
    subcategories: [
      { id: "sub-20-1", title: "Car Dealerships" },
      { id: "sub-20-2", title: "Spare Parts & Accessories" },
      { id: "sub-20-3", title: "Heavy Equipment & Machinery" },
      { id: "sub-20-4", title: "Vehicle Leasing & Rental" },
      { id: "sub-20-5", title: "Fleet Maintenance" },
      { id: "sub-20-6", title: "Vehicle Tracking Systems" },
    ],
  },
  {
    id: "cat-21",
    title: "Retail & Wholesale Trade",
    subcategories: [
      { id: "sub-21-1", title: "Consumer Goods" },
      { id: "sub-21-2", title: "Electronics & Appliances" },
      { id: "sub-21-3", title: "Building Materials" },
      { id: "sub-21-4", title: "Food & Beverages Wholesale" },
      { id: "sub-21-5", title: "Industrial Tools & Supplies" },
      { id: "sub-21-6", title: "Hypermarkets & Department Stores" },
    ],
  },
  {
    id: "cat-22",
    title: "Legal & Regulatory Services",
    subcategories: [
      { id: "sub-22-1", title: "Corporate Legal Services" },
      { id: "sub-22-2", title: "Regulatory Compliance" },
      { id: "sub-22-3", title: "Arbitration & Mediation" },
      { id: "sub-22-4", title: "Intellectual Property Services" },
      { id: "sub-22-5", title: "Public Notary & Documentation" },
      { id: "sub-22-6", title: "Government Liaison Services" },
    ],
  },
  {
    id: "cat-23",
    title: "Safety & Security Equipment",
    subcategories: [
      { id: "sub-23-1", title: "CCTV & Surveillance Systems" },
      { id: "sub-23-2", title: "Firefighting Equipment" },
      { id: "sub-23-3", title: "Personal Protective Equipment (PPE)" },
      { id: "sub-23-4", title: "Alarm & Access Control Systems" },
      { id: "sub-23-5", title: "Security Audits" },
      { id: "sub-23-6", title: "Emergency Preparedness Solutions" },
    ],
  },
  {
    id: "cat-24",
    title: "Marine & Shipbuilding",
    subcategories: [
      { id: "sub-24-1", title: "Shipbuilding & Repair" },
      { id: "sub-24-2", title: "Marine Engineering" },
      { id: "sub-24-3", title: "Navigation & Communication Equipment" },
      { id: "sub-24-4", title: "Offshore Vessels Services" },
      { id: "sub-24-5", title: "Dredging & Marine Construction" },
      { id: "sub-24-6", title: "Diving & Underwater Services" },
    ],
  },
  {
    id: "cat-25",
    title: "Mining & Minerals",
    subcategories: [
      { id: "sub-25-1", title: "Quarrying & Extraction" },
      { id: "sub-25-2", title: "Crushing & Screening Equipment" },
      { id: "sub-25-3", title: "Geological Surveys" },
      { id: "sub-25-4", title: "Mineral Processing" },
      { id: "sub-25-5", title: "Mining Consultancy" },
      { id: "sub-25-6", title: "Explosives & Blasting Services" },
    ],
  },
  {
    id: "cat-26",
    title: "Cultural, Heritage & Creative Industries",
    subcategories: [
      { id: "sub-26-1", title: "Museums & Heritage Site Services" },
      { id: "sub-26-2", title: "Cultural Event Management" },
      { id: "sub-26-3", title: "Art Supplies & Installations" },
      { id: "sub-26-4", title: "Traditional Handicrafts" },
      { id: "sub-26-5", title: "Media & Film Production" },
      { id: "sub-26-6", title: "Creative Design Services" },
    ],
  },
  {
    id: "cat-27",
    title: "Energy & Utilities",
    subcategories: [
      {
        id: "sub-27-1",
        title: "Renewable Energy Projects (Solar, Wind, Hydro)",
      },
      { id: "sub-27-2", title: "Energy Efficiency Solutions" },
      { id: "sub-27-3", title: "Utility Metering Systems" },
      { id: "sub-27-4", title: "Smart Grid Solutions" },
      { id: "sub-27-5", title: "Energy Audits" },
      { id: "sub-27-6", title: "Power Purchase & Trading" },
    ],
  },
  {
    id: "cat-28",
    title: "Research & Innovation",
    subcategories: [
      { id: "sub-28-1", title: "Scientific Research Services" },
      { id: "sub-28-2", title: "Innovation Centers & Labs" },
      { id: "sub-28-3", title: "Prototype Development" },
      { id: "sub-28-4", title: "Patent Filing Services" },
      { id: "sub-28-5", title: "Academic-Industry Partnerships" },
      { id: "sub-28-6", title: "Incubators & Accelerators" },
    ],
  },

  {
    id: "cat-41",
    title: "Artificial Intelligence & Emerging Technologies",
    subcategories: [
      { id: "sub-41-1", title: "AI Solutions & Automation" },
      { id: "sub-41-2", title: "Machine Learning & Predictive Analytics" },
      { id: "sub-41-3", title: "IoT (Internet of Things) Solutions" },
      { id: "sub-41-4", title: "Blockchain Applications" },
      { id: "sub-41-5", title: "Augmented & Virtual Reality" },
      { id: "sub-41-6", title: "Smart City Solutions" },
    ],
  },
  {
    id: "cat-42",
    title: "Disaster Management & Emergency Services",
    subcategories: [
      { id: "sub-42-1", title: "Disaster Preparedness Planning" },
      { id: "sub-42-2", title: "Emergency Response Services" },
      { id: "sub-42-3", title: "Rescue Equipment Supply" },
      { id: "sub-42-4", title: "Medical Evacuation Services" },
      { id: "sub-42-5", title: "Fire & Flood Mitigation Solutions" },
      { id: "sub-42-6", title: "Risk Assessment & Resilience Consulting" },
    ],
  },
  {
    id: "cat-43",
    title: "Veterinary & Animal Services",
    subcategories: [
      { id: "sub-43-1", title: "Veterinary Clinics & Services" },
      { id: "sub-43-2", title: "Animal Feed & Nutrition" },
      { id: "sub-43-3", title: "Livestock Equipment" },
      { id: "sub-43-4", title: "Animal Breeding & Care" },
      { id: "sub-43-5", title: "Animal Health Pharmaceuticals" },
      { id: "sub-43-6", title: "Wildlife Management" },
    ],
  },
  {
    id: "cat-44",
    title: "Social & Community Services",
    subcategories: [
      { id: "sub-44-1", title: "NGO & Nonprofit Support Services" },
      { id: "sub-44-2", title: "Social Work & Welfare Services" },
      { id: "sub-44-3", title: "Community Outreach Programs" },
      { id: "sub-44-4", title: "Disability Services" },
      { id: "sub-44-5", title: "Elderly Care & Facilities" },
      { id: "sub-44-6", title: "Orphanage & Shelter Services" },
    ],
  },
  {
    id: "cat-45",
    title: "Meteorological & Geophysical Services",
    subcategories: [
      { id: "sub-45-1", title: "Weather Monitoring Equipment" },
      { id: "sub-45-2", title: "Seismic Monitoring Systems" },
      { id: "sub-45-3", title: "Environmental Sensors" },
      { id: "sub-45-4", title: "Oceanographic Survey Services" },
      { id: "sub-45-5", title: "Geological Mapping" },
      { id: "sub-45-6", title: "Satellite Imaging Services" },
    ],
  },
  {
    id: "cat-46",
    title: "Fire Protection & Safety Engineering",
    subcategories: [
      { id: "sub-46-1", title: "Fire Suppression Systems" },
      { id: "sub-46-2", title: "Fire Alarm & Detection Systems" },
      { id: "sub-46-3", title: "Fireproofing & Insulation Materials" },
      { id: "sub-46-4", title: "Safety Training & Drills" },
      { id: "sub-46-5", title: "Fire Safety Audits" },
      { id: "sub-46-6", title: "Fire Retardant Coatings" },
    ],
  },
  {
    id: "cat-47",
    title: "Academic & Research Institutions",
    subcategories: [
      { id: "sub-47-1", title: "Universities & Colleges" },
      { id: "sub-47-2", title: "Think Tanks & Research Institutes" },
      { id: "sub-47-3", title: "Academic Publishing" },
      { id: "sub-47-4", title: "Research Funding Bodies" },
      { id: "sub-47-5", title: "Educational Program Accreditation" },
      { id: "sub-47-6", title: "Laboratory Services" },
    ],
  },
  {
    id: "cat-48",
    title: "Cultural Affairs & Religious Services",
    subcategories: [
      { id: "sub-48-1", title: "Mosque Construction & Maintenance" },
      { id: "sub-48-2", title: "Quran Printing & Distribution" },
      { id: "sub-48-3", title: "Religious Training & Events" },
      { id: "sub-48-4", title: "Cultural Heritage Conservation" },
      { id: "sub-48-5", title: "Religious Travel Services (Hajj, Umrah)" },
      { id: "sub-48-6", title: "Religious Supplies" },
    ],
  },
  {
    id: "cat-49",
    title: "Custom Fabrication & Prototyping",
    subcategories: [
      { id: "sub-49-1", title: "CNC Machining & 3D Printing" },
      { id: "sub-49-2", title: "Steel & Metal Fabrication" },
      { id: "sub-49-3", title: "Industrial Prototyping" },
      { id: "sub-49-4", title: "Plastic & Composite Molding" },
      { id: "sub-49-5", title: "Precision Engineering Services" },
      { id: "sub-49-6", title: "Bespoke Design & Fabrication" },
    ],
  },
  {
    id: "cat-50",
    title: "Marine Biology & Fisheries Development",
    subcategories: [
      { id: "sub-50-1", title: "Aquaculture Equipment & Supplies" },
      { id: "sub-50-2", title: "Marine Research Services" },
      { id: "sub-50-3", title: "Hatchery Setup & Maintenance" },
      { id: "sub-50-4", title: "Sustainable Fishing Equipment" },
      { id: "sub-50-5", title: "Seafood Processing & Packaging" },
      { id: "sub-50-6", title: "Coastal Monitoring Systems" },
    ],
  },
  {
    id: "cat-51",
    title: "Space Technology & Satellite Services",
    subcategories: [
      { id: "sub-51-1", title: "Satellite Ground Station Equipment" },
      { id: "sub-51-2", title: "Remote Sensing & Imaging" },
      { id: "sub-51-3", title: "Space R&D Consulting" },
      { id: "sub-51-4", title: "Satellite Data Analysis" },
      { id: "sub-51-5", title: "National Space Program Support" },
      { id: "sub-51-6", title: "CubeSat & Microsatellite Services" },
    ],
  },
  {
    id: "cat-52",
    title: "Rehabilitation & Accessibility Services",
    subcategories: [
      { id: "sub-52-1", title: "Disability Aids & Equipment" },
      {
        id: "sub-52-2",
        title: "Accessibility Infrastructure (Ramps, Elevators)",
      },
      { id: "sub-52-3", title: "Occupational Therapy Services" },
      { id: "sub-52-4", title: "Prosthetics & Orthotics" },
      { id: "sub-52-5", title: "Home Modification Services" },
      { id: "sub-52-6", title: "Inclusive Design Consultancy" },
    ],
  },

  {
    id: "cat-53",
    title: "Lighting & Illumination",
    subcategories: [
      { id: "sub-53-1", title: "LED Lighting Systems" },
      { id: "sub-53-2", title: "Industrial & Street Lighting" },
      { id: "sub-53-3", title: "Decorative & Architectural Lighting" },
      { id: "sub-53-4", title: "Solar Lighting Solutions" },
      { id: "sub-53-5", title: "Smart Lighting Controls" },
      { id: "sub-53-6", title: "Emergency & Exit Lighting" },
    ],
  },
  {
    id: "cat-54",
    title: "Signage & Wayfinding Systems",
    subcategories: [
      { id: "sub-54-1", title: "Indoor & Outdoor Signage" },
      { id: "sub-54-2", title: "Digital Signage Solutions" },
      { id: "sub-54-3", title: "Road & Traffic Signs" },
      { id: "sub-54-4", title: "Braille & Accessibility Signage" },
      { id: "sub-54-5", title: "Exhibition Sign Systems" },
      { id: "sub-54-6", title: "Illuminated Signs" },
    ],
  },
  {
    id: "cat-55",
    title: "Courier, Postal & Mail Services",
    subcategories: [
      { id: "sub-55-1", title: "Express Parcel Delivery" },
      { id: "sub-55-2", title: "National & International Shipping" },
      { id: "sub-55-3", title: "Mailroom Management" },
      { id: "sub-55-4", title: "Bulk Mailing Services" },
      { id: "sub-55-5", title: "PO Box & Mailbox Rental" },
      { id: "sub-55-6", title: "Logistics Software Integration" },
    ],
  },
  {
    id: "cat-56",
    title: "Auction & Asset Disposal Services",
    subcategories: [
      { id: "sub-56-1", title: "Government Surplus Auctions" },
      { id: "sub-56-2", title: "Vehicle & Equipment Auctions" },
      { id: "sub-56-3", title: "Real Estate Auctions" },
      { id: "sub-56-4", title: "Online Auction Platforms" },
      { id: "sub-56-5", title: "Asset Valuation & Liquidation" },
      { id: "sub-56-6", title: "Salvage & Reuse Services" },
    ],
  },
  {
    id: "cat-57",
    title: "Refurbishment & Renovation",
    subcategories: [
      { id: "sub-57-1", title: "Office & Building Renovation" },
      { id: "sub-57-2", title: "Historical Building Restoration" },
      { id: "sub-57-3", title: "Waterproofing & Structural Repairs" },
      { id: "sub-57-4", title: "Painting & Recoating Services" },
      { id: "sub-57-5", title: "Retrofit Solutions" },
      { id: "sub-57-6", title: "Home Improvement" },
    ],
  },
  {
    id: "cat-58",
    title: "Elevators, Escalators & Lifts",
    subcategories: [
      { id: "sub-58-1", title: "Passenger Elevators" },
      { id: "sub-58-2", title: "Freight Elevators" },
      { id: "sub-58-3", title: "Escalator Installation & Maintenance" },
      { id: "sub-58-4", title: "Dumbwaiters & Platform Lifts" },
      { id: "sub-58-5", title: "Elevator Modernization" },
      { id: "sub-58-6", title: "Safety & Compliance Inspections" },
    ],
  },
  {
    id: "cat-59",
    title: "Interior Landscaping & Green Walls",
    subcategories: [
      { id: "sub-59-1", title: "Indoor Plant Services" },
      { id: "sub-59-2", title: "Vertical Gardens" },
      { id: "sub-59-3", title: "Office Green Design" },
      { id: "sub-59-4", title: "Living Wall Installations" },
      { id: "sub-59-5", title: "Plant Maintenance Contracts" },
      { id: "sub-59-6", title: "Biophilic Design Services" },
    ],
  },
  {
    id: "cat-60",
    title: "Art & Exhibition Services",
    subcategories: [
      { id: "sub-60-1", title: "Art Installations" },
      { id: "sub-60-2", title: "Exhibition Booth Construction" },
      { id: "sub-60-3", title: "Art Transport & Handling" },
      { id: "sub-60-4", title: "Museum Exhibit Design" },
      { id: "sub-60-5", title: "Curation & Cataloguing" },
      { id: "sub-60-6", title: "Art Storage & Insurance" },
    ],
  },
  {
    id: "cat-61",
    title: "Tatweer (Innovation & SME Support)",
    subcategories: [
      { id: "sub-61-1", title: "Start-up Incubation Services" },
      { id: "sub-61-2", title: "SME Acceleration Programs" },
      { id: "sub-61-3", title: "Business Mentorship & Coaching" },
      { id: "sub-61-4", title: "Government SME Funding Programs" },
      { id: "sub-61-5", title: "Product-Market Fit Consulting" },
      { id: "sub-61-6", title: "Innovation Labs & Facilities" },
    ],
  },
  {
    id: "cat-62",
    title: "Customs & Border Services",
    subcategories: [
      { id: "sub-62-1", title: "Customs Consultancy" },
      { id: "sub-62-2", title: "Border Inspection Equipment" },
      { id: "sub-62-3", title: "X-ray & Scanning Systems" },
      { id: "sub-62-4", title: "Tariff Classification Services" },
      { id: "sub-62-5", title: "Duty Optimization Solutions" },
      { id: "sub-62-6", title: "Port & Border Operations Management" },
    ],
  },
  {
    id: "cat-63",
    title: "Sustainable Architecture & Green Building",
    subcategories: [
      { id: "sub-63-1", title: "LEED & GSAS Consulting" },
      { id: "sub-63-2", title: "Energy Modeling & Simulation" },
      { id: "sub-63-3", title: "Eco-Friendly Construction Materials" },
      { id: "sub-63-4", title: "Passive Design Solutions" },
      { id: "sub-63-5", title: "Net-Zero Building Services" },
      { id: "sub-63-6", title: "Waste-Minimizing Construction" },
    ],
  },
  {
    id: "cat-64",
    title: "Anti-Corruption & Governance",
    subcategories: [
      { id: "sub-64-1", title: "Compliance Auditing" },
      { id: "sub-64-2", title: "E-Governance Solutions" },
      { id: "sub-64-3", title: "Whistleblower Systems" },
      { id: "sub-64-4", title: "Ethics & Transparency Tools" },
      { id: "sub-64-5", title: "Government Risk Management" },
      { id: "sub-64-6", title: "Anti-Fraud Software" },
    ],
  },

  {
    id: "cat-65",
    title: "Recycling & Circular Economy",
    subcategories: [
      { id: "sub-65-1", title: "Industrial Waste Recycling" },
      { id: "sub-65-2", title: "E-Waste Management" },
      { id: "sub-65-3", title: "Plastic & Paper Recycling" },
      { id: "sub-65-4", title: "Scrap Metal Processing" },
      { id: "sub-65-5", title: "Organic & Food Waste Solutions" },
      { id: "sub-65-6", title: "Upcycled Materials Supply" },
    ],
  },
  {
    id: "cat-66",
    title: "Luxury & High-End Services",
    subcategories: [
      { id: "sub-66-1", title: "Luxury Vehicle Leasing" },
      { id: "sub-66-2", title: "Private Jet & Yacht Services" },
      { id: "sub-66-3", title: "VIP Event Management" },
      { id: "sub-66-4", title: "Premium Security Services" },
      { id: "sub-66-5", title: "Designer Furnishings & Decor" },
      { id: "sub-66-6", title: "Concierge & Lifestyle Services" },
    ],
  },
  {
    id: "cat-67",
    title: "Intelligence, Research & Analytics",
    subcategories: [
      { id: "sub-67-1", title: "Market Research Firms" },
      { id: "sub-67-2", title: "Big Data Analytics" },
      { id: "sub-67-3", title: "Consumer Insights" },
      { id: "sub-67-4", title: "Risk Intelligence Services" },
      { id: "sub-67-5", title: "Business Forecasting Models" },
      { id: "sub-67-6", title: "Competitive Benchmarking" },
    ],
  },
  {
    id: "cat-68",
    title: "Textile Manufacturing & Processing",
    subcategories: [
      { id: "sub-68-1", title: "Yarn & Thread Production" },
      { id: "sub-68-2", title: "Textile Dyeing & Finishing" },
      { id: "sub-68-3", title: "Knitting & Weaving Mills" },
      { id: "sub-68-4", title: "Garment Manufacturing" },
      { id: "sub-68-5", title: "Industrial Laundry Equipment" },
      { id: "sub-68-6", title: "Textile Chemicals & Treatments" },
    ],
  },
  {
    id: "cat-69",
    title: "Batteries, Storage & Charging Systems",
    subcategories: [
      { id: "sub-69-1", title: "Industrial Battery Solutions" },
      { id: "sub-69-2", title: "EV Charging Stations" },
      { id: "sub-69-3", title: "Solar Battery Storage" },
      { id: "sub-69-4", title: "UPS & Backup Power Systems" },
      { id: "sub-69-5", title: "Smart Charging Infrastructure" },
      { id: "sub-69-6", title: "Lithium-ion & Alternative Technologies" },
    ],
  },
  {
    id: "cat-70",
    title: "Gaming, eSports & Digital Entertainment",
    subcategories: [
      { id: "sub-70-1", title: "Game Development Studios" },
      { id: "sub-70-2", title: "eSports Event Management" },
      { id: "sub-70-3", title: "VR Gaming Equipment" },
      { id: "sub-70-4", title: "Gaming Lounge Infrastructure" },
      { id: "sub-70-5", title: "Online Platform Development" },
      { id: "sub-70-6", title: "Animation & Game Art Design" },
    ],
  },
  {
    id: "cat-71",
    title: "Custom Electronics & Embedded Systems",
    subcategories: [
      { id: "sub-71-1", title: "Embedded System Design" },
      { id: "sub-71-2", title: "PCB Fabrication" },
      { id: "sub-71-3", title: "Custom Sensor Solutions" },
      { id: "sub-71-4", title: "Microcontroller Programming" },
      { id: "sub-71-5", title: "IoT Hardware Design" },
      { id: "sub-71-6", title: "Control & Automation Boards" },
    ],
  },
  {
    id: "cat-72",
    title: "Water Sports & Marine Recreation",
    subcategories: [
      { id: "sub-72-1", title: "Diving & Snorkeling Equipment" },
      { id: "sub-72-2", title: "Jet Ski & Boat Rentals" },
      { id: "sub-72-3", title: "Yacht Clubs & Marinas" },
      { id: "sub-72-4", title: "Water Sports Safety Gear" },
      { id: "sub-72-5", title: "Underwater Photography Services" },
      { id: "sub-72-6", title: "Eco Marine Tours" },
    ],
  },
  {
    id: "cat-73",
    title: "Military & Defense Services",
    subcategories: [
      { id: "sub-73-1", title: "Tactical Gear Supply" },
      { id: "sub-73-2", title: "Military Vehicle Maintenance" },
      { id: "sub-73-3", title: "Ammunition & Weapons Systems" },
      { id: "sub-73-4", title: "Defense Training Services" },
      { id: "sub-73-5", title: "Surveillance Drones & Systems" },
      { id: "sub-73-6", title: "Secure Communication Technologies" },
    ],
  },
  {
    id: "cat-74",
    title: "Diplomatic & International Services",
    subcategories: [
      { id: "sub-74-1", title: "Embassy Support Services" },
      { id: "sub-74-2", title: "Diplomatic Transport Services" },
      { id: "sub-74-3", title: "Protocol & Event Services" },
      { id: "sub-74-4", title: "Translation & Interpreter Services" },
      { id: "sub-74-5", title: "Diplomatic Courier Services" },
      { id: "sub-74-6", title: "Visa & Immigration Consulting" },
    ],
  },
  {
    id: "cat-75",
    title: "Herbal, Traditional & Natural Products",
    subcategories: [
      { id: "sub-75-1", title: "Herbal Medicine Suppliers" },
      { id: "sub-75-2", title: "Traditional Remedy Producers" },
      { id: "sub-75-3", title: "Organic Cosmetics & Oils" },
      { id: "sub-75-4", title: "Medicinal Plant Farming" },
      { id: "sub-75-5", title: "Natural Food Supplements" },
      { id: "sub-75-6", title: "Local Remedy Research & Development" },
    ],
  },
  {
    id: "cat-76",
    title: "Charitable Foundations & Philanthropy",
    subcategories: [
      { id: "sub-76-1", title: "Donation Management Platforms" },
      { id: "sub-76-2", title: "CSR Project Execution" },
      { id: "sub-76-3", title: "Volunteering Programs" },
      { id: "sub-76-4", title: "Impact Measurement Services" },
      { id: "sub-76-5", title: "Fundraising Campaign Support" },
      { id: "sub-76-6", title: "Community-Based Enterprise Support" },
    ],
  },

  {
    id: "cat-77",
    title: "Smart Mobility & Intelligent Transport Systems",
    subcategories: [
      { id: "sub-77-1", title: "Smart Parking Systems" },
      { id: "sub-77-2", title: "Traffic Management Solutions" },
      { id: "sub-77-3", title: "Electric Vehicles (EV) & Charging" },
      { id: "sub-77-4", title: "Autonomous Vehicle Tech" },
      { id: "sub-77-5", title: "Mobility-as-a-Service (MaaS)" },
      { id: "sub-77-6", title: "Transport Data Analytics" },
    ],
  },
  {
    id: "cat-78",
    title: "Digital Identity & Biometric Solutions",
    subcategories: [
      { id: "sub-78-1", title: "eID Card Systems" },
      {
        id: "sub-78-2",
        title: "Biometric Authentication (Facial, Fingerprint, Iris)",
      },
      { id: "sub-78-3", title: "Access Control Systems" },
      { id: "sub-78-4", title: "Digital Signature Platforms" },
      { id: "sub-78-5", title: "Identity Verification Services" },
      { id: "sub-78-6", title: "National ID Infrastructure" },
    ],
  },
  {
    id: "cat-79",
    title: "Remote Work & Hybrid Office Solutions",
    subcategories: [
      { id: "sub-79-1", title: "Video Conferencing Tools" },
      { id: "sub-79-2", title: "Virtual Office Setup" },
      { id: "sub-79-3", title: "Remote Team Collaboration Platforms" },
      { id: "sub-79-4", title: "Work-from-Home Hardware Bundles" },
      { id: "sub-79-5", title: "VPN & Security Software" },
      { id: "sub-79-6", title: "Telepresence Solutions" },
    ],
  },
  {
    id: "cat-80",
    title: "Hydrology & Water Sciences",
    subcategories: [
      { id: "sub-80-1", title: "Water Resource Mapping" },
      { id: "sub-80-2", title: "Aquifer Monitoring" },
      { id: "sub-80-3", title: "Water Quality Analysis" },
      { id: "sub-80-4", title: "River & Dams Modelling" },
      { id: "sub-80-5", title: "Smart Irrigation Systems" },
      { id: "sub-80-6", title: "Hydrological Sensors & Meters" },
    ],
  },
  {
    id: "cat-81",
    title: "Crisis Management & Business Continuity",
    subcategories: [
      { id: "sub-81-1", title: "Emergency Operations Centers (EOC)" },
      { id: "sub-81-2", title: "Continuity of Operations Planning (COOP)" },
      { id: "sub-81-3", title: "Disaster Recovery Tools" },
      { id: "sub-81-4", title: "Crisis Communication Platforms" },
      { id: "sub-81-5", title: "Risk Simulation & Modeling" },
      { id: "sub-81-6", title: "Business Resilience Training" },
    ],
  },
  {
    id: "cat-82",
    title: "Forensics & Investigation Services",
    subcategories: [
      { id: "sub-82-1", title: "Digital Forensics" },
      { id: "sub-82-2", title: "Financial Forensic Audits" },
      { id: "sub-82-3", title: "Crime Scene Equipment" },
      { id: "sub-82-4", title: "Background Checks & Due Diligence" },
      { id: "sub-82-5", title: "Fraud Detection Services" },
      { id: "sub-82-6", title: "Legal Investigation Software" },
    ],
  },
  {
    id: "cat-83",
    title: "Bioengineering & Life Sciences",
    subcategories: [
      { id: "sub-83-1", title: "Genetic Testing Services" },
      { id: "sub-83-2", title: "Biomedical Equipment" },
      { id: "sub-83-3", title: "Biotechnology R&D" },
      { id: "sub-83-4", title: "Clinical Trials Support" },
      { id: "sub-83-5", title: "Lab Reagents & Chemicals" },
      { id: "sub-83-6", title: "Bioinformatics Software" },
    ],
  },
  {
    id: "cat-84",
    title: "Mining Safety & Geotechnical Services",
    subcategories: [
      { id: "sub-84-1", title: "Mine Safety Equipment" },
      { id: "sub-84-2", title: "Rock & Soil Testing" },
      { id: "sub-84-3", title: "Explosives Handling Systems" },
      { id: "sub-84-4", title: "Slope Stability Monitoring" },
      { id: "sub-84-5", title: "Tailings Dam Engineering" },
      { id: "sub-84-6", title: "Mine Ventilation Systems" },
    ],
  },
  {
    id: "cat-85",
    title: "Parks & Recreational Infrastructure",
    subcategories: [
      { id: "sub-85-1", title: "Park Furniture & Fixtures" },
      { id: "sub-85-2", title: "Playground Equipment" },
      { id: "sub-85-3", title: "Green Space Planning" },
      { id: "sub-85-4", title: "Urban Forest Management" },
      { id: "sub-85-5", title: "Walking & Cycling Tracks" },
      { id: "sub-85-6", title: "Public Fitness Equipment" },
    ],
  },
  {
    id: "cat-86",
    title: "Ethical & Fair Trade Products",
    subcategories: [
      { id: "sub-86-1", title: "Fair Trade Certified Goods" },
      { id: "sub-86-2", title: "Ethical Supply Chain Audits" },
      { id: "sub-86-3", title: "Sustainable Craft Producers" },
      { id: "sub-86-4", title: "Organic & Ethical Fashion" },
      { id: "sub-86-5", title: "Community-Based Product Sourcing" },
      { id: "sub-86-6", title: "ESG Compliance Services" },
    ],
  },
  {
    id: "cat-87",
    title: "Voice & Speech Technologies",
    subcategories: [
      { id: "sub-87-1", title: "Speech-to-Text Platforms" },
      { id: "sub-87-2", title: "Voice Assistant Integration" },
      { id: "sub-87-3", title: "Call Center Automation" },
      { id: "sub-87-4", title: "Multilingual Voice Interfaces" },
      { id: "sub-87-5", title: "AI-Based Transcription Tools" },
      { id: "sub-87-6", title: "Accessibility Voice Tools" },
    ],
  },
  {
    id: "cat-88",
    title: "Technical Standards & Certification",
    subcategories: [
      { id: "sub-88-1", title: "ISO Certification Services" },
      { id: "sub-88-2", title: "Calibration Laboratories" },
      { id: "sub-88-3", title: "Product Testing Labs" },
      { id: "sub-88-4", title: "Standards Compliance Audits" },
      { id: "sub-88-5", title: "Halal Certification Services" },
      { id: "sub-88-6", title: "Construction & Industry Codes" },
    ],
  },
];

export default categories;
