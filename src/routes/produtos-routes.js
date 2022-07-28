const { Router } = require('express');
const ProdutosController = require('../controllers/produtos-controllers');

const routes = Router();

const produtosController = new ProdutosController();

routes.get('/', produtosController.mostrarListaProdutos);

routes.get('/insert', produtosController.mostrarInsert);

routes.post('/inserir', produtosController.inserir);

routes.get('/:id', produtosController.mostrarPagProduto);

routes.get('/:id/edit', produtosController.mostrarEditProduto);

routes.post('/:id/editar', produtosController.editarProduto);

routes.get('/:id/delete', produtosController.deletarProduto);

module.exports = routes; 