import express from 'express';
import cors from 'cors';
import rotaMarca from './Rotas/rotaMarca.js';
import rotaVeiculo from './Rotas/rotaVeiculo.js'; 
import rotaLogin from './Rotas/rotaLogin.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Seguranca/Autenticacao.js';

const host = '0.0.0.0';
const porta = '3000';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO, 
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))


app.use('/login', rotaLogin)
app.use('/marca', verificarAcesso, rotaMarca);
app.use('/veiculo', verificarAcesso, rotaVeiculo); 

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
