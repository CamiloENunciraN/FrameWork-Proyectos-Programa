-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2023 at 04:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `FrameWork_Proyectos`
--

-- --------------------------------------------------------

--
-- Table structure for table `Administrador`
--

CREATE TABLE `Administrador` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Contrasena` varchar(12) NOT NULL,
  `Telefono` varchar(12) DEFAULT NULL,
  `Correo` varchar(50) NOT NULL,
  `Imagen` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Administrador`
--

INSERT INTO `Administrador` (`Id`, `Nombre`, `Contrasena`, `Telefono`, `Correo`, `Imagen`) VALUES
(1, 'Admin', '0000', NULL, 'admin@ufps.edu.co', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Noticia`
--

CREATE TABLE `Noticia` (
  `IdNoticia` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Descripcion` varchar(500) DEFAULT NULL,
  `Enlace` varchar(200) DEFAULT NULL,
  `Imagen` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Noticia`
--

INSERT INTO `Noticia` (`IdNoticia`, `Nombre`, `Fecha`, `Descripcion`, `Enlace`, `Imagen`) VALUES
(1, 'Charla inteligencia artificial en la industria ', '2023-05-04', 'Charla \"inteligencia artificial en la industria 4.0\" a cargo del candidato a Doctor I.S. Eduard Puerto.', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=detallegaleria&idgale=42', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/WhatsApp%20Image%202018-11-26%20at%2010.59.08%20AM.jpg'),
(2, 'Estudiantes de Cloud Computing en Colombia', '2023-05-25', 'El estudiante Manuel Darío Gallardo Villamizar, próximo a graduarse del Programa de Ingeniería de Sistemas, logró por segunda vez consecutiva ubicarse como uno de los diez (10) mejores estudiantes de Cloud Computing del país. Este logro se alcanza gracias a la alianza entre la UFPS y Huawei, multinacional de las Tecnologías de Información y Comunicación (TIC en español / ICT en inglés) que realiza anualmente el evento ICT Huawei Competition.', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=detallegaleria&idgale=48', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/estudiantes%20de%20Cloud%20Computing%20en%20Colombia%20reunidos.jpg'),
(3, 'Evento Facebook Colombia Hack', '2023-03-07', 'El pasado 7 de Marzo, siete (7) de nuestros estudiantes nos representaron en Bogotá en el evento Facebook Colombia Hack 2020 al cual asistieron ochenta y cinco (85) estudiantes de todo el país que lograron superar los retos virtuales. La hackatón programada por Facebook para Colombia este año, como parte de un tour de eventos iguales que llevó a varios países invitó a los estudiantes mediante un link abierto, para que todo el que lo tuviera se inscribieron. Finalmente pasaron una prueba de progr', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=detallegaleria&idgale=47', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/Evento%20Facebook%20Colombia%20Hack%202020.jpeg'),
(4, 'Compartir Proyecto Social', '2023-05-25', 'Docente y Estudiantes de proyecto social del Programa Ingeniería de sistemas, comparten con los abuelitos de la Fundación', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=detallegaleria&idgale=43', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/1.jpg'),
(5, 'Feria Buscando Carrera', '2023-04-05', 'Estudiantes de Colegios de la ciudad y su área metropolitana, participan del Encuentro Buscando Carreras, un espacio donde los futuros bachilleres conocen la oferta académica de nuestra Institución.', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=detallegaleria&idtipog=0&idgale=39', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/IMG_20181003_085031.jpg'),
(6, 'IX Maratón de Programación UFPS 2023', '2023-07-19', 'es un evento en el que los participantes trabajan en equipo para desarrollar soluciones innovadoras a un problema o desafío específico en un período de tiempo limitado, generalmente de 24 a 48 horas. Los participantes suelen ser programadores, diseñadores y otros profesionales de la tecnología que trabajan juntos para crear un prototipo funcional de una aplicación, sitio web o software.', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=verinformacion&idinfo=278', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/todos-iphone.jpg'),
(7, 'Webinar Transformación digital e Inteligencia Arti', '2023-08-18', 'Para el registro del webinario de manera que compartamos el enlace y promovamos dentro de nuestra comunidad académica la inscripción. https://tesis.tdea.edu.co/eventos/eisi/', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=verinformacion&idinfo=276', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/webinar%20Transformacion%20digital.jpg'),
(8, 'Taller \"Almacenamiento de datos IOT en la nube utilizando MQTT\"', '2023-08-31', 'En el marco de EISI 2022, me permito invitar al Taller  \"Almacenamiento de datos IOT en la nube utilizando MQTT.  El Taller se realizará bajo modalidad híbrido  el  31 de agosto a las 3:00 pm.\n\nLos estudiantes  interesados en asistir de manera  presencial ( cupo 20 Estudiantes)  deben inscribirse con la Secretaria, la Señora Maria Teresa pero también deben inscribirse en la plataforma,  el resto de interesados se hará virtual.', 'https://ingsistemas.cloud.ufps.edu.co/index.php?modulo=verinformacion&idinfo=277', 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/taller.png');

-- --------------------------------------------------------

--
-- Table structure for table `NoticiaXAdministrador`
--

CREATE TABLE `NoticiaXAdministrador` (
  `IdNoticia` int(11) NOT NULL,
  `IdAdministrador` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `NoticiaXAdministrador`
--

INSERT INTO `NoticiaXAdministrador` (`IdNoticia`, `IdAdministrador`, `Fecha`, `Descripcion`) VALUES
(1, 1, '2023-05-25', 'Registro Noticia'),
(2, 1, '2023-05-25', 'Registro Noticia'),
(3, 1, '2023-05-25', 'Registro Noticia'),
(4, 1, '2023-05-25', 'Registro Noticia'),
(5, 1, '2023-05-25', 'Registro Noticia'),
(6, 1, '2023-05-25', 'Registro Noticia'),
(7, 1, '2023-05-25', 'Registro Noticia'),
(8, 1, '2023-05-25', 'Registro Noticia');

-- --------------------------------------------------------

--
-- Table structure for table `Proyecto`
--

CREATE TABLE `Proyecto` (
  `IdProyecto` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Autor` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(500) DEFAULT NULL,
  `Enlace` varchar(200) DEFAULT NULL,
  `Imagen` varchar(200) DEFAULT NULL,
  `Tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Proyecto`
--

INSERT INTO `Proyecto` (`IdProyecto`, `Nombre`, `Fecha`, `Autor`, `Descripcion`, `Enlace`, `Imagen`, `Tipo`) VALUES
(1, 'Aplicacion web para proyectos del programa ingenieria de sistemas', '2023-05-10', 'Camilo Nuncira', 'Este proyecto se realizo con el fin de almacenar en una aplicacion web los datos de los proyectos que realizan los estudiantes de ingenieria de sistemas', 'https://github.com/CamiloENunciraN/FrameWork-Proyectos-Programa', 'https://www.uexternado.edu.co/wp-content/uploads/2017/11/Maestria-en-Gerencia-para-el-Desarrollo.jpg', 'Aula'),
(2, 'Metodologia de aprendizaje para mejorar la codificacion', '2023-03-08', 'Juan Pablo Gomez', 'Este proyecto de investigación se enfoca en desarrollar técnicas y herramientas para mejorar la calidad del código en el proceso de desarrollo de software. Se pueden explorar diferentes enfoques, como la revisión de código automatizada, la detección de errores y la refactorización de código.', '', 'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/12/Inteligencias-Multiples.jpg', 'Investigacion'),
(3, 'Desarrollo de software basado en inteligencia artificial', '2023-06-14', 'Maria Fernanda Rodriguez', 'Este proyecto de investigación se enfoca en el uso de técnicas de inteligencia artificial para mejorar el proceso de desarrollo de software. Se pueden explorar diferentes enfoques, como la generación automática de código, la detección de errores y la optimización de rendimiento.Este proyecto de investigación se enfoca en el uso de técnicas de inteligencia artificial para mejorar el proceso de desarrollo de software. Se pueden explorar diferentes enfoques, como la generación automática de código', 'https://chat.forefront.ai/', 'https://www.iagua.es/sites/default/files/styles/thumbnail-830x455/public/inteligencia-articial_benavide.jpg?itok=b9gWIsIC', 'Investigacion'),
(4, 'Desarrollo de software seguro', '2022-12-24', 'Carlos Alberto Martinez', 'Este proyecto de investigación se enfoca en desarrollar técnicas y herramientas para mejorar la seguridad del software. Se pueden explorar diferentes enfoques, como la detección de vulnerabilidades, la prevención de ataques y la protección de datos.', '', '', 'Investigacion'),
(5, 'Desarrollo de software para dispositivos móviles', '2023-02-02', 'Ana Maria Garcia', 'Este proyecto de investigación se enfoca en desarrollar técnicas y herramientas para mejorar el proceso de desarrollo de software para dispositivos móviles. Se pueden explorar diferentes enfoques, como la optimización de rendimiento, la detección de errores y la mejora de la experiencia del usuario.', 'https://www.educaciontrespuntocero.com/wp-content/uploads/2021/05/consejos-uso-inteligente-tecnologia-978x652.png', 'https://www.educaciontrespuntocero.com/wp-content/uploads/2021/05/consejos-uso-inteligente-tecnologia-978x652.png', 'Investigacion'),
(6, 'Desarrollo de software para la nube', '2023-05-03', 'Luis Eduardo Ramirez', 'Este proyecto de investigación se enfoca en desarrollar técnicas y herramientas para mejorar el proceso de desarrollo de software para la nube. Se pueden explorar diferentes enfoques, como la optimización de rendimiento, la escalabilidad y la seguridad.', 'https://www.minube.com', 'https://triego.com/wp-content/uploads/2016/02/cloud-computing.png', 'Investigacion'),
(7, 'Sistema de gestión de inventario', '2023-05-13', 'Santiago Andres Castro y  Ana Maria Garcia', 'Este proyecto consiste en desarrollar un sistema de gestión de inventario para una empresa. El sistema permitirá a los usuarios realizar un seguimiento de los productos en stock, realizar pedidos de nuevos productos y generar informes de inventario. El objetivo es mejorar la eficiencia y la precisión en la gestión de inventario de la empresa.', '', 'https://www.somasoftware.com/wp-content/uploads/2022/07/blog-reduce-operational-cost-inventory-management-system.png', 'Aula'),
(8, 'Plataforma de e learning', '2023-03-08', 'camilo', 'Este proyecto consiste en desarrollar una plataforma de e-learning para una institución educativa. La plataforma permitirá a los estudiantes acceder a cursos en línea, realizar tareas y exámenes, y comunicarse con los profesores y otros estudiantes. El objetivo es mejorar la accesibilidad y la calidad de la educación en línea.', 'https://colombialms.com/wp-content/uploads/2019/07/instalacion-moodle.png', 'https://colombialms.com/wp-content/uploads/2019/07/instalacion-moodle.png', 'Aula'),
(9, 'Aplicación de seguimiento de salud', '2022-11-23', 'Oscar Mauricio Rodriguez', 'Este proyecto consiste en desarrollar una aplicación de seguimiento de salud para dispositivos móviles. La aplicación permitirá a los usuarios realizar un seguimiento de su actividad física, su dieta y su sueño, y generar informes de salud. El objetivo es mejorar la conciencia y el bienestar de los usuarios.', 'https://concepto.de/wp-content/uploads/2013/08/salud-OMS-e1551914081412.jpg', 'https://concepto.de/wp-content/uploads/2013/08/salud-OMS-e1551914081412.jpg', 'Aula');

-- --------------------------------------------------------

--
-- Table structure for table `ProyectoXAdministrador`
--

CREATE TABLE `ProyectoXAdministrador` (
  `IdProyecto` int(11) NOT NULL,
  `IdAdministrador` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ProyectoXAdministrador`
--

INSERT INTO `ProyectoXAdministrador` (`IdProyecto`, `IdAdministrador`, `Fecha`, `Descripcion`) VALUES
(1, 1, '2023-05-25', 'Registro Proyecto'),
(2, 1, '2023-05-25', 'Registro Proyecto'),
(3, 1, '2023-05-25', 'Registro Proyecto'),
(4, 1, '2023-05-25', 'Registro Proyecto'),
(5, 1, '2023-05-25', 'Registro Proyecto'),
(6, 1, '2023-05-25', 'Registro Proyecto'),
(7, 1, '2023-05-25', 'Registro Proyecto'),
(8, 1, '2023-05-25', 'Registro Proyecto'),
(9, 1, '2023-05-25', 'Registro Proyecto');

-- --------------------------------------------------------

--
-- Table structure for table `Sesion`
--

CREATE TABLE `Sesion` (
  `Id` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT 0,
  `UltimaSesion` date DEFAULT NULL,
  `IdAdministrador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Sesion`
--

INSERT INTO `Sesion` (`Id`, `Fecha`, `Estado`, `UltimaSesion`, `IdAdministrador`) VALUES
(1, '2023-06-05', 0, '2023-06-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `TipoProyecto`
--

CREATE TABLE `TipoProyecto` (
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `TipoProyecto`
--

INSERT INTO `TipoProyecto` (`Nombre`, `Descripcion`) VALUES
('Aula', 'Permite incorporar las competencias adquiridas por el alumno en diferentes Unidades de Aprendizaje para dar solución a un problema mediante el método de proyectos en los diferentes semestres.'),
('Investigacion', 'Es un proyecto metodológico, académico, en el cual se explica y se describe al detalle el conjunto de procedimientos que se emprenderá, la hipótesis que con ellos se persigue y el apoyo bibliográfico con que se cuenta.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Administrador`
--
ALTER TABLE `Administrador`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Noticia`
--
ALTER TABLE `Noticia`
  ADD PRIMARY KEY (`IdNoticia`);

--
-- Indexes for table `NoticiaXAdministrador`
--
ALTER TABLE `NoticiaXAdministrador`
  ADD PRIMARY KEY (`IdNoticia`,`IdAdministrador`),
  ADD KEY `IdAdministrador` (`IdAdministrador`);

--
-- Indexes for table `Proyecto`
--
ALTER TABLE `Proyecto`
  ADD PRIMARY KEY (`IdProyecto`),
  ADD KEY `FK_TipoProyecto_X_Proyecto` (`Tipo`);

--
-- Indexes for table `ProyectoXAdministrador`
--
ALTER TABLE `ProyectoXAdministrador`
  ADD PRIMARY KEY (`IdAdministrador`,`IdProyecto`),
  ADD KEY `IdProyecto` (`IdProyecto`);

--
-- Indexes for table `Sesion`
--
ALTER TABLE `Sesion`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Administrador_X_Sesion` (`IdAdministrador`);

--
-- Indexes for table `TipoProyecto`
--
ALTER TABLE `TipoProyecto`
  ADD PRIMARY KEY (`Nombre`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Administrador`
--
ALTER TABLE `Administrador`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Noticia`
--
ALTER TABLE `Noticia`
  MODIFY `IdNoticia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Proyecto`
--
ALTER TABLE `Proyecto`
  MODIFY `IdProyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Sesion`
--
ALTER TABLE `Sesion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `NoticiaXAdministrador`
--
ALTER TABLE `NoticiaXAdministrador`
  ADD CONSTRAINT `NoticiaXAdministrador_ibfk_1` FOREIGN KEY (`IdNoticia`) REFERENCES `Noticia` (`IdNoticia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `NoticiaXAdministrador_ibfk_2` FOREIGN KEY (`IdAdministrador`) REFERENCES `Administrador` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Proyecto`
--
ALTER TABLE `Proyecto`
  ADD CONSTRAINT `Proyecto_ibfk_1` FOREIGN KEY (`Tipo`) REFERENCES `TipoProyecto` (`Nombre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ProyectoXAdministrador`
--
ALTER TABLE `ProyectoXAdministrador`
  ADD CONSTRAINT `ProyectoXAdministrador_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `Proyecto` (`IdProyecto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProyectoXAdministrador_ibfk_2` FOREIGN KEY (`IdAdministrador`) REFERENCES `Administrador` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Sesion`
--
ALTER TABLE `Sesion`
  ADD CONSTRAINT `Sesion_ibfk_1` FOREIGN KEY (`IdAdministrador`) REFERENCES `Administrador` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
