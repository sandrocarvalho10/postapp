const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Category')
require('../models/Posts')
const Category = mongoose.model('categories')
const Posts = mongoose.model('posts')

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/categorias', (req, res) => {
  Category.find().lean().sort({ date: 'desc' })
    .then((category) => {
      res.render('admin/category', { category: category })
    })
    .catch((err) => {
      req.flash('error_msg', 'Houve um erro ao listar as categorias')
      res.redirect('/admin')
    })

})

router.get('/categorias/add', (req, res) => {
  res.render('admin/addcategory')
})

router.post('/categorias/nova', (req, res) => {

  var errors = []

  if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
    errors.push({ text: 'Nome Inválido' })
  }

  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    errors.push({ text: 'Slug inválido' })
  }

  if (req.body.name.length < 2) {
    errors.push({ text: 'Nome da categoria muito pequeno.' })
  }

  if (errors.length > 0) {
    res.render('admin/addcategory', { errors: errors })
  } else {
    const newCategory = {
      name: req.body.name,
      slug: req.body.slug
    }

    new Category(newCategory).save()
      .then(() => {
        req.flash('success_msg', 'Categoria criada com sucesso')
        res.redirect('/admin/categorias')
      })
      .catch((err) => {
        req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
        res.redirect('/admin')
      })
  }
})


router.get('/categorias/edit/:id', (req, res) => {
  Category.findOne({ _id: req.params.id }).lean()
    .then((category) => {
      res.render('admin/editcategory', { category: category })
    }).catch((err) => {
      req.flash('error_msg', 'Esta categoria não existe!')
      res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', (req, res) => {
  Category.findOne({ _id: req.body.id })
    .then((category) => {
      category.name = req.body.name
      category.slug = req.body.slug

      category.save()
        .then(() => {
          req.flash('success_msg', 'Categoria editada com sucesso!')
          res.redirect('/admin/categorias')
        })
        .catch((err) => {
          req.flash('error_msg', 'Houve um erro ao salvar a categoria!')
          res.redirect('/admin/categorias')
        })

    })
    .catch((err) => {
      req.flash('error_msg', 'Houve um erro ao editar a categoria!')
      res.redirect('/admin/categorias')
    })
})


router.post('/categorias/deletar', (req, res) => {
  Category.remove({ _id: req.body.id })
    .then(() => {
      req.flash('success_msg', 'Categoria deletada com sucesso!')
      res.redirect('/admin/categorias')
    })
    .catch((err) => {
      req.flash('error_msg', 'Houve um erro ao deletar a categoria!')
      res.redirect('/admin/categorias')
    })
})


router.get('/postagens', (req, res) => {
  res.render('admin/post')
})

router.get('/postagens/add', (req, res) => {
  Category.find().lean()
  .then((category) => {
    res.render('admin/addpost', { category: category})
  })
  .catch(() => {
    req.flash('error_msg', 'Houve um erro ao carregar o formulário.')
    res.redirect('/admin')
  })
})




module.exports = router;