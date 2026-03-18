-- ============================================================
-- GI Surgery Doctors Data - MySQL Insert Script
-- Run in phpMyAdmin or MySQL terminal
-- ============================================================

-- First, insert the GI Surgery specialty if it doesn't exist
INSERT IGNORE INTO `specialties` (`name`, `slug`, `description`, `is_active`, `created_at`, `updated_at`)
VALUES ('GI Surgery', 'gi-surgery', 'Gastrointestinal Surgery', 1, NOW(), NOW());

-- Get the specialty ID (use this in doctor inserts)
SET @gi_surgery_id = (SELECT id FROM `specialties` WHERE slug = 'gi-surgery');

-- ============================================================
-- Insert Hospitals (if they don't exist)
-- ============================================================

INSERT IGNORE INTO `hospitals` (`name`, `slug`, `location`, `city`, `state`, `country`, `rating`, `specialty`, `accreditation`, `is_active`, `created_at`, `updated_at`)
VALUES 
('Artemis Hospital', 'artemis-hospital', 'Sector 51, Gurugram', 'Gurugram', 'Haryana', 'India', 4.5, 'Multi-Specialty', 'JCI Accredited', 1, NOW(), NOW()),
('Medanta – The Medicity', 'medanta-the-medicity', 'Sector 38, Gurugram', 'Gurugram', 'Haryana', 'India', 4.5, 'Multi-Specialty', 'JCI Accredited', 1, NOW(), NOW()),
('Indraprastha Apollo Hospital', 'indraprastha-apollo-hospital', 'Sarita Vihar, Delhi', 'New Delhi', 'Delhi', 'India', 4.5, 'Multi-Specialty', 'NABH Accredited', 1, NOW(), NOW()),
('Max Super Speciality Hospital', 'max-super-speciality-hospital', 'Saket, New Delhi', 'New Delhi', 'Delhi', 'India', 4.5, 'Multi-Specialty', 'JCI Accredited', 1, NOW(), NOW()),
('Amrita Hospital', 'amrita-hospital', 'Faridabad, Haryana', 'Faridabad', 'Haryana', 'India', 4.5, 'Multi-Specialty', 'NABH Accredited', 1, NOW(), NOW()),
('Sarvodaya Hospital & Research Centre', 'sarvodaya-hospital-research-centre', 'Sector 8, Faridabad', 'Faridabad', 'Haryana', 'India', 4.5, 'Multi-Specialty', 'NABH Accredited', 1, NOW(), NOW());

-- ============================================================
-- Get Hospital IDs
-- ============================================================

SET @artemis_id = (SELECT id FROM `hospitals` WHERE slug = 'artemis-hospital');
SET @medanta_id = (SELECT id FROM `hospitals` WHERE slug = 'medanta-the-medicity');
SET @apollo_id = (SELECT id FROM `hospitals` WHERE slug = 'indraprastha-apollo-hospital');
SET @max_id = (SELECT id FROM `hospitals` WHERE slug = 'max-super-speciality-hospital');
SET @amrita_id = (SELECT id FROM `hospitals` WHERE slug = 'amrita-hospital');
SET @sarvodaya_id = (SELECT id FROM `hospitals` WHERE slug = 'sarvodaya-hospital-research-centre');

-- ============================================================
-- Insert Doctors - Artemis Hospital
-- ============================================================

INSERT IGNORE INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `qualifications`, `experience`, `patients_treated`, `rating`, `reviews`, `is_active`, `created_at`, `updated_at`)
VALUES 
(@artemis_id, @gi_surgery_id, 'Dr. M.A Mir', 'dr-ma-mir', 'Head - Gastroenterology', 'MBBS, MS, FRCS (UK), FACS (USA)', 25, 5000, 4.90, 320, 1, NOW(), NOW()),
(@artemis_id, @gi_surgery_id, 'Dr. Bimal Kumar Sahu', 'dr-bimal-kumar-sahu', 'Sr. Consultant Unit', 'MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation', 22, 3500, 4.80, 280, 1, NOW(), NOW()),
(@artemis_id, @gi_surgery_id, 'Dr. Sakshi Karkra', 'dr-sakshi-karkra', 'Head - Pediatric Gastroenterology', 'MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation', 22, 3500, 4.80, 280, 1, NOW(), NOW());

-- ============================================================
-- Insert Doctors - Medanta – The Medicity
-- ============================================================

INSERT IGNORE INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `qualifications`, `experience`, `patients_treated`, `rating`, `reviews`, `is_active`, `created_at`, `updated_at`)
VALUES 
(@medanta_id, @gi_surgery_id, 'Dr. Rajesh Puri', 'dr-rajesh-puri', 'Chairman, Institute of Digestive & Hepatobiliary Sciences', 'MBBS, MD, DM Gastroenterology', 35, 10000, 4.90, 350, 1, NOW(), NOW()),
(@medanta_id, @gi_surgery_id, 'Dr. Amarender Singh Puri', 'dr-amarender-singh-puri', 'Chairman, Institute of Liver Transplantation & Regenerative Medicine', 'MBBS, MS, FRCS (UK), FRCS (Glasgow)', 30, 4000, 4.90, 320, 1, NOW(), NOW()),
(@medanta_id, @gi_surgery_id, 'Dr. Randhir Sud', 'dr-randhir-sud', 'Director, GI Surgery & GI Oncology', 'MBBS, MS, Fellowship in GI Surgery', 25, 3500, 4.80, 290, 1, NOW(), NOW()),
(@medanta_id, @gi_surgery_id, 'Dr. Adarsh Chaudhary', 'dr-adarsh-chaudhary', 'Senior Consultant, Bariatric & Metabolic Surgery', 'MBBS, MS, Fellowship in Bariatric Surgery', 20, 2800, 4.80, 260, 1, NOW(), NOW());

-- ============================================================
-- Insert Doctors - Indraprastha Apollo Hospital
-- ============================================================

INSERT IGNORE INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `qualifications`, `experience`, `patients_treated`, `rating`, `reviews`, `is_active`, `created_at`, `updated_at`)
VALUES 
(@apollo_id, @gi_surgery_id, 'Dr. Vivek Tandon', 'dr-vivek-tandon', 'Senior Consultant, GI Surgery & Liver Transplantation', 'MBBS, MS, Fellowship in Liver Transplantation (Australia)', 30, 8000, 4.90, 320, 1, NOW(), NOW()),
(@apollo_id, @gi_surgery_id, 'Dr. Deepak Govil', 'dr-deepak-govil', 'Senior Consultant, Colorectal Surgery', 'MBBS, MS, FRCS (UK), Fellowship in Colorectal Surgery', 25, 6500, 4.80, 280, 1, NOW(), NOW());

-- ============================================================
-- Insert Doctors - Max Super Speciality Hospital
-- ============================================================

INSERT IGNORE INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `qualifications`, `experience`, `patients_treated`, `rating`, `reviews`, `is_active`, `created_at`, `updated_at`)
VALUES 
(@max_id, @gi_surgery_id, 'Dr. Vikas Singla', 'dr-vikas-singla', 'Chairman, Max Institute of Minimal Access, Metabolic & Bariatric Surgery', 'MBBS, MS, FACS (USA), FRCS (UK)', 35, 15000, 4.90, 380, 1, NOW(), NOW()),
(@max_id, @gi_surgery_id, 'Dr. Sanjiv Saigal', 'dr-sanjiv-saigal', 'Director, Liver Transplant & HPB Surgery', 'MBBS, MS, Fellowship in HPB Surgery & Liver Transplantation', 20, 3500, 4.80, 260, 1, NOW(), NOW()),
(@max_id, @gi_surgery_id, 'Dr. Vivek Raj', 'dr-vivek-raj', 'Senior Consultant, GI & HPB Surgery', 'MBBS, MS, DNB, Fellowship in GI Surgery', 18, 4000, 4.70, 230, 1, NOW(), NOW()),
(@max_id, @gi_surgery_id, 'Dr. Kaushal Madan', 'dr-kaushal-madan', 'Senior Consultant, Bariatric & Metabolic Surgery', 'MBBS, MS, Fellowship in Bariatric Surgery', 15, 2500, 4.80, 210, 1, NOW(), NOW());

-- ============================================================
-- Insert Doctors - Amrita Hospital
-- ============================================================

INSERT IGNORE INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `qualifications`, `experience`, `patients_treated`, `rating`, `reviews`, `is_active`, `created_at`, `updated_at`)
VALUES 
(@amrita_id, @gi_surgery_id, 'Dr. Puneet Dhar', 'dr-puneet-dhar', 'Chief, GI Surgery & Solid Organ Transplant', 'MBBS, MS, FRCS (Edinburgh)', 30, 12000, 4.90, 350, 1, NOW(), NOW()),
(@amrita_id, @gi_surgery_id, 'Dr. Salim Naik', 'dr-salim-naik', 'Senior Consultant, GI & HPB Surgery', 'MBBS, MS, DNB, FRCS (Glasgow)', 25, 8000, 4.80, 290, 1, NOW(), NOW());

-- ============================================================
-- Insert Doctors - Sarvodaya Hospital & Research Centre
-- ============================================================

INSERT IGNORE INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `qualifications`, `experience`, `patients_treated`, `rating`, `reviews`, `is_active`, `created_at`, `updated_at`)
VALUES 
(@sarvodaya_id, @gi_surgery_id, 'Dr. Kshitiz Sharan', 'dr-kshitiz-sharan', 'Director, GI Surgery & Minimal Access Surgery', 'MBBS, MS, FMAS, FIAGES', 25, 10000, 4.80, 320, 1, NOW(), NOW()),
(@sarvodaya_id, @gi_surgery_id, 'Dr. Manoj Yadav', 'dr-manoj-yadav', 'Senior Consultant, GI & HPB Surgery', 'MBBS, MS, DNB, Fellowship in HPB Surgery', 18, 6000, 4.70, 240, 1, NOW(), NOW()),
(@sarvodaya_id, @gi_surgery_id, 'Dr. Kapil Sharma', 'dr-kapil-sharma', 'Consultant, Bariatric & Metabolic Surgery', 'MBBS, MS, Fellowship in Bariatric Surgery', 15, 3500, 4.80, 210, 1, NOW(), NOW());

-- ============================================================
-- Verification Query - Check inserted data
-- ============================================================

SELECT 
    d.id,
    d.name AS doctor_name,
    d.specialization,
    d.experience,
    d.rating,
    h.name AS hospital_name,
    s.name AS specialty_name
FROM doctors d
JOIN hospitals h ON d.hospital_id = h.id
JOIN specialties s ON d.specialty_id = s.id
WHERE s.slug = 'gi-surgery'
ORDER BY h.name, d.name;
