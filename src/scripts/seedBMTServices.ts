import sequelize from "../config/database";
import Doctor from "../models/Doctor";
import Treatment from "../models/Treatment";
import Hospital from "../models/Hospital";
import Specialty from "../models/Specialty";

async function seedBMTServices() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Get Artemis Hospital (id: 1)
    const artemis = await Hospital.findOne({
      where: { slug: "artemis-hospital" },
    });
    // Get BMT Specialty (id: 5)
    const bmtSpecialty = await Specialty.findOne({ where: { slug: "bmt" } });

    if (!artemis || !bmtSpecialty) {
      console.error("Hospital or Specialty not found!");
      process.exit(1);
    }

    console.log(`Found ${artemis.name} (ID: ${artemis.id})`);
    console.log(
      `Found ${bmtSpecialty.name} specialty (ID: ${bmtSpecialty.id})`
    );

    // Add BMT Doctors for Artemis Hospital
    const bmtDoctors = [
      {
        name: "Dr. Rahul Bhargava",
        slug: "dr-rahul-bhargava",
        image:
          "https://ui-avatars.com/api/?name=Rahul+Bhargava&size=400&background=0D9488&color=fff&bold=true",
        qualifications:
          "MBBS, MD (Internal Medicine), DM (Clinical Hematology)",
        specialization: "BMT & Clinical Hematology",
        experience: "22+ years",
        patientsTreated: "12000+",
        rating: 4.9,
        reviews: "680",
        bio: "Dr. Rahul Bhargava is a renowned BMT and Hematology specialist with over 22 years of experience in bone marrow transplantation and blood disorders. He has successfully performed over 2000 BMT procedures.",
        email: "dr.bhargava@artemishospitals.com",
        phone: "+91-124-4511222",
        consultationFee: 2000.0,
        expertise: JSON.stringify([
          "Bone Marrow Transplant",
          "Stem Cell Transplant",
          "Leukemia Treatment",
          "Lymphoma Care",
          "Aplastic Anemia",
        ]),
        availableDays: JSON.stringify([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]),
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "Dr. Dharma Choudhary",
        slug: "dr-dharma-choudhary",
        image:
          "https://ui-avatars.com/api/?name=Dharma+Choudhary&size=400&background=0D9488&color=fff&bold=true",
        qualifications:
          "MBBS, MD (Medicine), DM (Hematology), Fellowship in BMT",
        specialization: "Pediatric & Adult BMT",
        experience: "18+ years",
        patientsTreated: "9500+",
        rating: 4.8,
        reviews: "520",
        bio: "Dr. Dharma Choudhary specializes in both pediatric and adult bone marrow transplantation with extensive experience in treating blood cancers and genetic blood disorders.",
        email: "dr.choudhary@artemishospitals.com",
        phone: "+91-124-4511223",
        consultationFee: 1800.0,
        expertise: JSON.stringify([
          "Allogeneic BMT",
          "Autologous BMT",
          "Pediatric BMT",
          "Thalassemia Treatment",
          "Sickle Cell Disease",
        ]),
        availableDays: JSON.stringify([
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ]),
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "Dr. Suparno Chakrabarti",
        slug: "dr-suparno-chakrabarti",
        image:
          "https://ui-avatars.com/api/?name=Suparno+Chakrabarti&size=400&background=0D9488&color=fff&bold=true",
        qualifications:
          "MBBS, MD (Internal Medicine), DM (Clinical Hematology & BMT)",
        specialization: "Hemato-Oncology & BMT",
        experience: "16+ years",
        patientsTreated: "8200+",
        rating: 4.8,
        reviews: "445",
        bio: "Dr. Suparno Chakrabarti is an expert in hemato-oncology and bone marrow transplantation, specializing in complex blood cancer treatments and stem cell therapies.",
        email: "dr.chakrabarti@artemishospitals.com",
        phone: "+91-124-4511224",
        consultationFee: 1750.0,
        expertise: JSON.stringify([
          "Haploidentical BMT",
          "Blood Cancer Treatment",
          "Multiple Myeloma",
          "MDS Treatment",
          "CAR-T Cell Therapy",
        ]),
        availableDays: JSON.stringify([
          "Monday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ]),
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
    ];

    // Create doctors
    for (const doctorData of bmtDoctors) {
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

    // Add BMT Treatments for Artemis Hospital
    const bmtTreatments = [
      {
        name: "Allogeneic Bone Marrow Transplant",
        slug: "allogeneic-bmt-artemis",
        description:
          "Bone marrow transplant using donor stem cells from a matched family member or unrelated donor. Used for blood cancers and genetic disorders.",
        cost: "45000",
        duration: "4-6 weeks",
        stay: "30-45 days",
        successRate: 75,
        procedureType: "Inpatient",
        isPopular: true,
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "Autologous Bone Marrow Transplant",
        slug: "autologous-bmt-artemis",
        description:
          "Bone marrow transplant using patient's own stem cells. Used for lymphomas, multiple myeloma, and certain solid tumors.",
        cost: "35000",
        duration: "3-4 weeks",
        stay: "20-30 days",
        successRate: 80,
        procedureType: "Inpatient",
        isPopular: true,
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "Haploidentical BMT",
        slug: "haploidentical-bmt-artemis",
        description:
          "Half-matched bone marrow transplant from a family member. Offers hope when no fully matched donor is available.",
        cost: "48000",
        duration: "5-7 weeks",
        stay: "35-50 days",
        successRate: 70,
        procedureType: "Inpatient",
        isPopular: false,
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "Stem Cell Transplant for Leukemia",
        slug: "stem-cell-leukemia-artemis",
        description:
          "Specialized stem cell transplantation protocol for acute and chronic leukemia treatment with advanced conditioning regimens.",
        cost: "42000",
        duration: "4-5 weeks",
        stay: "28-40 days",
        successRate: 78,
        procedureType: "Inpatient",
        isPopular: true,
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "BMT for Thalassemia Major",
        slug: "bmt-thalassemia-artemis",
        description:
          "Curative bone marrow transplant for thalassemia major patients. Best results in younger patients with matched sibling donors.",
        cost: "40000",
        duration: "4-5 weeks",
        stay: "30-40 days",
        successRate: 85,
        procedureType: "Inpatient",
        isPopular: false,
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
      {
        name: "BMT for Aplastic Anemia",
        slug: "bmt-aplastic-anemia-artemis",
        description:
          "Bone marrow transplant for severe aplastic anemia with matched donor. Offers potential cure for this life-threatening condition.",
        cost: "43000",
        duration: "4-6 weeks",
        stay: "30-45 days",
        successRate: 75,
        procedureType: "Inpatient",
        isPopular: false,
        hospitalId: artemis.id,
        specialtyId: bmtSpecialty.id,
        isActive: true,
      },
    ];

    // Create treatments
    for (const treatmentData of bmtTreatments) {
      const [treatment, created] = await Treatment.findOrCreate({
        where: { slug: treatmentData.slug },
        defaults: treatmentData,
      });

      if (created) {
        console.log(`✓ Created treatment: ${treatment.name}`);
      } else {
        console.log(`- Treatment already exists: ${treatment.name}`);
      }
    }

    console.log("\n✅ BMT services seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding BMT services:", error);
    process.exit(1);
  }
}

seedBMTServices();
