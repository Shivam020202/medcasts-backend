import sequelize from "../config/database";
import HospitalSpecialty from "../models/HospitalSpecialty";

const seedHospitalSpecialties = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");

    const hospitalSpecialtyMap = [
      { hospitalId: 1, specialtyId: 1 }, { hospitalId: 1, specialtyId: 3 },
      { hospitalId: 1, specialtyId: 4 }, { hospitalId: 1, specialtyId: 2 },
      { hospitalId: 1, specialtyId: 5 }, { hospitalId: 2, specialtyId: 1 },
      { hospitalId: 2, specialtyId: 2 }, { hospitalId: 2, specialtyId: 3 },
      { hospitalId: 2, specialtyId: 4 }, { hospitalId: 2, specialtyId: 5 },
      { hospitalId: 2, specialtyId: 6 }, { hospitalId: 3, specialtyId: 1 },
      { hospitalId: 3, specialtyId: 2 }, { hospitalId: 3, specialtyId: 3 },
      { hospitalId: 3, specialtyId: 4 }, { hospitalId: 3, specialtyId: 6 },
      { hospitalId: 4, specialtyId: 1 }, { hospitalId: 4, specialtyId: 3 },
      { hospitalId: 4, specialtyId: 4 }, { hospitalId: 4, specialtyId: 5 },
      { hospitalId: 5, specialtyId: 1 }, { hospitalId: 5, specialtyId: 2 },
      { hospitalId: 5, specialtyId: 3 }, { hospitalId: 5, specialtyId: 4 },
      { hospitalId: 5, specialtyId: 6 }, { hospitalId: 6, specialtyId: 1 },
      { hospitalId: 6, specialtyId: 4 }, { hospitalId: 6, specialtyId: 6 },
    ];

    let inserted = 0, skipped = 0;
    for (const rel of hospitalSpecialtyMap) {
      const existing = await HospitalSpecialty.findOne({
        where: { hospitalId: rel.hospitalId, specialtyId: rel.specialtyId }
      });
      if (!existing) {
        await HospitalSpecialty.create({ ...rel, isActive: true });
        inserted++;
      } else {
        skipped++;
      }
    }

    console.log("✅ Inserted " + inserted + " relationships");
    console.log("⏭️  Skipped " + skipped + " existing");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedHospitalSpecialties();
