/*
https://nodejs.org/api/process.html#process_process_studin
https://nodejs.org/api/process.html#process_process_studout
*/

'use strict'

var stdin = process.stdin,
stdout = process.stdout, //Estos metodos nos permitiran la interaccion del usuario con la entrada de comandos
person = {
    name: null,
    age: 0,
    music: null,
    final: null,
}


function si(final){
    person.final = final
    
    stdout.write('a')
    process.exit() 
}

function saveMusic (music){
    person.music = music
    
    var question = `${person.music} ${person.name}?, Joder que buenos gustos`
    
    quiz(question, si)

}
function saveAge(age){  
    person.age = age

    if (person.age >= 18){
        stdout.write(person.name + ' es mayor de edad, tiene ' + person.age + ' anios\n')
    }
    else{
        stdout.write(person.name + ' es menor de edad, tiene ' + person.age + ' anios\n')
    }
    //process.exit() //Este saldra de la conversacion de nuestra terminal y nosotros xd
   //Volvemos a preguntar
    var question = 'Vale, hablemos sobre ti ' + person.name + ' , cual es tu genero de musica favorito?' 
    setTimeout(() => {
        quiz(question, saveMusic)
    }, 2000)
}

function saveName(name){  
    person.name = name //Le asignamos valor a la variable vacia

    //Vuelvo a preguntar
    var question = 'Hola ' + person.name + ' Cuantos anios tienes?'

    quiz(question, saveAge)
}

function quiz(question, callback){  
    //Lo haremos con resume de stdin (que es lo primero que esta ejecutando nuestro codigo), resume nos permite leer lo que el usuario escriba en la terminal de comandos
    stdin.resume()
    stdout.write(question + ': ')  //La terminal de comandos va a escribir

    stdin.once('data', function (res){ //Va a ejecutar la funcion asincrona una sola vez (por el metodo once)
        callback(res.toString().trim()) //Y la callback tiene la funcion callback xd
    }) //Esta funcion va a esperar una respuesta, pues ejecutamos callback y pues esa va a ser saveName; pues ejecuta saveName y como respuesta lo convierte como cadena de texto (la funcion de la funcion quiz) y pues ejecutamos un metodo trim que le quita las comillas de texto a una cadena de texto

}

stdin.setEncoding('utf8') //Hara que entre a la terminal de comandos y codifique en utf8
quiz('Como te llamas?', saveName) //Llamada a la funcion quiz, primero la pregunta, y el callback (funcion) (esto es el modelo asincrono de JS)

