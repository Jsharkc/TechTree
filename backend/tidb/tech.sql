--
CREATE DATABASE IF NOT EXISTS `tech`;
USE `tech`;

-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `name`    varchar(128) NOT NULL DEFAULT '',
  `pass`    varchar(256) DEFAULT '',
  `status`  int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`name`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `node` (
  `id`    varchar(64) NOT NULL,
  `pid`   varchar(64) NOT NULL,
  `title` varchar(256) NOT NULL,
  `intro` varchar(1024) NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `passnode` (
  `uid` varchar(128) NOT NULL,
  `nid` varchar(64)  NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `passquestion` (
  `uid` varchar(128) NOT NULL,
  `qid` varchar(64) NOT NULL,
  `nid` varchar(64)  NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `question` (
  `id`       varchar(64) NOT NULL,
  `nid`      varchar(64) NOT NULL,
  `desci`    varchar(1024) NOT NULL,
  `testpath` varchar(128) NOT NULL,
  `prepcode` varchar(16384) NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `useraddnode` (
  `id`      varchar(64) NOT NULL,
  `pid`     varchar(64) NOT NULL,
  `title`   varchar(256) NOT NULL,
  `desci`   varchar(1024) NOT NULL,
  `agree`   int(11) NOT NULL,
  `total`   int(11) NOT NULL,
  `status`  int(11) NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `vote` (
   `uid`      varchar(64) NOT NULL,
   `vid`      varchar(64) NOT NULL,
   `kind`     tinyint(3)  NOT NULL
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
