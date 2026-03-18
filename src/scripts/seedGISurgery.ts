import sequelize from "../config/database";
import Doctor from "../models/Doctor";
import Hospital from "../models/Hospital";
import Specialty from "../models/Specialty";
import slugify from "slugify";

const data = {
  gi_surgery_doctors: {
    hospitals: [
      {
        hospital_name: "Artemis Hospital",
        location: "Sector 51, Gurugram",
        accreditation: "JCI Accredited",
        doctors: [
          {
            name: "Dr. M.A Mir",
            designation: "Head - Gastroenterology",
            qualifications: "MBBS, MS, FRCS (UK), FACS (USA)",
            experience: "25+ years",
            patients_treated: "5,000+",
            rating: 4.9,
            reviews: 320,
          },
          {
            name: "Dr. Bimal Kumar Sahu",
            designation: "Sr. Consultant Unit",
            qualifications:
              "MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation",
            experience: "22+ years",
            patients_treated: "3,500+",
            rating: 4.8,
            reviews: 280,
          },
          {
            name: "Dr. Sakshi Karkra",
            designation: "Head - Pediatric Gastroenterology",
            qualifications:
              "MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation",
            experience: "22+ years",
            patients_treated: "3,500+",
            rating: 4.8,
            reviews: 280,
          },
        ],
      },
      {
        hospital_name: "Medanta – The Medicity",
        location: "Sector 38, Gurugram",
        accreditation: "JCI Accredited",
        doctors: [
          {
            name: "Dr. Rajesh Puri",
            designation:
              "Chairman, Institute of Digestive & Hepatobiliary Sciences",
            qualifications: "MBBS, MD, DM Gastroenterology",
            experience: "35+ years",
            patients_treated: "10,000+",
            rating: 4.9,
            reviews: 350,
          },
          {
            name: "Dr. Amarender Singh Puri",
            designation:
              "Chairman, Institute of Liver Transplantation & Regenerative Medicine",
            qualifications: "MBBS, MS, FRCS (UK), FRCS (Glasgow)",
            experience: "30+ years",
            patients_treated: "4,000+",
            rating: 4.9,
            reviews: 320,
          },
          {
            name: "Dr. Randhir Sud",
            designation: "Director, GI Surgery & GI Oncology",
            qualifications: "MBBS, MS, Fellowship in GI Surgery",
            experience: "25+ years",
            patients_treated: "3,500+",
            rating: 4.8,
            reviews: 290,
          },
          {
            name: "Dr. Adarsh Chaudhary",
            designation: "Senior Consultant, Bariatric & Metabolic Surgery",
            qualifications: "MBBS, MS, Fellowship in Bariatric Surgery",
            experience: "20+ years",
            patients_treated: "2,800+",
            rating: 4.8,
            reviews: 260,
          },
        ],
      },
      {
        hospital_name: "Indraprastha Apollo Hospital",
        location: "Sarita Vihar, Delhi",
        accreditation: "NABH Accredited",
        doctors: [
          {
            name: "Dr. Vivek Tandon",
            designation:
              "Senior Consultant, GI Surgery & Liver Transplantation",
            qualifications:
              "MBBS, MS, Fellowship in Liver Transplantation (Australia)",
            experience: "30+ years",
            patients_treated: "8,000+",
            rating: 4.9,
            reviews: 320,
          },
          {
            name: "Dr. Deepak Govil",
            designation: "Senior Consultant, Colorectal Surgery",
            qualifications:
              "MBBS, MS, FRCS (UK), Fellowship in Colorectal Surgery",
            experience: "25+ years",
            patients_treated: "6,500+",
            rating: 4.8,
            reviews: 280,
          },
        ],
      },
      {
        hospital_name: "Max Super Speciality Hospital",
        location: "Saket, New Delhi",
        accreditation: "JCI Accredited",
        doctors: [
          {
            name: "Dr. Vikas Singla",
            designation:
              "Chairman, Max Institute of Minimal Access, Metabolic & Bariatric Surgery",
            qualifications: "MBBS, MS, FACS (USA), FRCS (UK)",
            experience: "35+ years",
            patients_treated: "15,000+",
            rating: 4.9,
            reviews: 380,
          },
          {
            name: "Dr. Sanjiv Saigal",
            designation: "Director, Liver Transplant & HPB Surgery",
            qualifications:
              "MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation",
            experience: "20+ years",
            patients_treated: "3,500+",
            rating: 4.8,
            reviews: 260,
          },
          {
            name: "Dr. Vivek Raj",
            designation: "Senior Consultant, GI & HPB Surgery",
            qualifications: "MBBS, MS, DNB, Fellowship in GI Surgery",
            experience: "18+ years",
            patients_treated: "4,000+",
            rating: 4.7,
            reviews: 230,
          },
          {
            name: "Dr. Kaushal Madan",
            designation: "Senior Consultant, Bariatric & Metabolic Surgery",
            qualifications: "MBBS, MS, Fellowship in Bariatric Surgery",
            experience: "15+ years",
            patients_treated: "2,500+",
            rating: 4.8,
            reviews: 210,
          },
        ],
      },
      {
        hospital_name: "Amrita Hospital",
        location: "Faridabad, Haryana",
        accreditation: "NABH Accredited",
        doctors: [
          {
            name: "Dr. Puneet Dhar",
            designation: "Chief, GI Surgery & Solid Organ Transplant",
            qualifications: "MBBS, MS, FRCS (Edinburgh)",
            experience: "30+ years",
            patients_treated: "12,000+",
            rating: 4.9,
            reviews: 350,
          },
          {
            name: "Dr. Salim Naik",
            designation: "Senior Consultant, GI & HPB Surgery",
            qualifications: "MBBS, MS, DNB, FRCS (Glasgow)",
            experience: "25+ years",
            patients_treated: "8,000+",
            rating: 4.8,
            reviews: 290,
          },
        ],
      },
      {
        hospital_name: "Sarvodaya Hospital & Research Centre",
        location: "Sector 8, Faridabad",
        accreditation: "NABH Accredited",
        doctors: [
          {
            name: "Dr. Kshitiz Sharan",
            designation: "Director, GI Surgery & Minimal Access Surgery",
            qualifications: "MBBS, MS, FMAS, FIAGES",
            experience: "25+ years",
            patients_treated: "10,000+",
            rating: 4.8,
            reviews: 320,
          },
          {
            name: "Dr. Manoj Yadav",
            designation: "Senior Consultant, GI & HPB Surgery",
            qualifications: "MBBS, MS, DNB, Fellowship in HPB Surgery",
            experience: "18+ years",
            patients_treated: "6,000+",
            rating: 4.7,
            reviews: 240,
          },
          {
            name: "Dr. Kapil Sharma",
            designation: "Consultant, Bariatric & Metabolic Surgery",
            qualifications: "MBBS, MS, Fellowship in Bariatric Surgery",
            experience: "15+ years",
            patients_treated: "3,500+",
            rating: 4.8,
            reviews: 210,
          },
        ],
      },
    ],
  },
};

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    // 1. Ensure Specialty "GI Surgery" exists
    const specialtyName = "GI Surgery";
    const specialtySlug = slugify(specialtyName, { lower: true });

    let [specialty, created] = await Specialty.findOrCreate({
      where: { slug: specialtySlug },
      defaults: {
        name: specialtyName,
        slug: specialtySlug,
        isActive: true, // Assuming true/1
        description: "Gastrointestinal Surgery",
      },
    });
    console.log(
      `Specialty ${specialtyName} ${created ? "created" : "found"}. ID: ${specialty.id}`,
    );

    const hospitalsData = data.gi_surgery_doctors.hospitals;

    for (const hData of hospitalsData) {
      // Process Location to get city/state
      const locParts = hData.location.split(",").map((s) => s.trim());
      let city = "Unknown";
      let state = "Unknown";
      if (locParts.length >= 2) {
        const last = locParts[locParts.length - 1];
        const secondLast = locParts[locParts.length - 2];

        if (["Gurugram", "Gurgaon"].includes(last)) {
          city = "Gurugram";
          state = "Haryana";
        } else if (last === "Delhi" || last === "New Delhi") {
          city = "New Delhi";
          state = "Delhi";
        } else if (last === "Haryana") {
          state = "Haryana";
          city = secondLast;
        } else {
          city = last;
          state = "India";
        }
      } else {
        city = hData.location;
      }

      const hospitalName = hData.hospital_name;
      const hospitalSlug = slugify(hospitalName, { lower: true });

      let [hospital, hCreated] = await Hospital.findOrCreate({
        where: { slug: hospitalSlug },
        defaults: {
          name: hospitalName,
          slug: hospitalSlug,
          location: hData.location,
          city: city,
          state: state,
          country: "India",
          rating: 4.5, // Default
          specialty: "Multi-Specialty",
          accreditation: hData.accreditation,
          isActive: true,
        },
      });
      console.log(
        `Hospital ${hospitalName} ${hCreated ? "created" : "found"}. ID: ${hospital.id}`,
      );

      // Process Doctors
      for (const dData of hData.doctors) {
        const doctorName = dData.name;
        const doctorSlug = slugify(doctorName, {
          lower: true,
          remove: /[*+~.()'"!:@]/g,
        });

        // Check if doctor exists
        const existingDoctor = await Doctor.findOne({
          where: { slug: doctorSlug },
        });
        if (existingDoctor) {
          console.log(`Doctor ${doctorName} already exists.`);
          continue;
        }

        await Doctor.create({
          hospitalId: hospital.id,
          specialtyId: specialty.id,
          name: doctorName,
          slug: doctorSlug,
          specialization: dData.designation,
          qualifications: dData.qualifications,
          experience: dData.experience,
          patientsTreated: dData.patients_treated,
          rating: dData.rating,
          reviews: dData.reviews.toString(),
          isActive: true,
        });
        console.log(`Doctor ${doctorName} created.`);
      }
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    process.exit();
  }
};

seed();
