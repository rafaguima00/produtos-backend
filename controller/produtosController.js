const db = require("../db")

const getAllProducts = async (req, res) => {
    const selecionarProdutos = await db.allProducts()

    if(selecionarProdutos) res.status(200).send(selecionarProdutos)
}

const getAllProductsByName = async (req, res) => {
    const selecionarProdutos = await db.allProducts()
    const nomeProduto = req.params.nomeproduto.toLowerCase()

    const procurarProd = selecionarProdutos.find(
        item => item.nome.toLowerCase() == nomeProduto
    )

    if(procurarProd) {
        res.status(200).send(procurarProd)
    } else {
        res.status(404).send("Produto não encontrado")
    }
}

const postProduct = async (req, res) => {
    const insereProduto = await db.insertProducts(req.body)
    return res.status(201).json(insereProduto)
}

const putProduct = async (req, res) => {
    const idProduto = req.params.id
    await db.updateProducts(idProduto, { nome: req.body.nome, preco: req.body.preco })
    return res.status(204).json()
}

const deleteProduct = async (req, res) => {
    const idProduto = req.params.id
    await db.deleteProducts(idProduto)
    return res.status(204).json()
}

module.exports = {
    getAllProducts,
    getAllProductsByName,
    postProduct,
    putProduct,
    deleteProduct
}