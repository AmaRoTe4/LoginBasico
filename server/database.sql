
CREATE TABLE `Clientes` (
  `id` varchar(25) NOT NULL,
  `id_user` varchar(25) NOT NULL,
  `id_servicios` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `dia` varchar(5) DEFAULT NULL,
  `hora` varchar(5) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Profesionales` (
  `id` varchar(25) NOT NULL,
  `id_user` varchar(25) NOT NULL,
  `type` int(11) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `nombre_local` varchar(100) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `localidad` varchar(35) NOT NULL,
  `direccion` varchar(40) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Servicios` (
  `id` varchar(25) NOT NULL,
  `id_user` varchar(25) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `duracion` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Tiempos` (
  `id` varchar(25) NOT NULL,
  `id_user` varchar(25) NOT NULL,
  `dia` varchar(5) NOT NULL,
  `horas` varchar(25) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `Profesionales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `Servicios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `Tiempos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);
COMMIT;