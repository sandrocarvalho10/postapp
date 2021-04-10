//Carregando Modulos

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')


// Configurações
// Sessão
app.use(session({
  secret: 'cursonodepostapp',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())

//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')

  next();
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', "handlebars")

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:test123@cluster0.vcsz6.mongodb.net/postapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado ao mongo')
  })
  .catch((err) => {
    console.log("Erro ao se conectar" + err)
  })


//Middleware
app.use((req, res, next) => {
  console.log('Olá eu sou um middleware!!!')

  next();
})


//Rotas
app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

