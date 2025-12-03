import sequelize from "../config/database";
import Doctor from "../models/Doctor";

const seedDoctors = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");

    // Seed doctors for various hospitals and specialties
    const doctors = [
      // Artemis Hospital - Cardiac Surgery (hospitalId: 1, specialtyId: 1)
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Dr. Rajesh Sharma",
        slug: "dr-rajesh-sharma",
        image:
          "https://ui-avatars.com/api/?name=Rajesh+Sharma&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MD, DM (Cardiology), FESC",
        specialization: "Interventional Cardiology",
        experience: "20+ years",
        patientsTreated: "8500+",
        rating: 4.9,
        reviews: "450",
        bio: "Dr. Sharma is a renowned interventional cardiologist with expertise in complex angioplasty and cardiac catheterization procedures.",
        email: "dr.sharma@artemishospitals.com",
        phone: "+91-124-4511121",
        consultationFee: 1500,
        expertise: JSON.stringify([
          "Angioplasty",
          "Coronary Stenting",
          "Heart Failure Management",
        ]),
        availableDays: "Mon-Sat",
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Dr. Meera Gupta",
        slug: "dr-meera-gupta",
        image:
          "https://ui-avatars.com/api/?name=Meera+Gupta&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MS, MCh (Cardiac Surgery)",
        specialization: "Cardiac Surgeon",
        experience: "18+ years",
        patientsTreated: "6200+",
        rating: 4.8,
        reviews: "380",
        bio: "Dr. Gupta specializes in minimally invasive cardiac surgery and has performed over 3000 successful CABG procedures.",
        email: "dr.gupta@artemishospitals.com",
        phone: "+91-124-4511122",
        consultationFee: 2000,
        expertise: JSON.stringify([
          "CABG",
          "Valve Replacement",
          "Minimally Invasive Surgery",
        ]),
        availableDays: "Mon-Fri",
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Dr. Anil Kumar",
        slug: "dr-anil-kumar",
        image:
          "https://ui-avatars.com/api/?name=Anil+Kumar&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MD, DM (Cardiology)",
        specialization: "Clinical Cardiologist",
        experience: "15+ years",
        patientsTreated: "5500+",
        rating: 4.7,
        reviews: "320",
        bio: "Dr. Kumar is an expert in heart failure management and preventive cardiology with a patient-centric approach.",
        email: "dr.kumar@artemishospitals.com",
        phone: "+91-124-4511123",
        consultationFee: 1200,
        expertise: JSON.stringify([
          "Heart Failure",
          "Preventive Cardiology",
          "Echocardiography",
        ]),
        availableDays: "Tue-Sun",
        isActive: true,
      },

      // Artemis Hospital - Orthopedics (hospitalId: 1, specialtyId: 4)
      {
        hospitalId: 1,
        specialtyId: 4,
        name: "Dr. Vikram Verma",
        slug: "dr-vikram-verma",
        image:
          "https://ui-avatars.com/api/?name=Vikram+Verma&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MS (Ortho), DNB",
        specialization: "Joint Replacement Surgeon",
        experience: "22+ years",
        patientsTreated: "9800+",
        rating: 4.9,
        reviews: "520",
        bio: "Dr. Verma is a pioneer in robotic-assisted joint replacement surgery with exceptional outcomes in knee and hip replacements.",
        email: "dr.verma@artemishospitals.com",
        phone: "+91-124-4511124",
        consultationFee: 1800,
        expertise: JSON.stringify([
          "Knee Replacement",
          "Hip Replacement",
          "Robotic Surgery",
        ]),
        availableDays: "Mon-Sat",
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 4,
        name: "Dr. Priya Malhotra",
        slug: "dr-priya-malhotra",
        image:
          "https://ui-avatars.com/api/?name=Priya+Malhotra&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MS (Ortho), Fellowship in Sports Medicine",
        specialization: "Sports Injury Specialist",
        experience: "12+ years",
        patientsTreated: "4200+",
        rating: 4.8,
        reviews: "290",
        bio: "Dr. Malhotra specializes in arthroscopic surgery and sports-related injuries, helping athletes return to peak performance.",
        email: "dr.malhotra@artemishospitals.com",
        phone: "+91-124-4511125",
        consultationFee: 1500,
        expertise: JSON.stringify([
          "ACL Reconstruction",
          "Arthroscopy",
          "Sports Injuries",
        ]),
        availableDays: "Mon-Fri",
        isActive: true,
      },

      // Medanta Hospital - Oncology (hospitalId: 2, specialtyId: 3)
      {
        hospitalId: 2,
        specialtyId: 3,
        name: "Dr. Ashok Vaid",
        slug: "dr-ashok-vaid",
        image:
          "https://ui-avatars.com/api/?name=Ashok+Vaid&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MD (Medicine), DM (Medical Oncology)",
        specialization: "Medical Oncologist",
        experience: "25+ years",
        patientsTreated: "12000+",
        rating: 4.9,
        reviews: "680",
        bio: "Dr. Vaid is a leading medical oncologist with expertise in breast cancer, lung cancer, and immunotherapy treatments.",
        email: "dr.vaid@medanta.org",
        phone: "+91-124-4834111",
        consultationFee: 2500,
        expertise: JSON.stringify([
          "Breast Cancer",
          "Lung Cancer",
          "Immunotherapy",
        ]),
        availableDays: "Mon-Sat",
        isActive: true,
      },
      {
        hospitalId: 2,
        specialtyId: 3,
        name: "Dr. Sameer Kaul",
        slug: "dr-sameer-kaul",
        image:
          "https://ui-avatars.com/api/?name=Sameer+Kaul&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MS, MCh (Surgical Oncology)",
        specialization: "Surgical Oncologist",
        experience: "18+ years",
        patientsTreated: "7800+",
        rating: 4.8,
        reviews: "420",
        bio: "Dr. Kaul is an expert in minimally invasive cancer surgery with special interest in gastrointestinal and gynecological cancers.",
        email: "dr.kaul@medanta.org",
        phone: "+91-124-4834112",
        consultationFee: 2200,
        expertise: JSON.stringify([
          "GI Cancer Surgery",
          "Laparoscopic Oncology",
          "Robotic Surgery",
        ]),
        availableDays: "Tue-Sat",
        isActive: true,
      },

      // Apollo Hospital - Neurology (hospitalId: 3, specialtyId: 2)
      {
        hospitalId: 3,
        specialtyId: 2,
        name: "Dr. Vinit Suri",
        slug: "dr-vinit-suri",
        image:
          "https://ui-avatars.com/api/?name=Vinit+Suri&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MD, DM (Neurology)",
        specialization: "Senior Neurologist",
        experience: "28+ years",
        patientsTreated: "15000+",
        rating: 4.9,
        reviews: "750",
        bio: "Dr. Suri is a highly experienced neurologist specializing in stroke management, epilepsy, and movement disorders.",
        email: "dr.suri@apollohospitals.com",
        phone: "+91-11-2692-5858",
        consultationFee: 2000,
        expertise: JSON.stringify([
          "Stroke Management",
          "Epilepsy",
          "Parkinson's Disease",
        ]),
        availableDays: "Mon-Sat",
        isActive: true,
      },
      {
        hospitalId: 3,
        specialtyId: 2,
        name: "Dr. Rana Patir",
        slug: "dr-rana-patir",
        image:
          "https://ui-avatars.com/api/?name=Rana+Patir&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MS, MCh (Neurosurgery)",
        specialization: "Neurosurgeon",
        experience: "20+ years",
        patientsTreated: "8900+",
        rating: 4.8,
        reviews: "510",
        bio: "Dr. Patir specializes in brain tumor surgery, spine surgery, and minimally invasive neurosurgical procedures.",
        email: "dr.patir@apollohospitals.com",
        phone: "+91-11-2692-5859",
        consultationFee: 2500,
        expertise: JSON.stringify([
          "Brain Tumor Surgery",
          "Spine Surgery",
          "Endoscopic Surgery",
        ]),
        availableDays: "Mon-Fri",
        isActive: true,
      },

      // Max Hospital - Cardiac Surgery (hospitalId: 4, specialtyId: 1)
      {
        hospitalId: 4,
        specialtyId: 1,
        name: "Dr. Kewal Krishan",
        slug: "dr-kewal-krishan",
        image:
          "https://ui-avatars.com/api/?name=Kewal+Krishan&size=400&background=0D9488&color=fff&bold=true",
        qualifications: "MBBS, MS, MCh (Cardiothoracic Surgery)",
        specialization: "Cardiac Surgeon",
        experience: "24+ years",
        patientsTreated: "10500+",
        rating: 4.9,
        reviews: "620",
        bio: "Dr. Krishan is renowned for complex cardiac surgeries including aortic surgeries and heart transplants.",
        email: "dr.krishan@maxhealthcare.com",
        phone: "+91-11-2651-5050",
        consultationFee: 2200,
        expertise: JSON.stringify([
          "Heart Transplant",
          "Aortic Surgery",
          "Pediatric Cardiac Surgery",
        ]),
        availableDays: "Mon-Sat",
        isActive: true,
      },
    ];

    console.log("Seeding doctors...");
    for (const doctorData of doctors) {
      const [doctor, created] = await Doctor.findOrCreate({
        where: { slug: doctorData.slug },
        defaults: doctorData,
      });

      if (created) {
        console.log(`✓ Created: ${doctor.name}`);
      } else {
        console.log(`- Already exists: ${doctor.name}`);
      }
    }

    console.log("\n✅ Doctor seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();
