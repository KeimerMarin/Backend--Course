const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log(`Servidor iniciado en el puerto 8080`))
const io = new IOServer(expressServer)

const fs = require("fs");
const { Router } = require('express');
const router = Router();
const arrayMsj = []

const Contenedor = require('../class')
let chat = new Contenedor 
const products = [{
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn4.iconfinder.com/data/icons/design-29/101/squad_square_design-256.png",
    "id": 1
},
{
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/calculator-256.png",
    "id": 2
},
{
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/mother-earth-day-6/64/Planet-save-sustainability-ecology-environment-256.png",
    "id": 3
}
]

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
    console.log('El usuario', socket.id, 'se conecto correctamente')
    socket.emit('server:products', products)
    socket.on('client:product', async product => {
        products.push(product)
        io.emit('server:product', product)
})
    socket.emit('server:msgs', arrayMsj);
    socket.on('client:msg', msgInfo => {
        arrayMsj.push(msgInfo);
        chat.save(msgInfo);
        io.emit('server:msgs', arrayMsj)
    })
    socket.on('cliente:typing', typeValue => {
        socket.broadcast.emit('server:typing', typeValue)
    })
})