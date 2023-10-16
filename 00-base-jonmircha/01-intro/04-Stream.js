/*
Streams
 'Chorros' de informacion que se transmiten en 'Pedazos' (Chunks) p.e cuando adjuntas un correo electronico y adjuntas a este un pdf, spues saldra una barra de carga; ese numero que vaya subiendo (de porcentaje de carga del archivo) sera un chunk, es decir un chorro de informacion 
 3 tipos: Lectura / Escritura / Duplex (Duplex significa lectura y escritura al mismo tiempo) un ejemplo de stream es HTTPServer, es decir es un chorro de eventos xd
 Instancias del EventEmitter
 Acceso asíncrono
 Es raro de crear streams directamente
 Pero muchos recursos nos ofrecen este interfaz
 Detrás de muchos mecanismos de Node.JS
           stdin/stdout
           request de HTTP
           Sockets
           Manipulacion de ficheros/Imagenes
           */
          //Ejemplo de stream Duplex

'use strict'

var fs = require('fs'),
  readStream = fs.createReadStream('assets/nombres.txt'),
  writeStream = fs.createWriteStream('assets/nombres_copia.txt')
/* 
Aqui vamos a utilizar un metodo llamado pipe, para hacer el stream
readStream.pipe(writeStream)
En la siguente clase veremos enventEmitter
readStream.on('data', function (chunk){ (chunk) mientras yo reciba datos
 console.log(
    'He leído',
    chunk.length,
    'caracteres del chunk'
 )
}) Este evento significa, mientras haya datos que voy a ejecutar?; eso que ejecutaremos va a ser otra funcion :)

 readStream.on('end', function () {
    console.log('He terminado de leer el archivo')
 }) 
 */

 readStream.pipe(writeStream)
 readStream   //el metodo pipe y on no se pueden ejecutar al mismo tiempo, mientras que on con estos metodos si se pueden ejecutar al mismo tiempo 
 .on('data', function (chunk){
    console.log(
        'He leído',
        chunk.length,
        'caracteres del chunk'
    )
   })
   .on('end', function() {
    console.log('He terminado de leer el archivo')
   })
