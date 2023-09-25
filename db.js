require("dotenv").config()

const conectar = async () => {
    if(global.conexao && global.conexao.state != 'disconnected') return global.conexao

    const mysql = require("mysql2/promise")
    const conn = await mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
    console.log('Conexão criada')
    global.conexao = conn
    return conn
}

const allProducts = async () => {
    const con = await conectar()
    const [linhas] = await con.query(`
        SELECT 
            id_produto as id,
            nome_produto as nome,
            preco_produto as preco
        FROM produtos;
    `)
    return await linhas
}

const insertProducts = async (produto) => {
    const con = await conectar()
    const sql = "INSERT INTO produtos (nome_produto, preco_produto) values (?,?);"
    const valores = [produto.nome, produto.preco]
    await con.query(sql, valores)
}

const updateProducts = async (id, produto) => {
    const con = await conectar()
    const sql = "UPDATE produtos SET nome_produto = ?, preco_produto = ? WHERE id_produto = ?;"
    const valores = [produto.nome, produto.preco, id]
    await con.query(sql, valores)
}

const deleteProducts = async (id) => {
    const con = await conectar()
    const sql = "DELETE FROM produtos WHERE id_produto = ?;"
    const valores = [id]
    await con.query(sql, valores)
}

module.exports = { allProducts, insertProducts, updateProducts, deleteProducts }