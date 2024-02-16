import Veiculo from '../Modelo/veiculo.js';
import conectar from './conexao.js';

export default class VeiculoDAO {

    async gravar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = `INSERT INTO veiculo(vei_descricao, vei_precoCusto,
                vei_precoVenda, vei_dataValidade, vei_qtdEstoque)
                VALUES(?,?,?,?,?)`;
            const parametros = [veiculo.descricao, veiculo.precoCusto, veiculo.precoVenda,
            veiculo.dataValidade, veiculo.qtdEstoque];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            veiculo.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = `UPDATE veiculo SET vei_descricao = ?, vei_precoCusto = ?,
            vei_precoVenda = ?, vei_dataValidade = ?, vei_qtdEstoque = ?
            WHERE vei_codigo = ?`;
            const parametros = [veiculo.descricao, veiculo.precoCusto, veiculo.precoVenda,
            veiculo.dataValidade, veiculo.qtdEstoque, veiculo.codigo];

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
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaVeiculos = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do veiculo
            const sql = `SELECT v.vei_codigo, v.vei_descricao,
              v.vei_precoCusto, v.vei_precoVenda, v.vei_dataValidade, 
              v.vei_qtdEstoque
              FROM veiculo v 
              WHERE v.vei_codigo = ?
              ORDER BY v.vei_descricao               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const veiculo = new Veiculo(registro.vei_codigo,registro.vei_descricao,
                                            registro.vei_precoCusto,registro.vei_precoVenda,
                                            registro.vei_dataValidade, registro.vei_qtdEstoque
                                            );
                listaVeiculos.push(veiculo);
            }
        }
        else
        {
            //consulta pela descrição do veiculo
            const sql = `SELECT v.vei_codigo, v.vei_descricao,
              v.vei_precoCusto, v.vei_precoVenda, v.vei_dataValidade, 
              v.vei_qtdEstoque
              FROM veiculo v 
              WHERE v.vei_descricao like ?
              ORDER BY v.vei_descricao               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const veiculo = new Veiculo(registro.vei_codigo,registro.vei_descricao,
                                            registro.vei_precoCusto,registro.vei_precoVenda,
                                            registro.vei_dataValidade, registro.vei_qtdEstoque,
                                            );
                listaVeiculos.push(veiculo);
            }
        }

        return listaVeiculos;
    }
}
