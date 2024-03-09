import Pedido from "../Modelo/Pedido.js";
import conectar from "./conexao.js";
import Cliente from "../Modelo/Cliente.js";
import Marca from "../Modelo/marca.js";
import Modelo from "../Modelo/modelo.js";
import Veiculo from "../Modelo/veiculo.js";

export default class PedidoDAO {
    async gravar(pedido) {
        if (pedido instanceof Pedido && pedido.cliente && pedido.data && pedido.model) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql = 'INSERT INTO pedido(cliente_codigo, data_pedido, modelo) VALUES(?,?,?)';
                const parametros = [pedido.cliente.codigo, pedido.data, pedido.model];
                const retorno = await conexao.execute(sql, parametros);
                pedido.codigo = retorno[0].insertId;

                const sql2 = 'INSERT INTO pedido_modelo(pedido_codigo, vei_codigo, km, quantidade) VALUES (?,?,?,?)';
                for (const modelo of pedido.model) {
                    if (modelo && modelo.veiculo && modelo.veiculo.codigo !== undefined && modelo.quantidade !== undefined && modelo.km !== undefined) {
                        let parametros2 = [pedido.codigo, modelo.veiculo.codigo, modelo.quantidade, modelo.km];
                        await conexao.execute(sql2, parametros2);
                    } else {
                        // Algo é undefined, trate o erro ou simplesmente ignore este modelo
                    }
                }
                await conexao.commit();
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }


    async excluir(pedido) {
        if (pedido instanceof Pedido) {
            const sql = "DELETE FROM pedido WHERE pedido_codigo = ?";
            const parametros = [pedido.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(pedido) {
        if (pedido instanceof Pedido) {
            const sql = "UPDATE pedido SET modelo = ? WHERE pedido_codigo = ?";
            const parametros = [pedido.modelo, pedido.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async consultar(termoBusca) {
        const listaPedidos = [];
        if (!isNaN(termoBusca)) {
            try {
                const conexao = await conectar();
                const sql = `SELECT p.codigo, p.cliente_codigo, p.data_pedido, p.modelo,
                            c.nome, c.endereco, c.telefone,
                            vei.vei_ano, vei.vei_cor, vei.vei_km, vei.vei_modelo, vei.vei_valor,
                            mar.mar_codigo, mar.mar_descricao,
                            mo.pedido_codigo, mo.quantidade, mo.km
                            FROM pedido as p
                            INNER JOIN cliente as c ON p.cliente_codigo = c.codigo
                            INNER JOIN pedido_modelo as mo ON mo.pedido_codigo = p.codigo
                            INNER JOIN veiculo as vei ON vei.vei_codigo = mo.vei_codigo
                            INNER JOIN marca as mar ON vei.mar_codigo = mar.mar_codigo
                            WHERE p.codigo = ?`;

                const [registros, campos] = await conexao.execute(sql, [termoBusca]);

                const cliente = new Cliente(registros[0].nome, registros[0].endereco, registros[0].telefone);
                let listaModel = [];
                for (const registro of registros) {
                    const marca = new Marca(registro.mar_codigo, registro.mar_descricao);
                    const veiculo = new Veiculo(registro.vei_codigo, registro.vei_ano, registro.vei_cor, registro.vei_km, registro.vei_modelo, registro.vei_valor);
                    const modelo = new Modelo(veiculo, registro.mo.quantidade, registro.mo.km);
                    listaModel.push(modelo);
                }
                const pedido = new Pedido(registros[0].codigo, cliente, registros[0].data_pedido, registros[0].total, listaModel);
                listaPedidos.push(pedido);
            } catch (error) {
                console.error(error);
            }
        }
        return listaPedidos;
    }
}
