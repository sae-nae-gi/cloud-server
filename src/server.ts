import * as http from "http";
import * as express from "express";
import * as socketIo from "socket.io";
import AppSocket from "./middleware/socket";
import { RTCSignal } from "./middleware/signal";
class App implements AppInterface {
  application: express.Application;
  server?: http.Server;
  port: number;
  io?: socketIo.Server;

  constructor(port = 3001) {
    this.application = express();
    this.port = port;
  }

  listen(port: number, callback?: () => void) {
    this.server = this.application.listen(
      port,
      callback,
    );
    const appSocket = new AppSocket("/socket.connect");
    const rtcSignal = new RTCSignal(appSocket);

    appSocket.initConfig(this.server);
    appSocket.onConnect((socket) => {
      console.warn("연결: ", socket.id);
      socket.on("disconnect", () => {
        console.warn("연결해제:", socket.id)
      })

      rtcSignal.initListen(socket);

      appSocket.onListen(socket, "@client/@room/join", (data) => {
        const { roomId, userName } = data;
        appSocket.joinRoom(socket, roomId, userName);

        if (appSocket.socket) {
          appSocket.socket.to(roomId).emit("@server/@room/join", {
            roomId,
            userName,
            users: appSocket.getRoomUser(roomId),
            joinedUser: userName
          });
          appSocket.onListen(socket, `@client/@chat/send`, (message) => {
            appSocket.socket!.to(roomId).emit(`@server/@chat/send`, {
              roomId,
              userName,
              message,
            })
          })
        }
      });
      appSocket.onListen(socket, "@client/@room/leave", (data) => {
        const { roomId, userName } = data;

        if (appSocket.socket) {
          appSocket.socket.to(roomId).emit("@server/@room/leave", {
            roomId,
            userName,
            users: appSocket
              .removeUser(roomId, userName)
              .getRoomUser(roomId),
            leftUser: userName
          });
          appSocket.leaveRoom(socket, roomId);
        }
      })
    })
    this.connectMiddleware();
    return this.server;
  }

  connectMiddleware() {
  }
}

interface AppInterface {
  application: express.Application;
  port: number;
  listen: (port: number, callback?: () => void) => void;
}

const app = new App();

app.listen(3001, () => {
  console.warn("server running on port 3001");
})