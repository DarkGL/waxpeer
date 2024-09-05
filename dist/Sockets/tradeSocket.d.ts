import { EventEmitter } from 'node:events';
export declare class TradeWebsocket extends EventEmitter {
    private readonly apiKey;
    private readonly steamid;
    private readonly tradelink;
    private readonly localAddress;
    private ws;
    private tries;
    private int;
    constructor(apiKey: string, steamid: string, tradelink: string, localAddress: string);
    connectWss(): Promise<void>;
}
