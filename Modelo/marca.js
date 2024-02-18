import MarcaDAO from "../Persistencia/marcaDAO.js";

export default class Marca {
    #codigo;
    #descricao;

    constructor(codigo = 0, descricao = '') {
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDesc) {
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        };
    }

    //camada de modelo acessa a camada de persistencia
    async gravar() {
        const marcaDAO = new MarcaDAO();
        await marcaDAO.gravar(this);
    }

    async excluir() {
        const marcaDAO = new MarcaDAO();
        await marcaDAO.excluir(this);
    }

    async atualizar() {
        const marcaDAO = new MarcaDAO();
        await marcaDAO.atualizar(this);
    }

    async consultar(parametro) {
        const marcaDAO = new MarcaDAO();
        return await marcaDAO.consultar(parametro);
    }
}
