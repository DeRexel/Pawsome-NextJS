-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pawsome_nxt
CREATE DATABASE IF NOT EXISTS `pawsome_nxt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pawsome_nxt`;

-- Dumping structure for table pawsome_nxt.animals
CREATE TABLE IF NOT EXISTS `animals` (
  `animal_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `animal_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_born` date DEFAULT NULL,
  `animal_gender` enum('male','female') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_id` bigint unsigned DEFAULT NULL,
  `at_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`animal_id`),
  KEY `animals_owner_id_foreign` (`owner_id`),
  KEY `animals_at_id_foreign` (`at_id`),
  CONSTRAINT `animals_at_id_foreign` FOREIGN KEY (`at_id`) REFERENCES `animal_types` (`at_id`) ON DELETE CASCADE,
  CONSTRAINT `animals_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`owner_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.animals: ~6 rows (approximately)
INSERT INTO `animals` (`animal_id`, `animal_name`, `animal_born`, `animal_gender`, `owner_id`, `at_id`, `created_at`, `updated_at`) VALUES
	(1, 'Buddy', '2018-05-15', 'male', 1, 1, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'Luna', '2019-11-20', 'female', 1, 2, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 'Charlie', '2020-03-10', 'male', 2, 1, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(4, 'Milo', '2021-07-05', 'male', 2, 2, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(7, 'HW', '2025-04-29', 'male', 5, 1, '2025-05-02 04:14:57', '2025-05-02 04:14:57'),
	(8, 'wawa', '2025-05-07', 'male', 6, 1, '2025-05-02 04:17:22', '2025-05-02 04:17:22');

-- Dumping structure for table pawsome_nxt.animal_types
CREATE TABLE IF NOT EXISTS `animal_types` (
  `at_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `at_description` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`at_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.animal_types: ~4 rows (approximately)
INSERT INTO `animal_types` (`at_id`, `at_description`, `created_at`, `updated_at`) VALUES
	(1, 'Dog', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'Cat', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 'Bird', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(4, 'Rabbit', '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.audit_logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `log_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visit_id` bigint unsigned DEFAULT NULL,
  `vet_id` bigint unsigned DEFAULT NULL,
  `animal_id` bigint unsigned DEFAULT NULL,
  `action_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `audit_logs_visit_id_foreign` (`visit_id`),
  KEY `audit_logs_vet_id_foreign` (`vet_id`),
  KEY `audit_logs_animal_id_foreign` (`animal_id`),
  CONSTRAINT `audit_logs_animal_id_foreign` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`animal_id`),
  CONSTRAINT `audit_logs_vet_id_foreign` FOREIGN KEY (`vet_id`) REFERENCES `vets` (`vet_id`),
  CONSTRAINT `audit_logs_visit_id_foreign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.audit_logs: ~3 rows (approximately)
INSERT INTO `audit_logs` (`log_id`, `action`, `table_name`, `visit_id`, `vet_id`, `animal_id`, `action_time`, `created_at`, `updated_at`) VALUES
	(1, 'CREATE', 'visits', 1, 1, 1, '2025-05-02 01:48:39', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'UPDATE', 'visits', 1, 1, 1, '2025-05-02 01:48:39', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 'CREATE', 'visits', 2, 6, 3, '2025-05-02 01:48:39', '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.clinics
CREATE TABLE IF NOT EXISTS `clinics` (
  `clinic_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `clinic_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clinic_address` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clinic_phone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clinic_room` int DEFAULT NULL,
  `clinic_vehicle` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `maps` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.clinics: ~2 rows (approximately)
INSERT INTO `clinics` (`clinic_id`, `clinic_name`, `clinic_address`, `clinic_phone`, `clinic_room`, `clinic_vehicle`, `created_at`, `updated_at`, `maps`) VALUES
	(1, 'Pawsome Central', '123 Main St, Jakarta', '0211234567', 5, 2, '2025-05-02 01:48:39', '2025-05-02 01:48:39', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9235999999997!2d106.8272!3d-6.1754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMzEuMyJTIDEwNsKwNDknMzcuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'),
	(2, 'Pawsome West', '456 Oak Ave, Bandung', '0227654321', 3, 1, '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL);

-- Dumping structure for table pawsome_nxt.drugs
CREATE TABLE IF NOT EXISTS `drugs` (
  `drug_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `drug_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drug_usage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.drugs: ~4 rows (approximately)
INSERT INTO `drugs` (`drug_id`, `drug_name`, `drug_usage`, `created_at`, `updated_at`) VALUES
	(1, 'Antibiotic A', 'For bacterial infections', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'Painkiller B', 'For pain relief', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 'Antihistamine C', 'For allergies', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(4, 'Vitamin D', 'General health supplement', '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.emergency_slots
CREATE TABLE IF NOT EXISTS `emergency_slots` (
  `slot_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `clinic_id` bigint unsigned NOT NULL,
  `date` date NOT NULL,
  `available_slots` int NOT NULL DEFAULT '3',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`slot_id`),
  UNIQUE KEY `emergency_slots_clinic_id_date_unique` (`clinic_id`,`date`),
  CONSTRAINT `emergency_slots_clinic_id_foreign` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.emergency_slots: ~2 rows (approximately)
INSERT INTO `emergency_slots` (`slot_id`, `clinic_id`, `date`, `available_slots`, `created_at`, `updated_at`) VALUES
	(1, 1, '2025-05-03', 3, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 2, '2025-05-03', 3, '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.guest_bookings
CREATE TABLE IF NOT EXISTS `guest_bookings` (
  `booking_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` bigint unsigned DEFAULT NULL,
  `animal_id` bigint unsigned DEFAULT NULL,
  `booking_time` datetime NOT NULL,
  `symptoms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `visit_type` enum('Medical Checkup','Home Visit','Scaling','Sterilisasi','Vaksinasi','Bedah Mayor','Bedah Minor') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Medical Checkup',
  `is_emergency` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('pending','confirmed','canceled','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `clinic_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  UNIQUE KEY `guest_bookings_token_unique` (`token`),
  KEY `guest_bookings_owner_id_foreign` (`owner_id`),
  KEY `guest_bookings_animal_id_foreign` (`animal_id`),
  KEY `guest_bookings_clinic_id_foreign` (`clinic_id`),
  CONSTRAINT `guest_bookings_animal_id_foreign` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`animal_id`) ON DELETE CASCADE,
  CONSTRAINT `guest_bookings_clinic_id_foreign` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`),
  CONSTRAINT `guest_bookings_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`owner_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.guest_bookings: ~8 rows (approximately)
INSERT INTO `guest_bookings` (`booking_id`, `owner_id`, `animal_id`, `booking_time`, `symptoms`, `visit_type`, `is_emergency`, `status`, `token`, `created_at`, `updated_at`, `clinic_id`) VALUES
	(1, 1, 1, '2025-05-03 08:48:39', 'Fever and loss of appetite', 'Medical Checkup', 0, 'confirmed', 'token1', '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL),
	(2, 1, 2, '2025-05-04 08:48:39', 'Skin irritation', 'Medical Checkup', 0, 'pending', 'token2', '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL),
	(3, 2, 3, '2025-05-05 08:48:39', 'Broken leg', 'Bedah Mayor', 1, 'confirmed', 'token3', '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL),
	(4, 2, 4, '2025-05-06 08:48:39', 'Annual checkup', 'Medical Checkup', 0, 'completed', 'token4', '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL),
	(5, 1, 1, '2025-05-07 08:48:39', 'Dental cleaning', 'Scaling', 0, 'confirmed', 'token5', '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL),
	(6, 2, 4, '2025-05-08 08:48:39', 'Vaccination', 'Vaksinasi', 0, 'canceled', 'token6', '2025-05-02 01:48:39', '2025-05-02 01:48:39', NULL),
	(12, 5, 7, '2025-05-03 08:48:00', 'tert', 'Scaling', 1, 'pending', 'ccrjuq2fu2e5lyicyq33ju', '2025-05-02 04:14:57', '2025-05-02 04:14:57', 2),
	(13, 6, 8, '2025-05-02 08:48:00', '', 'Medical Checkup', 0, 'pending', 'owj49hlb7kv2p07dlkcv8', '2025-05-02 04:17:22', '2025-05-02 04:17:22', 1);

-- Dumping structure for table pawsome_nxt.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('booking','reschedule','reminder','emergency') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','sent','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `sent_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `notifications_user_id_foreign` (`user_id`),
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.notifications: ~3 rows (approximately)
INSERT INTO `notifications` (`notification_id`, `user_id`, `phone_number`, `content`, `type`, `status`, `sent_at`, `created_at`, `updated_at`) VALUES
	(1, 2, '082345678901', 'Your appointment for Buddy is confirmed for tomorrow at 10:00', 'booking', 'sent', '2025-05-02 08:48:39', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, NULL, '086789012345', 'Reminder: Your appointment for Charlie is in 2 days', 'reminder', 'pending', NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 4, '084567890123', 'Emergency slot booked for Milo', 'emergency', 'sent', '2025-05-02 08:48:39', '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.owners
CREATE TABLE IF NOT EXISTS `owners` (
  `owner_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `owner_givenname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_familyname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_phone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `is_guest` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`owner_id`),
  KEY `owners_user_id_foreign` (`user_id`),
  CONSTRAINT `owners_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.owners: ~4 rows (approximately)
INSERT INTO `owners` (`owner_id`, `owner_givenname`, `owner_familyname`, `owner_address`, `owner_phone`, `user_id`, `is_guest`, `created_at`, `updated_at`) VALUES
	(1, 'John', 'Doe', '789 Elm St, Jakarta', '085678901234', 2, 0, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'Guest', 'User', 'No fixed address', '086789012345', 4, 1, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(5, 'Hallo', 'World', NULL, '081234', NULL, 1, '2025-05-02 04:14:57', '2025-05-02 04:14:57'),
	(6, 'hallo', 'world', NULL, '081234', NULL, 1, '2025-05-02 04:17:22', '2025-05-02 04:17:22');

-- Dumping structure for table pawsome_nxt.schedule_configs
CREATE TABLE IF NOT EXISTS `schedule_configs` (
  `config_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `clinic_id` bigint unsigned NOT NULL,
  `day_of_week` tinyint NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `max_regular_bookings` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`config_id`),
  KEY `schedule_configs_clinic_id_foreign` (`clinic_id`),
  CONSTRAINT `schedule_configs_clinic_id_foreign` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.schedule_configs: ~12 rows (approximately)
INSERT INTO `schedule_configs` (`config_id`, `clinic_id`, `day_of_week`, `open_time`, `close_time`, `max_regular_bookings`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, '08:00:00', '17:00:00', 20, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 1, 2, '08:00:00', '17:00:00', 20, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 1, 3, '08:00:00', '17:00:00', 20, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(4, 1, 4, '08:00:00', '17:00:00', 20, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(5, 1, 5, '08:00:00', '17:00:00', 20, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(6, 1, 6, '09:00:00', '15:00:00', 15, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(7, 2, 1, '09:00:00', '16:00:00', 15, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(8, 2, 2, '09:00:00', '16:00:00', 15, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(9, 2, 3, '09:00:00', '16:00:00', 15, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(10, 2, 4, '09:00:00', '16:00:00', 15, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(11, 2, 5, '09:00:00', '16:00:00', 15, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(12, 2, 6, '10:00:00', '14:00:00', 10, '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.specialisations
CREATE TABLE IF NOT EXISTS `specialisations` (
  `spec_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `spec_description` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`spec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.specialisations: ~4 rows (approximately)
INSERT INTO `specialisations` (`spec_id`, `spec_description`, `created_at`, `updated_at`) VALUES
	(1, 'General Practice', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'Surgery', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 'Dermatology', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(4, 'Dentistry', '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.spec_visits
CREATE TABLE IF NOT EXISTS `spec_visits` (
  `clinic_id` bigint unsigned NOT NULL,
  `vet_id` bigint unsigned NOT NULL,
  `sv_count` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`clinic_id`,`vet_id`),
  KEY `spec_visits_vet_id_foreign` (`vet_id`),
  CONSTRAINT `spec_visits_clinic_id_foreign` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`) ON DELETE CASCADE,
  CONSTRAINT `spec_visits_vet_id_foreign` FOREIGN KEY (`vet_id`) REFERENCES `vets` (`vet_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.spec_visits: ~4 rows (approximately)
INSERT INTO `spec_visits` (`clinic_id`, `vet_id`, `sv_count`, `created_at`, `updated_at`) VALUES
	(1, 1, 5, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(1, 2, 3, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 6, 4, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 9, 2, '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_number_unique` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `phone_number`, `registered_at`, `last_login`) VALUES
	(1, 'Admin User', 'admin@pawsome.com', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2025-05-02 01:48:38', '2025-05-02 01:48:38', '081234567890', '2025-05-02 08:48:38', '2025-05-02 08:48:38'),
	(2, 'Regular Owner', 'owner@example.com', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2025-05-02 01:48:38', '2025-05-02 01:48:38', '082345678901', '2025-05-02 08:48:38', '2025-05-02 08:48:38'),
	(3, 'Vet User', 'vet@example.com', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2025-05-02 01:48:38', '2025-05-02 01:48:38', '083456789012', '2025-05-02 08:48:38', '2025-05-02 08:48:38'),
	(4, 'Guest User', 'guest@example.com', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2025-05-02 01:48:38', '2025-05-02 01:48:38', '084567890123', '2025-05-02 08:48:38', '2025-05-02 08:48:38');

-- Dumping structure for table pawsome_nxt.vets
CREATE TABLE IF NOT EXISTS `vets` (
  `vet_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `vet_title` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vet_givenname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vet_familyname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vet_phone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vet_employed` date DEFAULT NULL,
  `spec_id` bigint unsigned DEFAULT NULL,
  `clinic_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`vet_id`),
  KEY `vets_spec_id_foreign` (`spec_id`),
  KEY `vets_clinic_id_foreign` (`clinic_id`),
  KEY `vets_user_id_foreign` (`user_id`),
  CONSTRAINT `vets_clinic_id_foreign` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`) ON DELETE CASCADE,
  CONSTRAINT `vets_spec_id_foreign` FOREIGN KEY (`spec_id`) REFERENCES `specialisations` (`spec_id`) ON DELETE SET NULL,
  CONSTRAINT `vets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.vets: ~9 rows (approximately)
INSERT INTO `vets` (`vet_id`, `vet_title`, `vet_givenname`, `vet_familyname`, `vet_phone`, `vet_employed`, `spec_id`, `clinic_id`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'Dr.', 'Sarah', 'Johnson', '087890123456', '2015-06-01', 1, 1, 3, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, 'Dr.', 'Michael', 'Smith', '088901234567', '2017-03-15', 2, 1, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(3, 'Dr.', 'Emily', 'Williams', '089012345678', '2018-09-10', NULL, 1, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(4, 'Dr.', 'David', 'Brown', '081112345678', '2019-01-20', NULL, 1, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(5, 'Dr.', 'Lisa', 'Davis', '082223456789', '2020-07-05', NULL, 1, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(6, 'Dr.', 'Robert', 'Miller', '083334567890', '2016-04-12', 3, 2, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(7, 'Dr.', 'Jennifer', 'Wilson', '084445678901', '2018-11-30', NULL, 2, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(8, 'Dr.', 'Thomas', 'Moore', '085556789012', '2019-08-22', NULL, 2, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(9, 'Dr.', 'Patricia', 'Taylor', '086667890123', '2021-02-14', 4, 2, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.visits
CREATE TABLE IF NOT EXISTS `visits` (
  `visit_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `visit_date_time` datetime DEFAULT NULL,
  `visit_notes` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_id` bigint unsigned DEFAULT NULL,
  `vet_id` bigint unsigned DEFAULT NULL,
  `from_visit_id` bigint unsigned DEFAULT NULL,
  `original_booking_id` bigint unsigned DEFAULT NULL,
  `rescheduled_from` bigint unsigned DEFAULT NULL,
  `is_emergency` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('scheduled','completed','canceled','rescheduled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'scheduled',
  `checkin_time` datetime DEFAULT NULL,
  `checkout_time` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`visit_id`),
  KEY `visits_animal_id_foreign` (`animal_id`),
  KEY `visits_vet_id_foreign` (`vet_id`),
  KEY `visits_from_visit_id_foreign` (`from_visit_id`),
  KEY `visits_original_booking_id_foreign` (`original_booking_id`),
  KEY `visits_rescheduled_from_foreign` (`rescheduled_from`),
  CONSTRAINT `visits_animal_id_foreign` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`animal_id`) ON DELETE SET NULL,
  CONSTRAINT `visits_from_visit_id_foreign` FOREIGN KEY (`from_visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE SET NULL,
  CONSTRAINT `visits_original_booking_id_foreign` FOREIGN KEY (`original_booking_id`) REFERENCES `guest_bookings` (`booking_id`) ON DELETE SET NULL,
  CONSTRAINT `visits_rescheduled_from_foreign` FOREIGN KEY (`rescheduled_from`) REFERENCES `visits` (`visit_id`) ON DELETE SET NULL,
  CONSTRAINT `visits_vet_id_foreign` FOREIGN KEY (`vet_id`) REFERENCES `vets` (`vet_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.visits: ~2 rows (approximately)
INSERT INTO `visits` (`visit_id`, `visit_date_time`, `visit_notes`, `animal_id`, `vet_id`, `from_visit_id`, `original_booking_id`, `rescheduled_from`, `is_emergency`, `status`, `checkin_time`, `checkout_time`, `created_at`, `updated_at`) VALUES
	(1, '2025-05-03 08:48:39', 'Regular checkup for Buddy', 1, 1, NULL, 1, NULL, 0, 'completed', '2025-05-03 08:48:39', '2025-05-03 09:18:39', '2025-05-02 01:48:39', '2025-05-02 01:48:39'),
	(2, '2025-05-04 08:48:39', 'Emergency visit for broken leg', 3, 6, NULL, 3, NULL, 1, 'scheduled', NULL, NULL, '2025-05-02 01:48:39', '2025-05-02 01:48:39');

-- Dumping structure for table pawsome_nxt.visit_drugs
CREATE TABLE IF NOT EXISTS `visit_drugs` (
  `visit_id` bigint unsigned NOT NULL,
  `drug_id` bigint unsigned NOT NULL,
  `visit_drug_dose` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visit_drug_frequency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visit_drug_gtysupplied` int DEFAULT NULL,
  PRIMARY KEY (`visit_id`,`drug_id`),
  KEY `visit_drugs_drug_id_foreign` (`drug_id`),
  CONSTRAINT `visit_drugs_drug_id_foreign` FOREIGN KEY (`drug_id`) REFERENCES `drugs` (`drug_id`) ON DELETE CASCADE,
  CONSTRAINT `visit_drugs_visit_id_foreign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table pawsome_nxt.visit_drugs: ~2 rows (approximately)
INSERT INTO `visit_drugs` (`visit_id`, `drug_id`, `visit_drug_dose`, `visit_drug_frequency`, `visit_drug_gtysupplied`) VALUES
	(1, 1, '10mg', 'Twice daily', 14),
	(1, 4, '5mg', 'Once daily', 30);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
