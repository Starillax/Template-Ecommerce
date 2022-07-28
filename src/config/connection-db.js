const { Client } = require('pg')

const dbcon = new Client({
    connectionString: 'postgres://yleaokauwcudek:cc6cb7007d6093aa8fdacfbe050f7ff0a1ff5aeb908116a5129d79b544ef2d16@ec2-54-152-28-9.compute-1.amazonaws.com:5432/d4eirnjt5gjnd8',
    ssl: {
        rejectUnauthorized: false
    }
});

dbcon.connect(err => {
    if (err) {
        console.log("ERRO!!! NÃO FOI POSSÍVEL SE CONECTAR AO BANCO");
        console.log( { err });
    } else {
        console.log("CONEXÃO COM O BANCO BEM SUCEDIDADA");
    }
});

module.exports = {
    dbcon
}