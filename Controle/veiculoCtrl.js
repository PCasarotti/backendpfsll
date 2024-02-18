import Veiculo from "../Modelo/veiculo.js";

export default class VeiculoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const modelo = dados.modelo;
            const ano = dados.ano;
            const km = dados.km;
            const valor = dados.valor;
            const cor = dados.cor;

            if (modelo && ano && km >= 0 && valor >= 0 && cor) {
                const veiculo = new Veiculo(0, "", modelo, ano, km, valor, cor);

                veiculo.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": veiculo.codigo,
                        "mensagem": "Veiculo incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o veiculo:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do veiculo segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um veiculo!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            if (codigo && descricao && precoCusto > 0 && precoVenda > 0 && dataValidade
                && qtdEstoque >= 0) {
                const veiculo = new Veiculo(codigo, descricao, precoCusto,
                    precoVenda, dataValidade, qtdEstoque);
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

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const veiculo = new Veiculo();
            veiculo.consultar(termo).then((listaVeiculos) => {
                resposta.json(
                    {
                        status: true,
                        listaVeiculos
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os veiculos: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar veiculos!"
            });
        }
    }
}
