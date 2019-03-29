import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  //建立连接  共有属性
  private socket = null;

  constructor() { }

  setSocket(url) {
    this.socket = io(`http://39.96.48.75:3001?roomid=${url}`);
  }

  getSocket() {
    return this.socket;
  }
}
