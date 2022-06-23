const express = require('express')
const app = express()
const puerto = 8080
const rutas = require('./routes/index')
const path = require('path')
const {engine} = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'style')))


app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.use('/', rutas)


app.listen(puerto, (error) => {
    if(error){
        console.log(`Se produjo un error al iniciar el servidor ${error}`)
    } else {
        console.log(`El servidor se inicio en el puerto ${puerto}`)
    }
})