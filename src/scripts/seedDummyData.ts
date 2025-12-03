import sequelize from "../config/database";
import Treatment from "../models/Treatment";
import Testimonial from "../models/Testimonial";

const seedDummyData = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");

    // Clear existing dummy data (optional - comment out if you want to keep existing data)
    // await Treatment.destroy({ where: {} });
    // await Testimonial.destroy({ where: {} });

    // Create dummy treatments for Artemis Hospital + Cardiac Surgery (hospitalId: 1, specialtyId: 1)
    const treatments = [
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Coronary Artery Bypass Grafting (CABG)",
        slug: "coronary-artery-bypass-grafting-cabg",
        cost: "$8,500 - $12,000",
        description:
          "CABG is a surgical procedure to restore normal blood flow to an obstructed coronary artery. The procedure involves taking a healthy blood vessel from the leg, arm, or chest and connecting it below and above the blocked arteries.",
        duration: "4-6 hours",
        stay: "7-10 days",
        successRate: 95,
        procedureType: "Open Heart Surgery",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Heart Valve Replacement",
        slug: "heart-valve-replacement",
        cost: "$10,000 - $15,000",
        description:
          "Heart valve replacement surgery involves replacing a damaged or diseased heart valve with a new one, either mechanical or biological. This procedure restores proper blood flow through the heart.",
        duration: "3-5 hours",
        stay: "5-7 days",
        successRate: 92,
        procedureType: "Open Heart Surgery",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Angioplasty (PCI)",
        slug: "angioplasty-pci",
        cost: "$4,500 - $7,000",
        description:
          "Percutaneous Coronary Intervention (PCI) or angioplasty is a minimally invasive procedure to open blocked coronary arteries using a balloon catheter and often placing a stent to keep the artery open.",
        duration: "1-2 hours",
        stay: "1-2 days",
        successRate: 98,
        procedureType: "Minimally Invasive",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Atrial Septal Defect (ASD) Closure",
        slug: "atrial-septal-defect-closure",
        cost: "$6,000 - $9,000",
        description:
          "ASD closure is a procedure to close a hole in the wall separating the two upper chambers of the heart. Can be done via open surgery or minimally invasive catheter-based approach.",
        duration: "2-4 hours",
        stay: "3-5 days",
        successRate: 96,
        procedureType: "Minimally Invasive",
        isPopular: false,
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 1,
        name: "Pacemaker Implantation",
        slug: "pacemaker-implantation",
        cost: "$5,000 - $8,000",
        description:
          "Pacemaker implantation involves placing a small device under the skin of the chest to help control abnormal heart rhythms by sending electrical pulses to prompt the heart to beat at a normal rate.",
        duration: "1-2 hours",
        stay: "1-2 days",
        successRate: 99,
        procedureType: "Minimally Invasive",
        isPopular: false,
        isActive: true,
      },
      // Artemis Hospital + Orthopedics (hospitalId: 1, specialtyId: 4)
      {
        hospitalId: 1,
        specialtyId: 4,
        name: "Total Knee Replacement (TKR)",
        slug: "total-knee-replacement-tkr",
        cost: "$7,000 - $10,000",
        description:
          "Total knee replacement surgery involves replacing damaged knee joint surfaces with artificial components. This procedure relieves pain and restores function in severely diseased knee joints.",
        duration: "2-3 hours",
        stay: "5-7 days",
        successRate: 95,
        procedureType: "Joint Replacement",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 4,
        name: "Hip Replacement Surgery",
        slug: "hip-replacement-surgery",
        cost: "$8,000 - $12,000",
        description:
          "Hip replacement surgery replaces damaged hip joint with prosthetic components, relieving pain and improving mobility for patients with severe hip arthritis or fractures.",
        duration: "2-3 hours",
        stay: "5-7 days",
        successRate: 93,
        procedureType: "Joint Replacement",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        specialtyId: 4,
        name: "ACL Reconstruction",
        slug: "acl-reconstruction",
        cost: "$5,000 - $7,500",
        description:
          "ACL reconstruction surgery repairs a torn anterior cruciate ligament in the knee using a graft to replace the damaged ligament, restoring knee stability.",
        duration: "1-2 hours",
        stay: "1-2 days",
        successRate: 90,
        procedureType: "Arthroscopic Surgery",
        isPopular: true,
        isActive: true,
      },
      // Medanta + Oncology (hospitalId: 2, specialtyId: 3)
      {
        hospitalId: 2,
        specialtyId: 3,
        name: "Chemotherapy Treatment",
        slug: "chemotherapy-treatment",
        cost: "$3,000 - $8,000",
        description:
          "Chemotherapy uses powerful drugs to kill cancer cells or slow their growth. Treatment plans are customized based on cancer type and stage.",
        duration: "Multiple sessions over weeks/months",
        stay: "Outpatient or 1-3 days per session",
        successRate: 70,
        procedureType: "Medical Treatment",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 2,
        specialtyId: 3,
        name: "Radiation Therapy",
        slug: "radiation-therapy",
        cost: "$4,000 - $10,000",
        description:
          "Radiation therapy uses high-energy radiation to shrink tumors and kill cancer cells. Can be used alone or in combination with other treatments.",
        duration: "Multiple sessions over 5-7 weeks",
        stay: "Outpatient",
        successRate: 75,
        procedureType: "Radiation Treatment",
        isPopular: true,
        isActive: true,
      },
      // Apollo Hospital + Neurology (hospitalId: 3, specialtyId: 2)
      {
        hospitalId: 3,
        specialtyId: 2,
        name: "Brain Tumor Surgery",
        slug: "brain-tumor-surgery",
        cost: "$12,000 - $20,000",
        description:
          "Surgical removal of brain tumors using advanced neurosurgical techniques and imaging guidance to maximize tumor removal while preserving brain function.",
        duration: "4-8 hours",
        stay: "7-14 days",
        successRate: 85,
        procedureType: "Neurosurgery",
        isPopular: true,
        isActive: true,
      },
      {
        hospitalId: 3,
        specialtyId: 2,
        name: "Spinal Cord Surgery",
        slug: "spinal-cord-surgery",
        cost: "$10,000 - $18,000",
        description:
          "Surgical procedures to treat spinal cord injuries, tumors, or degenerative conditions using minimally invasive or open surgical techniques.",
        duration: "3-6 hours",
        stay: "5-10 days",
        successRate: 88,
        procedureType: "Neurosurgery",
        isPopular: true,
        isActive: true,
      },
    ];

    console.log("Inserting treatments...");
    for (const treatment of treatments) {
      await Treatment.create(treatment);
    }
    console.log(`✅ Created ${treatments.length} treatments`);

    // Create dummy testimonials
    const testimonials = [
      {
        hospitalId: 1,
        patientName: "John Smith",
        age: 58,
        country: "USA",
        treatment: "Coronary Artery Bypass Grafting (CABG)",
        rating: 5,
        story:
          "I came to Artemis Hospital from the United States for my heart bypass surgery. The team of cardiologists and cardiac surgeons were exceptional. Dr. Sharma explained every step of the procedure and made me feel comfortable. The recovery was smooth, and the nursing staff was attentive 24/7. Within 10 days, I was walking and feeling much better. I highly recommend Artemis for cardiac care.",
        date: "2024-10-15",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        patientName: "Sarah Ahmed",
        age: 45,
        country: "UAE",
        treatment: "Heart Valve Replacement",
        rating: 5,
        story:
          "My experience at Artemis Hospital was outstanding. I needed urgent heart valve replacement, and the team acted quickly. The surgery was successful, and I felt safe throughout my stay. The hospital facilities are world-class, and the staff speaks English fluently. I'm grateful for the excellent care I received.",
        date: "2024-09-22",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        patientName: "Mohammed Al-Rashid",
        age: 52,
        country: "Saudi Arabia",
        treatment: "Angioplasty (PCI)",
        rating: 5,
        story:
          "After experiencing chest pain, I chose Artemis Hospital for angioplasty. The procedure was minimally invasive and I was discharged in just 2 days. Dr. Gupta was professional and caring. The cost was very reasonable compared to hospitals in my country. I'm now back to my normal life with no complications.",
        date: "2024-11-10",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        patientName: "Emily Johnson",
        age: 65,
        country: "UK",
        treatment: "Total Knee Replacement",
        rating: 5,
        story:
          "I traveled from London for my knee replacement surgery at Artemis Hospital. The orthopedic team led by Dr. Verma was incredible. The surgery went smoothly, and the physiotherapy support helped me recover quickly. Within 6 weeks, I was walking without pain. The hospital provided excellent care at an affordable price.",
        date: "2024-08-18",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        patientName: "David Chen",
        age: 42,
        country: "Singapore",
        treatment: "ACL Reconstruction",
        rating: 4,
        story:
          "I injured my knee playing football and needed ACL reconstruction. Artemis Hospital was recommended by a friend. The arthroscopic surgery was performed expertly by Dr. Malhotra. Recovery took about 3 months with proper physiotherapy. The staff was supportive and the facilities were modern. Very satisfied with the outcome.",
        date: "2024-07-05",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 2,
        patientName: "Maria Rodriguez",
        age: 51,
        country: "Spain",
        treatment: "Chemotherapy Treatment",
        rating: 5,
        story:
          "Medanta Hospital saved my life. I was diagnosed with breast cancer and underwent chemotherapy here. The oncology team was compassionate and professional. They managed my side effects well and kept me positive throughout the treatment. The hospital has state-of-the-art equipment and the best doctors. I'm now in remission and grateful.",
        date: "2024-09-01",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 2,
        patientName: "Ahmed Hassan",
        age: 60,
        country: "Egypt",
        treatment: "Radiation Therapy",
        rating: 5,
        story:
          "I came to Medanta for radiation therapy for prostate cancer. The radiation oncology department is world-class. Dr. Kapoor explained the entire treatment plan clearly. The sessions were painless and the staff made sure I was comfortable. After completing my treatment, my cancer is under control. Excellent hospital!",
        date: "2024-10-20",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 3,
        patientName: "Robert Williams",
        age: 48,
        country: "Australia",
        treatment: "Brain Tumor Surgery",
        rating: 5,
        story:
          "Apollo Hospital's neurosurgery department is simply the best. I was diagnosed with a brain tumor and was terrified. Dr. Rao and his team performed the surgery with precision. The advanced technology and expertise at Apollo gave me a second chance at life. Post-surgery care was excellent. I'm recovering well and forever grateful.",
        date: "2024-08-30",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 3,
        patientName: "Lisa Anderson",
        age: 55,
        country: "Canada",
        treatment: "Spinal Cord Surgery",
        rating: 4,
        story:
          "I underwent spinal surgery at Apollo Hospital for a herniated disc. The neurosurgeon Dr. Kumar was skilled and thorough. The minimally invasive approach meant less pain and faster recovery. The nursing care was good, and the hospital was clean. I'm back to my daily activities with much less pain now.",
        date: "2024-09-15",
        isApproved: true,
        isActive: true,
      },
      {
        hospitalId: 1,
        patientName: "Patricia Brown",
        age: 62,
        country: "Ireland",
        treatment: "Hip Replacement Surgery",
        rating: 5,
        story:
          "Artemis Hospital exceeded my expectations. I was suffering from severe hip arthritis and could barely walk. The hip replacement surgery by Dr. Patel was life-changing. The hospital staff was kind and attentive. Physical therapy helped me regain mobility quickly. I can now walk pain-free and even climb stairs. Thank you, Artemis!",
        date: "2024-10-05",
        isApproved: true,
        isActive: true,
      },
    ];

    console.log("Inserting testimonials...");
    for (const testimonial of testimonials) {
      await Testimonial.create(testimonial);
    }
    console.log(`✅ Created ${testimonials.length} testimonials`);

    console.log("\n🎉 Dummy data seeding completed successfully!");
    console.log("\nData Summary:");
    console.log(`- Treatments: ${treatments.length}`);
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log("\nYou can now view this data in:");
    console.log("1. Admin panel at http://localhost:5000/admin");
    console.log(
      "2. Hospital-specialty pages like http://localhost:5174/hospital/artemis-hospital/cardiac-surgery"
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedDummyData();
