import Cliente from "../Modelo/Cliente.js";
import Pedido from "../Modelo/Pedido.js";
import Veiculo from "../Modelo/veiculo.js";
import Modelo from "../Modelo/modelo.js";

export default class PedidoCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;

            // Extraindo dados de um novo pedido
            const cliente = dados.cliente;
            const dataPedido = dados.dataPedido;
            const totalPedido = dados.totalPedido;
            const modelopedido = dados.modelos;

            // Verificando se modelopedido é uma lista ou objeto iterável
            
            // Instanciando um objeto do tipo Cliente
            const objCliente = new Cliente(cliente.codigo);

            // Instanciando uma lista de objetos do tipo Modelo
            let modelos = [];
            for (const modelo of modelopedido) {
                // Instanciando um objeto do tipo Veiculo
                const veiculo = new Veiculo(modelo.veiculo_codigo);

                // Instanciando um objeto do tipo Modelo
                const objModelo = new Modelo(veiculo, modelo.quantidade, modelo.km);
                modelos.push(objModelo);
            }

            const pedido = new Pedido(0, objCliente, dataPedido, totalPedido, modelos);

            // Resolver a promise
            pedido.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Pedido registrado com sucesso!",
                    "codigo": pedido.codigo
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar o pedido: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Certifique-se de que a requisição é do tipo POST e contém o cabeçalho 'Content-Type: application/json'."
            });
        }
    }
    
    

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
            // Tentar obter o código do pedido a partir dos parâmetros da URL
            let termo = requisicao.params.termo;
            if (!isNaN(termo)) {
                const pedido = new Pedido(0);
                pedido.consultar(termo).then((listaPedidos) => {
                    resposta.status(200).json({
                        "status": true,
                        "listaPedidos": listaPedidos
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao consultar o pedido: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um código de pedido válido!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const veiculo = new Veiculo(codigo);
                //resolver a promise
                veiculo.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Veiculo excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o veiculo:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do veiculo!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um veiculo!"
            });
        }
    }
    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const modelo = dados.modelo;
            const ano = dados.ano;
            const km = dados.km;
            const valor = dados.valor;
            const cor = dados.cor;
            const marca = dados.marca;

            if (codigo && modelo && ano && km >= 0 && valor >= 0 && cor && marca){
                const veiculo = new Veiculo(codigo, modelo, ano, km, valor, cor, marca);
                
                //resolver a promise
                veiculo.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Veiculo atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o veiculo:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do veiculo segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um veiculo!"
            });
        }
    }
}
