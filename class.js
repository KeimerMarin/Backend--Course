const fs = require("fs");

class Contenedor {
    constructor() { }
    async save(message) {
        try {
            const msj = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
            await fs.promises.appendFile(`./chat.txt`, msj);
            console.log("Mensaje guardado correctamente");
        } catch (error) {
            console.log(`Error al guardar el mensaje: ${error}`);
        }
    }
    
    async getAll() {
        let listadoMsg = JSON.parse(
            await fs.promises.readFile(`./${this.archivo}.txt`, "utf-8")
        );
        console.log("Listado de mensajes: ", listadoMsg);
        return listadoMsg;
    }
}

module.exports = Contenedor;
