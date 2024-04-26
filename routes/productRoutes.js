const router = require('express').Router()
const { application } = require('express');
const Product = require('../models/Product')

router.post("/", async (req, res) => {
    const { nome, marca, categoria, descricao, preco, qtdEstoque } = req.body;
  
    if(!nome) {
      res.status(422).json({error: 'O nome é obrigatório'})
      return
    }
  
    const product = {
      nome,
      marca,
      categoria,
      descricao,
      preco,
      qtdEstoque,
    };
  
    try {
      await Product.create(product);
  
      res.status(201).json({message: 'Produto incluído com sucesso!'})
    } catch (error) {
      res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {

    try {
        const produtos = await Product.find()
        console.log(produtos);

        res.status(200).json(produtos)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    //extrair dado da requisição pela url = req.params
    const id = req.params.id

    try {
        const produtoUn = await Product.findOne({ _id: id })

        if(!produtoUn) {
            res.status(422).json({ message: 'O produto não foi encontrado' })
            return
        }

        res.status(200).json(produtoUn)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { nome, marca, categoria, descricao, preco, qtdEstoque } = req.body;

    const product = {
        nome,
        marca,
        categoria,
        descricao,
        preco,
        qtdEstoque,
      };

    try {
        const updatedProduct = await Product.updateOne({_id: id}, product)

        if(updatedProduct.matchedCount === 0) {
            res.status(422).json({ message: 'O produto não foi encontrado' })
            return
        }

        res.status(200).json(product)

    } catch(error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const produtoUn = await Product.findOne({ _id: id })

    if(!produtoUn) {
        res.status(422).json({ message: 'O produto não foi encontrado' })
        return
    }

    try {

        await Product.deleteOne({ _id: id })

        res.status(200).json({ message: 'Produto removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router
