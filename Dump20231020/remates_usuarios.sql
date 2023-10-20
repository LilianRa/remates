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
  `id_rol` int NOT NULL,
  `estado` enum('A','B') DEFAULT 'A',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Lorenag','Marquez',22222,'Lore','$2b$10$pK/7NBr/DKKtKyNX0riZGOr7iSB9UFyZWO4Iv3ukYBooY8cmueSbW','lore@gmail.com',1,'A'),(2,'Gaston Ariel','Krause',3345678,'Gaston','$2b$10$BJD1/x3.5CQnpolE2p.mFuND91wbDZrcOsDf6SV5IFfS/ZfA/WZKW','Krause@gmail.com',2,'A'),(3,'Ana','coronel',2222222,'Ana','$2b$10$oFZJvJWs3Q7l7hHEOa/P.OG8vaQCYd8vD/ZiwdTrNVz5PLkvKGDaK','coronel@gmail.com',1,'A'),(4,'Robertino','Suarez',22222,'Rober','$2b$10$WZS4XpNTIsi5G/pp8Hh8Z.SpXrWqlCeI0vBoFQvI2gsW35TKnMqgC','lore@gmail.com',1,'A'),(5,'Lorena','Sosa',24008416,'Lorena','Lorena','Lorena@comedia',2,'A'),(6,'Micaela','Marquez',33333,'Mica','Mica','micaela@gmail.com',1,'A');
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

-- Dump completed on 2023-10-20 20:14:24
