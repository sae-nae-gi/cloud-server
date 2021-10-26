import AppSocket, { MessageAction } from "./socket";
import * as socketIo from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const signalType = {
  serverOffer: "@server/offer",
  clientOffer: "@client/offer",
  serverAnswer: "@server/answer",
  clientAnswer: "@client/answer",
  iceCandidate: "@server/newIceCandidate",
}

export class RTCSignal implements Signal {
  private socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket;

  }

  activate() {

  }

  private initListen(
    socket: socketIo.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    roomId: string,
  ) {
    this.socket.onListen(socket, signalType.clientOffer, (message) => {
      socket.to(roomId).emit(signalType.serverOffer, message);
    });
    this.socket.onListen(socket, signalType.clientAnswer, (message) => {
      socket.to(roomId).emit(signalType.serverAnswer, message);
    });
  }

  answer(message: RTCMessage["payload"]) {
    this.socket.send({ type: signalType.serverAnswer, payload: message });
  }
}

interface RTCMessage {
  type: MessageAction["type"];
  payload: {
    userName: string;
    target: string;
    sdp: string;
  }
}

export interface Signal {
  answer: (payload: RTCMessage["payload"]) => void;
}