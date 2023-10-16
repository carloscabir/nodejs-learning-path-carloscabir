"use strict";

const { Module } = require("module");

//Funcion anonima autoejecutable
let Clock = (function () {
  let EventEmitter = require("events").EventEmitter,
    inherits = require("util").inherits;

  //Constructor
  let Clock = function () {
    setInterval(() => {
      //console.log("hola nena")
      this.emit("tictac");
    }, 1000);
  };

  inherits(Clock, EventEmitter);

  Clock.prototype.theTime = function () {
    let date = new Date(),
      hrsAmPm = addZero(
        date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
      ),
      hrs = addZero(date.getHours()),
      min = addZero(date.getMinutes()),
      sec = addZero(date.getSeconds()),
      ampm = hrs > 12 ? "PM" : "AM",
      msg = `${hrsAmPm}:${min}:${sec} ${ampm}`;

    function addZero(num) {
      return num < 10 ? "0" + num : num;
    }
    console.log(msg);
  };
  return Clock;
})();

module.exports = Clock;
