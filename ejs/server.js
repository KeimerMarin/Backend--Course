const express = require('express')
const app = express()
const puerto = 8080
const rutas = require('./routes/index')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'style')))

app.set('views', path.join(__dirname,  './views'))
app.set('view engine', 'ejs')

app.use('/', rutas)


app.listen(puerto, (error) => {
    if(error){
        console.log(`Se produjo un error al iniciar el servidor ${error}`)
    } else {
        console.log(`El servidor se inicio en el puerto ${puerto}`)
    }
})