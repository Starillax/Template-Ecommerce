const { dbcon } = require("../config/connection-db");

class Categoria {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

// DAO = DATA ACCESS OBJECT
class CategoriaDAO {

    static async inserirCategoria(categoria, produto) {

        const sql = 'INSERT INTO categoria (nome) VALUES ($1);';
        const values = [categoria.nome];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL INSERIR A CATEGORIA');
            console.log({ error });
        }
    }

    static async todasAsCategorias() {

        const sql = 'SELECT * FROM categoria';

        const result = await dbcon.query(sql);

        const categoria = result.rows;

        return categoria;
    }

    static async deletarCategoria(categoria_id) {

        const sql = 'DELETE FROM categoria WHERE id = $1';
        const values = [categoria_id];

        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL DELETAR A CATEGORIA');
            console.log({ error });
        }

    }
}

module.exports = {
    Categoria,
    CategoriaDAO
};