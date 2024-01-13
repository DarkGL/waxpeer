/// <reference types="node" />
import EventEmitter from 'events';
import { WebsiteSocketSubEvents } from '../types/sockets';
export declare class WebsiteWebsocket extends EventEmitter {
    private readonly apiKey?;
    private readonly subEvents;
    private readonly localAddress?;
    constructor(apiKey?: string, subEvents?: Array<keyof typeof WebsiteSocketSubEvents>, localAddress?: string);
    connectWss(): Promise<void>;
}
//# sourceMappingURL=websiteSocket.d.ts.map