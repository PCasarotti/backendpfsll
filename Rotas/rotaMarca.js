import { Router } from "express";
import MarcaCtrl from "../Controle/marcaCtrl.js";

const marcaCtrl = new MarcaCtrl();
const rotaMarca = new Router();

rotaMarca
    .get('/', marcaCtrl.consultar)
    .get('/:termo', marcaCtrl.consultar)
    .post('/', marcaCtrl.gravar)
    .patch('/', marcaCtrl.atualizar)
    .put('/', marcaCtrl.atualizar)
    .delete('/', marcaCtrl.excluir);

export default rotaMarca;
