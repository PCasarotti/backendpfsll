import express from 'express';
import cors from 'cors';
import rotaMarca from './Rotas/rotaMarca.js';
import rotaVeiculo from './Rotas/rotaVeiculo.js'; 

const host = '0.0.0.0';
const porta = '3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/marca', rotaMarca);
app.use('/veiculo', rotaVeiculo); 

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
