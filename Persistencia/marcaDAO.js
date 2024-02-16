import Marca from "../Modelo/marca.js";
import conectar from "./conexao.js";

export default class MarcaDAO {
    async gravar(marca) {
        if (marca instanceof Marca) {
            const sql = "INSERT INTO marca(mar_descricao) VALUES(?)";
            const parametros = [marca.descricao];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            marca.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(marca) {
        if (marca instanceof Marca) {
            const sql = "UPDATE marca SET mar_descricao = ? WHERE mar_codigo = ?";
            const parametros = [marca.descricao, marca.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(marca) {
        if (marca instanceof Marca) {
            const sql = "DELETE FROM marca WHERE mar_codigo = ?";
            const parametros = [marca.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM marca WHERE mar_codigo = ? order by mar_descricao';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM marca WHERE mar_descricao like ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaMarcas = [];
        for (const registro of registros) {
            const marca = new Marca(registro.mar_codigo, registro.mar_descricao);
            listaMarcas.push(marca);
        }
        return listaMarcas;
    }
}
