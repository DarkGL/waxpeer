/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class TradeWebsocket extends EventEmitter {
    private readonly apiKey;
    private readonly steamid;
    private readonly tradelink;
    private readonly localAddress;
    private w;
    private readonly readyStatesMap;
    constructor(apiKey: string, steamid: string, tradelink: string, localAddress: string);
    connectWss(): Promise<void>;
}
//# sourceMappingURL=tradeSocket.d.ts.map