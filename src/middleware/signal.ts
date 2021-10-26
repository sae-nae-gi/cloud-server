import AppSocket, { MessageAction } from "./socket";

const signalType = {
  serverSignal: "@server/signalChannel",
  clientSignal: "@client/signalChannel",
}

export class RTCSignal implements Signal {
  private socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket;
  }

  answer() {
    this.socket.send({ type: signalType.clientSignal, payload: null });
  }
}


export interface Signal {
  answer: () => void;
}