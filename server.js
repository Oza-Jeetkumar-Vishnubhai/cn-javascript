const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("ping", (data) => {
    console.log(data);
    socket.emit("pong", "pongMessage");
  });
  socket.on("reqFile", (fileName) => {
    var fileContent = "";
    fs.readFile(`${fileName}`, (err, data) => {
      if (err) {
        socket.emit("error", "HTTP/1.1 404 not found");
      } else {
        fileContent = data.toString();
        socket.emit("resFile", fileContent);
      }
    });
    // console.log(fileContent)
  });
});

app.get("/todos/:id", async (req, res) => {
  const host =
    req.header("x-forwarded-host") || "https://jsonplaceholder.typicode.com";
  const path = req.path;

  const proxyResObj = await fetch(host + path);

  if (!proxyResObj.ok) return res.status(404).send({ message: "not-found" });

  const proxyRes = await proxyResObj.json();

  res.send(proxyRes);
});

httpServer.listen(8000);
