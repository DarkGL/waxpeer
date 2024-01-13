import https from 'https';
import EventEmitter from 'events';
import io from 'socket.io-client';
import { WebsiteSocketSubEvents } from '../types/sockets';

export class WebsiteWebsocket extends EventEmitter {
  constructor(private readonly apiKey?: string, private readonly subEvents: Array<keyof typeof WebsiteSocketSubEvents> = [], private readonly localAddress?: string) {
    super();
    
    this.connectWss();
  }
  async connectWss() {
    const httpsAgent = new https.Agent({ keepAlive: true, ...( this.localAddress ? { localAddress: this.localAddress } : {} ) });

    const socket = io('wss://waxpeer.com', {
      transports: ['websocket'],
      path: '/socket.io/',
      autoConnect: true,
      extraHeaders: {
        authorization: this.apiKey,
      },
      agent: httpsAgent,
      rejectUnauthorized: false,
      ...( this.localAddress ? { localAddress: this.localAddress } : {} )
    });

    socket.on('connect', () => {
      this.subEvents.map((sub) => {
        socket.emit('sub', { name: sub, value: true });
      });
      console.log('WebsiteWebsocket connected');
    });
    socket.on('disconnect', () => {
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
    socket.on('updated_item', (data) => {
      this.emit('updated_item', data);
    });
    socket.on('remove', (data) => {
      this.emit('remove_item', data);
    });
    socket.on('change_user', (data) => {
      this.emit('change_user', data);
    });
    socket.on('connect_error', (err) => {
      console.log('connect_error', err);
    });
  }
}
