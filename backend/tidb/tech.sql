--
CREATE DATABASE IF NOT EXISTS `tech`;
USE `tech`;

-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(128) NOT NULL DEFAULT '',
  `pass` varchar(256) DEFAULT '',
  `status` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------