
export default class Pedido {
    #codigo;
    #cliente;
    #data;
    #veiculo;
    #produtos;

    constructor(codigo, cliente, data,  veiculo, produtos) {
        this.#codigo = codigo;
        this.#cliente = cliente;
        this.#data = data;
        this.#veiculo = veiculo;
        this.#produtos = produtos;
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
    get veiculo() {
        return this.#veiculo;
    }

    set veiculo(novoVeiculo) {
        this.#veiculo = novoVeiculo;
    }

    // Produtos
    get produtos() {
        return this.#produtos;
    }

    set produtos(novosProdutos) {
        this.#produtos = novosProdutos;
    }
    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'cliente': this.#cliente,
            'data': this.#data,
            'total': this.#veiculo,
            'produtos': this.#produtos

        };
    }

    async gravar() {
        const pedidoDAO = new PedidoDAO();
        this.codigo = await pedidoDAO.adicionar(this);
    }

    async atualizar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.alterar(this);
    }

    async apagar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.deletar(this);
    }

    async consultar(termoBusca) {
        const pedidoDAO = new PedidoDAO();
        const listaPedidos = await pedidoDAO.consultar(termoBusca);
        return listaPedidos;
    }
    
}
