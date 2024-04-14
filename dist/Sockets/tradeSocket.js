import https from 'node:https';
import { EventEmitter } from 'node:events';
import WebSocket from 'ws';
export class TradeWebsocket extends EventEmitter {
    apiKey;
    steamid;
    tradelink;
    localAddress;
    w = {
        ws: null,
        tries: 0,
        int: null,
    };
    readyStatesMap = {
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
    };
    constructor(apiKey, steamid, tradelink, localAddress) {
        super();
        this.apiKey = apiKey;
        this.steamid = steamid;
        this.tradelink = tradelink;
        this.localAddress = localAddress;
        this.connectWss();
    }
    async connectWss() {
        if (this.w?.ws && this.w.ws.readyState !== this.readyStatesMap.CLOSED)
            this.w.ws.terminate();
        const t = (this.w.tries + 1) * 1e3;
        const httpsAgent = new https.Agent({
            keepAlive: true,
            ...(this.localAddress ? { localAddress: this.localAddress } : {}),
        });
        this.w.ws = new WebSocket('wss://wssex.waxpeer.com', {
            localAddress: this.localAddress,
            agent: httpsAgent,
        });
        this.w.ws.on('error', (e) => {
            console.log('TradeWebsocket error', e);
        });
        this.w.ws.on('close', (e) => {
            this.w.tries += 1;
            console.log('TradeWebsocket closed', this.steamid);
            setTimeout(function () {
                if (this.steamid &&
                    this.apiKey &&
                    this.w?.ws?.readyState !== this.readyStatesMap.OPEN) {
                    return this.connectWss(this.steamid, this.apiKey, this.tradelink);
                }
            }.bind(this), t);
        });
        this.w.ws.on('open', (e) => {
            console.log('TradeWebsocket opened', this.steamid);
            if (this.steamid) {
                clearInterval(this.w.int);
                this.w.ws.send(JSON.stringify({
                    name: 'auth',
                    steamid: this.steamid,
                    steamApiKey: this.apiKey,
                    apiKey: this.apiKey,
                    tradeurl: this.tradelink,
                    identity_secret: true,
                    source: 'custom',
                }));
                this.w.ws.send(JSON.stringify({
                    source: 'custom',
                    identity_secret: true,
                }));
                this.w.int = setInterval(() => {
                    if (this.w?.ws && this.w.ws.readyState === this.readyStatesMap.OPEN)
                        this.w.ws.send(JSON.stringify({ name: 'ping' }));
                }, 25000);
            }
            else {
                this.w.ws.close();
            }
        });
        this.w.ws.on('message', (e) => {
            try {
                const jMsg = JSON.parse(e);
                if (jMsg.name === 'pong')
                    return;
                if (jMsg.name === 'send-trade') {
                    this.emit('send-trade', jMsg.data);
                }
                if (jMsg.name === 'cancelTrade') {
                    this.emit('cancelTrade', jMsg.data);
                }
                if (jMsg.name === 'accept_withdraw') {
                    this.emit('accept_withdraw', jMsg.data);
                }
                if (jMsg.name === 'user_change') {
                    this.emit('user_change', jMsg.data);
                }
            }
            catch { }
        });
    }
}
//# sourceMappingURL=tradeSocket.js.map