//https://es.wikipedia.org/wiki/Observer_(patr%C3%B3n_de_dise%C3$B1o)

'use strict'

var EventEmitter = require('events').EventEmitter,
    pub = new EventEmitter()   //Aquí requerimos un evento y lo asignamos a una variable como tal, y con pub asignamos cada vez un nuevo evento
    
 pub
    .on('myevent', function (message) {
     console.log(message)   //Y un evento xd
    })

    .once('myevent', function (message) {
      console.log('Se emite una sola vez: ' + message) //Metodo once, forma de ejecucion de forma similar xd
    })    

    .emit('myevent', 'Soy un emisor de eventos (emit)' ) //Al metodo emit, recibe un evento y despues lo que va a ejecutar 
    pub.emit('myevent', 'Tu papa es gay (antes de borrar los eventos xd)') //Lo volvemos a asignar por que no se puede ejecutar de nuevo emit tras otro emit
    pub.removeAllListeners('myevent') //Remove al listeners lo usaremos para eliminar los eventos
    pub.emit('myevent', "Tu mama es gay") //No se ejecutara debido a que ya dicho evento no existe

