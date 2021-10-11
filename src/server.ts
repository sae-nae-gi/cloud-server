import * as http from "http";
import * as express from "express";
import * as socketIo from "socket.io";
import AppSocket from "./middleware/socket";
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
    const appSocket = new AppSocket("/socket.connect");
    appSocket.initConfig(this.server);
    appSocket.onConnect((socket) => {
      console.warn("연결: ", socket.id);
      socket.on("disconnect", () => {
        console.warn("연결해제:", socket.id)
      })
      appSocket.onListen(socket, "@joinRoom", (data) => {
        const {roomId, userId} = data;
        appSocket.joinRoom(socket,roomId,userId);

        if(appSocket.socket){
          appSocket.socket.to(roomId).emit("@joinedRoom", {roomId, userId, roomUsers: appSocket.getRoomUser(roomId)});
          appSocket.onListen(socket, `@client/${roomId}`, (message) => {
            console.log(message)
            appSocket.socket!.to(roomId).emit(`@server/${roomId}`, message);
          })
        }
      });
      appSocket.onListen(socket, "@leaveRoom", (data) => {
        const {roomId, userId} = data;
        
        if(appSocket.socket){
          appSocket.leaveRoom(socket, roomId, userId);
          appSocket.socket.to(roomId).emit("@leftRoom", {roomId, userId, roomUsers: appSocket.getRoomUser(roomId)});
        }
      })
    })
    this.connectMiddleware();
    return this.server;
  }
  
  connectMiddleware() {
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