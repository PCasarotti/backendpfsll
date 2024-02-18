import { Router } from "express";
import VeiculoCtrl from "../Controle/veiculoCtrl.js";

const veiculoCtrl = new VeiculoCtrl();
const rotaVeiculo = new Router();

rotaVeiculo
.get('/', veiculoCtrl.consultar)
.get('/:termo', veiculoCtrl.consultar)
.post('/', veiculoCtrl.gravar)
.patch('/', veiculoCtrl.atualizar)
.put('/', veiculoCtrl.atualizar)
.delete('/', veiculoCtrl.excluir);

export default rotaVeiculo;