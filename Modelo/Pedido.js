import PedidoDAO from "../Persistencia/pedidoDAO.js";
export default class Pedido {
    #codigo;
    #cliente;
    #data;
    #total;
    #model;

    constructor(codigo, cliente, data,  total, model) {
        this.#codigo = codigo;
        this.#cliente = cliente;
        this.#data = data;
        this.#total = total;
        this.#model = model;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Código do Cliente
    get cliente() {
        return this.#cliente;
    }

    set cliente(novocliente) {
        this.#cliente = novocliente;
        
    }

    // Data
    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    // Total do Pedido
    get total() {
        return this.#total;
    }

    set total(novoTotal) {
        this.#total = novoTotal;
    }

    // Produtos
    get model() {
        return this.#model;
    }

    set veiculos(novosModel) {
        this.#model = novosModel;
    }
    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'cliente': this.#cliente,
            'data': this.#data,
            'total': this.#total,
            'model': this.#model  
        };
    }

    async gravar() {
        const pedidoDAO = new PedidoDAO();
        this.codigo = await pedidoDAO.gravar(this);
    }   

    async excluir() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.excluir(this);
    }
    async atualizar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.atualizar(this);
    }

    async consultar(termoBusca) {
        const pedidoDAO = new PedidoDAO();
        const listaPedidos = await pedidoDAO.consultar(termoBusca);
        return listaPedidos;
    }
    
}


