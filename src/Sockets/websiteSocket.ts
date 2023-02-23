import http from 'http';
import EventEmitter from 'events';
import io from 'socket.io-client';
import { WebsiteSocketSubEvents } from '../types/sockets';

export class WebsiteWebsocket extends EventEmitter {
  private apiKey: string;
  public socketOpen = false;
  public subEvents: Array<keyof typeof WebsiteSocketSubEvents> = [];
  constructor(apiKey?: string, subEvents: Array<keyof typeof WebsiteSocketSubEvents> = [], private readonly localAddress?: string) {
    super();
    this.apiKey = apiKey;
    this.connectWss();
    this.subEvents = subEvents;
  }
  async connectWss() {
    let socket = null;

    if( this.localAddress ) {
      let options = {};

      options = { localAddress: this.localAddress };

      const overrideHttpAgent = new http.Agent(options);

      socket = io('wss://waxpeer.com', {
        transports: ['websocket'],
        path: '/socket.io/',
        autoConnect: true,
        extraHeaders: {
          authorization: this.apiKey,
        },
        agent: overrideHttpAgent,
        localAddress: this.localAddress,
      });
    }
    else {
      socket = io('wss://waxpeer.com', {
        transports: ['websocket'],
        path: '/socket.io/',
        autoConnect: true,
        extraHeaders: {
          authorization: this.apiKey,
        },
      });
    }


    socket.on('connect', () => {
      this.socketOpen = true;
      this.subEvents.map((sub) => {
        socket.emit('sub', { name: sub, value: true });
      });
      console.log('WebsiteWebsocket connected');
    });
    socket.on('disconnect', () => {
      this.socketOpen = false;
      console.log('WebsiteWebsocket disconnected');
    });
    socket.on('handshake', (data) => {
      this.emit('handshake', data);
    });
    socket.on('add_item', (data) => {
      this.emit('add_item', data);
    });
    socket.on('update_item', (data) => {
      this.emit('update_item', data);
    });
    socket.on('remove', (data) => {
      this.emit('remove_item', data);
    });
    socket.on('connect_error', (err) => {
      this.socketOpen = false;
      console.log('connect_error', err);
    });
  }
}
