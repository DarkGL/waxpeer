import https from 'node:https';
import WebSocket from 'ws';
import { TypedEmitter } from 'tiny-typed-emitter';
const readyStatesMap = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
};
export class TradeWebsocket extends TypedEmitter {
    apiKey;
    steamid;
    tradelink;
    localAddress;
    ws = null;
    tries = 0;
    int = null;
    constructor(apiKey, steamid, tradelink, localAddress) {
        super();
        this.apiKey = apiKey;
        this.steamid = steamid;
        this.tradelink = tradelink;
        this.localAddress = localAddress;
        this.connectWss();
    }
    async connectWss() {
        if (this.ws && this.ws.readyState !== readyStatesMap.CLOSED)
            this.ws.terminate();
        const t = (this.tries + 1) * 1e3;
        const httpsAgent = new https.Agent({
            keepAlive: true,
            ...(this.localAddress ? { localAddress: this.localAddress } : {}),
        });
        this.ws = new WebSocket('wss://wssex.waxpeer.com', {
            localAddress: this.localAddress,
            agent: httpsAgent,
        });
        this.ws.on('error', (e) => {
            console.log('TradeWebsocket error', e);
        });
        this.ws.on('close', (e) => {
            this.tries += 1;
            console.log('TradeWebsocket closed', this.steamid);
            setTimeout(() => {
                if (this.steamid && this.apiKey && this.ws?.readyState !== readyStatesMap.OPEN) {
                    return this.connectWss();
                }
            }, t);
        });
        this.ws.on('open', () => {
            console.log('TradeWebsocket opened', this.steamid);
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
            this.int = setInterval(() => {
                if (this.ws && this.ws.readyState === readyStatesMap.OPEN)
                    this.ws.send(JSON.stringify({ name: 'ping' }));
            }, 25000);
        });
        this.ws.on('message', (e) => {
            try {
                const msg = JSON.parse(e);
                switch (msg.name) {
                    case 'pong':
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