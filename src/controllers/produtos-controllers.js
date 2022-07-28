const nanoid = require('nanoid');
const { dbcon } = require('../config/connection-db');
const { Produto, ProdutoDAO } = require('../models/produto');
const { Categoria, CategoriaDAO } = require('../models/categoria');

class ProdutosController {

    async mostrarListaProdutos(req, res) {

        const result = await ProdutoDAO.todosOsProdutos();

        return res.render('produto_lista', {user: req.session.user, produtos : result});

    }

    async mostrarPagProduto(req, res) {

        const { id } = req.params;

        const result = await ProdutoDAO.encontrarProduto(id);
        const result2 = await ProdutoDAO.encontrarCategoriasFromProduto(id);

        return res.render('produto_pag', {user: req.session.user, produto: result, categorias: result2});

    }

    async mostrarInsert(req, res) {

        const result = await CategoriaDAO.todasAsCategorias();

        return res.render('produto_form', {user : req.session.user, categorias : result, form : 'cadastro'});

    }

    async inserir(req, res) {
        
        const produtoBody = {
            imagem: req.body.imagem,
            titulo: req.body.titulo,
            preco: req.body.preco,
            descricao: req.body.descricao,
            produtor: req.body.produtor
        }

        const categoriasBody = {
            ids: req.body.categorias
        }

        await ProdutoDAO.inserirProduto(produtoBody, categoriasBody);

        return res.redirect('/');

    }

    async mostrarLista(req, res) {

        const result = await ProdutoDAO.todosOsProdutos();

        return res.render('produto_lista', {user : req.session.user, data: result});

    }

    async mostrarEditProduto(req, res) {

        const { id } = req.params;

        const result = await ProdutoDAO.encontrarProduto(id);
        const result2 = await ProdutoDAO.encontrarCategoriasFromProduto(id);
        const result3 = await CategoriaDAO.todasAsCategorias();

        return res.render('produto_form', {user : req.session.user, produto: result, checkedCategorias: result2, categorias: result3, form : 'edicao'});

    }

    async editarProduto(req, res) {

        const { id } = req.params;

        const produtoBody = {
            id: id,
            imagem: req.body.imagem,
            titulo: req.body.titulo,
            preco: req.body.preco,
            descricao: req.body.descricao,
            produtor: req.body.produtor
        }

        const categoriasBody = {
            ids: req.body.categorias
        }

        await ProdutoDAO.editarProduto(produtoBody, categoriasBody);

        return res.redirect('/');

    } 

    async deletarProduto(req, res) {

        const { id } = req.params;

        await ProdutoDAO.deletarProduto(id);

        return res.redirect('/');
        
    }
}

module.exports = ProdutosController;