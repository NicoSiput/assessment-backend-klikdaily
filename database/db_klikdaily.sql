/*
SQLyog Community Edition- MySQL GUI v5.26
Host - 5.5.27 : Database - db_klikdaily
*********************************************************************
Server version : 5.5.27
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `db_klikdaily`;

USE `db_klikdaily`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `_locations` */

DROP TABLE IF EXISTS `_locations`;

CREATE TABLE `_locations` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `location` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `_locations` */

/*Table structure for table `_logs` */

DROP TABLE IF EXISTS `_logs`;

CREATE TABLE `_logs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `adjustment` int(12) NOT NULL,
  `qty` int(8) NOT NULL,
  `location_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `_logs` */

/*Table structure for table `_products` */

DROP TABLE IF EXISTS `_products`;

CREATE TABLE `_products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `qty` int(8) NOT NULL,
  `location_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`,`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `_products` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
