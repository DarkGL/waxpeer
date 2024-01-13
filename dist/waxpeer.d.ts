import { EDopplersPhases, EGameId, EMinExteriors, EWeapon, EWeaponBrand, FetchInventory, GetItems, GetMySteamInv, IAvailable, IBuy, IBuyMyHistory, IBuyOrderHistory, IBuyOrders, ICheckTradeLink, ICheckWssUser, ICreateBuyOrder, IEditBuyOrder, IEditItemsReq, IGetItemsList, IGetSteamItems, IHistory, IListedItem, IMassInfo, IMerchantDepositsHistory, IMerchantInventory, IMerchantInventoryUpate, IMerchantListItem, IMerchantListItemsSteam, IMerchantUser, IMyHistory, IPrices, IPricesDopplers, IReadyTransferTrade, IRemoveAll, IRemoveAllOrders, IRemoveBuyOrder, IResponseEdit, ISetMyKeys, IUser, ListedItem, ListItems, TradesStatus } from './types/waxpeer';
export declare class Waxpeer {
    private readonly api;
    readonly baseUrl = "https://api.waxpeer.com";
    version: string;
    private getPricesLimiter;
    private getPricesDopplersLimiter;
    private httpsAgent;
    constructor(api: string, localAddress?: string);
    sleep(timer: number): Promise<void>;
    myHistory(skip: number, start: string, end: string, sort?: 'ASC' | 'DESC'): Promise<IMyHistory>;
    changeTradeLink(tradelink: string): Promise<ICheckTradeLink>;
    buyItemWithName(name: string, price: number, token: string, partner: string, project_id?: string, game?: keyof typeof EGameId): Promise<IBuy>;
    buyItemWithId(item_id: string | number, price: number, token: string, partner: string, project_id?: string): Promise<IBuy>;
    getHistory(partner?: string, token?: string, skip?: number): Promise<IHistory>;
    tradeRequestStatus(ids: number | number[] | string | string[]): Promise<TradesStatus>;
    customTradeRequest(ids: number | number[] | string | string[]): Promise<TradesStatus>;
    setMyKeys(steam_api: string): Promise<ISetMyKeys>;
    fetchInventory(game?: keyof typeof EGameId): Promise<FetchInventory>;
    getPrices(game?: keyof typeof EGameId, min_price?: number, max_price?: number, search?: string, minified?: 0 | 1, highest_offer?: number, single?: 0 | 1): Promise<IPrices>;
    getPricesDopplers(phase?: keyof typeof EDopplersPhases, exterior?: keyof typeof EMinExteriors, weapon?: keyof typeof EWeapon, minified?: 0 | 1, min_price?: number, max_price?: number, search?: string, single?: 0 | 1): Promise<IPricesDopplers>;
    massInfo(names: string[], game?: keyof typeof EGameId): Promise<IMassInfo>;
    validateTradeLink(tradelink: string): Promise<ICheckTradeLink>;
    checkItemAvailability(item_id: string | number | string[] | number[]): Promise<{
        success: boolean;
        data: IAvailable[];
    }>;
    editItems(items: IEditItemsReq[], game?: keyof typeof EGameId): Promise<IResponseEdit>;
    listItemsSteam(items: ListedItem[], game?: keyof typeof EGameId): Promise<ListItems>;
    myListedItems(game?: keyof typeof EGameId): Promise<{
        success: boolean;
        items: IListedItem[];
    }>;
    getMyInventory(skip?: number, game?: keyof typeof EGameId): Promise<GetMySteamInv>;
    searchItems(names: string[] | string, game?: keyof typeof EGameId): Promise<GetItems>;
    myPurchases(skip?: number, partner?: string, token?: string): Promise<IBuyMyHistory>;
    readyToTransferP2P(steam_api: string): Promise<IReadyTransferTrade>;
    checkWssUser(steamid: string): Promise<ICheckWssUser>;
    getProfile(): Promise<IUser>;
    removeAll(game?: keyof typeof EGameId): Promise<IRemoveAll>;
    removeItems(ids: number | number[] | string | string[]): Promise<{
        success: boolean;
        count: number;
        removed: number[];
    }>;
    buyOrderHistory(skip?: number, game?: keyof typeof EGameId, sort?: 'ASC' | 'DESC'): Promise<IBuyOrderHistory>;
    buyOrders(skip?: number, name?: string, own?: '0' | '1', game?: keyof typeof EGameId): Promise<IBuyOrders>;
    createBuyOrder(name: string, amount: number, price: number, game?: keyof typeof EGameId): Promise<ICreateBuyOrder>;
    editBuyOrder(id: number, amount: number, price: number): Promise<IEditBuyOrder>;
    removeBuyOrder(ids: number | number[]): Promise<IRemoveBuyOrder>;
    removeAllOrders(game?: keyof typeof EGameId): Promise<IRemoveAllOrders>;
    getItemsList(skip?: number, search?: string, brand?: keyof typeof EWeaponBrand, order?: 'ASC' | 'DESC', order_by?: 'price' | 'name' | 'discount' | 'best_deals', exterior?: keyof typeof EMinExteriors, max_price?: number, min_price?: number, game?: keyof typeof EGameId): Promise<IGetItemsList>;
    getSteamItems(game?: number, highest_offer?: '0' | '1'): Promise<IGetSteamItems>;
    getMerchantUser(steam_id: string, merchant: string): Promise<IMerchantUser>;
    postMerchantUser(merchant: string, tradelink: string, steam_id: string): Promise<IMerchantUser>;
    MerchantInventoryUpdate(steam_id: string, merchant: string): Promise<IMerchantInventoryUpate>;
    MerchantInventory(steam_id: string, merchant: string, game?: number, skip?: number): Promise<IMerchantInventory>;
    MerchantListItemsSteam(merchant: string, steam_id: string, items: IMerchantListItem[]): Promise<IMerchantListItemsSteam>;
    MerchantDepositsHistory(merchant: string, steam_id?: string, tx_id?: string): Promise<IMerchantDepositsHistory>;
    post(url: string, body: any, token?: string): Promise<any>;
    get(url: string, token?: string): Promise<any>;
    private newAxiosCancelationSource;
}
//# sourceMappingURL=waxpeer.d.ts.map