-- Tabela para armazenar os clientes

CREATE TABLE cliente (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);


-- Tabela para armazenar os pedidos
CREATE TABLE pedido (
    codigo INT PRIMARY KEY,
    cliente_codigo INT,
    modelo DECIMAL(10, 2) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_CLIENTE FOREIGN KEY (cliente_codigo) REFERENCES cliente(codigo)
);

-- Tabela para armazenar os itens do pedido
CREATE TABLE pedido_modelo (
    pedido_codigo INT,
    vei_codigoo INT NOT NULL,
    quantidade INT NOT NULL,
    km DECIMAL(50, 2) NOT NULL,
    PRIMARY KEY (pedido_codigo, vei_codigo),
    CONSTRAINT FK_PEDIDO FOREIGN KEY (pedido_codigo) REFERENCES pedido(codigo),
    CONSTRAINT FK_VEICULO FOREIGN KEY (vei_codigo) REFERENCES veiculo(vei_codigo)
);

