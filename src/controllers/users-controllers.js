const bcrypt = require('bcrypt');
const { dbcon } = require('../config/connection-db');
const { Usuario, UsuarioDAO } = require('../models/user');
const { Produto, ProdutoDAO } = require('../models/produto');

class UsersController {

    async mostrarCadastro(req, res) {
        return res.render('user_form', {user : undefined, form : 'cadastro'});
    }

    async cadastrar(req, res) {

        const userBody = req.body;
        const senha = bcrypt.hashSync(userBody.senha, 10); 
        
        const user = {
            email: userBody.email,
            username: userBody.username,
            nomecompleto: userBody.nomecompleto,
            tipo: userBody.tipo,
            senha: senha,
            endereco: userBody.endereco,
            numcel: userBody.numcel,
            cpf: userBody.cpf
        }
        
        const usuario = new Usuario(user.email, user.username, user.nomecompleto, user.senha, user.tipo, user.endereco, user.numcel, user.cpf);
        console.log(usuario);
        await UsuarioDAO.cadastrarUsuario(usuario);

        const userSession = {
            email: user.email,
            username: user.username,
            tipo: 'user'
        }
        
        req.session.user = userSession;
        return res.redirect('/');

    }

    async mostrarLogin(req, res) {
        return res.render('user_login', {user : undefined});
    }

    async login(req, res) {

        const { email, senha } = req.body;

        const usuario = await UsuarioDAO.encontrarUsuario(email);

        if (usuario === undefined) {
            return res.send('Usuário não está cadastrado ao sistema <br><br> <a href="/">Voltar à página inicial</a>');
        }

        const confere = bcrypt.compareSync(senha, usuario.senha);
        if (confere) {
            const userSession = {
                email: usuario.email,
                username: usuario.username,
                tipo: usuario.tipo
            }

            req.session.user = userSession;
            return res.redirect('/');
        } else {
            return res.send('Senha incorreta... <br><br> <a href="/">Voltar à página inicial</a>');
        }
        
    }

    async logout(req, res) {

        req.session.destroy();

        return res.redirect('/');
    }

    async addProdutoCarrinho(req, res) {

        const produtos = [];

        if (req.session.user.carrinho === undefined) {
            req.session.user.carrinho = [];
        }

        const { produto_id } = req.params;

        const carrinhoIni = req.session.user.carrinho;

        if (carrinhoIni.includes(produto_id) == false) {

            req.session.user.carrinho.push(produto_id);

        }

        const carrinhoFin = req.session.user.carrinho;

        for (let i = 0; i < carrinhoFin.length; i++) {

            const result = await ProdutoDAO.encontrarProduto(carrinhoFin[i]);

            produtos.push(result);

        }

        return res.render('carrinho', {user : req.session.user, produtos : produtos, carrinho : carrinhoFin});

    }

    async comprar(req, res) {

        const email = req.session.user.email; 

        const { produtos_ids } = req.params;

        const arrayIds = produtos_ids.split('+');

        await UsuarioDAO.inserirCompraDoUsuario(email, arrayIds);

        return res.redirect('/');


    }

    async mostrarPagUser(req, res) {

        const { email } = req.params;

        const result = await UsuarioDAO.encontrarUsuario(email);

        return res.render('user_pag', {user : req.session.user, data: result});

    }

    async mostrarComprasUser(req, res) {

        const { email } = req.params;

        const result = await UsuarioDAO.encontrarComprasDoUsuario(email);

        return res.render('user_compras', {user : req.session.user, compras: result});

    }

    async mostrarEditUser(req, res) {

        const { email } = req.params;

        const result = await UsuarioDAO.encontrarUsuario(email);

        return res.render('user_form', {user : req.session.user, data: result, form : 'edicao'});

    }

    async editarUser(req, res) {

        const email = req.session.user.email;
        const userBody = req.body;

        await UsuarioDAO.editarUsuario(email, userBody);

        req.session.user.username = userBody.username;

        return res.redirect('/');

    }

    async deletarUser(req, res) {

        const email = req.session.user.email;

        await UsuarioDAO.deletarUsuario(email);

        req.session.destroy();

        return res.redirect('/');
        
    }
}

module.exports = UsersController;