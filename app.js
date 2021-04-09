//Carregando Modulos

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')


// Configurações
  //Body Parser
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  //handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', "handlebars")

  //Public
  app.use(express.static(path.join(__dirname, 'public')))

  //Mongoose
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb+srv://root:test123@cluster0.vcsz6.mongodb.net/postapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado ao mongo')
  })
  .catch((err) => {
    console.log("Erro ao se conectar" + err)
  })


//Rotas
  app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

