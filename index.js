class Usuario{
    constructor(nombreUsuario, apellidoUsuario, mascota, libros){
        this.nombreUsuario = nombreUsuario
        this.apellidoUsuario = apellidoUsuario
        this.mascota= [];
        this.libros = []
        
    }
    getFullName ()  {
        return `${this.nombreUsuario} ${this.apellidoUsuario}`     
    }   
    addMascota () { 
        this.mascota.push('perro', 'gato', 'loro')

    }
    countMascota () {
        return `${this.mascota.length}`  
    }
    addBook () {
        this.libros.push({nombre: 'EL principe azul', autor: 'Desconocido'}, {nombre: 'el principe rojo', autor: 'Sin Nombre'})
    }
    getBookNames () {
        return this.libros.map(item => item.nombre);
    }
}

const persona1 = new Usuario("Keimer", "Marin")

console.log(persona1)
console.log (persona1.getFullName())
console.log(persona1.addMascota())
console.log(persona1.countMascota())
console.log(persona1.addBook())
console.log(persona1) 
console.log(persona1.getBookNames())