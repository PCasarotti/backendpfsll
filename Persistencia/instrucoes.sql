CREATE DATABASE sistema;

USE sistema;

CREATE TABLE marca (
    mar_codigo INT NOT NULL AUTO_INCREMENT,
    mar_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_marca PRIMARY KEY (mar_codigo)
);

CREATE TABLE veiculo (
    vei_codigo INT NOT NULL AUTO_INCREMENT,
    vei_modelo VARCHAR(50) NOT NULL,
    vei_ano INT NOT NULL,
    vei_km DECIMAL(10,2) NOT NULL DEFAULT 0,
    vei_valor DECIMAL(10,2) NOT NULL DEFAULT 0,
    vei_cor VARCHAR(50) NOT NULL,
    mar_codigo INT NOT NULL,
    CONSTRAINT pk_veiculo PRIMARY KEY (vei_codigo),
    CONSTRAINT fk_marca FOREIGN KEY (mar_codigo) REFERENCES marca(mar_codigo)
);
