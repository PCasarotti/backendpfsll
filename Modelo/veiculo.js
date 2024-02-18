import VeiculoDAO from "../Persistencia/veiculoDAO.js";

export default class Veiculo {
    #codigo;
    #descricao;
    #modelo;
    #ano;
    #km;
    #valor;
    #cor;
    #marca;

    constructor(codigo = 0, descricao = "", modelo = "", ano = 0, km = 0, valor = 0, cor = "", marca={}) {
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#modelo = modelo;
        this.#ano = ano;
        this.#km = km;
        this.#valor = valor;
        this.#cor = cor;
        this.#marca = marca;
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

    get modelo() {
        return this.#modelo;
    }

    set modelo(novoModelo) {
        this.#modelo = novoModelo;
    }

    get ano() {
        return this.#ano;
    }

    set ano(novoAno) {
        this.#ano = novoAno;
    }

    get km() {
        return this.#km;
    }

    set km(novoKm) {
        this.#km = novoKm;
    }

    get valor() {
        return this.#valor;
    }

    set valor(novoValor) {
        this.#valor = novoValor;
    }

    get cor() {
        return this.#cor;
    }

    set cor(novaCor) {
        this.#cor = novaCor;
    }
    get marca() {
        return this.#marca;
    }

    set marca(novaMarca) {
        this.#marca = novaMarca;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao,
            modelo: this.#modelo,
            ano: this.#ano,
            km: this.#km,
            valor: this.#valor,
            cor: this.#cor,
            marca:this.#marca,
        }
    }
    async gravar() {
        const veiculoDAO = new VeiculoDAO();
        await veiculoDAO.gravar(this);
    }

    async excluir() {
        const veiculoDAO = new VeiculoDAO();
        await veiculoDAO.excluir(this);
    }

    async alterar() {
        const veiculoDAO = new VeiculoDAO();
        await veiculoDAO.atualizar(this);
    }

    async consultar(termo) {
        const veiculoDAO = new VeiculoDAO();
        return await veiculoDAO.consultar(termo);
    }
}
