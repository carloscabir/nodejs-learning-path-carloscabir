//Single Tread

'use strict'

process.argv[2] = 'estamos aprendiendo Node.js' //tambien podemos crear nuevos argv solo definiendoles su valor (recuerda que hay 'solo' hay dos xd)
process.argv[3] = 19
process.argv[3] = 1
process.argv[4] = null
process.argv[5] = false


function singleThread () { //El single thread consiste en el metodo process, que veremos en esta clase
 console.log('----------------------------------------')
 console.log('         EL PROCESO DE NODE.JS          ')
 console.log('Id del proceso ______' + process.pid)
 console.log('Titulo ______________' + process.title)
 console.log('Directorio de Node___' + process.execPath)
 /* console.log('Directorio Actual____' + process.cdw()) */
 console.log('Version de Node______' + process.version)
 console.log('Versiones Dependencias' + process.versions)
 console.log('Plataforma (S.O)______' + process.plataform)
 console.log('Arquitectura (S.O)____' + process.arch)
 console.log('Tiempo activo de Node__' + process.uptime())
 console.log('Argumentos del proceso_' + process.argv)
 console.log('-----------------------------------------')
 
 /*  
  console.log(
      process.argv[0], //Ruta donde estamos ejecutando Node
      process.argv[1] //Documento donde estamos ejecutando Node
      
      )
  */}
 for (let key in process.argv) {
console.log(process.argv[key])
 }

singleThread()