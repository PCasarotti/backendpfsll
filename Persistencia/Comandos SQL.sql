CREATE TABLE cliente (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);


CREATE TABLE pedido (
    codigo INT PRIMARY KEY,
    cliente_codigo INT,
    veiculo VARCHAR(255) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_CLIENTE FOREIGN KEY (cliente_codigo) REFERENCES cliente(codigo)
);

CREATE TABLE pedido_produto (
    pedido_codigo INT,
    vei_codigo INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (pedido_codigo, vei_codigo),
   	CONSTRAINT FK_PEDIDO FOREIGN KEY (pedido_codigo) REFERENCES pedido(codigo),
    CONSTRAINT FK_PRODUTO FOREIGN KEY (vei_codigo) REFERENCES veiculo(codigo)
);
