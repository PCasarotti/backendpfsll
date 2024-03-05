import { Router } from "express";
import { autenticar } from "../Seguranca/Autenticacao";

const rotaLogin = new Router();
rotaLogin.post('/', (req, res)=>{
    autenticar(req, res);
})