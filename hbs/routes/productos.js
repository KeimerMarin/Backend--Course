const {Router} = require('express');
const router = Router();
const productos = [{
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

// Muestra todos los productos
router.get('/', (req, res) => {    
    try{
        res.render('listProduct', {productos});
    }catch(error){
        console.log('Producto no encontrado: ',error)
    }
})

//Agrega nuevos productos
router.post('/', (req, res) => {
try {
    const {title, price, thumbnail} = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({id, title, price,thumbnail});
    res.redirect('/')
}catch(error) {res.sendStatus(500)}
})

module.exports = router