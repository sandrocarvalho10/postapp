const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Category')
const Category = mongoose.model('categories')

router.get('/', (req,res) => {
  res.render('admin/index')
})

router.get('/posts', () => {
  res.send('Pagina de Posts')
})
router.get('/categorias', (req, res) => {
  res.render('admin/category')
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/addcategory')
})

router.post('/categorias/nova', (req, res) => {
  const newCategory = {
    name: req.body.name,
    slug: req.body.slug
  }

  new Category(newCategory).save()
  .then(() => {
    console.log('Categoria salva com sucesso!!')
  })
  .catch((err) => {
    console.log('Erro ao salvar categoria!!' + err)
  })
})




module.exports = router;