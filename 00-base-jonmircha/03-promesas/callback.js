"use strict";

let fs = require("fs"),
  file = "assets/nombres.txt",
  newFile = "assets/nombres-callback.txt";

//No tiene estabilidad
fs.access(file, fs.F_OK, (err) => {
  if (err) {
    console.log("El archivo no existe");
  } else {
    console.log("El archivo existe");
    fs.readFile(file, (err, data) => {
      if (err) return console.log(err);

      console.log("El archivo se ha leído exitosamente");
      fs.writeFile(newFile, data, (err) => {
        return err
          ? console.log("El archivo no se pudo copiar")
          : console.log("El archivo se ha copiado con exito ");
      });
    });
  }
});
