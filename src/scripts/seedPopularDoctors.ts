import sequelize from "../config/database";
import Doctor from "../models/Doctor";
import Hospital from "../models/Hospital";
import Specialty from "../models/Specialty";

const doctorsData = [
  {
    doctor_id: 1,
    doctor_name: "Dr Aditya Gupta",
    specialty: "Neurosurgery",
    hospital: "Mount Sinai Hospital",
    location: "Unknown",
    rating: 4.8,
    reviews: 85,
  },
  {
    doctor_id: 2,
    doctor_name: "Dr. Rajiv Yadav",
    specialty: "Urology",
    hospital: "Artemis Hospital",
    location: "Gurugram",
    rating: 5,
    reviews: 109,
  },
  {
    doctor_id: 3,
    doctor_name: "Dr. Dheeraj Batheja",
    specialty: "Spine Surgery",
    hospital: "Artemis Hospital",
    location: "Gurugram",
    rating: 4.9,
    reviews: 129,
  },
  {
    doctor_id: 4,
    doctor_name: "Dr. I.P.S. Oberoi",
    specialty: "Orthopaedics",
    hospital: "Artemis Hospital",
    location: "Gurugram",
    rating: 5,
    reviews: 6,
  },
  {
    doctor_id: 5,
    doctor_name: "Dr. Vandana Soni",
    specialty: "General Surgery",
    hospital: "Artemis Hospital",
    location: "Gurugram",
    rating: 5,
    reviews: 120,
  },
];

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and dashes)
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/--+/g, "-") // Replace multiple dashes with single dash
    .trim();
};

const seedPopularDoctors = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    for (const doc of doctorsData) {
      console.log(`Processing Dr. ${doc.doctor_name}...`);

      // 1. Process Specialty
      const specialtySlug = generateSlug(doc.specialty);
      let [specialty] = await Specialty.findOrCreate({
        where: { slug: specialtySlug },
        defaults: {
          name: doc.specialty,
          slug: specialtySlug,
          isActive: true,
        },
      });
      console.log(`- Specialty: ${specialty.name} (ID: ${specialty.id})`);

      // 2. Process Hospital
      const hospitalSlug = generateSlug(doc.hospital);
      let [hospital] = await Hospital.findOrCreate({
        where: { slug: hospitalSlug },
        defaults: {
          name: doc.hospital,
          slug: hospitalSlug,
          city: doc.location !== "Unknown" ? doc.location : "New Delhi", // Default if unknown
          state: "Delhi", // Default
          country: "India", // Default
          rating: 4.5,
          specialty: doc.specialty, // Initial specialty
          location: doc.location !== "Unknown" ? doc.location : "New Delhi",
          isActive: true,
        },
      });
      console.log(`- Hospital: ${hospital.name} (ID: ${hospital.id})`);

      // 3. Process Doctor
      const doctorSlug = generateSlug(doc.doctor_name);

      // cleanup name prefixes/suffixes for basic search if needed, but here exact name match is fine or update
      const doctorData = {
        hospitalId: hospital.id,
        specialtyId: specialty.id,
        name: doc.doctor_name,
        slug: doctorSlug,
        specialization: doc.specialty,
        experience: "15+ Years", // Default value as it's required but not in JSON
        rating: doc.rating,
        reviews: doc.reviews.toString(),
        isActive: true,
      };

      const existingDoctor = await Doctor.findOne({
        where: { slug: doctorSlug },
      });

      if (existingDoctor) {
        await existingDoctor.update(doctorData);
        console.log(`- Updated Doctor: ${existingDoctor.name}`);
      } else {
        await Doctor.create(doctorData);
        console.log(`- Created Doctor: ${doc.doctor_name}`);
      }
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    // await sequelize.close(); // Keep connection open might be safer if managed elsewhere, but for script usually close.
    // But in TS node execution, explicitly closing is good.
    process.exit();
  }
};

seedPopularDoctors();
