import { FetchInventory, GetItems, GetMySteamInv, IAvailable, IBuy, IBuyMyHistory, ICheckLink, IEditItemsReq, IListedItem, IPrices, IResponseEdit, ISetMyKeys, ISteamInfoItem, IUser, ListedItem, ListItems, TradesStatus } from './types/waxpeer';
export declare class Waxpeer {
    private api;
    private httpAgent;
    private httpsAgent;
    baseUrl: string;
    version: string;
    constructor(api: string, localAddress?: string, family?: number, baseUrl?: string);
    sleep(timer: number): Promise<void>;
    /**
     *
     * @param name Market hash name of the item
     * @param price Price, should be greater than item price
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param project_id Your custom id string[50]
     */
    buyItemWithName(name: string, price: number, token: string, partner: string, project_id?: string): Promise<IBuy>;
    /**
     *
     * @param item_id Item id from fetching items
     * @param price Price of the item 1$=1000
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param project_id Your custom id string[50]
     */
    buyItemWithId(item_id: number, price: number, token: string, partner: string, project_id?: string): Promise<IBuy>;
    /**
     *
     * @param ids Ids or id that you recived when purchasing items
     */
    tradeRequestStatus(ids: number | number[] | string | string[]): Promise<TradesStatus>;
    /**
     *
     * @param ids Ids or id that you passed as project_id when making a purchase
     */
    customTradeRequest(ids: number | number[] | string | string[]): Promise<TradesStatus>;
    /**
     *
     * @param steam_api (optional) you can pass a steam api to waxpeer
     */
    setMyKeys(steam_api: string): Promise<ISetMyKeys>;
    /**
     *
     * @param skip How many items you want to skip
     * @param limit How many items you want to fetch (max 100)
     * @param game Game (csgo,dota2,vgo and etc check https://api.waxpeer.com/docs/#/Steam/get_get_items_list)
     * @param min_price Min price 1$=1000
     * @param max_price Max price
     * @param sort The order in which items are returned in (profit, desc, asc, best_deals)
     * @param minified If you pass this you will recieve additional info like float. Available values : 1, 2
     */
    getItemsList(skip?: number, limit?: number, game?: string, discount?: number, min_price?: number, max_price?: number, sort?: string, minified?: number): Promise<GetItems>;
    /**
     * Fetches your steam inventory make sure your steamid is connected on waxpeer
     */
    fetchInventory(): Promise<FetchInventory>;
    getSteamItems(game?: string): Promise<{
        success: boolean;
        items: ISteamInfoItem[];
    }>;
    /**
     * Get min price,name,max_price,average price for all items
     * @param game Game csgo,dota2,gc
     * @param min_price Min price
     * @param max_price Max price
     * @param search search
     */
    getPrices(game?: string, min_price?: number, max_price?: number, search?: string): Promise<IPrices>;
    /**
     * It will validate tradelink and also cache it on waxpeer side so your purchase will be made instantly
     * @param tradelink Full tradelink that you want to validate
     */
    validateTradeLink(tradelink: string): Promise<ICheckLink>;
    /**
     * Check weather items are available by item_id max 50 items
     * @param item_id ItemIds that you want to check weather items are available
     */
    checkItemAvailability(item_id: string | number | string[] | number[]): Promise<{
        success: boolean;
        data: IAvailable[];
    }>;
    /**
     * Edit multiple items or set price to 0 to remove
     * @param items Array of items with item_id and price keys
     */
    editItems(items: IEditItemsReq[]): Promise<IResponseEdit>;
    /**
     *
     * @param items Items object  https://api.waxpeer.com/docs/#/Steam/post_list_items_steam
     */
    listItemsSteam(items: ListedItem[]): Promise<ListItems>;
    /**
     *
     */
    myListedItems(game?: string): Promise<{
        success: boolean;
        items: IListedItem[];
    }>;
    /**
     *
     * @param skip Skip items
     * @param game Game
     */
    getMyInventory(skip?: number, game?: string): Promise<GetMySteamInv>;
    /**
     *
     * @param names Array of item names
     */
    searchItems(names: string[] | string): Promise<GetItems>;
    /**
     *
     * @param skip skip since by default it returns 50 items
     * @param partner partner parameter that you passed when buying
     * @param token token parameter that you passed when buying
     */
    myPurchases(skip?: number, partner?: string, token?: string): Promise<IBuyMyHistory>;
    /**
     * Get Profile data
     */
    getProfile(): Promise<IUser>;
    /**
     * Removes all listed items
     */
    removeAll(): Promise<any>;
    /**
     *
     * @param ids Either array or one item_id that you want to remove from listing
     */
    removeItems(ids: number | number[] | string | string[]): Promise<{
        success: boolean;
        count: number;
        removed: number[];
    }>;
    post(url: string, body: any): Promise<any>;
    get(url: string, token?: string): Promise<any>;
}
