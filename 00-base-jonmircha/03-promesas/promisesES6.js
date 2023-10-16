"use strict";

let fs = require("fs"),
  file = "assets/nombres.txt",
  newFile = "assets/nombres-promises-es6.txt",
  promise = new Promise((resolve, reject) => {
    fs.access(file, fs.F_OK, (err) => {
      return err ? reject(new Error("El archivo no existe")) : resolve(true);
    });
  });

promise
  .then((resolved, rejected) => {
    console.log("El archivo existe");

    return new Promise(function (resolve, reject) {
      fs.readFile(file, (err, data) => {
        // console.log(data);
        return err
          ? reject(new Error("El archivo no se pudo leer"))
          : resolve(data);
      });
    });
  })
  .then((resolved, rejected) => {
    console.log("El archivo se ha leido exitosamente ");
    // console.log(resolve);
    return new Promise(function (resolve, reject) {
      //resolve va a ser la data debido a al anterior then
      fs.writeFile(newFile, resolved, (err) => {
        return err
          ? reject(new Error("El archivo no se pudo copiar"))
          : resolve("El archivo se copio exitosamente");
      });
    });
  })
  .then(
    (resolved, rejected) => console.log(resolved)
    // let $p = document.createElement("p");

    // $p.appendChild(resolve);

    // let http = require("http").createServer(web);
    // function web(req, res) {
    //   res.writeHead({ "Content-type": "text/html" });
    //   res.end($p);
    // }
    // console.log("Para mas informacion consulta: http://localhost:4000");
    // http.listen(4000);
  )
  .catch((err) => console.log(err.message));
