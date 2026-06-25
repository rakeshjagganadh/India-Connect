import { Category, ServiceLink } from './types';

// Flattened list helper for search, but structured by category for the sidebar
export const CATEGORY_CONFIG = [
  { id: 'all', title: 'All Services', gradient: 'from-gray-700 to-gray-900' },
  { id: 'identity', title: 'Identity & Citizen', gradient: 'from-blue-500 to-blue-600' },
  { id: 'finance', title: 'Finance & Tax', gradient: 'from-emerald-500 to-teal-600' },
  { id: 'agriculture', title: 'Agriculture & Rural', gradient: 'from-green-500 to-lime-600' },
  { id: 'health', title: 'Health & Wellness', gradient: 'from-rose-500 to-red-600' },
  { id: 'land', title: 'Land Records', gradient: 'from-amber-600 to-orange-700' },
  { id: 'education', title: 'Education & Jobs', gradient: 'from-indigo-500 to-violet-600' },
  { id: 'transport', title: 'Travel & Transport', gradient: 'from-orange-400 to-red-500' },
  { id: 'utilities', title: 'Utilities & Police', gradient: 'from-slate-600 to-slate-800' },
];

export const SERVICE_DATA: ServiceLink[] = [
  // Identity
  { id: 'aadhaar', categoryId: 'identity', title: 'Aadhaar Card', description: 'UIDAI Portal', url: 'https://myaadhaar.uidai.gov.in/', iconName: 'fingerprint' },
  { id: 'passport', categoryId: 'identity', title: 'Passport Seva', description: 'Apply & Track', url: 'https://www.passportindia.gov.in/', iconName: 'book' },
  { id: 'pan', categoryId: 'identity', title: 'PAN Card', description: 'NSDL Services', url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html', iconName: 'id-card' },
  { id: 'voter', categoryId: 'identity', title: 'Voter ID', description: 'ECI Portal', url: 'https://voters.eci.gov.in/', iconName: 'user-check' },
  { id: 'digilocker', categoryId: 'identity', title: 'DigiLocker', description: 'Document Wallet', url: 'https://www.digilocker.gov.in/', iconName: 'wallet' },
  { id: 'birth', categoryId: 'identity', title: 'Birth/Death Cert', description: 'CRS Portal', url: 'https://crsorgi.gov.in/', iconName: 'file-text' },
  { id: 'rti', categoryId: 'identity', title: 'RTI Online', description: 'Right to Information', url: 'https://rtionline.gov.in/', iconName: 'info' },

  // Finance
  { id: 'incometax', categoryId: 'finance', title: 'Income Tax', description: 'E-Filing Portal', url: 'https://www.incometax.gov.in/iec/foportal/', iconName: 'rupee' },
  { id: 'gst', categoryId: 'finance', title: 'GST Portal', description: 'GST Services', url: 'https://www.gst.gov.in/', iconName: 'percent' },
  { id: 'epf', categoryId: 'finance', title: 'EPF / PF', description: 'Provident Fund', url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', iconName: 'briefcase' },
  { id: 'nps', categoryId: 'finance', title: 'NPS Trust', description: 'National Pension', url: 'https://enps.nsdl.com/', iconName: 'shield-check' },
  { id: 'iepf', categoryId: 'finance', title: 'IEPF Claim', description: 'Investor Education', url: 'https://www.iepf.gov.in/', iconName: 'refresh-ccw' },
  { id: 'jansamarth', categoryId: 'finance', title: 'Jan Samarth', description: 'Govt Loan Schemes', url: 'https://www.jansamarth.in/', iconName: 'landmark' },

  // Agriculture
  { id: 'pmkisan', categoryId: 'agriculture', title: 'PM-KISAN', description: 'Farmer Welfare', url: 'https://pmkisan.gov.in/', iconName: 'sprout' },
  { id: 'kisansuvidha', categoryId: 'agriculture', title: 'Kisan Suvidha', description: 'Farmer Services', url: 'https://kisansuvidha.gov.in/', iconName: 'sun' },
  { id: 'soil', categoryId: 'agriculture', title: 'Soil Health Card', description: 'Soil Testing', url: 'https://soilhealth.dac.gov.in/', iconName: 'layers' },
  { id: 'enam', categoryId: 'agriculture', title: 'e-NAM', description: 'National Agri Market', url: 'https://enam.gov.in/', iconName: 'shopping-cart' },
  { id: 'mkisan', categoryId: 'agriculture', title: 'MKisan', description: 'Advisory Portal', url: 'https://mkisan.gov.in/', iconName: 'smartphone-agri' },
  { id: 'mgnrega', categoryId: 'agriculture', title: 'MGNREGA', description: 'Rural Employment', url: 'https://nrega.nic.in/', iconName: 'users' },

  // Health
  { id: 'abha', categoryId: 'health', title: 'Ayushman Bharat', description: 'ABHA Health ID', url: 'https://abha.abdm.gov.in/', iconName: 'heart-pulse' },
  { id: 'cowin', categoryId: 'health', title: 'CoWIN', description: 'Vaccination', url: 'https://www.cowin.gov.in/', iconName: 'syringe' },
  { id: 'esanjeevani', categoryId: 'health', title: 'eSanjeevani', description: 'Tele-consultation', url: 'https://esanjeevani.mohfw.gov.in/', iconName: 'video' },
  { id: 'janaushadhi', categoryId: 'health', title: 'Jan Aushadhi', description: 'Generic Medicine', url: 'http://janaushadhi.gov.in/', iconName: 'pill' },
  { id: 'nhp', categoryId: 'health', title: 'NHP India', description: 'National Health Portal', url: 'https://www.nhp.gov.in/', iconName: 'activity' },

  // Land Records
  { id: 'karnataka', categoryId: 'land', title: 'Karnataka', description: 'Bhoomi Records', url: 'https://landrecords.karnataka.gov.in/', iconName: 'map' },
  { id: 'telangana', categoryId: 'land', title: 'Telangana', description: 'Dharani Portal', url: 'https://dharani.telangana.gov.in/', iconName: 'map' },
  { id: 'up', categoryId: 'land', title: 'Uttar Pradesh', description: 'Bhulekh', url: 'https://upbhulekh.gov.in/', iconName: 'map' },
  { id: 'maharashtra', categoryId: 'land', title: 'Maharashtra', description: 'Mahabhulekh', url: 'https://bhulekh.mahabhumi.gov.in/', iconName: 'map' },
  { id: 'tamilnadu', categoryId: 'land', title: 'Tamil Nadu', description: 'Patta Chitta', url: 'https://eservices.tn.gov.in/', iconName: 'map' },
  { id: 'bihar', categoryId: 'land', title: 'Bihar', description: 'Bhumijankari', url: 'http://bhumijankari.bihar.gov.in/', iconName: 'map' },

  // Education & Jobs
  { id: 'swayam', categoryId: 'education', title: 'SWAYAM', description: 'Free Online Courses', url: 'https://swayam.gov.in/', iconName: 'monitor-play' },
  { id: 'scholarship', categoryId: 'education', title: 'Scholarship', description: 'National Portal', url: 'https://scholarships.gov.in/', iconName: 'graduation-cap' },
  { id: 'abc', categoryId: 'education', title: 'ABC ID', description: 'Academic Bank', url: 'https://www.abc.gov.in/', iconName: 'library' },
  { id: 'nta', categoryId: 'education', title: 'NTA Exams', description: 'Entrance Exams', url: 'https://nta.ac.in/', iconName: 'clipboard-list' },
  { id: 'ncs', categoryId: 'education', title: 'NCS Jobs', description: 'Career Service', url: 'https://www.ncs.gov.in/', iconName: 'briefcase-search' },
  { id: 'eshram', categoryId: 'education', title: 'eShram', description: 'Unorganized Labor', url: 'https://eshram.gov.in/', iconName: 'hard-hat' },
  { id: 'udyam', categoryId: 'education', title: 'Udyam', description: 'MSME Registration', url: 'https://udyamregistration.gov.in/', iconName: 'building' },

  // Transport
  { id: 'parivahan', categoryId: 'transport', title: 'Parivahan', description: 'Vehicle Services', url: 'https://parivahan.gov.in/', iconName: 'car' },
  { id: 'irctc', categoryId: 'transport', title: 'IRCTC', description: 'Train Booking', url: 'https://www.irctc.co.in/', iconName: 'train' },
  { id: 'fastag', categoryId: 'transport', title: 'FASTag', description: 'Toll Payments', url: 'https://www.npci.org.in/what-we-do/netc-fastag/product-overview', iconName: 'tag' },
  { id: 'sarathi', categoryId: 'transport', title: 'Sarathi', description: 'Driving License', url: 'https://sarathi.parivahan.gov.in/', iconName: 'id-card' },
  { id: 'echallan', categoryId: 'transport', title: 'eChallan', description: 'Traffic Fines', url: 'https://echallan.parivahan.gov.in/', iconName: 'receipt' },

  // Utilities
  { id: 'cybercrime', categoryId: 'utilities', title: 'Cyber Crime', description: 'Report Fraud', url: 'https://cybercrime.gov.in/', iconName: 'shield-alert' },
  { id: 'sanchar', categoryId: 'utilities', title: 'Sanchar Saathi', description: 'Lost Mobile', url: 'https://sancharsaathi.gov.in/', iconName: 'smartphone-off' },
  { id: 'bbps', categoryId: 'utilities', title: 'Bharat BillPay', description: 'Bill Payments', url: 'https://www.bharatbillpay.com/', iconName: 'zap' },
  { id: 'indane', categoryId: 'utilities', title: 'Indane Gas', description: 'LPG Booking', url: 'https://cx.indianoil.in/', iconName: 'flame' },
  { id: 'hpgas', categoryId: 'utilities', title: 'HP Gas', description: 'LPG Booking', url: 'https://myhpgas.in/', iconName: 'flame' },
];