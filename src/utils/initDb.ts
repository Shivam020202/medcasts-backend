import { User, Hospital, Specialty } from "../models";
import { hashPassword } from "./auth";
import config from "../config";

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Create default admin user
    const adminExists = await User.findOne({
      where: { email: config.admin.email },
    });

    if (!adminExists) {
      const hashedPassword = await hashPassword(config.admin.password);
      await User.create({
        email: config.admin.email,
        password: hashedPassword,
        name: "System Administrator",
        role: "admin",
        isActive: true,
      });
      console.log("✅ Default admin user created");
      console.log(`   Email: ${config.admin.email}`);
      console.log(`   Password: ${config.admin.password}`);
      console.log("   ⚠️  Please change the password after first login!");
    }

    // Create default specialties if none exist
    const specialtyCount = await Specialty.count();

    if (specialtyCount === 0) {
      const defaultSpecialties = [
        {
          name: "Cardiac Surgery",
          slug: "cardiac-surgery",
          description: "Specialized surgical procedures for heart conditions",
          icon: "Heart",
          clinicsCount: 896,
          bgColor: "bg-green-50",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          imageUrl: "/images/Cardio.png",
        },
        {
          name: "Neurology",
          slug: "neurology",
          description: "Diagnosis and treatment of nervous system disorders",
          icon: "Brain",
          clinicsCount: 788,
          bgColor: "bg-blue-50",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          imageUrl: "/images/Neuro.png",
        },
        {
          name: "Oncology",
          slug: "oncology",
          description: "Cancer diagnosis, treatment, and care",
          icon: "Shield",
          clinicsCount: 585,
          bgColor: "bg-red-50",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          imageUrl: "/images/oncology-new.png",
        },
        {
          name: "Orthopedics",
          slug: "orthopedics",
          description: "Treatment of musculoskeletal system conditions",
          icon: "Bone",
          clinicsCount: 884,
          bgColor: "bg-yellow-50",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          imageUrl: "/images/Ortho.png",
        },
        {
          name: "BMT",
          slug: "bmt",
          description: "Bone Marrow Transplantation services",
          icon: "Activity",
          clinicsCount: 120,
          bgColor: "bg-purple-50",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
        },
        {
          name: "GI Surgery",
          slug: "gi-surgery",
          description: "Gastrointestinal surgical procedures",
          icon: "Stethoscope",
          clinicsCount: 456,
          bgColor: "bg-indigo-50",
          iconBg: "bg-indigo-100",
          iconColor: "text-indigo-600",
        },
      ];

      await Specialty.bulkCreate(defaultSpecialties);
      console.log("✅ Default specialties created");
    }

    // Create sample hospitals if none exist
    const hospitalCount = await Hospital.count();

    if (hospitalCount === 0) {
      const sampleHospitals = [
        {
          name: "Artemis Hospital",
          slug: "artemis-hospital",
          location: "Gurugram",
          city: "Gurugram",
          state: "Haryana",
          country: "India",
          rating: 4.5,
          specialty:
            "Well-regarded for orthopaedics, cancer, and critical care",
          description:
            "Artemis Hospital is a leading multi-specialty healthcare provider in the NCR region.",
          image: "/images/Artimes-hospital.png",
          accreditation: "JCI Accredited",
          address: "Sector 51, Gurugram, Haryana 122001",
          phone: "+91-124-4511111",
          email: "info@artemishospitals.com",
          establishedYear: 2007,
          bedCapacity: 380,
        },
        {
          name: "Medanta - The Medicity",
          slug: "medanta-the-medicity",
          location: "Gurugram",
          city: "Gurugram",
          state: "Haryana",
          country: "India",
          rating: 4.7,
          specialty:
            "Multi-super specialty hospital known for comprehensive care",
          description:
            "Medanta is one of India's largest multi-specialty medical institutes.",
          image: "/images/Medanta hospital.png",
          accreditation: "JCI Accredited",
          address: "Sector 38, Gurugram, Haryana 122001",
          phone: "+91-124-4141414",
          email: "patientcare@medanta.org",
          establishedYear: 2009,
          bedCapacity: 1250,
        },
        {
          name: "Indraprastha Apollo Hospital",
          slug: "indraprastha-apollo-hospital",
          location: "New Delhi",
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          rating: 4.9,
          specialty: "Leading private hospital with wide range of specialties",
          description:
            "Apollo Hospitals is one of the most trusted names in healthcare.",
          image: "/images/Apollo-hospital.png",
          accreditation: "NABH Accredited",
          address: "Sarita Vihar, New Delhi 110076",
          phone: "+91-11-71791090",
          email: "info@apollohospitalsdelhi.com",
          establishedYear: 1996,
          bedCapacity: 710,
        },
        {
          name: "Max Super Speciality Hospital",
          slug: "max-super-speciality-hospital",
          location: "Saket, New Delhi",
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          rating: 4.3,
          specialty: "Part of Max Healthcare network with multiple facilities",
          description:
            "Max Healthcare is committed to providing world-class healthcare.",
          image: "/images/Max-hospital.png",
          accreditation: "JCI Accredited",
          address: "Saket, New Delhi 110017",
          phone: "+91-11-26515050",
          email: "info@maxhealthcare.com",
          establishedYear: 2006,
          bedCapacity: 500,
        },
        {
          name: "Amrita Hospital",
          slug: "amrita-hospital",
          location: "Faridabad",
          city: "Faridabad",
          state: "Haryana",
          country: "India",
          rating: 4.6,
          specialty:
            "Comprehensive healthcare with advanced medical facilities",
          description:
            "Amrita Hospital provides compassionate and advanced medical care.",
          image: "/images/amrita.jpeg",
          accreditation: "NABH Accredited",
          address: "Mata Amritanandamayi Marg, Sector 88, Faridabad 121002",
          phone: "+91-129-4180180",
          email: "info@amritahospital.org",
          establishedYear: 2013,
          bedCapacity: 534,
        },
        {
          name: "Sarvodaya Hospital",
          slug: "sarvodaya-hospital",
          location: "Faridabad",
          city: "Faridabad",
          state: "Haryana",
          country: "India",
          rating: 4.4,
          specialty: "Multi-specialty healthcare services",
          description:
            "Sarvodaya Hospital & Research Centre is a leading healthcare provider.",
          image: "/images/sarvodaya.jpeg",
          accreditation: "NABH Accredited",
          address: "YMCA Road, Sector 8, Faridabad 121006",
          phone: "+91-129-4198000",
          email: "info@sarvodayahospital.com",
          establishedYear: 1999,
          bedCapacity: 325,
        },
      ];

      await Hospital.bulkCreate(sampleHospitals);
      console.log("✅ Sample hospitals created");
    }
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
};
