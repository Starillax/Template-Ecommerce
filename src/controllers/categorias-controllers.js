const { dbcon } = require('../config/connection-db');
const { Categoria, CategoriaDAO } = require('../models/categoria');

class CategoriasController {

    async mostrarListaCategorias(req, res) {
        
        const result = await CategoriaDAO.todasAsCategorias();

        return res.render('categoria_lista', {user : req.session.user, categorias: result});

    }

    async mostrarInsert(req, res) {
        return res.render('categoria_insert', {user : req.session.user});
    }

    async inserir(req, res) {
        
        const categoriaBody = {
            nome: req.body.nome
        }
        
        const categoria = new Categoria(null, categoriaBody.nome);
        await CategoriaDAO.inserirCategoria(categoria);

        return res.redirect('/');

    }

    async deletar(req, res) {

        const id = req.params;

        await CategoriaDAO.deletarCategoria(id);

        return res.redirect('/');
        
    }
}

module.exports = CategoriasController;