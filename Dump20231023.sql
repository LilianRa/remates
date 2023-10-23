CREATE DATABASE  IF NOT EXISTS `remates` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `remates`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: remates
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `caballo`
--

DROP TABLE IF EXISTS `caballo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caballo` (
  `idcaballo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `estado` enum('A','B') CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'A',
  PRIMARY KEY (`idcaballo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='contiene informacion de los caballos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caballo`
--

LOCK TABLES `caballo` WRITE;
/*!40000 ALTER TABLE `caballo` DISABLE KEYS */;
INSERT INTO `caballo` VALUES (1,'algunos30','A'),(2,'black','A'),(3,'Sorprendente','A'),(5,'Disney mio','A'),(6,'Jeremy nuevo','A');
/*!40000 ALTER TABLE `caballo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `idcarreras` int NOT NULL,
  `idcaballo` int NOT NULL,
  `idcuidador` int NOT NULL,
  `idjockey` int NOT NULL,
  `peso` int NOT NULL,
  `distancia` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`idcarreras`,`idcaballo`,`fecha`),
  KEY `FK_cuidador_idx` (`idcuidador`),
  KEY `FK_jockey_idx` (`idjockey`),
  KEY `FK_caballo_idx` (`idcaballo`),
  CONSTRAINT `FK_caballo` FOREIGN KEY (`idcaballo`) REFERENCES `caballo` (`idcaballo`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_cuidador` FOREIGN KEY (`idcuidador`) REFERENCES `cuidador` (`idcuidador`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_jockey` FOREIGN KEY (`idjockey`) REFERENCES `jockey` (`idjockey`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='se cargarn aqui las carreras del dia\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
INSERT INTO `carrera` VALUES (2,1,1,1,250,350,'2023-10-13');
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuidador`
--

DROP TABLE IF EXISTS `cuidador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuidador` (
  `idcuidador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `idlocalidad` int DEFAULT NULL,
  `estado` enum('A','B') DEFAULT 'A',
  PRIMARY KEY (`idcuidador`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='datos de los cuidadores';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuidador`
--

LOCK TABLES `cuidador` WRITE;
/*!40000 ALTER TABLE `cuidador` DISABLE KEYS */;
INSERT INTO `cuidador` VALUES (1,'Norberto',28,'B'),(2,'oo',3,'A'),(3,'Nego blaid',3,'A'),(14,'Carlos',3,'A'),(15,'Carlos',3,'A'),(16,'Alexis',3,'A'),(17,'Norberto',4,'A');
/*!40000 ALTER TABLE `cuidador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jockey`
--

DROP TABLE IF EXISTS `jockey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jockey` (
  `idjockey` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(16) DEFAULT '0000-000000',
  `peso` int DEFAULT NULL,
  PRIMARY KEY (`idjockey`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jockey`
--

LOCK TABLES `jockey` WRITE;
/*!40000 ALTER TABLE `jockey` DISABLE KEYS */;
INSERT INTO `jockey` VALUES (1,'Norberto','algo','3755-609040',45),(2,'Carlos','nada','3755213243',56);
/*!40000 ALTER TABLE `jockey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `idlocalidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idlocalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='lista de localidades';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
INSERT INTO `localidad` VALUES (3,'san martin'),(4,'Posadas 1'),(5,'Aristoblulo del valle'),(28,'Jardín America');
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `href` varchar(45) DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'carreras','/carreras',1),(2,'caballos','/caballos',1),(3,'cuidador','/cuidador',2),(4,'Usuarios','/Usuarios',1),(5,'remates','/remates',1),(6,'remates','/remates',2),(7,'cuidador','/cuidador',1),(8,'localidad','/localidad',1),(9,'localidad','/localidad',2),(10,'jockey','/jockey',1),(11,'jockey','/jockey',2);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remates`
--

DROP TABLE IF EXISTS `remates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remates` (
  `idremate` int NOT NULL,
  `idcaballo` int NOT NULL,
  `mjugado` decimal(19,2) NOT NULL,
  `macobrar` decimal(19,2) NOT NULL,
  `idcarrera` int NOT NULL,
  `estado` enum('A','B') DEFAULT 'A',
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`idremate`,`idcaballo`,`idcarrera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='contiene todos los remates realizados';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remates`
--

LOCK TABLES `remates` WRITE;
/*!40000 ALTER TABLE `remates` DISABLE KEYS */;
INSERT INTO `remates` VALUES (1,23,1250.00,4590.00,1,'A','2023-10-21'),(2,1,6000.00,6300.00,1,'A','2023-10-20'),(3,23,2134.00,2233.00,2,'B','2023-10-11'),(4,2,2333.00,3222.00,1,'A','2023-10-12'),(5,7,2333.00,32345.00,1,'A','2023-10-13'),(6,23,2134.00,2233.00,3,'A','2023-10-12'),(7,1,5000.00,5200.00,1,'A','2023-10-06');
/*!40000 ALTER TABLE `remates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `estado` enum('A','B') DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','A'),(2,'Secretario','A'),(3,'Responsable','A');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` int DEFAULT NULL,
  `user` varchar(45) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `id_rol` int NOT NULL DEFAULT '2',
  `estado` enum('A','B') DEFAULT 'A',
  `reset_passl` enum('N','S') DEFAULT 'N',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Lorenag','Marquez',22222,'Lore','$2b$10$pK/7NBr/DKKtKyNX0riZGOr7iSB9UFyZWO4Iv3ukYBooY8cmueSbW','lore@gmail.com',1,'A','N'),(2,'Gaston Ariel','Krause',3345678,'Gaston','$2b$10$BJD1/x3.5CQnpolE2p.mFuND91wbDZrcOsDf6SV5IFfS/ZfA/WZKW','Krause@gmail.com',2,'A','N'),(3,'Ana','coronel',2222222,'Ana','$2b$10$.c14YyTFvAsvnCSCKH5bQu/NAbfdIEQ4pfn1bixkJfp/kHUWknf8a','coronel@gmail.com',1,'A','N'),(4,'Robertino','Suarez',22222,'Rober','$2b$10$WZS4XpNTIsi5G/pp8Hh8Z.SpXrWqlCeI0vBoFQvI2gsW35TKnMqgC','lore@gmail.com',1,'A','N'),(5,'Lorena','Sosa',24008416,'Lorena','Lorena','Lorena@comedia',2,'A','N'),(6,'Micaela','Marquez',33333,'Mica','Mica','micaela@gmail.com',1,'A','N'),(7,'Juana','Cristaldo',49027753,'Juju','$2b$10$DT7mAoX6MQSYyGHk.L82kuYiPgTI4vEd9x.DWIKVSBwpFhQqi6gwG','lacasa@comedia',1,'A','N'),(8,'Marcos','Benitez',777777,'Marcos','$2b$10$zZNglELk5ptl6ZAejacjB.MC5tF72J7qU9KnMC2RIs1r1u.ySrihK','lacasa@comedia',1,'A','N');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 19:31:46
