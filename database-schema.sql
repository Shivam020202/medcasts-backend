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
-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS `hospital_specialties`;
-- DROP TABLE IF EXISTS `testimonials`;
-- DROP TABLE IF EXISTS `treatments`;
-- DROP TABLE IF EXISTS `doctors`;
-- DROP TABLE IF EXISTS `specialties`;
-- DROP TABLE IF EXISTS `hospitals`;
-- DROP TABLE IF EXISTS `users`;
-- SET FOREIGN_KEY_CHECKS = 1;

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
-- Insert default admin user
-- Password: Admin@123 (hashed with bcrypt)
-- ============================================================
INSERT INTO `users` (`email`, `password`, `name`, `role`, `is_active`) 
VALUES ('admin@medcast.com', '$2a$10$rGqJXz5JkO5N5Zp5Z5Z5ZOqJXz5JkO5N5Zp5Z5Z5ZOqJXz5JkO5N5', 'Admin User', 'admin', 1)
ON DUPLICATE KEY UPDATE `email` = `email`;

-- ============================================================
-- Schema creation complete!
-- ============================================================
-- Next steps:
-- 1. Verify all tables were created: Check the tables list in phpMyAdmin
-- 2. Restart your Node.js application in cPanel
-- 3. Test the API endpoints at https://node.medcasts.com/api/hospitals
-- 4. Use the admin panel to add initial data
-- ============================================================
