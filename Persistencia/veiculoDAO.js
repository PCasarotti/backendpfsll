import Veiculo from '../Modelo/veiculo.js';
import Marca from '../Modelo/marca.js';
import conectar from './conexao.js';

export default class VeiculoDAO {

    async gravar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = `INSERT INTO veiculo(vei_modelo, vei_ano, vei_km, vei_valor, vei_cor, mar_codigo)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [veiculo.modelo, 
                veiculo.ano, 
                veiculo.km, 
                veiculo.valor,
                veiculo.cor, 
                veiculo.marca.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            veiculo.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(veiculo) {
        if (veiculo instanceof Veiculo) {
            const sql = 
            `UPDATE veiculo 
            SET vei_modelo = ?,
            vei_ano = ?, 
            vei_km = ?, 
            vei_valor = ?, 
            vei_cor = ?, 
            mar_codigo = ?
            WHERE vei_codigo = ?
            `;
            const parametros = [veiculo.modelo, veiculo.ano, 
            veiculo.km, veiculo.valor, veiculo.cor, veiculo.marca.codigo, veiculo.codigo];
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
        const conexao = await conectar();
        let listaVeiculos = [];
    
        if (!isNaN(parseInt(termo))) {
            // Consulta por código
            const sql = `SELECT v.vei_codigo, v.vei_modelo, v.vei_ano,
                v.vei_km, v.vei_valor, v.vei_cor, m.mar_codigo, m.mar_descricao
                FROM veiculo v 
                INNER JOIN marca m ON v.mar_codigo = m.mar_codigo
                WHERE v.vei_codigo = ?
                ORDER BY v.vei_modelo              
            `;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
    
            for (const registro of registros) {
                const marca = new Marca(registro.mar_codigo, registro.mar_descricao);
                const veiculo = new Veiculo(registro.vei_codigo,
                    registro.vei_modelo, registro.vei_ano,
                    registro.vei_km, registro.vei_valor, registro.vei_cor, marca
                );
                listaVeiculos.push(veiculo);
            }
        } else {
            // Consulta por descrição do veículo
            const sql = `SELECT v.vei_codigo, v.vei_modelo, v.vei_ano,
                v.vei_km, v.vei_valor, v.vei_cor, m.mar_codigo, m.mar_descricao
                FROM veiculo v 
                INNER JOIN marca m ON v.mar_codigo = m.mar_codigo
                WHERE v.vei_modelo LIKE ?
                ORDER BY v.vei_modelo
            `;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
    
            for (const registro of registros) {
                const marca = new Marca(registro.mar_codigo, registro.mar_descricao);
                const veiculo = new Veiculo(registro.vei_codigo,
                    registro.vei_modelo, registro.vei_ano,
                    registro.vei_km, registro.vei_valor, registro.vei_cor, marca
                );
                listaVeiculos.push(veiculo);
            }
        }
    
        return listaVeiculos;
    }
    
} 
