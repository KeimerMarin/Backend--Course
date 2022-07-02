const socket = io()
const productForm = document.getElementById('productForm')
const titleInput = document.getElementById('title')
const priceInput = document.getElementById('price')
const imgInput = document.getElementById('img')
const productPool = document.getElementById('productPool')
const formMsj = document.getElementById('formMsj')
const msgPool = document.getElementById('msgPool')
const mailInput = document.getElementById('mailInput')
const msjInput = document.getElementById('msjInput')
const typingPool = document.getElementById('typingPool')
const btnSend = document.getElementById('sendInput')

function sendProduct(product) {
    socket.emit('client:product', product)
}

function submitHandler (e) {
    e.preventDefault()    
    const product = { title: titleInput.value, price: priceInput.value , thumbnail: imgInput.value}
    sendProduct(product)
}


async function renderProducts(products) {
    const response = await fetch('./listProduct.hbs')
    const plantilla = await response.text()  
    products.forEach(product => {
        const template = Handlebars.compile(plantilla)
        const html = template(product)
        productPool.innerHTML += html
    })
}

async function renderProduct(producto) {
    const response = await fetch('./listProduct.hbs')
    const plantilla = await response.text()
    const template = Handlebars.compile(plantilla)
    const html = template(producto)
    productPool.innerHTML += html
    
}
productForm.addEventListener('submit', submitHandler)

// Centro de Mensajes
function sendMsg (msgInfo) {
    socket.emit('client:msg', msgInfo)
}
function renderMsgs (msgsInfo) {
    const html = msgsInfo.map(msgInfo => {
        return(`<div>
        <span class="nick">${msgInfo.username}</span>
        [<span class="dateText">${msgInfo.time}<span>]: 
        <span class="msgText">${msgInfo.message}</span>
        </div>`)
    }).join(" ");
    msgPool.innerHTML = html
}
function submitHandlerMsg (event) {
    event.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString()
    const msgInfo = { username: mailInput.value, time: fechayhora, message: msjInput.value }
    sendMsg(msgInfo)
    msjInput.value = ''
    
}

formMsj.addEventListener('submit', submitHandlerMsg);
socket.on('server:msgs', arrayMsj => {
    typingPool.innerHTML  = ''
    renderMsgs(arrayMsj)
});


function typing () {
    socket.emit('cliente:typing', mailInput.value )
}
msjInput.addEventListener('keypress', typing)

socket.on('server:typing', typeValue => {
    typingPool.innerHTML  = `<p>${typeValue} esta escribiendo un mensaje...</p>`
})
socket.on('server:products', products => {
    renderProducts(products)
})
socket.on("server:product", producto => {
    renderProduct(producto);
})