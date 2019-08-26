/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : VPARK

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 22/08/2019 15:09:33
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
  `generated_otp` varchar(255) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `linkedinRefreshToken` varchar(1000) DEFAULT NULL,
  `activeStep` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for CatsWork_dashboard
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_dashboard`;
CREATE TABLE `CatsWork_dashboard` (
  `personId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `first` varchar(255) DEFAULT NULL,
  `last` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL,
  `extracurriculars` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `sourceCustom` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`personId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for CatsWork_notification
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_notification`;
CREATE TABLE `CatsWork_notification` (
  `notificationId` tinyint(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `personId` tinyint(11) DEFAULT NULL,
  `activity` tinyint(11) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`notificationId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for CatsWork_personal
-- ----------------------------
DROP TABLE IF EXISTS `CatsWork_personal`;
CREATE TABLE `CatsWork_personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gradYear` int(4) DEFAULT NULL,
  `gradMonth` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `desiredIndustry` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`activityId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
