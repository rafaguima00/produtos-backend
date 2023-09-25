const express = require("express")
const routes = express.Router()
const controller = require("./controller/produtosController")

routes.get("/", controller.getAllProducts)
routes.get("/:nomeproduto", controller.getAllProductsByName)
routes.post("/", controller.postProduct)
routes.put("/:id", controller.putProduct)
routes.delete("/:id", controller.deleteProduct)

module.exports = routes