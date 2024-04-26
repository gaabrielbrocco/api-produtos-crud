const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    nome: String,
    marca: String,
    categoria: String,
    descricao: String,
    preco: String,
    qtdEstoque: Number,

})

module.exports = Product