"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeWebsocket = void 0;
const events_1 = require("events");
const ws_1 = __importDefault(require("ws"));
class TradeWebsocket extends events_1.EventEmitter {
    constructor(steamApiKey, apiKey, steamid, tradelink, localAddress) {
        super();
        this.localAddress = localAddress;
        this.w = {
            ws: null,
            tries: 0,
            int: null,
        };
        this.socketOpen = false;
        this.steamApiKey = steamApiKey;
        this.apiKey = apiKey;
        this.steamid = steamid;
        this.tradelink = tradelink;
        this.connectWss();
    }
    connectWss() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.w && this.w.ws)
                this.w.ws.close();
            let t = (this.w.tries + 1) * 1e3;
            this.w.ws = new ws_1.default('wss://wssex.waxpeer.com', undefined, { localAddress: this.localAddress });
            this.w.ws.on('error', (e) => {
                console.log('TradeWebsocket error', e);
                this.w.ws.close();
            });
            this.w.ws.on('close', (e) => {
                this.w.tries += 1;
                this.socketOpen = false;
                console.log(`TradeWebsocket closed`, this.steamid);
                if (this.steamid && this.apiKey) {
                    setTimeout(function () {
                        return this.connectWss(this.steamid, this.apiKey, this.tradelink);
                    }.bind(this), t);
                }
            });
            this.w.ws.on('open', (e) => {
                this.socketOpen = true;
                console.log(`TradeWebsocket opened`, this.steamid);
                if (this.steamid) {
                    clearInterval(this.w.int);
                    this.w.ws.send(JSON.stringify({
                        name: 'auth',
                        steamid: this.steamid,
                        steamApiKey: this.steamApiKey,
                        apiKey: this.apiKey,
                        tradeurl: this.tradelink,
                        identity_secret: true,
                        identify_secret: true,
                        source: 'custom',
                    }));
                    this.w.ws.send(JSON.stringify({
                        source: 'custom',
                        identity_secret: true,
                    }));
                    this.w.ws.send(JSON.stringify({
                        source: 'custom',
                        identify_secret: true,
                    }));
                    this.w.int = setInterval(() => {
                        if (this.w.ws) {
                            this.w.ws.send(JSON.stringify({ name: 'ping' }));
                        }
                    }, 25000);
                }
                else {
                    this.w.ws.close();
                }
            });
            this.w.ws.on('message', (e) => {
                try {
                    let jMsg = JSON.parse(e);
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
                }
                catch (_a) { }
            });
        });
    }
}
exports.TradeWebsocket = TradeWebsocket;
//# sourceMappingURL=tradeSocket.js.map