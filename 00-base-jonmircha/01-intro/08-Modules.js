"use strict";

let myData = require("./assets/my-data.js"),
  Clock = require("./clock_ec6.js");

console.log(`Nombre: ${myData.name}.. 
Email: ${myData.email}..
${myData.phone}`);

//Reloj Terminal

let cucu = new Clock();

cucu.on("tictac", function () {
  cucu.theTime();
});
