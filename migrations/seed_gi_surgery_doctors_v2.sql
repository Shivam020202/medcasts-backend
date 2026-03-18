START TRANSACTION;

-- Get GI Surgery specialty id (or create if not exists)
INSERT IGNORE INTO specialties (name, slug, description, is_active) 
VALUES ('GI Surgery', 'gi-surgery', 'Gastrointestinal Surgery', 1);

SET @gi_surgery_id = (SELECT id FROM specialties WHERE slug = 'gi-surgery' LIMIT 1);

-- Upsert hospitals (INSERT IGNORE to avoid duplicates on slug)
INSERT IGNORE INTO hospitals
(name, slug, location, city, state, country, rating, specialty, accreditation, is_active)
VALUES
('Artemis Hospital', 'artemis-hospital', 'Sector 51, Gurugram', 'Gurugram', 'Haryana', 'India', 4.8, 'Multi-Specialty', 'JCI Accredited', 1),
('Medanta – The Medicity', 'medanta-the-medicity', 'Sector 38, Gurugram', 'Gurugram', 'Haryana', 'India', 4.9, 'Multi-Specialty', 'JCI Accredited', 1),
('Indraprastha Apollo Hospital', 'indraprastha-apollo-hospital', 'Sarita Vihar, Delhi', 'New Delhi', 'Delhi', 'India', 4.9, 'Multi-Specialty', 'NABH Accredited', 1),
('Max Super Speciality Hospital', 'max-super-speciality-hospital', 'Saket, New Delhi', 'New Delhi', 'Delhi', 'India', 4.8, 'Multi-Specialty', 'JCI Accredited', 1),
('Amrita Hospital', 'amrita-hospital', 'Faridabad, Haryana', 'Faridabad', 'Haryana', 'India', 4.8, 'Multi-Specialty', 'NABH Accredited', 1),
('Sarvodaya Hospital & Research Centre', 'sarvodaya-hospital-research-centre', 'Sector 8, Faridabad', 'Faridabad', 'Haryana', 'India', 4.7, 'Multi-Specialty', 'NABH Accredited', 1);

-- Get hospital ids
SET @artemis_id = (SELECT id FROM hospitals WHERE slug = 'artemis-hospital' LIMIT 1);
SET @medanta_id = (SELECT id FROM hospitals WHERE slug = 'medanta-the-medicity' LIMIT 1);
SET @apollo_id = (SELECT id FROM hospitals WHERE slug = 'indraprastha-apollo-hospital' LIMIT 1);
SET @max_id = (SELECT id FROM hospitals WHERE slug = 'max-super-speciality-hospital' LIMIT 1);
SET @amrita_id = (SELECT id FROM hospitals WHERE slug = 'amrita-hospital' LIMIT 1);
SET @sarvodaya_id = (SELECT id FROM hospitals WHERE slug = 'sarvodaya-hospital-research-centre' LIMIT 1);

-- Link hospitals to GI Surgery specialty
INSERT IGNORE INTO hospital_specialties (hospital_id, specialty_id) VALUES
(@artemis_id, @gi_surgery_id),
(@medanta_id, @gi_surgery_id),
(@apollo_id, @gi_surgery_id),
(@max_id, @gi_surgery_id),
(@amrita_id, @gi_surgery_id),
(@sarvodaya_id, @gi_surgery_id);

-- Insert GI Surgery doctors
INSERT INTO doctors
(hospital_id, specialty_id, name, slug, specialization, experience, patients_treated, rating, reviews, qualifications, is_active)
VALUES
-- Artemis Hospital (3 doctors)
(@artemis_id, @gi_surgery_id, 'Dr. M.A Mir', 'dr-ma-mir', 'Head - Gastroenterology', 25, 5000, 4.9, 320, 'MBBS, MS, FRCS (UK), FACS (USA)', 1),
(@artemis_id, @gi_surgery_id, 'Dr. Bimal Kumar Sahu', 'dr-bimal-kumar-sahu', 'Sr. Consultant Unit', 22, 3500, 4.8, 280, 'MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation', 1),
(@artemis_id, @gi_surgery_id, 'Dr. Sakshi Karkra', 'dr-sakshi-karkra', 'Head - Pediatric Gastroenterology', 22, 3500, 4.8, 280, 'MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation', 1),

-- Medanta – The Medicity (4 doctors)
(@medanta_id, @gi_surgery_id, 'Dr. Rajesh Puri', 'dr-rajesh-puri', 'Chairman, Institute of Digestive & Hepatobiliary Sciences', 35, 10000, 4.9, 350, 'MBBS, MD, DM Gastroenterology', 1),
(@medanta_id, @gi_surgery_id, 'Dr. Amarender Singh Puri', 'dr-amarender-singh-puri', 'Chairman, Institute of Liver Transplantation & Regenerative Medicine', 30, 4000, 4.9, 320, 'MBBS, MS, FRCS (UK), FRCS (Glasgow)', 1),
(@medanta_id, @gi_surgery_id, 'Dr. Randhir Sud', 'dr-randhir-sud', 'Director, GI Surgery & GI Oncology', 25, 3500, 4.8, 290, 'MBBS, MS, Fellowship in GI Surgery', 1),
(@medanta_id, @gi_surgery_id, 'Dr. Adarsh Chaudhary', 'dr-adarsh-chaudhary', 'Senior Consultant, Bariatric & Metabolic Surgery', 20, 2800, 4.8, 260, 'MBBS, MS, Fellowship in Bariatric Surgery', 1),

-- Indraprastha Apollo Hospital (2 doctors)
(@apollo_id, @gi_surgery_id, 'Dr. Vivek Tandon', 'dr-vivek-tandon', 'Senior Consultant, GI Surgery & Liver Transplantation', 30, 8000, 4.9, 320, 'MBBS, MS, Fellowship in Liver Transplantation (Australia)', 1),
(@apollo_id, @gi_surgery_id, 'Dr. Deepak Govil', 'dr-deepak-govil', 'Senior Consultant, Colorectal Surgery', 25, 6500, 4.8, 280, 'MBBS, MS, FRCS (UK), Fellowship in Colorectal Surgery', 1),

-- Max Super Speciality Hospital (4 doctors)
(@max_id, @gi_surgery_id, 'Dr. Vikas Singla', 'dr-vikas-singla', 'Chairman, Max Institute of Minimal Access, Metabolic & Bariatric Surgery', 35, 15000, 4.9, 380, 'MBBS, MS, FACS (USA), FRCS (UK)', 1),
(@max_id, @gi_surgery_id, 'Dr. Sanjiv Saigal', 'dr-sanjiv-saigal', 'Director, Liver Transplant & HPB Surgery', 20, 3500, 4.8, 260, 'MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation', 1),
(@max_id, @gi_surgery_id, 'Dr. Vivek Raj', 'dr-vivek-raj', 'Senior Consultant, GI & HPB Surgery', 18, 4000, 4.7, 230, 'MBBS, MS, DNB, Fellowship in GI Surgery', 1),
(@max_id, @gi_surgery_id, 'Dr. Kaushal Madan', 'dr-kaushal-madan', 'Senior Consultant, Bariatric & Metabolic Surgery', 15, 2500, 4.8, 210, 'MBBS, MS, Fellowship in Bariatric Surgery', 1),

-- Amrita Hospital (2 doctors)
(@amrita_id, @gi_surgery_id, 'Dr. Puneet Dhar', 'dr-puneet-dhar', 'Chief, GI Surgery & Solid Organ Transplant', 30, 12000, 4.9, 350, 'MBBS, MS, FRCS (Edinburgh)', 1),
(@amrita_id, @gi_surgery_id, 'Dr. Salim Naik', 'dr-salim-naik', 'Senior Consultant, GI & HPB Surgery', 25, 8000, 4.8, 290, 'MBBS, MS, DNB, FRCS (Glasgow)', 1),

-- Sarvodaya Hospital & Research Centre (3 doctors)
(@sarvodaya_id, @gi_surgery_id, 'Dr. Kshitiz Sharan', 'dr-kshitiz-sharan', 'Director, GI Surgery & Minimal Access Surgery', 25, 10000, 4.8, 320, 'MBBS, MS, FMAS, FIAGES', 1),
(@sarvodaya_id, @gi_surgery_id, 'Dr. Manoj Yadav', 'dr-manoj-yadav', 'Senior Consultant, GI & HPB Surgery', 18, 6000, 4.7, 240, 'MBBS, MS, DNB, Fellowship in HPB Surgery', 1),
(@sarvodaya_id, @gi_surgery_id, 'Dr. Kapil Sharma', 'dr-kapil-sharma', 'Consultant, Bariatric & Metabolic Surgery', 15, 3500, 4.8, 210, 'MBBS, MS, Fellowship in Bariatric Surgery', 1)

ON DUPLICATE KEY UPDATE
hospital_id = VALUES(hospital_id),
specialty_id = VALUES(specialty_id),
specialization = VALUES(specialization),
experience = VALUES(experience),
patients_treated = VALUES(patients_treated),
rating = VALUES(rating),
reviews = VALUES(reviews),
qualifications = VALUES(qualifications);

COMMIT;
