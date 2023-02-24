/// <reference types="node" />
import EventEmitter from 'events';
import { WebsiteSocketSubEvents } from '../types/sockets';
export declare class WebsiteWebsocket extends EventEmitter {
    private readonly localAddress?;
    private apiKey;
    socketOpen: boolean;
    subEvents: Array<keyof typeof WebsiteSocketSubEvents>;
    constructor(apiKey?: string, subEvents?: Array<keyof typeof WebsiteSocketSubEvents>, localAddress?: string);
    connectWss(): Promise<void>;
}
