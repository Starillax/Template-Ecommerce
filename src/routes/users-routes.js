const { Router } = require('express');
const UsersController = require('../controllers/users-controllers');

const routes = Router();

const usersController = new UsersController();

routes.get('/cadastro', usersController.mostrarCadastro);

routes.get('/login', usersController.mostrarLogin);

routes.post('/cadastrar', usersController.cadastrar);

routes.post('/login', usersController.login);

routes.get('/logout', usersController.logout);

routes.get('/:produto_id/addCarrinho', usersController.addProdutoCarrinho);

routes.get('/:produtos_ids/comprar', usersController.comprar);

routes.get('/:email', usersController.mostrarPagUser);

routes.get('/:email/compras', usersController.mostrarComprasUser);

routes.get('/:email/edit', usersController.mostrarEditUser);

routes.post('/editar', usersController.editarUser);

routes.get('/:email/delete', usersController.deletarUser);

module.exports = routes;