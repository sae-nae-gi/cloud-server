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

    this.io = new socketIo.Server(this.server);
  }
  
}

interface AppInterface{
  application: express.Application;
  port: number;
  listen: (port: number, callback?: () => void) => void;
}

const app = new App().application;

app.listen(3001,() => {
  console.warn("server running on port 3001");
})