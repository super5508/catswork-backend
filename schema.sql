/*
 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : VPARK

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 31/07/2019 19:46:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CatsWork_authentication
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_authentication`;
CREATE TABLE `CatsWork_authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `generated_otp` varchar(255) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `updatedAt` datetime(6) NOT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for CatsWork_dashboard
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_dashboard`;
CREATE TABLE `CatsWork_dashboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `industry` int(11) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `CirculActivities` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL,
  `updatedAt` timestamp(6) NOT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for CatsWork_personal
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_personal`;
CREATE TABLE `CatsWork_personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `gradYear` int(4) DEFAULT NULL,
  `gradMonth` enum('january','february','march','april','may','june','july','august','september','october','november','december') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) NOT NULL,
  `industryfield` enum('agriculture','art','construction','corporate','education','finance','goods','government','health','legal','manufacturing','media','organization','recreation','service','tech','transportation','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
