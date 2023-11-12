CREATE TABLE `tb_usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `ativo` tinyint NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_animais` (
  `id_animal` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `sexo` char(1) NOT NULL,
  `origem` varchar(15) NOT NULL,
  `raca` varchar(45) DEFAULT NULL,
  `data_nascimento` date NOT NULL,
  `situacao` varchar(15) NOT NULL,
  `ativo` tinyint NOT NULL,
  PRIMARY KEY (`id_animal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_producao_animal` (
  `id_producao_animal` int NOT NULL AUTO_INCREMENT,
  `id_animal` int NOT NULL,
  `data_producao` date NOT NULL,
  `hora_producao` time NOT NULL,
  `quantidade` float NOT NULL,
  `ativo` tinyint NOT NULL,
  PRIMARY KEY (`id_producao_animal`),
  KEY `id_animal_idx` (`id_animal`),
  CONSTRAINT `id_animal` FOREIGN KEY (`id_animal`) REFERENCES `tb_animais` (`id_animal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;