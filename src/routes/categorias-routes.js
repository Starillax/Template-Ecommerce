const { Router } = require('express');
const CategoriasController = require('../controllers/categorias-controllers');

const routes = Router();

const categoriasController = new CategoriasController();

routes.get('/', categoriasController.mostrarListaCategorias);

routes.get('/insert', categoriasController.mostrarInsert);

routes.post('/inserir', categoriasController.inserir);

routes.get('/:id/delete', categoriasController.deletar);

module.exports = routes;