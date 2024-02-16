import { Router } from "express";
import VeiculoCtrl from "../Controle/veiculoCtrl.js";

const veicCtrl = new VeiculoCtrl();
const rotaVeiculo = new Router();

rotaVeiculo
.get('/', veicCtrl.consultar)
.get('/:termo', veicCtrl.consultar)
.post('/', veicCtrl.gravar)
.patch('/', veicCtrl.atualizar)
.put('/', veicCtrl.atualizar)
.delete('/', veicCtrl.excluir);

export default rotaVeiculo;
