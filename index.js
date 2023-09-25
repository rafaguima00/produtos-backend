const route = require("./routes")
const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use("/", route)

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))