export default class ItemPedido {
    #veiculo;
    #quantidade;
    #precoUnitario;
    #subtotal; 
    
    constructor(veiculo, quantidade, precoUnitario,subtotal) {
        this.#veiculo = veiculo;
        this.#quantidade = quantidade;
        this.#precoUnitario = precoUnitario;
        this.#subtotal = quantidade * precoUnitario;
    }

    // Métodos de acesso (get) e modificação (set)
    get veiculo() {
        return this.#veiculo;
    }

    set veiculo(novoVeiculo) {
        this.#veiculo = novoVeiculo;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }
    
    get precoUnitario() {
        return this.#precoUnitario;
    }

    set precoUnitario(novoPrecoUnitario) {
        this.#precoUnitario = novoPrecoUnitario;
    }
    // Produto Nome
    
    get subtotal() {
        this.#subtotal = this.#quantidade * this.#precoUnitario;
        return this.#subtotal;
    }

    
    // JSON
    toJSON() {
        return {
            'veiculo': this.#veiculo,
            'quantidade': this.#quantidade,
            'precoUnitario': this.#precoUnitario,
            'subtotal': this.#subtotal
        };
    }
}

