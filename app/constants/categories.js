import { assets } from "@/assets/assets";
const categories = [
  {
    id: "cat-201",
    title: {
      en: "General",
      ar: "عام",
    },
    subcategories: [
      {
        id: "sub-201-1",
        title: { en: "Miscellaneous Services", ar: "خدمات متنوعة" },
      },
      {
        id: "sub-201-2",
        title: { en: "Uncategorized Solutions", ar: "حلول غير مصنفة" },
      },
      {
        id: "sub-201-3",
        title: { en: "General Consulting", ar: "استشارات عامة" },
      },
      {
        id: "sub-201-4",
        title: { en: "Administrative Support", ar: "الدعم الإداري" },
      },
      {
        id: "sub-201-5",
        title: { en: "Customer Service Tools", ar: "أدوات خدمة العملاء" },
      },
      {
        id: "sub-201-6",
        title: {
          en: "Office Supplies & Stationery",
          ar: "اللوازم المكتبية والقرطاسية",
        },
      },
    ],
  },
  {
    id: "cat-101",
    title: {
      en: "Consumer Electronics & Appliances",
      ar: "الإلكترونيات الاستهلاكية والأجهزة",
    },
    subcategories: [
      {
        id: "sub-101-1",
        title: {
          en: "Home Appliance",
          ar: "الأجهزة المنزلية",
        },
        iconSrc: assets.domest_app,
        bg: "bg-sky-100",
      },
      {
        id: "sub-101-2",
        title: {
          en: "Kitchen Appliance",
          ar: "الأجهزة المطبخية",
        },
        iconSrc: assets.kitchen,
        bg: "bg-emerald-100",
      },
      {
        id: "sub-101-3",
        title: {
          en: "Phone & Tablet",
          ar: "الهاتف والكمبيوتر اللوحي",
        },
        iconSrc: assets.mobile,
        bg: "bg-rose-100",
      },
      {
        id: "sub-101-4",
        title: {
          en: "Watches",
          ar: "الساعات",
        },
        iconSrc: assets.watches,
        bg: "bg-teal-100",
      },
    ],
  },

  {
    id: "cat-102",
    title: {
      en: "Health, Beauty & Personal Care",
      ar: "الصحة والجمال والعناية الشخصية",
    },
    subcategories: [
      {
        id: "sub-102-1",
        title: {
          en: "Health & Beauty",
          ar: "الصحة والجمال",
        },
        iconSrc: assets.beauty,
        bg: "bg-violet-100",
      },
      {
        id: "sub-102-2",
        title: {
          en: "Personal Care",
          ar: "العناية الشخصية",
        },
        iconSrc: assets.skin,
        bg: "bg-amber-100",
      },
    ],
  },
  {
    id: "cat-103",
    title: {
      en: "Facility Services",
      ar: "خدمات المرافق",
    },
    subcategories: [
      {
        id: "sub-103-1",
        title: {
          en: "Facility Management",
          ar: "إدارة المرافق",
        },
        iconSrc: assets.facility,
        bg: "bg-rose-100",
      },
    ],
  },
  {
    id: "cat-1",
    title: {
      en: "Construction & Infrastructure",
      ar: "البناء والبنية التحتية",
    },
    subcategories: [
      {
        id: "sub-1-1",
        title: {
          en: "Civil Works",
          ar: "الأعمال المدنية",
        },
      },
      {
        id: "sub-1-2",
        title: {
          en: "Road Construction & Maintenance",
          ar: "بناء وصيانة الطرق",
        },
      },
      {
        id: "sub-1-3",
        title: {
          en: "Bridges & Tunnels",
          ar: "الجسور والأنفاق",
        },
      },
      {
        id: "sub-1-4",
        title: {
          en: "Building Construction (Commercial, Residential, Government)",
          ar: "بناء المباني (تجارية، سكنية، حكومية)",
        },
      },
      {
        id: "sub-1-5",
        title: {
          en: "Landscaping & Urban Development",
          ar: "تنسيق الحدائق والتطوير العمراني",
        },
      },
      {
        id: "sub-1-6",
        title: {
          en: "Water & Wastewater Infrastructure",
          ar: "البنية التحتية للمياه ومياه الصرف الصحي",
        },
      },
      {
        id: "sub-1-7",
        title: {
          en: "Ports & Airports",
          ar: "الموانئ والمطارات",
        },
      },
    ],
  },
  {
    id: "cat-2",
    title: {
      en: "Oil, Gas & Petrochemicals",
      ar: "النفط والغاز والبتروكيماويات",
    },
    subcategories: [
      {
        id: "sub-2-1",
        title: {
          en: "Drilling Services",
          ar: "خدمات الحفر",
        },
      },
      {
        id: "sub-2-2",
        title: {
          en: "Engineering, Procurement & Construction (EPC)",
          ar: "الهندسة والمشتريات والبناء (EPC)",
        },
      },
      {
        id: "sub-2-3",
        title: {
          en: "Pipeline Construction & Maintenance",
          ar: "بناء وصيانة خطوط الأنابيب",
        },
      },
      {
        id: "sub-2-4",
        title: {
          en: "Refinery & Petrochemical Services",
          ar: "خدمات المصافي والبتروكيماويات",
        },
      },
      {
        id: "sub-2-5",
        title: {
          en: "Oilfield Equipment & Services",
          ar: "معدات وخدمات الحقول النفطية",
        },
      },
      {
        id: "sub-2-6",
        title: {
          en: "HSE (Health, Safety & Environment) Services",
          ar: "خدمات الصحة والسلامة والبيئة (HSE)",
        },
      },
      {
        id: "sub-2-7",
        title: {
          en: "Offshore & Onshore Support Services",
          ar: "خدمات الدعم البحرية والبرية",
        },
      },
    ],
  },
  {
    id: "cat-3",
    title: {
      en: "Artificial Intelligence & Emerging Technologies",
      ar: "الذكاء الاصطناعي والتقنيات الناشئة",
    },
    subcategories: [
      {
        id: "sub-3-1",
        title: {
          en: "AI Solutions & Automation",
          ar: "حلول الذكاء الاصطناعي والأتمتة",
        },
      },
      {
        id: "sub-3-2",
        title: {
          en: "Machine Learning & Predictive Analytics",
          ar: "تعلم الآلة والتحليلات التنبؤية",
        },
      },
      {
        id: "sub-3-3",
        title: {
          en: "IoT (Internet of Things) Solutions",
          ar: "حلول إنترنت الأشياء (IoT)",
        },
      },
      {
        id: "sub-3-4",
        title: {
          en: "Blockchain Applications",
          ar: "تطبيقات البلوكشين",
        },
      },
      {
        id: "sub-3-5",
        title: {
          en: "Augmented & Virtual Reality",
          ar: "الواقع المعزز والافتراضي",
        },
      },
      {
        id: "sub-3-6",
        title: {
          en: "Smart City Solutions",
          ar: "حلول المدن الذكية",
        },
      },
    ],
  },
  {
    id: "cat-4",
    title: {
      en: "Disaster Management & Emergency Services",
      ar: "إدارة الكوارث وخدمات الطوارئ",
    },
    subcategories: [
      {
        id: "sub-4-1",
        title: {
          en: "Disaster Preparedness Planning",
          ar: "تخطيط الاستعداد للكوارث",
        },
      },
      {
        id: "sub-4-2",
        title: {
          en: "Emergency Response Services",
          ar: "خدمات الاستجابة للطوارئ",
        },
      },
      {
        id: "sub-4-3",
        title: {
          en: "Rescue Equipment Supply",
          ar: "توريد معدات الإنقاذ",
        },
      },
      {
        id: "sub-4-4",
        title: {
          en: "Medical Evacuation Services",
          ar: "خدمات الإخلاء الطبي",
        },
      },
      {
        id: "sub-4-5",
        title: {
          en: "Fire & Flood Mitigation Solutions",
          ar: "حلول تخفيف الحرائق والفيضانات",
        },
      },
      {
        id: "sub-4-6",
        title: {
          en: "Risk Assessment & Resilience Consulting",
          ar: "تقييم المخاطر واستشارات المرونة",
        },
      },
    ],
  },
  {
    id: "cat-5",
    title: {
      en: "Veterinary & Animal Services",
      ar: "الخدمات البيطرية وخدمات الحيوانات",
    },
    subcategories: [
      {
        id: "sub-5-1",
        title: {
          en: "Veterinary Clinics & Services",
          ar: "العيادات والخدمات البيطرية",
        },
      },
      {
        id: "sub-5-2",
        title: {
          en: "Animal Feed & Nutrition",
          ar: "تغذية الحيوانات وأعلافها",
        },
      },
      {
        id: "sub-5-3",
        title: {
          en: "Livestock Equipment",
          ar: "معدات الماشية",
        },
      },
      {
        id: "sub-5-4",
        title: {
          en: "Animal Breeding & Care",
          ar: "تربية الحيوانات ورعايتها",
        },
      },
      {
        id: "sub-5-5",
        title: {
          en: "Animal Health Pharmaceuticals",
          ar: "أدوية صحة الحيوان",
        },
      },
      {
        id: "sub-5-6",
        title: {
          en: "Wildlife Management",
          ar: "إدارة الحياة البرية",
        },
      },
    ],
  },
  {
    id: "cat-6",
    title: {
      en: "Social & Community Services",
      ar: "الخدمات الاجتماعية والمجتمعية",
    },
    subcategories: [
      {
        id: "sub-6-1",
        title: {
          en: "NGO & Nonprofit Support Services",
          ar: "خدمات دعم المنظمات غير الربحية",
        },
      },
      {
        id: "sub-6-2",
        title: {
          en: "Social Work & Welfare Services",
          ar: "الخدمات الاجتماعية والرعاية",
        },
      },
      {
        id: "sub-6-3",
        title: {
          en: "Community Outreach Programs",
          ar: "برامج التوعية المجتمعية",
        },
      },
      {
        id: "sub-6-4",
        title: {
          en: "Disability Services",
          ar: "خدمات ذوي الاحتياجات الخاصة",
        },
      },
      {
        id: "sub-6-5",
        title: {
          en: "Elderly Care & Facilities",
          ar: "رعاية كبار السن والمرافق",
        },
      },
      {
        id: "sub-6-6",
        title: {
          en: "Orphanage & Shelter Services",
          ar: "خدمات دور الأيتام والملاجئ",
        },
      },
    ],
  },
  {
    id: "cat-7",
    title: {
      en: "Meteorological & Geophysical Services",
      ar: "خدمات الأرصاد الجوية والجيوفيزيائية",
    },
    subcategories: [
      {
        id: "sub-7-1",
        title: {
          en: "Weather Monitoring Equipment",
          ar: "معدات مراقبة الطقس",
        },
      },
      {
        id: "sub-7-2",
        title: {
          en: "Seismic Monitoring Systems",
          ar: "أنظمة مراقبة الزلازل",
        },
      },
      {
        id: "sub-7-3",
        title: {
          en: "Environmental Sensors",
          ar: "أجهزة الاستشعار البيئية",
        },
      },
      {
        id: "sub-7-4",
        title: {
          en: "Oceanographic Survey Services",
          ar: "خدمات المسح البحري",
        },
      },
      {
        id: "sub-7-5",
        title: {
          en: "Geological Mapping",
          ar: "رسم الخرائط الجيولوجية",
        },
      },
      {
        id: "sub-7-6",
        title: {
          en: "Satellite Imaging Services",
          ar: "خدمات التصوير بالأقمار الصناعية",
        },
      },
    ],
  },
  {
    id: "cat-8",
    title: {
      en: "Fire Protection & Safety Engineering",
      ar: "هندسة الحماية والسلامة من الحرائق",
    },
    subcategories: [
      {
        id: "sub-8-1",
        title: {
          en: "Fire Suppression Systems",
          ar: "أنظمة إخماد الحرائق",
        },
      },
      {
        id: "sub-8-2",
        title: {
          en: "Fire Alarm & Detection Systems",
          ar: "أنظمة الإنذار والكشف عن الحرائق",
        },
      },
      {
        id: "sub-8-3",
        title: {
          en: "Fireproofing & Insulation Materials",
          ar: "مواد العزل ومقاومة الحرائق",
        },
      },
      {
        id: "sub-8-4",
        title: {
          en: "Safety Training & Drills",
          ar: "تدريبات السلامة والتمارين",
        },
      },
      {
        id: "sub-8-5",
        title: {
          en: "Fire Safety Audits",
          ar: "تدقيقات سلامة الحرائق",
        },
      },
      {
        id: "sub-8-6",
        title: {
          en: "Fire Retardant Coatings",
          ar: "طلاءات مقاومة للحريق",
        },
      },
    ],
  },
  {
    id: "cat-9",
    title: {
      en: "Academic & Research Institutions",
      ar: "المؤسسات الأكاديمية والبحثية",
    },
    subcategories: [
      {
        id: "sub-9-1",
        title: {
          en: "Universities & Colleges",
          ar: "الجامعات والكليات",
        },
      },
      {
        id: "sub-9-2",
        title: {
          en: "Think Tanks & Research Institutes",
          ar: "مراكز التفكير ومعاهد البحوث",
        },
      },
      {
        id: "sub-9-3",
        title: {
          en: "Academic Publishing",
          ar: "النشر الأكاديمي",
        },
      },
      {
        id: "sub-9-4",
        title: {
          en: "Research Funding Bodies",
          ar: "جهات تمويل البحث",
        },
      },
      {
        id: "sub-9-5",
        title: {
          en: "Educational Program Accreditation",
          ar: "اعتماد البرامج التعليمية",
        },
      },
      {
        id: "sub-9-6",
        title: {
          en: "International Exchange Programs",
          ar: "برامج التبادل الدولية",
        },
      },
    ],
  },

  {
    id: "cat-11",
    title: {
      en: "Custom Fabrication & Prototyping",
      ar: "التصنيع المخصص والنماذج الأولية",
    },
    subcategories: [
      {
        id: "sub-11-1",
        title: {
          en: "CNC Machining & 3D Printing",
          ar: "تصنيع CNC والطباعة ثلاثية الأبعاد",
        },
      },
      {
        id: "sub-11-2",
        title: {
          en: "Steel & Metal Fabrication",
          ar: "تصنيع الصلب والمعادن",
        },
      },
      {
        id: "sub-11-3",
        title: {
          en: "Industrial Prototyping",
          ar: "النماذج الصناعية",
        },
      },
      {
        id: "sub-11-4",
        title: {
          en: "Plastic & Composite Molding",
          ar: "قولبة البلاستيك والمركبات",
        },
      },
      {
        id: "sub-11-5",
        title: {
          en: "Precision Engineering Services",
          ar: "خدمات الهندسة الدقيقة",
        },
      },
      {
        id: "sub-11-6",
        title: {
          en: "Bespoke Design & Fabrication",
          ar: "التصميم والتصنيع المخصص",
        },
      },
    ],
  },
  {
    id: "cat-12",
    title: {
      en: "Marine Biology & Fisheries Development",
      ar: "علم الأحياء البحرية وتطوير مصايد الأسماك",
    },
    subcategories: [
      {
        id: "sub-12-1",
        title: {
          en: "Aquaculture Equipment & Supplies",
          ar: "معدات وإمدادات الاستزراع المائي",
        },
      },
      {
        id: "sub-12-2",
        title: {
          en: "Marine Research Services",
          ar: "خدمات البحث البحري",
        },
      },
      {
        id: "sub-12-3",
        title: {
          en: "Hatchery Setup & Maintenance",
          ar: "إعداد وصيانة المفرخات",
        },
      },
      {
        id: "sub-12-4",
        title: {
          en: "Sustainable Fishing Equipment",
          ar: "معدات الصيد المستدام",
        },
      },
      {
        id: "sub-12-5",
        title: {
          en: "Seafood Processing & Packaging",
          ar: "معالجة وتغليف المأكولات البحرية",
        },
      },
      {
        id: "sub-12-6",
        title: {
          en: "Coastal Monitoring Systems",
          ar: "أنظمة مراقبة السواحل",
        },
      },
    ],
  },
  {
    id: "cat-13",
    title: {
      en: "Space Technology & Satellite Services",
      ar: "تقنيات الفضاء وخدمات الأقمار الصناعية",
    },
    subcategories: [
      {
        id: "sub-13-1",
        title: {
          en: "Satellite Ground Station Equipment",
          ar: "معدات المحطات الأرضية للأقمار الصناعية",
        },
      },
      {
        id: "sub-13-2",
        title: {
          en: "Remote Sensing & Imaging",
          ar: "الاستشعار عن بعد والتصوير",
        },
      },
      {
        id: "sub-13-3",
        title: {
          en: "Space R&D Consulting",
          ar: "استشارات أبحاث وتطوير الفضاء",
        },
      },
      {
        id: "sub-13-4",
        title: {
          en: "Satellite Data Analysis",
          ar: "تحليل بيانات الأقمار الصناعية",
        },
      },
      {
        id: "sub-13-5",
        title: {
          en: "National Space Program Support",
          ar: "دعم البرنامج الوطني للفضاء",
        },
      },
      {
        id: "sub-13-6",
        title: {
          en: "CubeSat & Microsatellite Services",
          ar: "خدمات CubeSat والأقمار الصغيرة",
        },
      },
    ],
  },
  {
    id: "cat-14",
    title: {
      en: "Rehabilitation & Accessibility Services",
      ar: "خدمات إعادة التأهيل وإمكانية الوصول",
    },
    subcategories: [
      {
        id: "sub-14-1",
        title: {
          en: "Disability Aids & Equipment",
          ar: "معدات وأجهزة ذوي الإعاقة",
        },
      },
      {
        id: "sub-14-2",
        title: {
          en: "Accessibility Infrastructure (Ramps, Elevators)",
          ar: "بنية تحتية لإمكانية الوصول (منحدرات، مصاعد)",
        },
      },
      {
        id: "sub-14-3",
        title: {
          en: "Occupational Therapy Services",
          ar: "خدمات العلاج الوظيفي",
        },
      },
      {
        id: "sub-14-4",
        title: {
          en: "Prosthetics & Orthotics",
          ar: "الأطراف الصناعية والأجهزة التقويمية",
        },
      },
      {
        id: "sub-14-5",
        title: {
          en: "Home Modification Services",
          ar: "خدمات تعديل المنازل",
        },
      },
      {
        id: "sub-14-6",
        title: {
          en: "Inclusive Design Consultancy",
          ar: "استشارات التصميم الشامل",
        },
      },
    ],
  },
  {
    id: "cat-16",
    title: {
      en: "Banking & Financial Services",
      ar: "الخدمات المصرفية والمالية",
    },
    subcategories: [
      {
        id: "sub-16-1",
        title: {
          en: "Commercial & Islamic Banking Services",
          ar: "الخدمات المصرفية التجارية والإسلامية",
        },
      },
      {
        id: "sub-16-2",
        title: {
          en: "Insurance & Reinsurance",
          ar: "التأمين وإعادة التأمين",
        },
      },
      {
        id: "sub-16-3",
        title: {
          en: "Investment & Asset Management",
          ar: "إدارة الاستثمار والأصول",
        },
      },
      {
        id: "sub-16-4",
        title: {
          en: "Payment Solutions & FinTech",
          ar: "حلول الدفع والتكنولوجيا المالية",
        },
      },
      {
        id: "sub-16-5",
        title: {
          en: "Financial Advisory & Consultancy",
          ar: "الاستشارات والخدمات المالية",
        },
      },
      {
        id: "sub-16-6",
        title: {
          en: "Microfinance & Credit Services",
          ar: "خدمات التمويل الصغير والائتمان",
        },
      },
    ],
  },

  {
    id: "cat-17",
    title: {
      en: "Procurement & Supply Chain",
      ar: "المشتريات وسلسلة التوريد",
    },
    subcategories: [
      {
        id: "sub-17-1",
        title: {
          en: "General Trading & Supply",
          ar: "التجارة العامة والتوريد",
        },
      },
      {
        id: "sub-17-2",
        title: {
          en: "Vendor Management",
          ar: "إدارة الموردين",
        },
      },
      {
        id: "sub-17-3",
        title: {
          en: "Strategic Sourcing",
          ar: "المصادر الاستراتيجية",
        },
      },
      {
        id: "sub-17-4",
        title: {
          en: "Inventory Management",
          ar: "إدارة المخزون",
        },
      },
      {
        id: "sub-17-5",
        title: {
          en: "Procurement Consultancy",
          ar: "الاستشارات الشرائية",
        },
      },
      {
        id: "sub-17-6",
        title: {
          en: "Tender Management Services",
          ar: "خدمات إدارة المناقصات",
        },
      },
    ],
  },
  {
    id: "cat-18",
    title: {
      en: "Textiles, Garments & Uniforms",
      ar: "المنسوجات والملابس والزي الموحد",
    },
    subcategories: [
      {
        id: "sub-18-1",
        title: {
          en: "Industrial Uniforms",
          ar: "الزي الصناعي",
        },
      },
      {
        id: "sub-18-2",
        title: {
          en: "School Uniforms",
          ar: "الزي المدرسي",
        },
      },
      {
        id: "sub-18-3",
        title: {
          en: "Military & Security Apparel",
          ar: "الملابس العسكرية والأمنية",
        },
      },
      {
        id: "sub-18-4",
        title: {
          en: "Hospital Garments",
          ar: "ملابس المستشفيات",
        },
      },
      {
        id: "sub-18-5",
        title: {
          en: "Traditional Clothing",
          ar: "الملابس التقليدية",
        },
      },
      {
        id: "sub-18-6",
        title: {
          en: "Fabric & Raw Materials",
          ar: "الأقمشة والمواد الخام",
        },
      },
    ],
  },
  {
    id: "cat-19",
    title: {
      en: "Printing, Advertising & Media",
      ar: "الطباعة والإعلان والإعلام",
    },
    subcategories: [
      {
        id: "sub-19-1",
        title: {
          en: "Printing & Publishing",
          ar: "الطباعة والنشر",
        },
      },
      {
        id: "sub-19-2",
        title: {
          en: "Graphic Design",
          ar: "التصميم الجرافيكي",
        },
      },
      {
        id: "sub-19-3",
        title: {
          en: "Outdoor Advertising (Billboards, Hoardings)",
          ar: "الإعلانات الخارجية (اللوحات الإعلانية)",
        },
      },
      {
        id: "sub-19-4",
        title: {
          en: "Digital Marketing",
          ar: "التسويق الرقمي",
        },
      },
      {
        id: "sub-19-5",
        title: {
          en: "Media Production & Broadcasting",
          ar: "إنتاج الوسائط والبث",
        },
      },
      {
        id: "sub-19-6",
        title: {
          en: "Corporate Branding Services",
          ar: "خدمات العلامة التجارية للشركات",
        },
      },
    ],
  },

  {
    id: "cat-20",
    title: {
      en: "Automotive & Heavy Vehicles",
      ar: "السيارات والمركبات الثقيلة",
    },
    subcategories: [
      {
        id: "sub-20-1",
        title: {
          en: "Car Dealerships",
          ar: "معارض السيارات",
        },
      },
      {
        id: "sub-20-2",
        title: {
          en: "Spare Parts & Accessories",
          ar: "قطع الغيار والإكسسوارات",
        },
      },
      {
        id: "sub-20-3",
        title: {
          en: "Heavy Equipment & Machinery",
          ar: "المعدات والآلات الثقيلة",
        },
      },
      {
        id: "sub-20-4",
        title: {
          en: "Vehicle Leasing & Rental",
          ar: "تأجير واستئجار المركبات",
        },
      },
      {
        id: "sub-20-5",
        title: {
          en: "Fleet Maintenance",
          ar: "صيانة الأسطول",
        },
      },
      {
        id: "sub-20-6",
        title: {
          en: "Vehicle Tracking Systems",
          ar: "أنظمة تتبع المركبات",
        },
      },
    ],
  },
  {
    id: "cat-21",
    title: {
      en: "Retail & Wholesale Trade",
      ar: "التجارة بالتجزئة والجملة",
    },
    subcategories: [
      {
        id: "sub-21-1",
        title: {
          en: "Consumer Goods",
          ar: "السلع الاستهلاكية",
        },
      },
      {
        id: "sub-21-2",
        title: {
          en: "Electronics & Appliances",
          ar: "الإلكترونيات والأجهزة",
        },
      },
      {
        id: "sub-21-3",
        title: {
          en: "Building Materials",
          ar: "مواد البناء",
        },
      },
      {
        id: "sub-21-4",
        title: {
          en: "Food & Beverages Wholesale",
          ar: "تجارة الجملة للأغذية والمشروبات",
        },
      },
      {
        id: "sub-21-5",
        title: {
          en: "Industrial Tools & Supplies",
          ar: "الأدوات واللوازم الصناعية",
        },
      },
      {
        id: "sub-21-6",
        title: {
          en: "Hypermarkets & Department Stores",
          ar: "الهايبر ماركت والمتاجر الكبرى",
        },
      },
    ],
  },

  {
    id: "cat-22",
    title: {
      en: "Legal & Regulatory Services",
      ar: "الخدمات القانونية والتنظيمية",
    },
    subcategories: [
      {
        id: "sub-22-1",
        title: {
          en: "Corporate Legal Services",
          ar: "الخدمات القانونية للشركات",
        },
      },
      {
        id: "sub-22-2",
        title: {
          en: "Regulatory Compliance",
          ar: "الامتثال التنظيمي",
        },
      },
      {
        id: "sub-22-3",
        title: {
          en: "Arbitration & Mediation",
          ar: "التحكيم والوساطة",
        },
      },
      {
        id: "sub-22-4",
        title: {
          en: "Intellectual Property Services",
          ar: "خدمات الملكية الفكرية",
        },
      },
      {
        id: "sub-22-5",
        title: {
          en: "Public Notary & Documentation",
          ar: "التوثيق والكاتب العدل",
        },
      },
      {
        id: "sub-22-6",
        title: {
          en: "Government Liaison Services",
          ar: "خدمات التنسيق مع الجهات الحكومية",
        },
      },
    ],
  },

  {
    id: "cat-23",
    title: {
      en: "Safety & Security Equipment",
      ar: "معدات السلامة والأمن",
    },
    subcategories: [
      {
        id: "sub-23-1",
        title: {
          en: "CCTV & Surveillance Systems",
          ar: "أنظمة المراقبة بالفيديو",
        },
      },
      {
        id: "sub-23-2",
        title: {
          en: "Firefighting Equipment",
          ar: "معدات مكافحة الحرائق",
        },
      },
      {
        id: "sub-23-3",
        title: {
          en: "Personal Protective Equipment (PPE)",
          ar: "معدات الحماية الشخصية",
        },
      },
      {
        id: "sub-23-4",
        title: {
          en: "Alarm & Access Control Systems",
          ar: "أنظمة الإنذار والتحكم في الوصول",
        },
      },
      {
        id: "sub-23-5",
        title: {
          en: "Security Audits",
          ar: "تدقيقات الأمان",
        },
      },
      {
        id: "sub-23-6",
        title: {
          en: "Emergency Preparedness Solutions",
          ar: "حلول الاستعداد للطوارئ",
        },
      },
    ],
  },

  {
    id: "cat-24",
    title: {
      en: "Marine & Shipbuilding",
      ar: "البحرية وبناء السفن",
    },
    subcategories: [
      {
        id: "sub-24-1",
        title: { en: "Shipbuilding & Repair", ar: "بناء وإصلاح السفن" },
      },
      {
        id: "sub-24-2",
        title: { en: "Marine Engineering", ar: "الهندسة البحرية" },
      },
      {
        id: "sub-24-3",
        title: {
          en: "Navigation & Communication Equipment",
          ar: "معدات الملاحة والاتصالات",
        },
      },
      {
        id: "sub-24-4",
        title: { en: "Offshore Vessels Services", ar: "خدمات السفن البحرية" },
      },
      {
        id: "sub-24-5",
        title: {
          en: "Dredging & Marine Construction",
          ar: "الجرف والإنشاءات البحرية",
        },
      },
      {
        id: "sub-24-6",
        title: {
          en: "Diving & Underwater Services",
          ar: "خدمات الغوص وتحت الماء",
        },
      },
    ],
  },
  {
    id: "cat-25",
    title: {
      en: "Mining & Minerals",
      ar: "التعدين والمعادن",
    },
    subcategories: [
      {
        id: "sub-25-1",
        title: { en: "Quarrying & Extraction", ar: "المحاجر والاستخراج" },
      },
      {
        id: "sub-25-2",
        title: {
          en: "Crushing & Screening Equipment",
          ar: "معدات التكسير والفرز",
        },
      },
      {
        id: "sub-25-3",
        title: { en: "Geological Surveys", ar: "المسوحات الجيولوجية" },
      },
      {
        id: "sub-25-4",
        title: { en: "Mineral Processing", ar: "معالجة المعادن" },
      },
      {
        id: "sub-25-5",
        title: { en: "Mining Consultancy", ar: "استشارات التعدين" },
      },
      {
        id: "sub-25-6",
        title: {
          en: "Explosives & Blasting Services",
          ar: "المتفجرات وخدمات التفجير",
        },
      },
    ],
  },
  {
    id: "cat-26",
    title: {
      en: "Cultural, Heritage & Creative Industries",
      ar: "الصناعات الثقافية والتراثية والإبداعية",
    },
    subcategories: [
      {
        id: "sub-26-1",
        title: {
          en: "Museums & Heritage Site Services",
          ar: "خدمات المتاحف والمواقع التراثية",
        },
      },
      {
        id: "sub-26-2",
        title: {
          en: "Cultural Event Management",
          ar: "إدارة الفعاليات الثقافية",
        },
      },
      {
        id: "sub-26-3",
        title: {
          en: "Art Supplies & Installations",
          ar: "مستلزمات وتركيبات الفنون",
        },
      },
      {
        id: "sub-26-4",
        title: {
          en: "Traditional Handicrafts",
          ar: "الحرف التقليدية",
        },
      },
      {
        id: "sub-26-5",
        title: {
          en: "Media & Film Production",
          ar: "إنتاج الإعلام والأفلام",
        },
      },
      {
        id: "sub-26-6",
        title: {
          en: "Creative Design Services",
          ar: "خدمات التصميم الإبداعي",
        },
      },
    ],
  },
  {
    id: "cat-27",
    title: {
      en: "Energy & Utilities",
      ar: "الطاقة والمرافق",
    },
    subcategories: [
      {
        id: "sub-27-1",
        title: {
          en: "Renewable Energy Projects (Solar, Wind, Hydro)",
          ar: "مشاريع الطاقة المتجددة (شمسية، رياح، مائية)",
        },
      },
      {
        id: "sub-27-2",
        title: {
          en: "Energy Efficiency Solutions",
          ar: "حلول كفاءة الطاقة",
        },
      },
      {
        id: "sub-27-3",
        title: {
          en: "Utility Metering Systems",
          ar: "أنظمة قياس المرافق",
        },
      },
      {
        id: "sub-27-4",
        title: {
          en: "Smart Grid Solutions",
          ar: "حلول الشبكات الذكية",
        },
      },
      {
        id: "sub-27-5",
        title: {
          en: "Energy Audits",
          ar: "تدقيقات الطاقة",
        },
      },
      {
        id: "sub-27-6",
        title: {
          en: "Power Purchase & Trading",
          ar: "شراء وبيع الطاقة",
        },
      },
    ],
  },
  {
    id: "cat-28",
    title: {
      en: "Research & Innovation",
      ar: "البحث والابتكار",
    },
    subcategories: [
      {
        id: "sub-28-1",
        title: {
          en: "Scientific Research Services",
          ar: "خدمات البحث العلمي",
        },
      },
      {
        id: "sub-28-2",
        title: {
          en: "Innovation Centers & Labs",
          ar: "مراكز ومختبرات الابتكار",
        },
      },
      {
        id: "sub-28-3",
        title: {
          en: "Prototype Development",
          ar: "تطوير النماذج الأولية",
        },
      },
      {
        id: "sub-28-4",
        title: {
          en: "Patent Filing Services",
          ar: "خدمات تسجيل براءات الاختراع",
        },
      },
      {
        id: "sub-28-5",
        title: {
          en: "Academic-Industry Partnerships",
          ar: "الشراكات بين الجامعات والصناعة",
        },
      },
      {
        id: "sub-28-6",
        title: {
          en: "Incubators & Accelerators",
          ar: "الحاضنات والمسرعات",
        },
      },
    ],
  },

  {
    id: "cat-41",
    title: {
      en: "Artificial Intelligence & Emerging Technologies",
      ar: "الذكاء الاصطناعي والتقنيات الناشئة",
    },
    subcategories: [
      {
        id: "sub-41-1",
        title: {
          en: "AI Solutions & Automation",
          ar: "حلول الذكاء الاصطناعي والأتمتة",
        },
      },
      {
        id: "sub-41-2",
        title: {
          en: "Machine Learning & Predictive Analytics",
          ar: "تعلم الآلة والتحليلات التنبؤية",
        },
      },
      {
        id: "sub-41-3",
        title: {
          en: "IoT (Internet of Things) Solutions",
          ar: "حلول إنترنت الأشياء",
        },
      },
      {
        id: "sub-41-4",
        title: {
          en: "Blockchain Applications",
          ar: "تطبيقات البلوك تشين",
        },
      },
      {
        id: "sub-41-5",
        title: {
          en: "Augmented & Virtual Reality",
          ar: "الواقع المعزز والواقع الافتراضي",
        },
      },
      {
        id: "sub-41-6",
        title: {
          en: "Smart City Solutions",
          ar: "حلول المدن الذكية",
        },
      },
    ],
  },

  {
    id: "cat-42",
    title: {
      en: "Disaster Management & Emergency Services",
      ar: "إدارة الكوارث وخدمات الطوارئ",
    },
    subcategories: [
      {
        id: "sub-42-1",
        title: {
          en: "Disaster Preparedness Planning",
          ar: "تخطيط الاستعداد للكوارث",
        },
      },
      {
        id: "sub-42-2",
        title: {
          en: "Emergency Response Services",
          ar: "خدمات الاستجابة الطارئة",
        },
      },
      {
        id: "sub-42-3",
        title: {
          en: "Rescue Equipment Supply",
          ar: "توفير معدات الإنقاذ",
        },
      },
      {
        id: "sub-42-4",
        title: {
          en: "Medical Evacuation Services",
          ar: "خدمات الإجلاء الطبي",
        },
      },
      {
        id: "sub-42-5",
        title: {
          en: "Fire & Flood Mitigation Solutions",
          ar: "حلول التخفيف من الحرائق والفيضانات",
        },
      },
      {
        id: "sub-42-6",
        title: {
          en: "Risk Assessment & Resilience Consulting",
          ar: "تقييم المخاطر واستشارات المرونة",
        },
      },
    ],
  },
  {
    id: "cat-43",
    title: {
      en: "Veterinary & Animal Services",
      ar: "الخدمات البيطرية وخدمات الحيوانات",
    },
    subcategories: [
      {
        id: "sub-43-1",
        title: {
          en: "Veterinary Clinics & Services",
          ar: "العيادات البيطرية والخدمات",
        },
      },
      {
        id: "sub-43-2",
        title: {
          en: "Animal Feed & Nutrition",
          ar: "تغذية الحيوانات وأعلافها",
        },
      },
      {
        id: "sub-43-3",
        title: {
          en: "Livestock Equipment",
          ar: "معدات الثروة الحيوانية",
        },
      },
      {
        id: "sub-43-4",
        title: {
          en: "Animal Breeding & Care",
          ar: "تربية الحيوانات ورعايتها",
        },
      },
      {
        id: "sub-43-5",
        title: {
          en: "Animal Health Pharmaceuticals",
          ar: "الأدوية البيطرية لصحة الحيوانات",
        },
      },
      {
        id: "sub-43-6",
        title: {
          en: "Wildlife Management",
          ar: "إدارة الحياة البرية",
        },
      },
    ],
  },
  {
    id: "cat-44",
    title: {
      en: "Social & Community Services",
      ar: "الخدمات الاجتماعية وخدمات المجتمع",
    },
    subcategories: [
      {
        id: "sub-44-1",
        title: {
          en: "NGO & Nonprofit Support Services",
          ar: "خدمات دعم المنظمات غير الحكومية وغير الربحية",
        },
      },
      {
        id: "sub-44-2",
        title: {
          en: "Social Work & Welfare Services",
          ar: "الخدمة الاجتماعية وخدمات الرعاية",
        },
      },
      {
        id: "sub-44-3",
        title: {
          en: "Community Outreach Programs",
          ar: "برامج التوعية المجتمعية",
        },
      },
      {
        id: "sub-44-4",
        title: {
          en: "Disability Services",
          ar: "خدمات ذوي الاحتياجات الخاصة",
        },
      },
      {
        id: "sub-44-5",
        title: {
          en: "Elderly Care & Facilities",
          ar: "رعاية المسنين والمرافق",
        },
      },
      {
        id: "sub-44-6",
        title: {
          en: "Orphanage & Shelter Services",
          ar: "خدمات دور الأيتام والملاجئ",
        },
      },
    ],
  },
  {
    id: "cat-45",
    title: {
      en: "Meteorological & Geophysical Services",
      ar: "الخدمات الأرصادية والجيوفيزيائية",
    },
    subcategories: [
      {
        id: "sub-45-1",
        title: {
          en: "Weather Monitoring Equipment",
          ar: "معدات مراقبة الطقس",
        },
      },
      {
        id: "sub-45-2",
        title: {
          en: "Seismic Monitoring Systems",
          ar: "أنظمة مراقبة الزلازل",
        },
      },
      {
        id: "sub-45-3",
        title: {
          en: "Environmental Sensors",
          ar: "أجهزة الاستشعار البيئية",
        },
      },
      {
        id: "sub-45-4",
        title: {
          en: "Oceanographic Survey Services",
          ar: "خدمات المسح المحيطي",
        },
      },
      {
        id: "sub-45-5",
        title: {
          en: "Geological Mapping",
          ar: "رسم الخرائط الجيولوجية",
        },
      },
      {
        id: "sub-45-6",
        title: {
          en: "Satellite Imaging Services",
          ar: "خدمات تصوير الأقمار الصناعية",
        },
      },
    ],
  },
  {
    id: "cat-46",
    title: {
      en: "Fire Protection & Safety Engineering",
      ar: "الحماية من الحرائق وهندسة السلامة",
    },
    subcategories: [
      {
        id: "sub-46-1",
        title: {
          en: "Fire Suppression Systems",
          ar: "أنظمة إخماد الحرائق",
        },
      },
      {
        id: "sub-46-2",
        title: {
          en: "Fire Alarm & Detection Systems",
          ar: "أنظمة الإنذار والكشف عن الحرائق",
        },
      },
      {
        id: "sub-46-3",
        title: {
          en: "Fireproofing & Insulation Materials",
          ar: "مواد العزل ومقاومة الحرائق",
        },
      },
      {
        id: "sub-46-4",
        title: {
          en: "Safety Training & Drills",
          ar: "تدريب وتمارين السلامة",
        },
      },
      {
        id: "sub-46-5",
        title: {
          en: "Fire Safety Audits",
          ar: "تدقيق السلامة من الحرائق",
        },
      },
      {
        id: "sub-46-6",
        title: {
          en: "Fire Retardant Coatings",
          ar: "طلاءات مقاومة للحريق",
        },
      },
    ],
  },
  {
    id: "cat-47",
    title: {
      en: "Academic & Research Institutions",
      ar: "المؤسسات الأكاديمية والبحثية",
    },
    subcategories: [
      {
        id: "sub-47-1",
        title: {
          en: "Universities & Colleges",
          ar: "الجامعات والكليات",
        },
      },
      {
        id: "sub-47-2",
        title: {
          en: "Think Tanks & Research Institutes",
          ar: "مراكز الفكر والمعاهد البحثية",
        },
      },
      {
        id: "sub-47-3",
        title: {
          en: "Academic Publishing",
          ar: "النشر الأكاديمي",
        },
      },
      {
        id: "sub-47-4",
        title: {
          en: "Research Funding Bodies",
          ar: "هيئات تمويل الأبحاث",
        },
      },
      {
        id: "sub-47-5",
        title: {
          en: "Educational Program Accreditation",
          ar: "اعتماد البرامج التعليمية",
        },
      },
      {
        id: "sub-47-6",
        title: {
          en: "Laboratory Services",
          ar: "خدمات المختبرات",
        },
      },
    ],
  },
  {
    id: "cat-48",
    title: {
      en: "Cultural Affairs & Religious Services",
      ar: "الشؤون الثقافية والخدمات الدينية",
    },
    subcategories: [
      {
        id: "sub-48-1",
        title: {
          en: "Mosque Construction & Maintenance",
          ar: "بناء المساجد وصيانتها",
        },
      },
      {
        id: "sub-48-2",
        title: {
          en: "Quran Printing & Distribution",
          ar: "طباعة وتوزيع المصاحف",
        },
      },
      {
        id: "sub-48-3",
        title: {
          en: "Religious Training & Events",
          ar: "التدريب والفعاليات الدينية",
        },
      },
      {
        id: "sub-48-4",
        title: {
          en: "Cultural Heritage Conservation",
          ar: "حفظ التراث الثقافي",
        },
      },
      {
        id: "sub-48-5",
        title: {
          en: "Religious Travel Services (Hajj, Umrah)",
          ar: "خدمات السفر الديني (الحج والعمرة)",
        },
      },
      {
        id: "sub-48-6",
        title: {
          en: "Religious Supplies",
          ar: "المستلزمات الدينية",
        },
      },
    ],
  },
  {
    id: "cat-49",
    title: {
      en: "Custom Fabrication & Prototyping",
      ar: "التصنيع المخصص والنماذج الأولية",
    },
    subcategories: [
      {
        id: "sub-49-1",
        title: {
          en: "CNC Machining & 3D Printing",
          ar: "التشغيل باستخدام الحاسب الآلي والطباعة ثلاثية الأبعاد",
        },
      },
      {
        id: "sub-49-2",
        title: {
          en: "Steel & Metal Fabrication",
          ar: "تصنيع الصلب والمعادن",
        },
      },
      {
        id: "sub-49-3",
        title: {
          en: "Industrial Prototyping",
          ar: "النماذج الأولية الصناعية",
        },
      },
      {
        id: "sub-49-4",
        title: {
          en: "Plastic & Composite Molding",
          ar: "قولبة البلاستيك والمركبات",
        },
      },
      {
        id: "sub-49-5",
        title: {
          en: "Precision Engineering Services",
          ar: "خدمات الهندسة الدقيقة",
        },
      },
      {
        id: "sub-49-6",
        title: {
          en: "Bespoke Design & Fabrication",
          ar: "التصميم والتصنيع حسب الطلب",
        },
      },
    ],
  },
  {
    id: "cat-50",
    title: {
      en: "Marine Biology & Fisheries Development",
      ar: "علم الأحياء البحرية وتطوير مصايد الأسماك",
    },
    subcategories: [
      {
        id: "sub-50-1",
        title: {
          en: "Aquaculture Equipment & Supplies",
          ar: "معدات وإمدادات تربية الأحياء المائية",
        },
      },
      {
        id: "sub-50-2",
        title: {
          en: "Marine Research Services",
          ar: "خدمات البحث البحري",
        },
      },
      {
        id: "sub-50-3",
        title: {
          en: "Hatchery Setup & Maintenance",
          ar: "إعداد وصيانة مفرخات الأسماك",
        },
      },
      {
        id: "sub-50-4",
        title: {
          en: "Sustainable Fishing Equipment",
          ar: "معدات صيد مستدامة",
        },
      },
      {
        id: "sub-50-5",
        title: {
          en: "Seafood Processing & Packaging",
          ar: "معالجة وتعبئة المأكولات البحرية",
        },
      },
      {
        id: "sub-50-6",
        title: {
          en: "Coastal Monitoring Systems",
          ar: "أنظمة مراقبة الساحل",
        },
      },
    ],
  },

  {
    id: "cat-51",
    title: {
      en: "Space Technology & Satellite Services",
      ar: "تكنولوجيا الفضاء وخدمات الأقمار الصناعية",
    },
    subcategories: [
      {
        id: "sub-51-1",
        title: {
          en: "Satellite Ground Station Equipment",
          ar: "معدات محطات الأقمار الصناعية الأرضية",
        },
      },
      {
        id: "sub-51-2",
        title: {
          en: "Remote Sensing & Imaging",
          ar: "الاستشعار عن بعد والتصوير",
        },
      },
      {
        id: "sub-51-3",
        title: {
          en: "Space R&D Consulting",
          ar: "الاستشارات في أبحاث وتطوير الفضاء",
        },
      },
      {
        id: "sub-51-4",
        title: {
          en: "Satellite Data Analysis",
          ar: "تحليل بيانات الأقمار الصناعية",
        },
      },
      {
        id: "sub-51-5",
        title: {
          en: "National Space Program Support",
          ar: "دعم البرامج الفضائية الوطنية",
        },
      },
      {
        id: "sub-51-6",
        title: {
          en: "CubeSat & Microsatellite Services",
          ar: "خدمات الكيوب سات والأقمار الصناعية الصغيرة",
        },
      },
    ],
  },
  {
    id: "cat-52",
    title: {
      en: "Rehabilitation & Accessibility Services",
      ar: "خدمات إعادة التأهيل وسهولة الوصول",
    },
    subcategories: [
      {
        id: "sub-52-1",
        title: {
          en: "Disability Aids & Equipment",
          ar: "المساعدات والمعدات لذوي الإعاقة",
        },
      },
      {
        id: "sub-52-2",
        title: {
          en: "Accessibility Infrastructure (Ramps, Elevators)",
          ar: "البنية التحتية لإمكانية الوصول (منحدرات، مصاعد)",
        },
      },
      {
        id: "sub-52-3",
        title: {
          en: "Occupational Therapy Services",
          ar: "خدمات العلاج الوظيفي",
        },
      },
      {
        id: "sub-52-4",
        title: {
          en: "Prosthetics & Orthotics",
          ar: "الأطراف الصناعية والأجهزة التقويمية",
        },
      },
      {
        id: "sub-52-5",
        title: {
          en: "Home Modification Services",
          ar: "خدمات تعديل المنازل",
        },
      },
      {
        id: "sub-52-6",
        title: {
          en: "Inclusive Design Consultancy",
          ar: "استشارات التصميم الشامل",
        },
      },
    ],
  },
  {
    id: "cat-53",
    title: {
      en: "Lighting & Illumination",
      ar: "الإضاءة والإنارة",
    },
    subcategories: [
      {
        id: "sub-53-1",
        title: {
          en: "LED Lighting Systems",
          ar: "أنظمة الإضاءة LED",
        },
      },
      {
        id: "sub-53-2",
        title: {
          en: "Industrial & Street Lighting",
          ar: "إضاءة صناعية وشارعية",
        },
      },
      {
        id: "sub-53-3",
        title: {
          en: "Decorative & Architectural Lighting",
          ar: "الإضاءة الزخرفية والمعمارية",
        },
      },
      {
        id: "sub-53-4",
        title: {
          en: "Solar Lighting Solutions",
          ar: "حلول الإضاءة بالطاقة الشمسية",
        },
      },
      {
        id: "sub-53-5",
        title: {
          en: "Smart Lighting Controls",
          ar: "أنظمة التحكم الذكي في الإضاءة",
        },
      },
      {
        id: "sub-53-6",
        title: {
          en: "Emergency & Exit Lighting",
          ar: "إضاءة الطوارئ ومخارج الطوارئ",
        },
      },
    ],
  },
  {
    id: "cat-54",
    title: {
      en: "Signage & Wayfinding Systems",
      ar: "أنظمة اللافتات والإرشاد",
    },
    subcategories: [
      {
        id: "sub-54-1",
        title: {
          en: "Indoor & Outdoor Signage",
          ar: "لافتات داخلية وخارجية",
        },
      },
      {
        id: "sub-54-2",
        title: {
          en: "Digital Signage Solutions",
          ar: "حلول اللافتات الرقمية",
        },
      },
      {
        id: "sub-54-3",
        title: {
          en: "Road & Traffic Signs",
          ar: "لافتات الطرق والمرور",
        },
      },
      {
        id: "sub-54-4",
        title: {
          en: "Braille & Accessibility Signage",
          ar: "لافتات برايل وسهولة الوصول",
        },
      },
      {
        id: "sub-54-5",
        title: {
          en: "Exhibition Sign Systems",
          ar: "أنظمة لافتات المعارض",
        },
      },
      {
        id: "sub-54-6",
        title: {
          en: "Illuminated Signs",
          ar: "اللافتات المضيئة",
        },
      },
    ],
  },
  {
    id: "cat-55",
    title: {
      en: "Courier, Postal & Mail Services",
      ar: "خدمات البريد والتوصيل",
    },
    subcategories: [
      {
        id: "sub-55-1",
        title: {
          en: "Express Parcel Delivery",
          ar: "توصيل الطرود السريع",
        },
      },
      {
        id: "sub-55-2",
        title: {
          en: "National & International Shipping",
          ar: "الشحن المحلي والدولي",
        },
      },
      {
        id: "sub-55-3",
        title: {
          en: "Mailroom Management",
          ar: "إدارة غرف البريد",
        },
      },
      {
        id: "sub-55-4",
        title: {
          en: "Bulk Mailing Services",
          ar: "خدمات البريد الجماعي",
        },
      },
      {
        id: "sub-55-5",
        title: {
          en: "PO Box & Mailbox Rental",
          ar: "تأجير صناديق البريد",
        },
      },
      {
        id: "sub-55-6",
        title: {
          en: "Logistics Software Integration",
          ar: "تكامل برمجيات الخدمات اللوجستية",
        },
      },
    ],
  },
  {
    id: "cat-56",
    title: {
      en: "Auction & Asset Disposal Services",
      ar: "خدمات المزادات والتخلص من الأصول",
    },
    subcategories: [
      {
        id: "sub-56-1",
        title: {
          en: "Government Surplus Auctions",
          ar: "مزادات فائض الحكومة",
        },
      },
      {
        id: "sub-56-2",
        title: {
          en: "Vehicle & Equipment Auctions",
          ar: "مزادات المركبات والمعدات",
        },
      },
      {
        id: "sub-56-3",
        title: {
          en: "Real Estate Auctions",
          ar: "مزادات العقارات",
        },
      },
      {
        id: "sub-56-4",
        title: {
          en: "Online Auction Platforms",
          ar: "منصات المزادات الإلكترونية",
        },
      },
      {
        id: "sub-56-5",
        title: {
          en: "Asset Valuation & Liquidation",
          ar: "تقييم الأصول وتسييلها",
        },
      },
      {
        id: "sub-56-6",
        title: {
          en: "Salvage & Reuse Services",
          ar: "خدمات الاسترجاع وإعادة الاستخدام",
        },
      },
    ],
  },
  {
    id: "cat-57",
    title: {
      en: "Refurbishment & Renovation",
      ar: "التجديد والترميم",
    },
    subcategories: [
      {
        id: "sub-57-1",
        title: {
          en: "Office & Building Renovation",
          ar: "تجديد المكاتب والمباني",
        },
      },
      {
        id: "sub-57-2",
        title: {
          en: "Historical Building Restoration",
          ar: "ترميم المباني التاريخية",
        },
      },
      {
        id: "sub-57-3",
        title: {
          en: "Waterproofing & Structural Repairs",
          ar: "العزل المائي والإصلاحات الإنشائية",
        },
      },
      {
        id: "sub-57-4",
        title: {
          en: "Painting & Recoating Services",
          ar: "خدمات الطلاء وإعادة الطلاء",
        },
      },
      {
        id: "sub-57-5",
        title: {
          en: "Retrofit Solutions",
          ar: "حلول التحديث والتعديل",
        },
      },
      {
        id: "sub-57-6",
        title: {
          en: "Home Improvement",
          ar: "تحسين المنازل",
        },
      },
    ],
  },
  {
    id: "cat-58",
    title: {
      en: "Elevators, Escalators & Lifts",
      ar: "المصاعد والسلالم المتحركة والرافعات",
    },
    subcategories: [
      {
        id: "sub-58-1",
        title: {
          en: "Passenger Elevators",
          ar: "مصاعد الركاب",
        },
      },
      {
        id: "sub-58-2",
        title: {
          en: "Freight Elevators",
          ar: "مصاعد البضائع",
        },
      },
      {
        id: "sub-58-3",
        title: {
          en: "Escalator Installation & Maintenance",
          ar: "تركيب وصيانة السلالم المتحركة",
        },
      },
      {
        id: "sub-58-4",
        title: {
          en: "Dumbwaiters & Platform Lifts",
          ar: "الرافعات الصغيرة ورافعات المنصات",
        },
      },
      {
        id: "sub-58-5",
        title: {
          en: "Elevator Modernization",
          ar: "تحديث المصاعد",
        },
      },
      {
        id: "sub-58-6",
        title: {
          en: "Safety & Compliance Inspections",
          ar: "فحوصات السلامة والامتثال",
        },
      },
    ],
  },
  {
    id: "cat-59",
    title: {
      en: "Interior Landscaping & Green Walls",
      ar: "تنسيق الحدائق الداخلية والجدران الخضراء",
    },
    subcategories: [
      {
        id: "sub-59-1",
        title: {
          en: "Indoor Plant Services",
          ar: "خدمات النباتات الداخلية",
        },
      },
      {
        id: "sub-59-2",
        title: {
          en: "Vertical Gardens",
          ar: "الحدائق الرأسية",
        },
      },
      {
        id: "sub-59-3",
        title: {
          en: "Office Green Design",
          ar: "التصميم الأخضر للمكاتب",
        },
      },
      {
        id: "sub-59-4",
        title: {
          en: "Living Wall Installations",
          ar: "تركيب الجدران الحية",
        },
      },
      {
        id: "sub-59-5",
        title: {
          en: "Plant Maintenance Contracts",
          ar: "عقود صيانة النباتات",
        },
      },
      {
        id: "sub-59-6",
        title: {
          en: "Biophilic Design Services",
          ar: "خدمات التصميم الحيوي",
        },
      },
    ],
  },
  {
    id: "cat-60",
    title: {
      en: "Art & Exhibition Services",
      ar: "خدمات الفن والمعارض",
    },
    subcategories: [
      {
        id: "sub-60-1",
        title: {
          en: "Art Installations",
          ar: "تركيبات فنية",
        },
      },
      {
        id: "sub-60-2",
        title: {
          en: "Exhibition Booth Construction",
          ar: "بناء أجنحة المعارض",
        },
      },
      {
        id: "sub-60-3",
        title: {
          en: "Art Transport & Handling",
          ar: "نقل ومعالجة الأعمال الفنية",
        },
      },
      {
        id: "sub-60-4",
        title: {
          en: "Museum Exhibit Design",
          ar: "تصميم معارض المتاحف",
        },
      },
      {
        id: "sub-60-5",
        title: {
          en: "Curation & Cataloguing",
          ar: "تنسيق وفهرسة المعروضات",
        },
      },
      {
        id: "sub-60-6",
        title: {
          en: "Art Storage & Insurance",
          ar: "تخزين الأعمال الفنية وتأمينها",
        },
      },
    ],
  },

  {
    id: "cat-61",
    title: {
      en: "Tatweer (Innovation & SME Support)",
      ar: "تطوير (الابتكار ودعم المشاريع الصغيرة والمتوسطة)",
    },
    subcategories: [
      {
        id: "sub-61-1",
        title: {
          en: "Start-up Incubation Services",
          ar: "خدمات حاضنات المشاريع الناشئة",
        },
      },
      {
        id: "sub-61-2",
        title: {
          en: "SME Acceleration Programs",
          ar: "برامج تسريع المشاريع الصغيرة والمتوسطة",
        },
      },
      {
        id: "sub-61-3",
        title: {
          en: "Business Mentorship & Coaching",
          ar: "الإرشاد والتدريب للأعمال",
        },
      },
      {
        id: "sub-61-4",
        title: {
          en: "Government SME Funding Programs",
          ar: "برامج تمويل المشاريع الصغيرة والمتوسطة الحكومية",
        },
      },
      {
        id: "sub-61-5",
        title: {
          en: "Product-Market Fit Consulting",
          ar: "استشارات ملاءمة المنتج للسوق",
        },
      },
      {
        id: "sub-61-6",
        title: {
          en: "Innovation Labs & Facilities",
          ar: "مختبرات ومرافق الابتكار",
        },
      },
    ],
  },
  {
    id: "cat-62",
    title: {
      en: "Customs & Border Services",
      ar: "خدمات الجمارك والحدود",
    },
    subcategories: [
      {
        id: "sub-62-1",
        title: { en: "Customs Consultancy", ar: "استشارات الجمارك" },
      },
      {
        id: "sub-62-2",
        title: { en: "Border Inspection Equipment", ar: "معدات تفتيش الحدود" },
      },
      {
        id: "sub-62-3",
        title: {
          en: "X-ray & Scanning Systems",
          ar: "أنظمة الأشعة السينية والمسح الضوئي",
        },
      },
      {
        id: "sub-62-4",
        title: {
          en: "Tariff Classification Services",
          ar: "خدمات تصنيف التعرفة الجمركية",
        },
      },
      {
        id: "sub-62-5",
        title: {
          en: "Duty Optimization Solutions",
          ar: "حلول تحسين الرسوم الجمركية",
        },
      },
      {
        id: "sub-62-6",
        title: {
          en: "Port & Border Operations Management",
          ar: "إدارة عمليات الموانئ والحدود",
        },
      },
    ],
  },
  {
    id: "cat-63",
    title: {
      en: "Sustainable Architecture & Green Building",
      ar: "الهندسة المعمارية المستدامة والمباني الخضراء",
    },
    subcategories: [
      {
        id: "sub-63-1",
        title: { en: "LEED & GSAS Consulting", ar: "استشارات LEED وGSAS" },
      },
      {
        id: "sub-63-2",
        title: {
          en: "Energy Modeling & Simulation",
          ar: "نمذجة الطاقة والمحاكاة",
        },
      },
      {
        id: "sub-63-3",
        title: {
          en: "Eco-Friendly Construction Materials",
          ar: "مواد البناء الصديقة للبيئة",
        },
      },
      {
        id: "sub-63-4",
        title: { en: "Passive Design Solutions", ar: "حلول التصميم السلبي" },
      },
      {
        id: "sub-63-5",
        title: {
          en: "Net-Zero Building Services",
          ar: "خدمات المباني الخالية من الانبعاثات",
        },
      },
      {
        id: "sub-63-6",
        title: {
          en: "Waste-Minimizing Construction",
          ar: "البناء لتقليل النفايات",
        },
      },
    ],
  },
  {
    id: "cat-64",
    title: {
      en: "Anti-Corruption & Governance",
      ar: "مكافحة الفساد والحوكمة",
    },
    subcategories: [
      {
        id: "sub-64-1",
        title: { en: "Compliance Auditing", ar: "تدقيق الامتثال" },
      },
      {
        id: "sub-64-2",
        title: { en: "E-Governance Solutions", ar: "حلول الحوكمة الإلكترونية" },
      },
      {
        id: "sub-64-3",
        title: {
          en: "Whistleblower Systems",
          ar: "أنظمة الإبلاغ عن المخالفات",
        },
      },
      {
        id: "sub-64-4",
        title: {
          en: "Ethics & Transparency Tools",
          ar: "أدوات الأخلاقيات والشفافية",
        },
      },
      {
        id: "sub-64-5",
        title: {
          en: "Government Risk Management",
          ar: "إدارة المخاطر الحكومية",
        },
      },
      {
        id: "sub-64-6",
        title: { en: "Anti-Fraud Software", ar: "برمجيات مكافحة الاحتيال" },
      },
    ],
  },
  {
    id: "cat-65",
    title: {
      en: "Recycling & Circular Economy",
      ar: "إعادة التدوير والاقتصاد الدائري",
    },
    subcategories: [
      {
        id: "sub-65-1",
        title: {
          en: "Industrial Waste Recycling",
          ar: "إعادة تدوير النفايات الصناعية",
        },
      },
      {
        id: "sub-65-2",
        title: { en: "E-Waste Management", ar: "إدارة النفايات الإلكترونية" },
      },
      {
        id: "sub-65-3",
        title: {
          en: "Plastic & Paper Recycling",
          ar: "إعادة تدوير البلاستيك والورق",
        },
      },
      {
        id: "sub-65-4",
        title: { en: "Scrap Metal Processing", ar: "معالجة الخردة المعدنية" },
      },
      {
        id: "sub-65-5",
        title: {
          en: "Organic & Food Waste Solutions",
          ar: "حلول النفايات العضوية والغذائية",
        },
      },
      {
        id: "sub-65-6",
        title: {
          en: "Upcycled Materials Supply",
          ar: "توريد المواد المعاد تدويرها",
        },
      },
    ],
  },
  {
    id: "cat-66",
    title: {
      en: "Luxury & High-End Services",
      ar: "الخدمات الفاخرة والراقية",
    },
    subcategories: [
      {
        id: "sub-66-1",
        title: { en: "Luxury Vehicle Leasing", ar: "تأجير المركبات الفاخرة" },
      },
      {
        id: "sub-66-2",
        title: {
          en: "Private Jet & Yacht Services",
          ar: "خدمات الطائرات واليخوت الخاصة",
        },
      },
      {
        id: "sub-66-3",
        title: { en: "VIP Event Management", ar: "إدارة الفعاليات الخاصة" },
      },
      {
        id: "sub-66-4",
        title: { en: "Premium Security Services", ar: "خدمات الأمن المتميزة" },
      },
      {
        id: "sub-66-5",
        title: {
          en: "Designer Furnishings & Decor",
          ar: "الأثاث والتصميم الراقي",
        },
      },
      {
        id: "sub-66-6",
        title: {
          en: "Concierge & Lifestyle Services",
          ar: "خدمات الكونسيرج ونمط الحياة",
        },
      },
    ],
  },
  {
    id: "cat-67",
    title: {
      en: "Intelligence, Research & Analytics",
      ar: "الاستخبارات والبحوث والتحليلات",
    },
    subcategories: [
      {
        id: "sub-67-1",
        title: { en: "Market Research Firms", ar: "شركات أبحاث السوق" },
      },
      {
        id: "sub-67-2",
        title: { en: "Big Data Analytics", ar: "تحليلات البيانات الضخمة" },
      },
      {
        id: "sub-67-3",
        title: { en: "Consumer Insights", ar: "رؤى المستهلكين" },
      },
      {
        id: "sub-67-4",
        title: {
          en: "Risk Intelligence Services",
          ar: "خدمات استخبارات المخاطر",
        },
      },
      {
        id: "sub-67-5",
        title: {
          en: "Business Forecasting Models",
          ar: "نماذج التنبؤ بالأعمال",
        },
      },
      {
        id: "sub-67-6",
        title: { en: "Competitive Benchmarking", ar: "تحليل الأداء التنافسي" },
      },
    ],
  },
  {
    id: "cat-68",
    title: {
      en: "Textile Manufacturing & Processing",
      ar: "تصنيع ومعالجة المنسوجات",
    },
    subcategories: [
      {
        id: "sub-68-1",
        title: { en: "Yarn & Thread Production", ar: "إنتاج الخيوط والغزل" },
      },
      {
        id: "sub-68-2",
        title: {
          en: "Textile Dyeing & Finishing",
          ar: "صباغة وتشطيب المنسوجات",
        },
      },
      {
        id: "sub-68-3",
        title: { en: "Knitting & Weaving Mills", ar: "مصانع الحياكة والنسيج" },
      },
      {
        id: "sub-68-4",
        title: { en: "Garment Manufacturing", ar: "تصنيع الملابس" },
      },
      {
        id: "sub-68-5",
        title: {
          en: "Industrial Laundry Equipment",
          ar: "معدات الغسيل الصناعي",
        },
      },
      {
        id: "sub-68-6",
        title: {
          en: "Textile Chemicals & Treatments",
          ar: "كيماويات ومعالجات النسيج",
        },
      },
    ],
  },
  {
    id: "cat-69",
    title: {
      en: "Batteries, Storage & Charging Systems",
      ar: "البطاريات وأنظمة التخزين والشحن",
    },
    subcategories: [
      {
        id: "sub-69-1",
        title: {
          en: "Industrial Battery Solutions",
          ar: "حلول البطاريات الصناعية",
        },
      },
      {
        id: "sub-69-2",
        title: {
          en: "EV Charging Stations",
          ar: "محطات شحن المركبات الكهربائية",
        },
      },
      {
        id: "sub-69-3",
        title: { en: "Solar Battery Storage", ar: "تخزين البطاريات الشمسية" },
      },
      {
        id: "sub-69-4",
        title: {
          en: "UPS & Backup Power Systems",
          ar: "أنظمة الطاقة الاحتياطية والـ UPS",
        },
      },
      {
        id: "sub-69-5",
        title: {
          en: "Smart Charging Infrastructure",
          ar: "البنية التحتية للشحن الذكي",
        },
      },
      {
        id: "sub-69-6",
        title: {
          en: "Lithium-ion & Alternative Technologies",
          ar: "بطاريات الليثيوم وأخرى بديلة",
        },
      },
    ],
  },
  {
    id: "cat-70",
    title: {
      en: "Gaming, eSports & Digital Entertainment",
      ar: "الألعاب والرياضات الإلكترونية والترفيه الرقمي",
    },
    subcategories: [
      {
        id: "sub-70-1",
        title: {
          en: "Game Development Studios",
          ar: "استوديوهات تطوير الألعاب",
        },
      },
      {
        id: "sub-70-2",
        title: {
          en: "eSports Event Management",
          ar: "إدارة فعاليات الرياضات الإلكترونية",
        },
      },
      {
        id: "sub-70-3",
        title: {
          en: "VR Gaming Equipment",
          ar: "معدات ألعاب الواقع الافتراضي",
        },
      },
      {
        id: "sub-70-4",
        title: {
          en: "Gaming Lounge Infrastructure",
          ar: "بنية تحتية لصالات الألعاب",
        },
      },
      {
        id: "sub-70-5",
        title: {
          en: "Online Platform Development",
          ar: "تطوير المنصات الإلكترونية",
        },
      },
      {
        id: "sub-70-6",
        title: {
          en: "Animation & Game Art Design",
          ar: "تصميم الرسوم المتحركة وفن الألعاب",
        },
      },
    ],
  },

  {
    id: "cat-71",
    title: {
      en: "Custom Electronics & Embedded Systems",
      ar: "الإلكترونيات المخصصة والأنظمة المدمجة",
    },
    subcategories: [
      {
        id: "sub-71-1",
        title: { en: "Embedded System Design", ar: "تصميم الأنظمة المدمجة" },
      },
      {
        id: "sub-71-2",
        title: { en: "PCB Fabrication", ar: "تصنيع الدوائر المطبوعة (PCB)" },
      },
      {
        id: "sub-71-3",
        title: { en: "Custom Sensor Solutions", ar: "حلول المستشعرات المخصصة" },
      },
      {
        id: "sub-71-4",
        title: {
          en: "Microcontroller Programming",
          ar: "برمجة المتحكمات الدقيقة",
        },
      },
      {
        id: "sub-71-5",
        title: { en: "IoT Hardware Design", ar: "تصميم أجهزة إنترنت الأشياء" },
      },
      {
        id: "sub-71-6",
        title: {
          en: "Control & Automation Boards",
          ar: "لوحات التحكم والأتمتة",
        },
      },
    ],
  },
  {
    id: "cat-72",
    title: {
      en: "Water Sports & Marine Recreation",
      ar: "الرياضات المائية والترفيه البحري",
    },
    subcategories: [
      {
        id: "sub-72-1",
        title: {
          en: "Diving & Snorkeling Equipment",
          ar: "معدات الغوص والغطس",
        },
      },
      {
        id: "sub-72-2",
        title: { en: "Jet Ski & Boat Rentals", ar: "تأجير الجيت سكي والقوارب" },
      },
      {
        id: "sub-72-3",
        title: { en: "Yacht Clubs & Marinas", ar: "نوادي اليخوت والمراسي" },
      },
      {
        id: "sub-72-4",
        title: {
          en: "Water Sports Safety Gear",
          ar: "معدات السلامة للرياضات المائية",
        },
      },
      {
        id: "sub-72-5",
        title: {
          en: "Underwater Photography Services",
          ar: "خدمات التصوير تحت الماء",
        },
      },
      {
        id: "sub-72-6",
        title: { en: "Eco Marine Tours", ar: "الجولات البحرية البيئية" },
      },
    ],
  },
  {
    id: "cat-73",
    title: {
      en: "Military & Defense Services",
      ar: "الخدمات العسكرية والدفاعية",
    },
    subcategories: [
      {
        id: "sub-73-1",
        title: { en: "Tactical Gear Supply", ar: "توفير المعدات التكتيكية" },
      },
      {
        id: "sub-73-2",
        title: {
          en: "Military Vehicle Maintenance",
          ar: "صيانة المركبات العسكرية",
        },
      },
      {
        id: "sub-73-3",
        title: {
          en: "Ammunition & Weapons Systems",
          ar: "الذخائر وأنظمة الأسلحة",
        },
      },
      {
        id: "sub-73-4",
        title: { en: "Defense Training Services", ar: "خدمات التدريب الدفاعي" },
      },
      {
        id: "sub-73-5",
        title: {
          en: "Surveillance Drones & Systems",
          ar: "الطائرات بدون طيار وأنظمة المراقبة",
        },
      },
      {
        id: "sub-73-6",
        title: {
          en: "Secure Communication Technologies",
          ar: "تقنيات الاتصال الآمن",
        },
      },
    ],
  },
  {
    id: "cat-74",
    title: {
      en: "Diplomatic & International Services",
      ar: "الخدمات الدبلوماسية والدولية",
    },
    subcategories: [
      {
        id: "sub-74-1",
        title: { en: "Embassy Support Services", ar: "خدمات دعم السفارات" },
      },
      {
        id: "sub-74-2",
        title: {
          en: "Diplomatic Transport Services",
          ar: "خدمات النقل الدبلوماسي",
        },
      },
      {
        id: "sub-74-3",
        title: {
          en: "Protocol & Event Services",
          ar: "خدمات البروتوكول والفعاليات",
        },
      },
      {
        id: "sub-74-4",
        title: {
          en: "Translation & Interpreter Services",
          ar: "خدمات الترجمة الفورية والتحريرية",
        },
      },
      {
        id: "sub-74-5",
        title: {
          en: "Diplomatic Courier Services",
          ar: "خدمات البريد الدبلوماسي",
        },
      },
      {
        id: "sub-74-6",
        title: {
          en: "Visa & Immigration Consulting",
          ar: "استشارات التأشيرات والهجرة",
        },
      },
    ],
  },
  {
    id: "cat-75",
    title: {
      en: "Herbal, Traditional & Natural Products",
      ar: "المنتجات العشبية والتقليدية والطبيعية",
    },
    subcategories: [
      {
        id: "sub-75-1",
        title: { en: "Herbal Medicine Suppliers", ar: "موزعو الأدوية العشبية" },
      },
      {
        id: "sub-75-2",
        title: {
          en: "Traditional Remedy Producers",
          ar: "منتجو العلاجات التقليدية",
        },
      },
      {
        id: "sub-75-3",
        title: {
          en: "Organic Cosmetics & Oils",
          ar: "مستحضرات التجميل والزيوت العضوية",
        },
      },
      {
        id: "sub-75-4",
        title: { en: "Medicinal Plant Farming", ar: "زراعة النباتات الطبية" },
      },
      {
        id: "sub-75-5",
        title: { en: "Natural Food Supplements", ar: "مكملات غذائية طبيعية" },
      },
      {
        id: "sub-75-6",
        title: {
          en: "Local Remedy Research & Development",
          ar: "بحث وتطوير العلاجات المحلية",
        },
      },
    ],
  },
  {
    id: "cat-76",
    title: {
      en: "Charitable Foundations & Philanthropy",
      ar: "المؤسسات الخيرية والعمل الخيري",
    },
    subcategories: [
      {
        id: "sub-76-1",
        title: {
          en: "Donation Management Platforms",
          ar: "منصات إدارة التبرعات",
        },
      },
      {
        id: "sub-76-2",
        title: {
          en: "CSR Project Execution",
          ar: "تنفيذ مشاريع المسؤولية الاجتماعية",
        },
      },
      {
        id: "sub-76-3",
        title: { en: "Volunteering Programs", ar: "برامج التطوع" },
      },
      {
        id: "sub-76-4",
        title: { en: "Impact Measurement Services", ar: "خدمات قياس الأثر" },
      },
      {
        id: "sub-76-5",
        title: {
          en: "Fundraising Campaign Support",
          ar: "دعم حملات جمع التبرعات",
        },
      },
      {
        id: "sub-76-6",
        title: {
          en: "Community-Based Enterprise Support",
          ar: "دعم المشاريع المجتمعية",
        },
      },
    ],
  },
  {
    id: "cat-77",
    title: {
      en: "Smart Mobility & Intelligent Transport Systems",
      ar: "التنقل الذكي وأنظمة النقل الذكية",
    },
    subcategories: [
      {
        id: "sub-77-1",
        title: {
          en: "Smart Parking Systems",
          ar: "أنظمة مواقف السيارات الذكية",
        },
      },
      {
        id: "sub-77-2",
        title: { en: "Traffic Management Solutions", ar: "حلول إدارة المرور" },
      },
      {
        id: "sub-77-3",
        title: {
          en: "Electric Vehicles (EV) & Charging",
          ar: "المركبات الكهربائية وشحنها",
        },
      },
      {
        id: "sub-77-4",
        title: {
          en: "Autonomous Vehicle Tech",
          ar: "تقنيات المركبات ذاتية القيادة",
        },
      },
      {
        id: "sub-77-5",
        title: {
          en: "Mobility-as-a-Service (MaaS)",
          ar: "التنقل كخدمة (MaaS)",
        },
      },
      {
        id: "sub-77-6",
        title: { en: "Transport Data Analytics", ar: "تحليل بيانات النقل" },
      },
    ],
  },
  {
    id: "cat-78",
    title: {
      en: "Digital Identity & Biometric Solutions",
      ar: "الهوية الرقمية والحلول البيومترية",
    },
    subcategories: [
      {
        id: "sub-78-1",
        title: { en: "eID Card Systems", ar: "أنظمة البطاقات الذكية" },
      },
      {
        id: "sub-78-2",
        title: {
          en: "Biometric Authentication (Facial, Fingerprint, Iris)",
          ar: "التحقق البيومتري (الوجه، البصمة، القزحية)",
        },
      },
      {
        id: "sub-78-3",
        title: { en: "Access Control Systems", ar: "أنظمة التحكم في الوصول" },
      },
      {
        id: "sub-78-4",
        title: {
          en: "Digital Signature Platforms",
          ar: "منصات التوقيع الرقمي",
        },
      },
      {
        id: "sub-78-5",
        title: {
          en: "Identity Verification Services",
          ar: "خدمات التحقق من الهوية",
        },
      },
      {
        id: "sub-78-6",
        title: { en: "National ID Infrastructure", ar: "بنية الهوية الوطنية" },
      },
    ],
  },
  {
    id: "cat-79",
    title: {
      en: "Remote Work & Hybrid Office Solutions",
      ar: "العمل عن بُعد وحلول المكتب الهجين",
    },
    subcategories: [
      {
        id: "sub-79-1",
        title: { en: "Video Conferencing Tools", ar: "أدوات مؤتمرات الفيديو" },
      },
      {
        id: "sub-79-2",
        title: { en: "Virtual Office Setup", ar: "إعداد المكتب الافتراضي" },
      },
      {
        id: "sub-79-3",
        title: {
          en: "Remote Team Collaboration Platforms",
          ar: "منصات التعاون بين الفرق عن بُعد",
        },
      },
      {
        id: "sub-79-4",
        title: {
          en: "Work-from-Home Hardware Bundles",
          ar: "حزم الأجهزة للعمل من المنزل",
        },
      },
      {
        id: "sub-79-5",
        title: { en: "VPN & Security Software", ar: "شبكات VPN وبرامج الأمان" },
      },
      {
        id: "sub-79-6",
        title: { en: "Telepresence Solutions", ar: "حلول التواجد عن بعد" },
      },
    ],
  },
  {
    id: "cat-80",
    title: {
      en: "Hydrology & Water Sciences",
      ar: "الهيدرولوجيا وعلوم المياه",
    },
    subcategories: [
      {
        id: "sub-80-1",
        title: {
          en: "Water Resource Mapping",
          ar: "رسم خرائط الموارد المائية",
        },
      },
      {
        id: "sub-80-2",
        title: { en: "Aquifer Monitoring", ar: "مراقبة طبقات المياه الجوفية" },
      },
      {
        id: "sub-80-3",
        title: { en: "Water Quality Analysis", ar: "تحليل جودة المياه" },
      },
      {
        id: "sub-80-4",
        title: { en: "River & Dams Modelling", ar: "نمذجة الأنهار والسدود" },
      },
      {
        id: "sub-80-5",
        title: { en: "Smart Irrigation Systems", ar: "أنظمة الري الذكية" },
      },
      {
        id: "sub-80-6",
        title: {
          en: "Hydrological Sensors & Meters",
          ar: "أجهزة استشعار وعدادات هيدرولوجية",
        },
      },
    ],
  },
  //

  {
    id: "cat-81",
    title: {
      en: "Crisis Management & Business Continuity",
      ar: "إدارة الأزمات واستمرارية الأعمال",
    },
    subcategories: [
      {
        id: "sub-81-1",
        title: {
          en: "Emergency Operations Centers (EOC)",
          ar: "مراكز العمليات الطارئة",
        },
      },
      {
        id: "sub-81-2",
        title: {
          en: "Continuity of Operations Planning (COOP)",
          ar: "تخطيط استمرارية العمليات",
        },
      },
      {
        id: "sub-81-3",
        title: { en: "Disaster Recovery Tools", ar: "أدوات استعادة الكوارث" },
      },
      {
        id: "sub-81-4",
        title: {
          en: "Crisis Communication Platforms",
          ar: "منصات التواصل أثناء الأزمات",
        },
      },
      {
        id: "sub-81-5",
        title: {
          en: "Risk Simulation & Modeling",
          ar: "محاكاة المخاطر والنمذجة",
        },
      },
      {
        id: "sub-81-6",
        title: {
          en: "Business Resilience Training",
          ar: "تدريب على مرونة الأعمال",
        },
      },
    ],
  },
  {
    id: "cat-82",
    title: {
      en: "Forensics & Investigation Services",
      ar: "الخدمات الجنائية والتحقيقات",
    },
    subcategories: [
      {
        id: "sub-82-1",
        title: { en: "Digital Forensics", ar: "التحليل الجنائي الرقمي" },
      },
      {
        id: "sub-82-2",
        title: {
          en: "Financial Forensic Audits",
          ar: "المراجعات الجنائية المالية",
        },
      },
      {
        id: "sub-82-3",
        title: { en: "Crime Scene Equipment", ar: "معدات مسرح الجريمة" },
      },
      {
        id: "sub-82-4",
        title: {
          en: "Background Checks & Due Diligence",
          ar: "فحص الخلفية والتحقق من الجدارة",
        },
      },
      {
        id: "sub-82-5",
        title: { en: "Fraud Detection Services", ar: "خدمات كشف الاحتيال" },
      },
      {
        id: "sub-82-6",
        title: {
          en: "Legal Investigation Software",
          ar: "برمجيات التحقيق القانوني",
        },
      },
    ],
  },
  {
    id: "cat-83",
    title: {
      en: "Bioengineering & Life Sciences",
      ar: "الهندسة الحيوية وعلوم الحياة",
    },
    subcategories: [
      {
        id: "sub-83-1",
        title: { en: "Genetic Testing Services", ar: "خدمات الفحص الجيني" },
      },
      {
        id: "sub-83-2",
        title: { en: "Biomedical Equipment", ar: "معدات الطب الحيوي" },
      },
      {
        id: "sub-83-3",
        title: {
          en: "Biotechnology R&D",
          ar: "البحث والتطوير في التكنولوجيا الحيوية",
        },
      },
      {
        id: "sub-83-4",
        title: { en: "Clinical Trials Support", ar: "دعم التجارب السريرية" },
      },
      {
        id: "sub-83-5",
        title: {
          en: "Lab Reagents & Chemicals",
          ar: "كواشف ومواد كيميائية للمختبرات",
        },
      },
      {
        id: "sub-83-6",
        title: {
          en: "Bioinformatics Software",
          ar: "برمجيات المعلومات الحيوية",
        },
      },
    ],
  },
  {
    id: "cat-84",
    title: {
      en: "Mining Safety & Geotechnical Services",
      ar: "سلامة التعدين والخدمات الجيوتقنية",
    },
    subcategories: [
      {
        id: "sub-84-1",
        title: { en: "Mine Safety Equipment", ar: "معدات سلامة المناجم" },
      },
      {
        id: "sub-84-2",
        title: { en: "Rock & Soil Testing", ar: "اختبارات الصخور والتربة" },
      },
      {
        id: "sub-84-3",
        title: {
          en: "Explosives Handling Systems",
          ar: "أنظمة التعامل مع المتفجرات",
        },
      },
      {
        id: "sub-84-4",
        title: {
          en: "Slope Stability Monitoring",
          ar: "مراقبة استقرار المنحدرات",
        },
      },
      {
        id: "sub-84-5",
        title: { en: "Tailings Dam Engineering", ar: "هندسة سدود المخلفات" },
      },
      {
        id: "sub-84-6",
        title: {
          en: "Mine Ventilation Systems",
          ar: "أنظمة التهوية في المناجم",
        },
      },
    ],
  },
  {
    id: "cat-85",
    title: {
      en: "Parks & Recreational Infrastructure",
      ar: "الحدائق والبنية التحتية الترفيهية",
    },
    subcategories: [
      {
        id: "sub-85-1",
        title: { en: "Park Furniture & Fixtures", ar: "أثاث ومرافق الحدائق" },
      },
      {
        id: "sub-85-2",
        title: { en: "Playground Equipment", ar: "معدات الملاعب" },
      },
      {
        id: "sub-85-3",
        title: { en: "Green Space Planning", ar: "تخطيط المساحات الخضراء" },
      },
      {
        id: "sub-85-4",
        title: { en: "Urban Forest Management", ar: "إدارة الغابات الحضرية" },
      },
      {
        id: "sub-85-5",
        title: {
          en: "Walking & Cycling Tracks",
          ar: "مسارات المشي وركوب الدراجات",
        },
      },
      {
        id: "sub-85-6",
        title: { en: "Public Fitness Equipment", ar: "معدات اللياقة العامة" },
      },
    ],
  },
  {
    id: "cat-86",
    title: {
      en: "Ethical & Fair Trade Products",
      ar: "المنتجات الأخلاقية والتجارة العادلة",
    },
    subcategories: [
      {
        id: "sub-86-1",
        title: {
          en: "Fair Trade Certified Goods",
          ar: "منتجات معتمدة من التجارة العادلة",
        },
      },
      {
        id: "sub-86-2",
        title: {
          en: "Ethical Supply Chain Audits",
          ar: "مراجعات سلسلة الإمداد الأخلاقية",
        },
      },
      {
        id: "sub-86-3",
        title: {
          en: "Sustainable Craft Producers",
          ar: "منتجو الحرف المستدامة",
        },
      },
      {
        id: "sub-86-4",
        title: {
          en: "Organic & Ethical Fashion",
          ar: "الموضة العضوية والأخلاقية",
        },
      },
      {
        id: "sub-86-5",
        title: {
          en: "Community-Based Product Sourcing",
          ar: "توريد المنتجات المجتمعية",
        },
      },
      {
        id: "sub-86-6",
        title: {
          en: "ESG Compliance Services",
          ar: "خدمات التوافق مع معايير ESG",
        },
      },
    ],
  },
  {
    id: "cat-87",
    title: {
      en: "Voice & Speech Technologies",
      ar: "تقنيات الصوت والكلام",
    },
    subcategories: [
      {
        id: "sub-87-1",
        title: {
          en: "Speech-to-Text Platforms",
          ar: "منصات تحويل الكلام إلى نص",
        },
      },
      {
        id: "sub-87-2",
        title: {
          en: "Voice Assistant Integration",
          ar: "دمج المساعدات الصوتية",
        },
      },
      {
        id: "sub-87-3",
        title: { en: "Call Center Automation", ar: "أتمتة مراكز الاتصال" },
      },
      {
        id: "sub-87-4",
        title: {
          en: "Multilingual Voice Interfaces",
          ar: "واجهات صوتية متعددة اللغات",
        },
      },
      {
        id: "sub-87-5",
        title: {
          en: "AI-Based Transcription Tools",
          ar: "أدوات نسخ مدعومة بالذكاء الاصطناعي",
        },
      },
      {
        id: "sub-87-6",
        title: {
          en: "Accessibility Voice Tools",
          ar: "أدوات صوتية لذوي الاحتياجات الخاصة",
        },
      },
    ],
  },
  {
    id: "cat-88",
    title: {
      en: "Technical Standards & Certification",
      ar: "المواصفات الفنية والاعتماد",
    },
    subcategories: [
      {
        id: "sub-88-1",
        title: { en: "ISO Certification Services", ar: "خدمات اعتماد الأيزو" },
      },
      {
        id: "sub-88-2",
        title: { en: "Calibration Laboratories", ar: "مختبرات المعايرة" },
      },
      {
        id: "sub-88-3",
        title: { en: "Product Testing Labs", ar: "مختبرات اختبار المنتجات" },
      },
      {
        id: "sub-88-4",
        title: {
          en: "Standards Compliance Audits",
          ar: "مراجعات التوافق مع المعايير",
        },
      },
      {
        id: "sub-88-5",
        title: {
          en: "Halal Certification Services",
          ar: "خدمات اعتماد الحلال",
        },
      },
      {
        id: "sub-88-6",
        title: {
          en: "Construction & Industry Codes",
          ar: "رموز البناء والصناعة",
        },
      },
    ],
  },
];

export default categories;
