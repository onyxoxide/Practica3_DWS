let fs = require('fs');//sistema de ficheros
let path = require('path');//directorio
//creamos la app con nodejs
let express = require("express");
let llamada = express();

// esta funcion se ejecuta cuando lo llamas con /dni
llamada.use("/dni", function(peticion, respuesta) {
    if (peticion.query.num) {//si el parametro introducido es num
        var letras = "TRWAGMYFPDXBNJZSQVHLCKET";//Letras disponibles para dni
        var posicion = parseInt(peticion.query.num) % 23; //calculo la posicion del array letras cque se corresponde con el numero introducido
        //resto de dni / 23
        var dni = peticion.query.num + letras.charAt(posicion);//al numero introducido le agregamo la letra calculada
        respuesta.send("El DNI correspondiente es: " + dni);//mostramos el dni + letra
    } else {//si el parametro introducido no es num
        fs.readFile('instrucciones.html', function(err, dato) {
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });//añade la cabecera con codigo de respuesta 200
            respuesta.write(dato);//escribe el contenido de dato
            respuesta.end();//cierra la respuesta
        });
    }

});

// esta funcion se ejecuta cuando lo llamas con /escribir
llamada.use("/escribir", function(peticion, respuesta) {
    let mkdirSync = function(dirPath) {
        try {
            fs.mkdirSync(dirPath);//cogemos el contenido del directorio
        } catch (err) {
            if (err.code !== 'EEXIST') throw err //controlamos si hay un algún error
        }
    }
    mkdirSync(path.resolve('./Copia'))//en el directorio Copia
    fs.appendFile('./Copia/holaMundo.txt', 'Alberto Andújar Alfaro', (error) => {//creamos el fichero holaMundo.txt
        if (error) {//controlamos si hay un algún error
            throw error;
        }
        console.log("El archivo se ha creado exitosamente.")//mostramos un mensaje por consola indicando que todo ha ido bien
    });
});

// esta funcion levanta el servidor en el puerto 8083
llamada.listen(8083, '127.0.0.3', function() {
    console.log('Servidor ejecutándose en http://127.0.0.3:8083');//mostramos un mensaje por consola indicando que todo ha ido bien
});