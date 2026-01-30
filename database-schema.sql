-- ============================================================
-- MedCasts Database Schema for MySQL
-- Database: medcasts_db
-- ============================================================
-- Instructions:
-- 1. Log into cPanel > phpMyAdmin
-- 2. Select database: medcasts_db
-- 3. Go to SQL tab
-- 4. Copy and paste this entire file
-- 5. Click "Go" to execute
-- ============================================================

-- Drop existing tables if they exist (optional - remove if you want to keep data)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `hospital_specialties`;
DROP TABLE IF EXISTS `testimonials`;
DROP TABLE IF EXISTS `treatments`;
DROP TABLE IF EXISTS `doctors`;
DROP TABLE IF EXISTS `specialties`;
DROP TABLE IF EXISTS `hospitals`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Table: hospitals
-- ============================================================
CREATE TABLE IF NOT EXISTS `hospitals` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `location` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL DEFAULT 'India',
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `specialty` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image` VARCHAR(500),
  `accreditation` VARCHAR(500),
  `address` TEXT,
  `phone` VARCHAR(20),
  `email` VARCHAR(255),
  `website` VARCHAR(255),
  `established_year` INT,
  `bed_capacity` INT,
  `map_embed_url` TEXT,
  `airport_distance` VARCHAR(100),
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `hospitals_slug` (`slug`),
  INDEX `hospitals_city` (`city`),
  INDEX `hospitals_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: users
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'hospital', 'user') NOT NULL DEFAULT 'user',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `hospital_id` INT UNSIGNED,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `users_email` (`email`),
  INDEX `users_hospital_id` (`hospital_id`),
  FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: specialties
-- ============================================================
CREATE TABLE IF NOT EXISTS `specialties` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT,
  `icon` VARCHAR(255),
  `clinics_count` INT NOT NULL DEFAULT 0,
  `bg_color` VARCHAR(50),
  `icon_bg` VARCHAR(50),
  `icon_color` VARCHAR(50),
  `image_url` VARCHAR(500),
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `specialties_slug` (`slug`),
  INDEX `specialties_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: doctors
-- ============================================================
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hospital_id` INT UNSIGNED NOT NULL,
  `specialty_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `specialization` VARCHAR(255) NOT NULL,
  `experience` INT NOT NULL DEFAULT 0,
  `patients_treated` INT NOT NULL DEFAULT 0,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `reviews` INT NOT NULL DEFAULT 0,
  `image` VARCHAR(500),
  `qualifications` TEXT,
  `expertise` TEXT,
  `bio` TEXT,
  `email` VARCHAR(255),
  `phone` VARCHAR(20),
  `consultation_fee` DECIMAL(10,2),
  `available_days` VARCHAR(255),
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `doctors_slug` (`slug`),
  INDEX `doctors_hospital_id` (`hospital_id`),
  INDEX `doctors_specialty_id` (`specialty_id`),
  INDEX `doctors_is_active` (`is_active`),
  FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: treatments
-- ============================================================
CREATE TABLE IF NOT EXISTS `treatments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hospital_id` INT UNSIGNED NOT NULL,
  `specialty_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `cost` VARCHAR(100),
  `description` TEXT,
  `duration` VARCHAR(100),
  `stay` VARCHAR(100),
  `success_rate` VARCHAR(50),
  `procedure_type` VARCHAR(100),
  `is_popular` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `treatments_slug` (`slug`),
  INDEX `treatments_hospital_id` (`hospital_id`),
  INDEX `treatments_specialty_id` (`specialty_id`),
  INDEX `treatments_is_popular` (`is_popular`),
  INDEX `treatments_is_active` (`is_active`),
  FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hospital_id` INT UNSIGNED NOT NULL,
  `doctor_id` INT UNSIGNED,
  `patient_name` VARCHAR(255) NOT NULL,
  `age` INT,
  `country` VARCHAR(100),
  `treatment` VARCHAR(255),
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `story` TEXT NOT NULL,
  `image` VARCHAR(500),
  `date` DATE,
  `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `testimonials_hospital_id` (`hospital_id`),
  INDEX `testimonials_doctor_id` (`doctor_id`),
  INDEX `testimonials_is_approved` (`is_approved`),
  INDEX `testimonials_is_active` (`is_active`),
  FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: hospital_specialties (Junction table)
-- ============================================================
CREATE TABLE IF NOT EXISTS `hospital_specialties` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hospital_id` INT UNSIGNED NOT NULL,
  `specialty_id` INT UNSIGNED NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hospital_specialties_hospital_id_specialty_id` (`hospital_id`, `specialty_id`),
  INDEX `hospital_specialties_hospital_id` (`hospital_id`),
  INDEX `hospital_specialties_specialty_id` (`specialty_id`),
  INDEX `hospital_specialties_is_active` (`is_active`),
  FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA: Users
-- ============================================================
INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `is_active`) VALUES
(1, 'admin@medcast.com', '$2a$10$rGqJXz5JkO5N5Zp5Z5Z5ZOqJXz5JkO5N5Zp5Z5Z5ZOqJXz5JkO5N5', 'Admin User', 'admin', 1);

-- ============================================================
-- SEED DATA: Specialties
-- ============================================================
INSERT INTO `specialties` (`id`, `name`, `slug`, `description`, `icon`, `clinics_count`, `bg_color`, `icon_bg`, `icon_color`, `image_url`) VALUES
(1, 'Cardiology', 'cardiology', 'Comprehensive heart care including surgery and transplants.', 'Heart', 12, 'bg-red-50', 'bg-red-100', 'text-red-600', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070'),
(2, 'Oncology', 'oncology', 'Advanced cancer treatment with state-of-the-art technology.', 'Activity', 15, 'bg-blue-50', 'bg-blue-100', 'text-blue-600', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2080'),
(3, 'Orthopedics', 'orthopedics', 'Expert care for bones, joints, and spine disorders.', 'Bone', 10, 'bg-green-50', 'bg-green-100', 'text-green-600', 'https://images.unsplash.com/photo-1584515933487-9bdb2f989213?auto=format&fit=crop&q=80&w=2069'),
(4, 'Neurology', 'neurology', 'Advanced treatment for brain and nervous system disorders.', 'Brain', 8, 'bg-purple-50', 'bg-purple-100', 'text-purple-600', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2071'),
(5, 'Gastroenterology', 'gastroenterology', 'Digestive health and liver disease management.', 'Stomach', 9, 'bg-yellow-50', 'bg-yellow-100', 'text-yellow-600', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070'),
(6, 'Bone Marrow Transplant', 'bmt', 'World-class bone marrow transplant facilities.', 'Dna', 5, 'bg-indigo-50', 'bg-indigo-100', 'text-indigo-600', 'https://images.unsplash.com/photo-1579165466741-7f35e4755652?auto=format&fit=crop&q=80&w=2079');

-- ============================================================
-- SEED DATA: Hospitals
-- ============================================================
INSERT INTO `hospitals` (`id`, `name`, `slug`, `location`, `city`, `state`, `country`, `rating`, `specialty`, `description`, `image`, `accreditation`, `address`, `phone`, `email`, `website`, `established_year`, `bed_capacity`, `airport_distance`) VALUES
(1, 'Apollo Hospital', 'apollo-hospital-delhi', 'Sarita Vihar', 'New Delhi', 'Delhi', 'India', 4.90, 'Multi-Specialty', 'Apollo Hospitals, Delhi is a state-of-the-art multi-specialty tertiary care hospital.', 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80&w=2070', 'JCI, NABH', 'Sarita Vihar, Delhi Mathura Road, New Delhi - 110076', '+91-11-26925858', 'info@apollo.com', 'https://delhi.apollohospitals.com', 1996, 710, '25 km'),
(2, 'Medanta - The Medicity', 'medanta-the-medicity', 'Sector 38', 'Gurgaon', 'Haryana', 'India', 4.80, 'Multi-Specialty', 'Medanta is one of India''s largest multi-super specialty institutes located in Gurgaon.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053', 'JCI, NABH', 'CH Baktawar Singh Road, Sector 38, Gurugram, Haryana 122001', '+91-124-4141414', 'info@medanta.org', 'https://www.medanta.org', 2009, 1250, '18 km'),
(3, 'Max Super Speciality Hospital', 'max-hospital-saket', 'Saket', 'New Delhi', 'Delhi', 'India', 4.70, 'Multi-Specialty', 'Max Super Speciality Hospital, Saket is one of the premier names in the healthcare world.', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2073', 'JCI, NABH', '1, 2, Press Enclave Marg, Saket District Centre, Saket, New Delhi, Delhi 110017', '+91-11-26515050', 'info@maxhealthcare.com', 'https://www.maxhealthcare.in', 2006, 530, '15 km'),
(4, 'Artemis Hospital', 'artemis-hospital', 'Sector 51', 'Gurgaon', 'Haryana', 'India', 4.60, 'Multi-Specialty', 'Artemis Hospital is a state-of-the-art multi-specialty hospital located in Gurgaon.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070', 'JCI, NABH', 'Sector 51, Gurugram, Haryana 122001', '+91-124-4511111', 'info@artemishospitals.com', 'https://www.artemishospitals.com', 2007, 400, '20 km'),
(5, 'Fortis Memorial Research Institute', 'fortis-gurgaon', 'Sector 44', 'Gurgaon', 'Haryana', 'India', 4.80, 'Multi-Specialty', 'Fortis Memorial Research Institute (FMRI) is a multi-super speciality, quaternary care hospital.', 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=2074', 'JCI, NABH', 'Sector - 44, Opposite HUDA City Centre, Gurugram, Haryana 122002', '+91-124-4962200', 'enquiry.fmri@fortishealthcare.com', 'https://www.fortishealthcare.com', 2013, 1000, '17 km');

-- ============================================================
-- SEED DATA: Hospital Specialties (Linking)
-- ============================================================
INSERT INTO `hospital_specialties` (`hospital_id`, `specialty_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 1), (4, 2), (4, 3),
(5, 1), (5, 2), (5, 4), (5, 5);

-- ============================================================
-- SEED DATA: Doctors
-- ============================================================
INSERT INTO `doctors` (`id`, `hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `experience`, `patients_treated`, `rating`, `reviews`, `image`, `qualifications`, `expertise`, `bio`, `consultation_fee`) VALUES
(1, 2, 1, 'Dr. Naresh Trehan', 'dr-naresh-trehan', 'Cardiothoracic Surgeon', 40, 50000, 4.9, 1200, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070', 'MBBS, Diplomate American Board of Surgery', 'Cardiothoracic Surgery, Heart Transplant', 'Dr. Naresh Trehan is a world-renowned cardiovascular and cardiothoracic surgeon.', 5000.00),
(2, 5, 1, 'Dr. Ashok Seth', 'dr-ashok-seth', 'Interventional Cardiologist', 35, 40000, 4.8, 950, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=2070', 'MBBS, FRCP (London), FRCP (Edinburgh)', 'Angioplasty, TAVR', 'Dr. Ashok Seth is one of India''s most decorated interventional cardiologists.', 4500.00),
(3, 5, 4, 'Dr. Sandeep Vaishya', 'dr-sandeep-vaishya', 'Neurosurgeon', 25, 15000, 4.7, 600, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=2128', 'MBBS, MS, MCh (Neurosurgery)', 'Brain Tumor Surgery, Gamma Knife', 'Dr. Sandeep Vaishya is a renowned Neurosurgeon in India.', 3000.00),
(4, 2, 5, 'Dr. Arvinder Singh Soin', 'dr-arvinder-singh-soin', 'Liver Transplant Surgeon', 30, 2500, 4.9, 800, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070', 'MBBS, MS, FRCS', 'Liver Transplant, Hepatobiliary Surgery', 'Dr. Soin is recognized globally for his pioneering work in liver transplantation.', 6000.00),
(5, 1, 2, 'Dr. Harit Chaturvedi', 'dr-harit-chaturvedi', 'Surgical Oncologist', 28, 10000, 4.8, 500, 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=2070', 'MBBS, MS, MCh', 'Oncology, Cancer Surgery', 'Dr. Harit Chaturvedi is a leading name in the field of Surgical Oncology.', 3500.00),
(6, 3, 3, 'Dr. S.K.S. Marya', 'dr-sks-marya', 'Orthopedic Surgeon', 35, 15000, 4.7, 700, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070', 'MBBS, MS, DNB', 'Joint Replacement, Knee Surgery', 'Dr. Marya has been in the field of Orthopaedics for over 30 years.', 4000.00);

-- ============================================================
-- SEED DATA: Treatments
-- ============================================================
INSERT INTO `treatments` (`id`, `hospital_id`, `specialty_id`, `name`, `slug`, `cost`, `description`, `duration`, `stay`, `success_rate`, `procedure_type`, `is_popular`) VALUES
(1, 2, 1, 'Coronary Artery Bypass Grafting (CABG)', 'cabg', '$5000 - $7000', 'Surgery to restore blood flow to the heart muscle.', '4-6 Hours', '7-10 Days', '98%', 'Surgical', 1),
(2, 5, 1, 'Angioplasty', 'angioplasty', '$3500 - $5000', 'Procedure to open blocked coronary arteries.', '1-2 Hours', '2 Days', '99%', 'Minimally Invasive', 1),
(3, 3, 3, 'Total Knee Replacement', 'knee-replacement', '$4000 - $6000', 'Surgery to replace a damaged knee joint with an artificial one.', '2-3 Hours', '5 Days', '95%', 'Surgical', 1),
(4, 2, 5, 'Liver Transplant', 'liver-transplant', '$25000 - $35000', 'Surgery to replace a diseased liver with a healthy one.', '8-12 Hours', '21 Days', '90%', 'Surgical', 1),
(5, 5, 4, 'Brain Tumor Surgery', 'brain-tumor-surgery', '$6000 - $9000', 'Surgery to remove a tumor from the brain.', '4-8 Hours', '7-14 Days', '85%', 'Surgical', 0),
(6, 1, 2, 'Chemotherapy', 'chemotherapy', '$500 - $1500 per cycle', 'Drug treatment to kill fast-growing cancer cells.', 'Varies', 'Day Care', 'Varies', 'Medical', 0);

-- ============================================================
-- SEED DATA: Testimonials
-- ============================================================
INSERT INTO `testimonials` (`hospital_id`, `doctor_id`, `patient_name`, `age`, `country`, `treatment`, `rating`, `story`, `image`, `date`, `is_approved`) VALUES
(2, 1, 'John Doe', 55, 'USA', 'CABG', 5.0, 'Dr. Trehan and his team gave me a new lease on life. The facilities at Medanta are world-class.', 'https://randomuser.me/api/portraits/men/1.jpg', '2023-10-15', 1),
(5, 2, 'Sarah Smith', 42, 'UK', 'Angioplasty', 5.0, 'Excellent care at Fortis. Dr. Seth explained everything clearly and the procedure went smoothly.', 'https://randomuser.me/api/portraits/women/2.jpg', '2023-11-20', 1),
(2, 4, 'Ahmed Al-Fayed', 38, 'UAE', 'Liver Transplant', 4.8, 'My father underwent a liver transplant here. We are very grateful to Dr. Soin.', 'https://randomuser.me/api/portraits/men/3.jpg', '2023-09-05', 1),
(3, 6, 'Maria Garcia', 60, 'Spain', 'Knee Replacement', 4.9, 'I can walk pain-free now thanks to Dr. Marya. Highly recommended.', 'https://randomuser.me/api/portraits/women/4.jpg', '2023-12-01', 1);

-- ============================================================
-- Schema creation and seeding complete!
-- ============================================================
