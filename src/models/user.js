const { dbcon } = require("../config/connection-db");

class Usuario {
    constructor(email, username, nomecompleto, senha, tipo, endereco, numcel, cpf) {
        this.email = email;
        this.username = username;
        this.nomecompleto = nomecompleto;
        this.senha = senha;
        this.tipo = tipo;
        this.endereco = endereco;
        this.numcel = numcel;
        this.cpf = cpf;
    }
}

// DAO = DATA ACCESS OBJECT
class UsuarioDAO {

    static async cadastrarUsuario(usuario) {
          
        const sql = 'INSERT INTO usuario (email, username, nomecompleto, senha, endereco, numcel, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7);';
        const values = [usuario.email, usuario.username, usuario.nomecompleto, usuario.senha, usuario.endereco, usuario.numcel, usuario.cpf];

        console.log(values);
        
        try {
            await dbcon.query(sql, values);
            console.log('CADASTRO BEM-SUCEDIDO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL INSERIR O USUÁRIO');
            console.log({ error });
        }
    }

    static async encontrarUsuario(email) {

        const sql = 'SELECT * FROM usuario where email = $1;';

        const result = await dbcon.query(sql, [email]);
        const usuario = result.rows[0];

        return usuario;

    }

    static async encontrarComprasDoUsuario(email) {

        const sql = 'SELECT * FROM produto JOIN compra ON compra.produto = produto.id WHERE compra.usuario = $1;';
        const result = await dbcon.query(sql, [email]);
        const compras = result.rows;

        return compras;

    }

    static async editarUsuario(email, usuario) {
        const sql = 'UPDATE usuario SET username = $2, nomecompleto = $3, endereco = $4, numcel = $5, cpf = $6 WHERE email = $1;';
        const values = [email, usuario.username, usuario.nomecompleto, usuario.endereco, usuario.numcel, usuario.cpf];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL EDITAR O USUÁRIO');
            console.log({ error });
        }
    }

    static async deletarUsuario(email) {
        
        const sql = 'DELETE FROM usuario where email = $1;';

        try {
            await dbcon.query(sql, [email]);
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL DELETAR O USUÁRIO');
            console.log({ error });
        } 

    }

    static async inserirCompraDoUsuario(email, produtos_ids) {

        try {

            for (let i = 0; i < produtos_ids.length; i++) {

                const sql = 'INSERT INTO compra (produto, usuario) VALUES ($1, $2);'
                const values = [produtos_ids[i], email];
    
                await dbcon.query(sql, values);
    
            }

        } catch (error) {
            console.log('NÃO FOI POSSÍVEL INSERIR A COMPRA');
            console.log({ error });
        }

    }

}

module.exports = {
    Usuario,
    UsuarioDAO
};