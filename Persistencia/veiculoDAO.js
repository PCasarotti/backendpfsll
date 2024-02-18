import Veiculo from '../Modelo/veiculo.js';
import conectar from './conexao.js';

export default class VeiculoDAO {

    async gravar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = `INSERT INTO veiculo(vei_descricao, vei_modelo, vei_ano, vei_km, vei_valor, vei_cor)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [veiculo.descricao, veiculo.modelo, veiculo.ano, veiculo.km, veiculo.valor, veiculo.cor];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            veiculo.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = `UPDATE veiculo SET vei_descricao = ?, vei_modelo = ?,
            vei_ano = ?, vei_km = ?, vei_valor = ?, vei_cor = ?
            WHERE vei_codigo = ?`;
            const parametros = [veiculo.descricao, veiculo.modelo, veiculo.ano, veiculo.km, veiculo.valor, veiculo.cor, veiculo.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = `DELETE FROM veiculo WHERE vei_codigo = ?`;
            const parametros = [veiculo.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }
        //termo é um número
        const conexao = await conectar();
        let listaVeiculos = [];
        if (!isNaN(parseInt(termo))) {
            //consulta pelo código do veiculo
            const sql = `SELECT v.vei_codigo, v.vei_descricao, v.vei_modelo, v.vei_ano, v.vei_km, v.vei_valor, v.vei_cor
              FROM veiculo v 
              WHERE v.vei_codigo = ?
              ORDER BY v.vei_descricao               
            `;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const veiculo = new Veiculo(registro.vei_codigo, registro.vei_descricao,
                    registro.vei_modelo, registro.vei_ano,
                    registro.vei_km, registro.vei_valor, registro.vei_cor
                );
                listaVeiculos.push(veiculo);
            }
        }
        else {
            //consulta pela descrição do veiculo
            const sql = `SELECT v.vei_codigo, v.vei_descricao, v.vei_modelo, v.vei_ano, v.vei_km, v.vei_valor, v.vei_cor
              FROM veiculo v 
              WHERE v.vei_descricao like ?
              ORDER BY v.vei_descricao               
            `;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const veiculo = new Veiculo(registro.vei_codigo, registro.vei_descricao,
                    registro.vei_modelo, registro.vei_ano,
                    registro.vei_km, registro.vei_valor, registro.vei_cor,
                );
                listaVeiculos.push(veiculo);
            }
        }

        return listaVeiculos;
    }
}
