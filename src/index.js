const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(express.static('public'));

app.use('*', (req, res, next) => {
    next();
})

app.get('/', (req, res) => {
    res.redirect('/produtos');
});

const usersRoutes = require('./routes/users-routes');
app.use('/users', usersRoutes);

const categoriasRoutes = require('./routes/categorias-routes');
app.use('/categorias', categoriasRoutes);

const produtosRoutes = require('./routes/produtos-routes');
app.use('/produtos', produtosRoutes);

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Desculpe, página não encontrada!</h1>
        <a href="/">VOLTAR</a>
    `);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server iniciado na porta ${PORT}`)
});
