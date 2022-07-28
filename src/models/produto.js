const { dbcon } = require("../config/connection-db");

class Produto {
    constructor(id, imagem, titulo, preco, descricao, produtor) {
        this.id = id;
        this.imagem = imagem;
        this.titulo = titulo;
        this.preco = preco;
        this.descricao = descricao;
        this.produtor = produtor;
    }
}

// DAO = DATA ACCESS OBJECT
class ProdutoDAO {

    static async inserirProduto(produto, categorias) {

        const sql = 'INSERT INTO produto (imagem, titulo, preco, descricao, produtor) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const values = [produto.imagem, produto.titulo, produto.preco, produto.descricao, produto.produtor];

        try {

            const result = await dbcon.query(sql, values);

            for (let i = 0; i < categorias.ids.length; i++) {
                const sql2 = 'INSERT INTO categoria_produto (produto, categoria) VALUES ($1, $2)';
                const values2 = [result.rows[0].id, categorias.ids[i]];
                await dbcon.query(sql2, values2);
            }

        } catch (error) {
            console.log('NÃO FOI POSSÍVEL INSERIR O PRODUTO');
            console.log({ error });
        }
        
    }

    static async todosOsProdutos() {

        const sql = 'SELECT * FROM produto';

        const result = await dbcon.query(sql);

        const produtos = result.rows;

        return produtos;
    }

    static async encontrarProduto(produto_id) {

        const sql = 'SELECT * FROM produto where id = $1';

        const result = await dbcon.query(sql, [produto_id]);

        const produto = result.rows[0];

        return produto;

    }

    static async encontrarCategoriasFromProduto(produto_id) {

        const sql = 'SELECT categoria.id, categoria.nome FROM categoria_produto JOIN categoria ON categoria.id = categoria_produto.categoria where categoria_produto.produto = $1';

        const result = await dbcon.query(sql, [produto_id]);

        const categorias = result.rows;

        return categorias;

    }

    static async editarProduto(produto, categorias) {

        const sql1 = 'DELETE FROM categoria_produto where produto = $1';
        
        await dbcon.query(sql1, [produto.id]);

        const sql = 'UPDATE produto SET imagem = $2, titulo = $3, preco = $4, descricao = $5, produtor = $6 WHERE id = $1;';
        const values = [produto.id, produto.imagem, produto.titulo, produto.preco, produto.descricao, produto.produtor];
        
        try {

            await dbcon.query(sql, values);

            for (let i = 0; i < categorias.ids.length; i++) {
                const sql2 = 'INSERT INTO categoria_produto (produto, categoria) VALUES ($1, $2)';
                const values2 = [produto.id, categorias.ids[i]];
                await dbcon.query(sql2, values2);
            }

        } catch (error) {
            console.log('NÃO FOI POSSÍVEL EDITAR O PRODUTO');
            console.log({ error });
        }

    }

    static async deletarProduto(produto_id) {

        const sql1 = 'DELETE FROM categoria_produto where produto = $1';
        
        await dbcon.query(sql1, [produto_id]);

        const sql = 'DELETE FROM produto where id = $1;';

        try {
            await dbcon.query(sql, [produto_id]);
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL DELETAR O PRODUTO');
            console.log({ error });
        }

    }

}

module.exports = {
    Produto,
    ProdutoDAO
};