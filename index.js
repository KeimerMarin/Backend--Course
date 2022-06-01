const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.file = archivo 
  }

// Metodo Save 

  async save(objeto) {    
    let data = await fs.promises.readFile(`./${this.file}`, 'utf-8')
        if(!data) {
            let id = JSON.parse(await fs.promises.readFile('./identifier.txt', 'utf-8'))
            let maxID = Math.max(...id)
            objeto.id = maxID + 1;
            id = [...id, objeto.id]
            await fs.promises.writeFile(`./identifier.txt`, JSON.stringify(id));            
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(objeto))}

            else {
    let id = JSON.parse(await fs.promises.readFile('./identifier.txt', 'utf-8'))
    let maxID = Math.max(...id)
    objeto.id = maxID + 1;
    id = [...id, objeto.id]
    await fs.promises.writeFile(`./identifier.txt`, JSON.stringify(id))

    let productos = JSON.parse(
      await fs.promises.readFile('./products.txt', 'utf-8')
    );

    productos.push(objeto);
    await fs.promises.writeFile(`./${this.file}`, JSON.stringify(productos))
    console.log('Producto agregado con exito ID', objeto.id)
  }}

// Metodo getById

  async getById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );
    let objeto = productos.find((prod) => prod.id == id)
    console.log(objeto ? objeto : "ID no encontrado")
  }

// Metodo getAll

  async getAll() {
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );
    console.log(productos);
  }

// Metodo deleteById

  async deleteById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );
    if (productos.some((prod) => prod.id == id)) {
      let newProductos = productos.filter((prod) => prod.id != id)
      await fs.promises.writeFile(
        `./${this.file}`,
        JSON.stringify(newProductos)
      );
      console.log('producto eliminado correctamente')
    } else {
      console.log('no existe producto asociado al id')
    }
  }

//Metodo deteleAll

  async deleteAll() {
    try {
    await fs.promises.writeFile(`./${this.file}`, '[]')
    console.log('Se han eliminado todos los productos')
    }catch(error) {
        console.log(error)
    }
  }
}

const arrayProducto = new Contenedor('products.txt').save({nombre: 'productoPrueba', precio: 9990, thumbnail: 'https://www.zoominformatica.com/img-datos/AHD301A_0.jpg'})
// new Contenedor('products.txt').getById(8)
// new Contenedor('products.txt').getAll()
// new Contenedor('products.txt').deleteById(12) 
// new Contenedor('products.txt').deleteAll()
