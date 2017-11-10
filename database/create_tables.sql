-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 10 nov. 2017 à 17:26
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `assign`
--

-- --------------------------------------------------------

--
-- Structure de la table `file`
--

DROP TABLE IF EXISTS `file`;
CREATE TABLE IF NOT EXISTS `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `id_subject` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `id_subject` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  `satisfaction` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_admin` (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rl_list_subject`
--

DROP TABLE IF EXISTS `rl_list_subject`;
CREATE TABLE IF NOT EXISTS `rl_list_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_list` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_list` (`id_list`),
  KEY `id_subject` (`id_subject`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rl_subject_file`
--

DROP TABLE IF EXISTS `rl_subject_file`;
CREATE TABLE IF NOT EXISTS `rl_subject_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_subject` int(11) NOT NULL,
  `id_file` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subject` (`id_subject`),
  KEY `id_file` (`id_file`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rl_subject_image`
--

DROP TABLE IF EXISTS `rl_subject_image`;
CREATE TABLE IF NOT EXISTS `rl_subject_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_subject` int(11) NOT NULL,
  `id_image` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subject` (`id_subject`),
  KEY `id_image` (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rl_subject_user_wish`
--

DROP TABLE IF EXISTS `rl_subject_user_wish`;
CREATE TABLE IF NOT EXISTS `rl_subject_user_wish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_subject` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_wish` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subject` (`id_subject`),
  KEY `id_user` (`id_user`),
  KEY `id_wish` (`id_wish`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `subject`
--

DROP TABLE IF EXISTS `subject`;
CREATE TABLE IF NOT EXISTS `subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id_tutor` int(11) DEFAULT NULL,
  `id_list` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_list` (`id_list`),
  KEY `id_tutor` (`id_tutor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_list` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `mail_sended` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_list` (`id_list`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `wish`
--

DROP TABLE IF EXISTS `wish`;
CREATE TABLE IF NOT EXISTS `wish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `rl_list_subject`
--
ALTER TABLE `rl_list_subject`
  ADD CONSTRAINT `rl_list_subject_ibfk_1` FOREIGN KEY (`id_list`) REFERENCES `list` (`id`),
  ADD CONSTRAINT `rl_list_subject_ibfk_2` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`);

--
-- Contraintes pour la table `rl_subject_file`
--
ALTER TABLE `rl_subject_file`
  ADD CONSTRAINT `rl_subject_file_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `rl_subject_file_ibfk_2` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`);

--
-- Contraintes pour la table `rl_subject_image`
--
ALTER TABLE `rl_subject_image`
  ADD CONSTRAINT `rl_subject_image_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `rl_subject_image_ibfk_2` FOREIGN KEY (`id_image`) REFERENCES `image` (`id`);

--
-- Contraintes pour la table `rl_subject_user_wish`
--
ALTER TABLE `rl_subject_user_wish`
  ADD CONSTRAINT `rl_subject_user_wish_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`),
  ADD CONSTRAINT `rl_subject_user_wish_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rl_subject_user_wish_ibfk_3` FOREIGN KEY (`id_wish`) REFERENCES `wish` (`id`);

--
-- Contraintes pour la table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`id_tutor`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_list`) REFERENCES `list` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
