/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class TradeWebsocket extends EventEmitter {
    private readonly localAddress;
    private steamApiKey;
    private apiKey;
    private steamid;
    private tradelink;
    private w;
    socketOpen: boolean;
    constructor(steamApiKey: string, apiKey: string, steamid: string, tradelink: string, localAddress: string);
    connectWss(): Promise<void>;
}
