import * as http from "http";
import * as socketIo from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type MessageType = "@sendMessage"
  | "@joinRoom" 
  | "@leaveRoom";

interface MessageAction {
  type: MessageType;
  payload: string;
}

class RoomStore {
  private roomHash: Record<string,string[]> = {};

  removeUser(roomId: string, userId: string){
    if(this.roomHash[roomId]) {
      this.roomHash[roomId] = this.roomHash[roomId].filter(id => id !==userId);

      return this.getRoomUser(roomId);
    }
  }

  addUser(roomId: string, userId: string) {
    if(!this.roomHash[roomId]){
      this.roomHash[roomId] = [];
    }
    if(this.roomHash[roomId].indexOf(userId) === -1){
      this.roomHash[roomId].push(userId);
    }
    return this.getRoomUser(roomId);
  }

  getRoomUser(roomId: string){
    return this.roomHash[roomId];
  }

  getRoomUserCount(roomId: string): number | null {
    return this.roomHash[roomId] ? this.roomHash[roomId].length : null;
  }
}

class AppSocket {
  private io?: socketIo.Server;
  private url: string;
  private roomStore: RoomStore;

  constructor(url: string) {
    this.url = url;
    this.roomStore = new RoomStore();
  }

  initConfig(server: http.Server) {
    this.io = new socketIo.Server(
      server,
      {
        path: this.url
      },
    )
    
  }

  get socket(){
    return this.io;
  }

  onConnect(cb: (socket: socketIo.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => void){
    if(this.io){
      this.io.on("connection", cb);
    }
  }

  emit(
    socket: socketIo.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
    action: MessageAction,
  ) {
    if(socket){
      socket.emit(action.type, action.payload);      
    }
  }

  onListen(
    socket: socketIo.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
    type: MessageAction["type"] | string,
    cb: (message: any) => void,
  ){
    socket.on(type, cb);
  }

  joinRoom(
    socket: socketIo.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
    roomId: string, 
    userId: string
  ) {
    socket.join(roomId);
    this.roomStore.addUser(roomId,userId);
  }

  leaveRoom(
    socket: socketIo.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
    roomId: string, 
    userId: string,
  ){
    socket.leave(roomId);
    this.roomStore.removeUser(roomId,userId);
  }

  getRoomUser(roomId: string) {
    return this.roomStore.getRoomUser(roomId);
  }
}

export default AppSocket;