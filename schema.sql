/*

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : VPARK

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 13/08/2019 04:08:29
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
  `password` varchar(255) DEFAULT NULL,
  `generated_otp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updatedAt` datetime(6) NOT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` datetime(6) NOT NULL,
  `linkedinRefreshToken` varchar(1000) DEFAULT NULL,
  `activeStep` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for CatsWork_dashboard
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_dashboard`;
CREATE TABLE `CatsWork_dashboard` (
  `personId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `first` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL,
  `extracurriculars` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `sourceCustom` varchar(300) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL,
  `updatedAt` timestamp(6) NOT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`personId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for CatsWork_notification
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_notification`;
CREATE TABLE `CatsWork_notification` (
  `notificationId` tinyint(11) NOT NULL,
  `userId` tinyint(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` tinyint(11) DEFAULT NULL,
  `personId` tinyint(11) DEFAULT NULL,
  `activity` tinyint(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`notificationId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for CatsWork_personal
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_personal`;
CREATE TABLE `CatsWork_personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gradYear` int(4) DEFAULT NULL,
  `gradMonth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `desiredIndustry` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for catworks_activity
-- ----------------------------
DROP TABLE IF EXISTS `catworks_activity`;
CREATE TABLE `catworks_activity` (
  `activityId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `personId` int(11) DEFAULT NULL,
  `activityCustom` varchar(255) DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `status` tinyint(11) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`activityId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
