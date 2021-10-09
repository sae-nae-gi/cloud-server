import * as http from "http";
import * as express from "express";
import * as socketIo from "socket.io";

class App implements AppInterface{
  application: express.Application;
  server?: http.Server;
  port: number;
  io?: socketIo.Server;

  constructor(port = 3001) {
    this.application = express(); 
    this.port = port; 
  }

  listen(port: number,callback?: () => void) {
    this.server = this.application.listen(
      port,
      callback,
    );

    this.io = new socketIo.Server(this.server,{
      path: "/socket.connect",
    });
    this.connectMiddleware();
    return this.server;
  }
  
  connectMiddleware() {
    if(this.io){
      this.io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarrded-for'] || req.connection.remoteAddress;
        console.warn("연결: ", socket.id, "ip: ", ip);
        socket.on("disconnect", () => {
          console.warn("연결해제:", socket.id)
        })
      })
    }
  }
}

interface AppInterface{
  application: express.Application;
  port: number;
  listen: (port: number, callback?: () => void) => void;
}

const app = new App();

app.listen(3001,() => {
  console.warn("server running on port 3001");
})