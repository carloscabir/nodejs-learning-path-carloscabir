/*
Buffers
  Una tira de bytes (datos binarios) //Digamos que los buffers son los iguales de los arreglos pero en el backend a deferencia del frontend
  Similar a un array de enteros
  Tamanio fijo
  Manipular datos directamente
     Sockets
     Streams (la forma en como modificamos elementos de nuestro disco duro es a traves de streams)
     Implementar protocolos complejos 
     Manipulacion de ficheros/imágenes (un caso que es la criptografia)
     Criptografía  
*/


'use strict'

var buf = new Buffer(100),
buf2 = new Buffer(26),
str = '\u00bd + \u00bc = \u00be', //La diagonal y su codigo forman una longitud, por lo tanto esta variable tnedra nueve posiciones (incluyendo espacios) cabe aclarar que esto es codigo ascii
i = 0
buf.write('abcd', 0, 4, 'ascii') 
console.log(
  buf,
  buf.toString('ascii'), //Todo esto nos lo imprimira en formato binario xd
  str, //Aqui ya nos estara imprimiendo, una suma de fracciones
  str.length,
  Buffer.byteLength(str, 'utf8') + 'bytes ocupados',
   //Buffer tiene un metodo llamano <=, y nos dara la longitud de bytes de nuestra cadena, a nivel de memoria esta cadena ocupa 12 bytes
  buf2.length + " Longitud de buf2"
   )
  //Que carajos es esto?, revisa la documentacion xdx

  for (i; i < buf2.length; i++){
    //97 en ASCII es a
    buf2[i] = i + 97 //Lo que hacemos es imprimir este formato ascci en uno entendible, y el resultado de este es el abecedarioxddd
  }
  console.log(buf2.toString('ascii'))