import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export function autenticar(requisicao, resposta){
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === 'admin' && senha === 'admin'){
        requisicao.session.usuarioAutenticado = usuario;
        resposta.json({
            "status": true,
            "token": assinar({usuario})
        })
    }
    else{
        requisicao.senha.usuarioAutenticado = null;
        resposta.status(401).json({
            "status": false,
            "mensagem": "Usuario ou senha invalidos"
        })
    }
}

export function verificarAcesso(requisicao, resposta, next){
    const token = requisicao.headers['authorization'];
    let tokenDecodificado = '';
    if(token){
        tokenDecodificado = verificarAssinatura(token);
    }
    
    if (tokenDecodificado.usuario.usuario == requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.status(401).json({
            "status": false, 
            "mensagem": "Acesso Negado! Faça o Login"
        })
    }
}
export default autenticar;