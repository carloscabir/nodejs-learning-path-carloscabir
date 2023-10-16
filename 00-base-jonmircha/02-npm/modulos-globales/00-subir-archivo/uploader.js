"use strict";

// const formidable = require("formidable");

let http = require("http").createServer(serverUpload),
  util = require("util"),
  formidable = require("formidable"),
  fse = require("fs-extra");

function serverUpload(req, res) {
  if (req.method.toLowerCase() == "get" && req.url == "/") {
    let $form = `
    <h1>Hola Node.js</h1>
    <form action="/upload" enctype="multipart/form-data" method="post">
    <div>
    <input type="file" name="upload" placeholder="Hola" required title="Necesitas Elegir un Archivo">
    </div>
    <div>
    <input type="submit" value="Subir Archivo">
    </div>
    </form>`;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end($form);
  }
  if (req.method.toLowerCase() == "post" && req.url == "/upload") {
    let form = formidable({ multiples: true });

    form.parse(req, function (err, fields, files) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `
          <h1>Archivos Recibidos</h1>
          <a href="/">Regresar</a>
          <br><br>
           <code>${util.inspect({ files: files })}</code>
            `
      );
      res.end();
    });
    form.on("progress", function (bytesReceived, bytesExpected) {
      let percentCompleted = (bytesReceived / bytesExpected) * 100;
      console.log(percentCompleted.toFixed(2));
    });
    form.on("error", function (err) {
      console.log(err);
    });
    form.on("end", function (fields, files) {
      //Ubicacion temporal del arcihvo que se sube
      let tempPath = this.openedFiles[0].path,
        // El nombre del archivo subido (por defecto)
        fileName = this.openedFiles[0].name,
        // Nueva Ubicacion
        newLocation = "upload/" + fileName;

      fse.copy(tempPath, newLocation, function (err) {
        return err
          ? console.log(err)
          : console.log("El archivo se envio exitosamente :D");
      });
    });

    return;
  }
}

http.listen(3000);

console.log("Server is running in http://localhost:3000/");

//opened files not found and I don't know XDDD
