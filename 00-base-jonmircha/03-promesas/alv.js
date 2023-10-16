"use strict";

const { error } = require("console");
const { reject } = require("q");

let fs = require("fs"),
  file = "assets/nombres.txt",
  newFile = "assets/alv1.txt",
  promise = new Promise((resolve, reject) => {
    fs.access(file, fs.F_OK, (err) => {
      return err ? reject(new Error("El archivo no existe")) : resolve(true);
    });
  });

promise
  .then((resolved, rejected) => {
    console.log("El archivo existe");
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        return err
          ? reject(new Error("No se pudo leer el archivo"))
          : resolve(data);
      });
    });
  })
  .then((resolved, rejected) => {
    console.log("El archivo se pudo leer correctamente");

    return new Promise((resolve, reject) => {
      fs.writeFile(newFile, resolved, (err) => {
        return err
          ? reject(new Error("No se pudo crear correctamente el archivo"))
          : resolve("El archivo se copio exitosamente");
      });
    });
  })
  .then((resolved, rejected) => console.log(resolved))
  .catch((err) => {
    console.log(err.message);
  });
