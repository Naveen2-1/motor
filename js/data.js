/**
 * Inertia Electric Motors Solutions - Centralized Data Store
 * Preserves 100% of authentic business data, specs, brands, and industrial sectors.
 */

const COMPANY_INFO = {
  name: "Inertia Electric Motors Solutions",
  shortName: "Inertia",
  tagline: "Industrial Motors, Drives & Power Transmission Solutions",
  subTagline: "Authorized Distributor & Technical Partner for Plant Operations",
  legalType: "Sole Proprietorship",
  address: "Badangpet, Hyderabad, Telangana, India - 500058",
  phones: ["+91 90000 00000", "+91 90000 00001"],
  primaryPhone: "+91 90000 00000",
  whatsappNumber: "919000000000",
  emails: ["sales@inertiaemotors.com", "info@inertiaemotors.com"],
  primaryEmail: "sales@inertiaemotors.com",
  workingHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
  registrations: [
    { label: "GST Registered", code: "GSTIN Verified" },
    { label: "MSME Registered", code: "Govt. of India Certified" },
    { label: "ISO Compliant Quality", code: "Industrial Standard" }
  ]
};

const STATS_DATA = [
  { value: 15, suffix: "", label: "Product Categories", desc: "Standard, duty-rated & custom builds" },
  { value: 45, suffix: "+", label: "Motor Sub-Types", desc: "Foot, flange, crane, slip ring & FLP" },
  { value: 10, suffix: "", label: "Global Brands", desc: "ABB, Siemens, Kirloskar, Bharat Bijlee & more" },
  { value: 24, suffix: "h", label: "Quote Turnaround", desc: "Technical commercial proposals" }
];

const BRANDS_DATA = [
  { name: "ABB", tag: "Heavy Industry & Drives", country: "Switzerland" },
  { name: "Siemens", tag: "Precision & Automation", country: "Germany" },
  { name: "Kirloskar", tag: "Rugged Indian Heritage", country: "India" },
  { name: "Bharat Bijlee", tag: "Industrial Efficiency", country: "India" },
  { name: "Marathon", tag: "Severe Duty Motors", country: "USA" },
  { name: "Havells", tag: "Energy Efficient Tech", country: "India" },
  { name: "CG Power", tag: "High Voltage & HT Drives", country: "India" },
  { name: "WEG", tag: "Global Motor Power", country: "Brazil" },
  { name: "TECO", tag: "Heavy Duty & Mining", country: "Taiwan" },
  { name: "Bonfiglioli", tag: "Planetary & Geared Drives", country: "Italy" }
];

const ASSET_PHOTOS = {
  motorDefault: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  motorHeavy: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
  gearbox: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=80",
  pump: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
  power: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
  panel: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80",
  workshop: "https://images.unsplash.com/photo-1581093057305-8e2b2b46dea5?auto=format&fit=crop&w=900&q=80"
};

const PRODUCTS_DATA = [
  // MOTORS
  {
    id: "ac-induction-motors",
    name: "AC Induction Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "0.12 kW to 355 kW",
    poles: "2, 4, 6, 8 Pole",
    rpm: "750 – 3000 RPM",
    mounting: "B3 Foot, B5 Flange, B35 Face-Foot",
    enclosure: "TEFC (Totally Enclosed Fan Cooled)",
    protection: "IP55 / IP56 / IP65",
    insulation: "Class F (Temp Rise Class B)",
    efficiency: "IE2 / IE3 / IE4",
    voltage: "415V ± 10%, 50Hz ± 5%",
    desc: "Rugged three-phase squirrel cage induction motors built for continuous duty (S1) across manufacturing, heavy processing, and utility plants.",
    chips: ["Foot Mounted", "Flange Mounted", "TEFC", "0.12–355 kW", "Cast Iron / Alu"],
    bg: ASSET_PHOTOS.motorDefault,
    featured: true,
    popular: false
  },
  {
    id: "ie-series-motors",
    name: "IE Series High Efficiency Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "0.37 kW to 375 kW",
    poles: "2, 4, 6 Pole",
    rpm: "1000, 1500, 3000 RPM",
    mounting: "B3, B5, B14, B35",
    enclosure: "TEFC Cast Iron / Aluminium Frame",
    protection: "IP55 Standard, IP66 Optional",
    insulation: "Class F / Class H Vacuum Pressure Impregnated",
    efficiency: "IE2 (High), IE3 (Premium), IE4 (Super Premium)",
    voltage: "415V / 690V, 50/60 Hz",
    desc: "Energy-saving premium efficiency electric motors compliant with IS 12615 / IEC 60034-30-1 standards, cutting operating electricity costs by up to 18%.",
    chips: ["IE2 High", "IE3 Premium", "IE4 Super", "7 Sub-Types", "Energy Saver"],
    bg: ASSET_PHOTOS.motorHeavy,
    featured: true,
    popular: true,
    popularSpec: "5.5 kW · 4 pole · B3 foot · IP55 · IE3"
  },
  {
    id: "brake-motors",
    name: "Industrial Brake Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "0.18 kW to 45 kW",
    poles: "4, 6, 8 Pole",
    rpm: "750 – 1500 RPM",
    mounting: "B3 Foot / B5 Flange",
    enclosure: "TEFC with DC/AC Electromagnetic Disc Brake",
    protection: "IP54 / IP55",
    insulation: "Class F",
    efficiency: "IE2 / IE3",
    voltage: "415V 3-Phase with 190V DC Brake Rectifier",
    desc: "Instant stop-start fail-safe brake motors designed for cranes, hoists, lifts, machine tools, automated packaging, and conveyor transfers.",
    chips: ["Cast Iron", "Aluminium", "Electromagnetic Brake", "Fast Stop", "Fail-Safe"],
    bg: ASSET_PHOTOS.motorDefault,
    featured: false,
    popular: false
  },
  {
    id: "flameproof-motors",
    name: "Flameproof (FLP / Ex d) Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "0.37 kW to 200 kW",
    poles: "2, 4, 6, 8 Pole",
    rpm: "750 – 3000 RPM",
    mounting: "B3 Foot, B5 Flange, B35",
    enclosure: "Heavy Cast Iron Ex d IIA, IIB, IIC T4",
    protection: "IP55 / IP65 / IP66",
    insulation: "Class F with Dual Thermistors",
    efficiency: "IE2 / IE3 FLP",
    voltage: "415V ± 10%, 50Hz",
    desc: "PESO and CMRI certified explosion-proof motors built for hazardous Zone 1 and Zone 2 environments in oil refineries, pharma chemical reactors, and solvent plants.",
    chips: ["Ex d IIB T4", "Ex d IIC", "PESO Certified", "Zone 1 & 2", "Heavy Duty"],
    bg: ASSET_PHOTOS.motorHeavy,
    featured: true,
    popular: true,
    popularSpec: "7.5 kW · 4 pole · Ex d IIB T4 · Cast Iron"
  },
  {
    id: "slip-ring-motors",
    name: "Slip Ring / Crane Duty Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "2.2 kW to 315 kW",
    poles: "6, 8, 10 Pole",
    rpm: "600 – 1000 RPM",
    mounting: "B3 Foot Mounted Heavy Base",
    enclosure: "TEFC or SPDP (Screen Protected Drip Proof)",
    protection: "IP55 (TEFC) / IP23 (SPDP)",
    insulation: "Class F / Class H",
    efficiency: "Heavy Starting Torque Duty",
    voltage: "415V Stator, External Rotor Resistance",
    desc: "High starting torque, low inrush current wound rotor motors built specifically for overhead cranes, winches, heavy crushers, and steel rolling mills.",
    chips: ["S3 / S4 Duty", "40% / 60% CDF", "High Starting Torque", "Crane Duty", "SPDP/TEFC"],
    bg: ASSET_PHOTOS.motorHeavy,
    featured: true,
    popular: true,
    popularSpec: "11 kW · 6 pole · S4 40% duty · TEFC"
  },
  {
    id: "cooling-tower-motors",
    name: "Cooling Tower Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "1.5 kW to 37 kW",
    poles: "6, 8, 12 Pole",
    rpm: "500 – 1000 RPM",
    mounting: "B5 Flange or B3 Foot (Vertical Shaft Down)",
    enclosure: "Totally Enclosed Surface Cooled (TESC/TEFC)",
    protection: "IP55 / IP65 Tropicalized Wet Duty",
    insulation: "Class F with Moisture-Resistant Varnish",
    efficiency: "IE2 / IE3",
    voltage: "415V, 50Hz",
    desc: "Specialized flange-mounted electric motors built to survive 100% relative humidity, chemical water droplets, and corrosive steam in cooling towers.",
    chips: ["Wet Duty", "IP55 / IP65", "Tropicalized", "Double Lip Seal", "Continuous"],
    bg: ASSET_PHOTOS.motorDefault,
    featured: false,
    popular: true,
    popularSpec: "5.5 kW · 6 pole · Wet Duty · IP55 Flange"
  },
  {
    id: "ahu-motors",
    name: "Air Handling Unit (AHU) Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "0.55 kW to 45 kW",
    poles: "4, 6 Pole",
    rpm: "1000, 1500 RPM",
    mounting: "Foot (B3) / Pad Mounted",
    enclosure: "TEFC Low Noise Aluminum / Cast Iron",
    protection: "IP55",
    insulation: "Class F",
    efficiency: "IE3 Premium Efficiency",
    voltage: "415V, 50Hz (VFD Compatible)",
    desc: "Ultra-low vibration, low-noise electric motors specifically balanced for commercial HVAC, hospital air filtration, pharmaceutical clean rooms, and mall AHUs.",
    chips: ["HVAC Duty", "Ultra Low Noise", "Clean Room Grade", "VFD Compatible"],
    bg: ASSET_PHOTOS.motorDefault,
    featured: false,
    popular: false
  },
  {
    id: "cooling-fan-motors",
    name: "Cooling Fan Motors",
    category: "motors",
    categoryLabel: "Motors",
    powerRange: "0.25 kW to 30 kW",
    poles: "4, 6, 8 Pole",
    rpm: "750 – 1500 RPM",
    mounting: "Airstream Mounted / Pad / Foot",
    enclosure: "Totally Enclosed Air Over (TEAO)",
    protection: "IP55",
    insulation: "Class F",
    efficiency: "IE2 / IE3",
    voltage: "415V, 50Hz",
    desc: "Direct-drive ventilation and exhaust fan motors cooled directly by the system airstream, eliminating external fan cowls and maximizing airflow efficiency.",
    chips: ["TEAO Direct Drive", "Continuous Duty", "Aerodynamic Frame", "Industrial Exhaust"],
    bg: ASSET_PHOTOS.motorDefault,
    featured: false,
    popular: false
  },

  // DRIVES & GEARING
  {
    id: "geared-motors",
    name: "Industrial Gearboxes & Geared Motors",
    category: "gearing",
    categoryLabel: "Drives & Gearing",
    powerRange: "0.18 kW to 160 kW",
    poles: "Helical, Bevel-Helical, Worm, Planetary",
    rpm: "Output speeds from 0.5 RPM to 450 RPM",
    mounting: "Foot, Flange, Shaft Mounted with Shrink Disc",
    enclosure: "Heavy Rigid Cast Iron Casing",
    protection: "IP55 / IP65 Gearhead Sealing",
    insulation: "Class F Electric Motor Section",
    efficiency: "Over 96% mechanical gear train efficiency",
    voltage: "415V 3-Phase",
    desc: "High-torque reduction units designed to deliver smooth, high-ratio power transfer for conveyor belts, agitators, mixers, extruders, and material handling systems.",
    chips: ["Helical", "Bevel-Helical", "Worm Units", "Planetary", "4 Sub-Types"],
    bg: ASSET_PHOTOS.gearbox,
    featured: true,
    popular: true,
    popularSpec: "3 kW · 1:20 ratio · Foot Mounted · Helical"
  },
  {
    id: "drivers-vfd",
    name: "Variable Frequency Drives (VFD) & Soft Starters",
    category: "gearing",
    categoryLabel: "Drives & Gearing",
    powerRange: "0.75 kW to 630 kW",
    poles: "Vector Control & Sensorless Torque Control",
    rpm: "Full zero-to-rated speed adjustment",
    mounting: "Wall Mount / IP20 Panel / IP54 Field Mount",
    enclosure: "Compact Enclosure with Built-in EMC Filter & Choke",
    protection: "IP20 / IP21 / IP54",
    insulation: "Conformal Coated PCBs for Harsh Atmosphere",
    efficiency: "98%+ Electronic Drive Efficiency",
    voltage: "380V – 480V 3-Phase Input",
    desc: "Advanced electronic motor controllers delivering precise speed control, soft acceleration, energy reduction on fans/pumps, and comprehensive motor protection.",
    chips: ["VFD Inverters", "Soft Starters", "Modbus / Profinet", "Energy Optimizer"],
    bg: ASSET_PHOTOS.panel,
    featured: false,
    popular: false
  },

  // PUMPS
  {
    id: "industrial-pumps",
    name: "Industrial Pumps & Pumping Sets",
    category: "pumps",
    categoryLabel: "Pumps",
    powerRange: "1.5 kW to 250 kW",
    poles: "2, 4 Pole Drives",
    rpm: "1450 & 2900 RPM",
    mounting: "Baseplate Mounted with Flexible Coupling / Monoblock",
    enclosure: "Cast Iron / Bronze / SS316 Impeller & Casing",
    protection: "IP55 Heavy Duty Pumping Motor",
    insulation: "Class F Motor Insulation",
    efficiency: "High Hydraulic Efficiency",
    voltage: "415V, 50Hz",
    desc: "Heavy-duty fluid transfer systems including end-suction, horizontal split casing, multistage boiler feed, and fire-fighting hydrant pumps.",
    chips: ["End Suction", "Split Casing", "Monoblock", "Fire Fighting", "Multistage"],
    bg: ASSET_PHOTOS.pump,
    featured: true,
    popular: true,
    popularSpec: "15 kW · 50 m head · 60 m³/hr · End Suction"
  },

  // POWER EQUIPMENT
  {
    id: "distribution-transformers",
    name: "Industrial Distribution Transformers",
    category: "power",
    categoryLabel: "Power Equipment",
    powerRange: "63 kVA to 5000 kVA",
    poles: "Copper / Aluminium Wound",
    rpm: "Static Power Conversion",
    mounting: "Plinth Mounted with Bi-directional Rollers",
    enclosure: "Hermetically Sealed / Conservator Oil-Immersed (ONAN)",
    protection: "IP54 Cable Boxes / Outdoor Weatherproof",
    insulation: "Class A Mineral Oil / Ester Fluid",
    efficiency: "BIS Energy Level 2 & Level 3 Standard",
    voltage: "11 kV / 33 kV Primary to 433V Secondary",
    desc: "High-reliability substation distribution and step-down transformers designed to deliver steady, clean three-phase power to motor control centers.",
    chips: ["Distribution", "Step-Down", "ONAN Cooled", "11kV/433V", "BIS Certified"],
    bg: ASSET_PHOTOS.power,
    featured: true,
    popular: true,
    popularSpec: "250 kVA · 11 kV / 433 V · ONAN Plinth"
  },
  {
    id: "industrial-generators",
    name: "Standby & Prime Power Generators",
    category: "power",
    categoryLabel: "Power Equipment",
    powerRange: "15 kVA to 2000 kVA",
    poles: "4 Pole Synchronous Alternator",
    rpm: "1500 RPM",
    mounting: "Heavy Structural Steel Skid with Anti-Vibration Mounts",
    enclosure: "CPCB-IV+ Acoustic Weatherproof Canopy",
    protection: "IP23 Alternator, IP54 Control Enclosure",
    insulation: "Class H Alternator Insulation",
    efficiency: "Optimized Specific Fuel Consumption",
    voltage: "415V 3-Phase, 0.8 Power Factor",
    desc: "Continuous and standby diesel gensets sized to handle inductive motor starting current surges without voltage dips or plant tripping.",
    chips: ["Standby Power", "Prime Power", "Acoustic Canopy", "Load Matched"],
    bg: ASSET_PHOTOS.power,
    featured: true,
    popular: false
  },
  {
    id: "circuit-breakers",
    name: "Air & Moulded Case Circuit Breakers (ACB / MCCB)",
    category: "power",
    categoryLabel: "Power Equipment",
    powerRange: "16A to 4000A Breaking Capacity",
    poles: "3 Pole / 4 Pole",
    rpm: "Instantaneous Trip & Thermal Magnetic Release",
    mounting: "Fixed / Draw-out Panel Mount",
    enclosure: "High-dielectric Insulated Shell",
    protection: "IP40 Front / IP20 Terminals",
    insulation: "1000V Rated Insulation Voltage",
    efficiency: "Category B High Breaking Ics = 100% Icu",
    voltage: "415V / 690V AC",
    desc: "Essential electrical protection devices safeguarding motors, busbars, and distribution cables from severe short circuits, overloads, and earth faults.",
    chips: ["Air Circuit Breakers (ACB)", "MCCB", "Motor Protection", "Panel Ready"],
    bg: ASSET_PHOTOS.panel,
    featured: false,
    popular: false
  },
  {
    id: "oil-starters",
    name: "Oil-Immersed Motor Starters",
    category: "power",
    categoryLabel: "Power Equipment",
    powerRange: "5 HP to 250 HP",
    poles: "Direct-On-Line (DOL) & Star-Delta",
    rpm: "Manual / Push-button Magnetic Trip",
    mounting: "Wall / Floor Stand Mounting",
    enclosure: "Heavy Gauge Sheet Steel Oil Tank",
    protection: "IP54 Weatherproof Oil Tank",
    insulation: "Dielectric Transformer Oil Cooling",
    efficiency: "Zero Arcing Damage on Copper Contacts",
    voltage: "415V 3-Phase",
    desc: "Heavy-duty oil-cooled motor starters for agricultural pumps, stone crushers, flour mills, and harsh environments where dust would ruin dry contactors.",
    chips: ["Oil Immersed", "Star-Delta", "Heavy Duty", "Dustproof Tank"],
    bg: ASSET_PHOTOS.panel,
    featured: false,
    popular: false
  }
];

const INDUSTRIES_DATA = [
  {
    id: "cement",
    name: "Cement & Aggregates",
    icon: "factory",
    operatingEnv: "Extreme airborne abrasive dust, heavy shock loads, high ambient temperatures, 24/7 continuous duty.",
    challenge: "Fine clinker dust enters standard motor cowls, while crusher ball mills generate immense shock torques during rock reduction.",
    solution: "Heavy-duty TEFC Cast Iron IE3/IE4 motors and Crane-duty Slip Ring motors with IP66 labyrinths and reinforced re-greasable bearings.",
    specs: ["IP55/IP66 Protection", "Crane Duty S4", "Cast Iron Frame", "Vibration Monitored"],
    chips: ["IP55/IP66", "Crane duty", "Slip Ring", "Crushers & Kilns"],
    bg: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "steel",
    name: "Steel & Metallurgical Plants",
    icon: "anvil",
    operatingEnv: "Intense radiant furnace heat, molten splash risk, frequent rapid reversing, massive torque overloads.",
    challenge: "Hot rolling mills and ladle cranes cause severe thermal stress and continuous cyclical mechanical fatigue.",
    solution: "Class H insulated slip ring crane-duty motors, roller table auxiliary drives, and heavy bevel-helical reduction gearboxes.",
    specs: ["Class H Insulation", "High Starting Torque", "Brake Integration", "Shock Resistance"],
    chips: ["Slip ring", "High torque", "Roller table", "Heavy Gearing"],
    bg: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "power-plants",
    name: "Thermal & Hydro Power Utilities",
    icon: "zap",
    operatingEnv: "Continuous non-stop generation lines, zero tolerance for unplanned shutdowns, mission-critical auxiliaries.",
    challenge: "Boiler feed water pumps and primary forced-draft fans cannot stall without causing grid-level plant trips.",
    solution: "High-voltage HT induction motors, premium IE4 efficiency pump drives, and standby synchronization diesel generator sets.",
    specs: ["IE3/IE4 Verified", "HT Compatible", "Continuous S1 Duty", "Low Harmonic VFDs"],
    chips: ["IE3/IE4", "HT Motors", "Boiler Feed", "Auxiliary Power"],
    bg: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "power"
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals & Bio-processing",
    icon: "pill",
    operatingEnv: "FDA / GMP validated clean rooms, sterile air balancing, solvent extraction chambers, chemical vapors.",
    challenge: "Machinery must emit zero particulate contamination, operate at whisper-quiet decibel levels, and withstand washdown solvents.",
    solution: "Ultra-low vibration AHU motors, stainless steel shaft induction drives, and Ex d IIC certified flameproof reactor mixers.",
    specs: ["Ex d IIC Certified", "Low Decibel Level", "Smooth Clean Finish", "VFD Speed Control"],
    chips: ["Low Noise", "Ex d FLP", "AHU Grade", "Clean Rooms"],
    bg: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "food-processing",
    name: "Food, Dairy & Beverage",
    icon: "wheat",
    operatingEnv: "Daily high-pressure caustic washdowns (CIP), high moisture, sugar dust, refrigeration thermal cycles.",
    challenge: "Standard paint peels and bearings corrode under daily high-temperature sanitary hose-down protocols.",
    solution: "IP66 washdown duty electric motors, smooth body sanitary gearmotors, and food-grade lubricated pumping stations.",
    specs: ["IP66 Washdown", "Epoxy Coated", "Stainless Steel Hardware", "Sanitary Gaskets"],
    chips: ["IP66 Washdown", "Geared Motors", "Mixing Lines", "Corrosion Proof"],
    bg: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "gearing"
  },
  {
    id: "water-treatment",
    name: "Water & Wastewater Treatment",
    icon: "droplets",
    operatingEnv: "Submerged basins, corrosive chlorine & sewer gases, variable flow demands across day and night.",
    challenge: "Pump impellers jam on fibrous municipal solids, while aeration blowers consume 60%+ of total treatment plant power.",
    solution: "VFD-driven end suction and split casing centrifugal pumps, submersible slurry motors, and high-efficiency aerator drives.",
    specs: ["Variable Speed Ready", "Submersible Sealed", "Corrosion Resistant", "High Head Capacity"],
    chips: ["Centrifugal Pumps", "VFD Ready", "Aerator Drives", "Continuous Pumping"],
    bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "pumps"
  },
  {
    id: "textile",
    name: "Textile Mills & Spinning Lines",
    icon: "shirt",
    operatingEnv: "Airborne lint, flying textile fibers, extreme electrostatic charge, high-speed ring spinning spindles.",
    challenge: "Fluff and lint clog ordinary motor fan cowls within hours, causing rapid stator burnout and fire hazards.",
    solution: "Specially designed lint-free textile motors with smooth non-clogging fan cowls, clean fin profiles, and high starting torque.",
    specs: ["Lint-Free Design", "Non-Clogging Cowl", "Precision Speed Control", "Compact Dimensions"],
    chips: ["Lint Free", "VFD Inverters", "Compact Frame", "Spinning Drives"],
    bg: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "chemical",
    name: "Chemical & Fertilizer Plants",
    icon: "flask-conical",
    operatingEnv: "Acidic fumes, caustic vapors, explosive vapors, corrosive salt atmospheres, continuous agitator loads.",
    challenge: "Standard iron corrodes rapidly, while volatile hydrocarbon vapor mixtures create severe ignition risks.",
    solution: "Gas Group IIA/IIB/IIC flameproof electric motors with marine-grade polyurethanic protective coatings and Ex d terminal boxes.",
    specs: ["Ex d IIB/IIC T4", "Special Anti-Corrosion Paint", "Dual Thermistor Protection", "Flamepath Seals"],
    chips: ["Ex d FLP", "Coated Casing", "Chemical Pumps", "Hazardous Zone"],
    bg: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "oil-gas",
    name: "Oil, Gas & Petrochemical Refineries",
    icon: "fuel",
    operatingEnv: "Hazardous Zone 1 & Zone 2 volatile hydrocarbons, offshore marine salinity, critical safety interlocks.",
    challenge: "Any electrical spark or excessive surface temperature can trigger catastrophic flammable gas vapor explosions.",
    solution: "Certified flameproof explosion-proof motors, hazardous area VFDs, and heavy pipeline booster pumps with ATEX/PESO documentation.",
    specs: ["PESO/ATEX/CMRI Certified", "Flameproof Zone 1 & 2", "Heavy Cast Iron", "Terminal Box Isolation"],
    chips: ["Zone 1 / Zone 2", "PESO Certified", "Pipeline Boosters", "Explosion Proof"],
    bg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "hvac",
    name: "Commercial & Industrial HVAC",
    icon: "air-vent",
    operatingEnv: "Rooftop weather exposure, indoor sound-sensitive zones, chilled water networks, cooling tower condensation.",
    challenge: "Building occupants require near-silent acoustic performance, while rooftop cooling towers endure 100% moisture immersion.",
    solution: "Low-noise AHU motors, moisture-sealed IP55 cooling tower fan drives, and VFD inverters that throttle speed based on building load.",
    specs: ["Low Decibel Acoustic Rating", "Tropicalized Wet Duty", "VFD Speed Modulation", "Flange/Foot Options"],
    chips: ["AHU Drives", "Cooling Towers", "Wet Duty IP55", "VFD Compatible"],
    bg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  },
  {
    id: "paper-mills",
    name: "Pulp & Paper Manufacturing",
    icon: "scroll",
    operatingEnv: "Extreme humidity, hot pulp slurry splash, continuous 24/7 web tension with multi-motor synchronized speed.",
    challenge: "Slight speed deviations between consecutive rollers tear the delicate wet paper web, causing catastrophic line stoppages.",
    solution: "High-precision vector-controlled induction motors, helical multi-stage gearboxes, and heavy washdown-sealed drive packages.",
    specs: ["Precise Speed Regulation", "S1 Continuous Duty", "Heavy Torque Transmission", "Wet Pulp Sealing"],
    chips: ["S1 Continuous", "Helical Gearboxes", "Web Tension", "Washdown"],
    bg: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "gearing"
  },
  {
    id: "mining",
    name: "Mining & Material Handling",
    icon: "pickaxe",
    operatingEnv: "Underground and open-cast quarries, heavy boulder impacts, massive conveyor inclines, extreme dust.",
    challenge: "Conveyors starting under full load require 200%+ locked rotor torque without burning motor windings.",
    solution: "High slip crane and hoist motors, severe duty TEFC cast iron induction drives, and fail-safe electromagnetic brake motors.",
    specs: ["High Starting Torque", "Heavy Duty Brake Motors", "Rigid Cast Iron Casing", "IP65 Sealed Bearings"],
    chips: ["Heavy Duty", "Brake Motors", "Conveyor Drives", "High Locked Torque"],
    bg: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80",
    matchedCategory: "motors"
  }
];

const SERVICES_DATA = [
  {
    icon: "truck",
    title: "Supply & Emergency Sourcing",
    desc: "Stocked lines of leading motor brands, rapid dispatch across India, and specialized sourcing for obsolete frames or hard-to-find duty specs."
  },
  {
    icon: "wrench",
    title: "Installation & Commissioning",
    desc: "Certified field specialists provide on-site foundation verification, precision laser shaft alignment, no-load & full-load electrical testing."
  },
  {
    icon: "clock",
    title: "Annual Maintenance Contracts (AMC)",
    desc: "Comprehensive plant maintenance contracts covering scheduled vibration analysis, thermography, bearing lubrication, and emergency spares."
  },
  {
    icon: "gauge",
    title: "Energy Efficiency Consulting",
    desc: "Plant-wide energy audits analyzing IE1 vs IE3/IE4 payback periods, motor sizing calculations, and VFD retrofits to slash factory electric bills."
  }
];

const CULTURE_DATA = [
  {
    icon: "users",
    title: "Teamwork & Operational Discipline",
    desc: "We work directly as an extension of your plant maintenance crew, ensuring clear technical handoffs and immediate response to plant breakdowns."
  },
  {
    icon: "shield-check",
    title: "Commitment to Quality & Safety",
    desc: "Every supplied motor undergoes insulation resistance, phase balance, and mechanical runout checks prior to dispatch from our facility."
  },
  {
    icon: "message-circle",
    title: "Direct Technical Communication",
    desc: "No call centers or non-technical bots. When you contact Inertia, you speak directly with experienced electric motor specialists."
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    icon: "mail",
    title: "Receive Enquiry",
    desc: "Phone, WhatsApp message, specification sheet or motor nameplate photo."
  },
  {
    step: "02",
    icon: "file-text",
    title: "Understand Duty Conditions",
    desc: "Confirm operating environment, power rating (kW/HP), poles, mounting & cycle."
  },
  {
    step: "03",
    icon: "cpu",
    title: "Product & Brand Selection",
    desc: "Specialist matches the optimal frame, efficiency class (IE2/IE3/IE4) and manufacturer."
  },
  {
    step: "04",
    icon: "gauge",
    title: "Commercial Quotation",
    desc: "Clear itemized quote including GST, competitive pricing, stock status and delivery time."
  },
  {
    step: "05",
    icon: "circle-check",
    title: "Order Confirmation",
    desc: "Customer approval and dispatch schedule confirmation with test certificates."
  },
  {
    step: "06",
    icon: "truck",
    title: "Packaging & Dispatch",
    desc: "Rigid wooden crating and insured freight handling to any industrial site across India."
  },
  {
    step: "07",
    icon: "wrench",
    title: "Technical Commissioning Support",
    desc: "Wiring schematics, rotation verification and terminal configuration assistance."
  },
  {
    step: "08",
    icon: "clock",
    title: "Lifecycle After-Sales Support",
    desc: "Genuine spare parts supply, preventive maintenance, rewind and warranty support."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    COMPANY_INFO,
    STATS_DATA,
    BRANDS_DATA,
    ASSET_PHOTOS,
    PRODUCTS_DATA,
    INDUSTRIES_DATA,
    SERVICES_DATA,
    CULTURE_DATA,
    WORKFLOW_STEPS
  };
}
