import type { TradeWebsocketCreateTradeData, TradeWebsocketCancelTradeData, TradeWebsocketAcceptWithdrawData, TradeWebsocketUserChange } from '../types/sockets.js';
import { TypedEmitter } from 'tiny-typed-emitter';
interface MessageEvents {
    'send-trade': (data: TradeWebsocketCreateTradeData) => void;
    cancelTrade: (data: TradeWebsocketCancelTradeData) => void;
    accept_withdraw: (data: TradeWebsocketAcceptWithdrawData) => void;
    user_change: (data: TradeWebsocketUserChange) => void;
    connected: () => void;
    disconnected: (reason: string) => void;
}
export declare class TradeWebsocket extends TypedEmitter<MessageEvents> {
    private readonly apiKey;
    private readonly steamid;
    private readonly tradelink;
    private readonly localAddress;
    private ws;
    private tries;
    private int;
    private lastPong;
    private connectionId;
    constructor(apiKey: string, steamid: string, tradelink: string, localAddress: string);
    connectWss(): Promise<void>;
}
export {};
