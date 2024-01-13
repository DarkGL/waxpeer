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
exports.WebsiteWebsocket = void 0;
const https_1 = __importDefault(require("https"));
const events_1 = __importDefault(require("events"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
class WebsiteWebsocket extends events_1.default {
    constructor(apiKey, subEvents = [], localAddress) {
        super();
        this.apiKey = apiKey;
        this.subEvents = subEvents;
        this.localAddress = localAddress;
        this.connectWss();
    }
    connectWss() {
        return __awaiter(this, void 0, void 0, function* () {
            const httpsAgent = new https_1.default.Agent(Object.assign({ keepAlive: true }, (this.localAddress ? { localAddress: this.localAddress } : {})));
            const socket = (0, socket_io_client_1.default)('wss://waxpeer.com', Object.assign({ transports: ['websocket'], path: '/socket.io/', autoConnect: true, extraHeaders: {
                    authorization: this.apiKey,
                }, agent: httpsAgent, rejectUnauthorized: false }, (this.localAddress ? { localAddress: this.localAddress } : {})));
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
        });
    }
}
exports.WebsiteWebsocket = WebsiteWebsocket;
//# sourceMappingURL=websiteSocket.js.map