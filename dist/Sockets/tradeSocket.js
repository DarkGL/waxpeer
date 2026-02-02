import https from 'node:https';
import WebSocket from 'ws';
import { TypedEmitter } from 'tiny-typed-emitter';
const readyStatesMap = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
};
const pingPayload = JSON.stringify({ name: 'ping' });
export class TradeWebsocket extends TypedEmitter {
    apiKey;
    steamid;
    tradelink;
    localAddress;
    ws = null;
    tries = 0;
    int = null;
    lastPong = Date.now();
    connectionId = 0;
    constructor(apiKey, steamid, tradelink, localAddress) {
        super();
        this.apiKey = apiKey;
        this.steamid = steamid;
        this.tradelink = tradelink;
        this.localAddress = localAddress;
        this.connectWss();
    }
    async connectWss() {
        this.connectionId++;
        const currentId = this.connectionId;
        if (this.ws && this.ws.readyState !== readyStatesMap.CLOSED) {
            this.ws.terminate();
        }
        const httpsAgent = new https.Agent({
            keepAlive: true,
            ...(this.localAddress ? { localAddress: this.localAddress } : {}),
        });
        this.ws = new WebSocket('wss://wssex.waxpeer.com', {
            localAddress: this.localAddress,
            agent: httpsAgent,
        });
        this.ws.on('error', (e) => {
            console.log('TradeWebsocket error', this.steamid, e);
            this.ws?.terminate();
        });
        this.ws.on('close', (e) => {
            if (this.int) {
                clearInterval(this.int);
                this.int = null;
            }
            if (currentId !== this.connectionId) {
                return;
            }
            this.emit('disconnected', `close code: ${e}`);
            this.tries += 1;
            const delay = Math.min(this.tries * 1000, 30000);
            console.log('TradeWebsocket closed', this.steamid, 'reconnecting in', delay);
            setTimeout(() => {
                if (this.steamid && this.apiKey) {
                    this.connectWss();
                }
            }, delay);
        });
        this.ws.on('open', () => {
            console.log('TradeWebsocket opened', this.steamid);
            this.tries = 0;
            this.lastPong = Date.now();
            if (!this.ws) {
                return;
            }
            if (!this.steamid) {
                this.ws.close();
                return;
            }
            if (this.int) {
                clearInterval(this.int);
                this.int = null;
            }
            this.ws.send(JSON.stringify({
                name: 'auth',
                steamid: this.steamid,
                steamApiKey: this.apiKey,
                apiKey: this.apiKey,
                tradeurl: this.tradelink,
                identity_secret: true,
                source: 'custom',
            }));
            this.ws.send(JSON.stringify({
                source: 'custom',
                identity_secret: true,
            }));
            this.ws.send(pingPayload);
            this.int = setInterval(() => {
                if (Date.now() - this.lastPong > 60000) {
                    console.log('TradeWebsocket no pong received, reconnecting', this.steamid);
                    this.ws?.terminate();
                    return;
                }
                if (this.ws && this.ws.readyState === readyStatesMap.OPEN)
                    this.ws.send(pingPayload);
            }, 25000);
            this.emit('connected');
        });
        this.ws.on('message', (e) => {
            try {
                const msg = JSON.parse(e.toString());
                switch (msg.name) {
                    case 'pong':
                        this.lastPong = Date.now();
                        return;
                    case 'send-trade':
                        this.emit('send-trade', msg.data);
                        break;
                    case 'cancelTrade':
                        this.emit('cancelTrade', msg.data);
                        break;
                    case 'accept_withdraw':
                        this.emit('accept_withdraw', msg.data);
                        break;
                    case 'user_change':
                        this.emit('user_change', msg.data);
                        break;
                    default:
                        break;
                }
            }
            catch {
                console.error('TradeWebsocket error', e);
            }
        });
    }
}
//# sourceMappingURL=tradeSocket.js.map