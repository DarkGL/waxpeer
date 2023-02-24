export interface ReadyToTransfer {
    success?: boolean;
    trades?: Trade[];
}
export interface Trade {
    id?: number;
    costum_id?: string;
    trade_id?: number;
    status?: string;
    trade_message?: string;
    tradelink?: string;
    done?: boolean;
    for_steamid32?: string;
    for_steamid64?: string;
    created?: string;
    send_until?: string;
    items?: Item[];
}
export interface Item {
    id?: number;
    item_id?: string;
    give_amount?: number;
    image?: string;
    price?: number;
    game?: string;
    name?: string;
    status?: number;
}
export interface GetItems {
    success?: boolean;
    items?: Datum[];
}
export interface Datum {
    name: string;
    price: number;
    image: string;
    item_id: string;
    phase?: keyof typeof EDopplersPhases;
}
export interface FetchInventory {
    success: boolean;
    msg?: string;
    total_inventory_count?: number;
}
export interface ListItems {
    success: boolean;
    msg?: string;
    listed?: IListItem[];
    failed?: IFailedEdit[];
}
export interface IListItem {
    item_id?: number;
    price?: number;
    position?: number;
    name?: string;
}
export interface ListedItem {
    item_id?: number | string;
    price?: number;
}
export interface IRemoveAll {
    success: boolean;
    msg?: string;
    count?: number;
}
export interface IBuyOrderHistory {
    success: boolean;
    msg?: string;
    history?: IBuyOrderObject[];
    count?: number;
}
interface IBuyOrderObject {
    id: number;
    item_name: string;
    game: string;
    price: number;
    created: string;
    last_updated: string;
}
export interface IBuyOrders {
    success: boolean;
    msg?: string;
    offers?: IBuyOrdersOffer[];
    count?: number;
}
interface IBuyOrdersOffer {
    id: number;
    name: string;
    price: number;
    amount: number;
    game: string;
    filled: number;
    by: string;
}
export interface ICreateBuyOrder {
    success: boolean;
    msg?: string;
    filled?: number;
    id?: number;
}
export interface IEditBuyOrder {
    success: boolean;
    msg?: string;
    id?: number;
    amount?: number;
    price?: number;
}
export interface IRemoveBuyOrder {
    success: boolean;
    msg?: string;
    removed?: number;
}
export interface IRemoveAllOrders {
    success: boolean;
    msg?: string;
    count?: number;
}
export interface GetMySteamInv {
    success?: boolean;
    items?: SteamInvItem[];
    count?: number;
    msg?: string;
}
export interface SteamInvItem {
    item_id?: string;
    type?: string;
    icon_url?: string;
    name?: string;
    steam_price?: SteamPrice;
}
export interface SteamPrice {
    average?: number;
    rarity_color?: string;
    rarity?: string;
    current?: number;
    name?: string;
    lowest_price?: number;
    img?: string;
}
export interface IUser {
    success?: boolean;
    user?: User;
}
export interface User {
    wallet?: number;
    id?: string;
    id64?: string;
    avatar?: string;
    name?: string;
    sell_fees?: number;
    can_p2p?: boolean;
    eth_wallet?: string;
    btc_wallet?: string;
    ltc_wallet?: string;
    tradelink?: string;
    expresslink?: string;
    user_id?: string;
}
export interface ISetMyKeys {
    success?: boolean;
    msg?: string;
}
export interface IBuy {
    success: boolean;
    msg?: string;
    id?: number;
}
export interface TradesStatus {
    success?: boolean;
    trades?: TradeRecive[];
}
export interface TradeRecive {
    price?: number;
    reason?: string;
    trade_id?: string;
    for_steamid64?: string;
    id?: string;
    name?: string;
    status?: number;
    done?: boolean;
    send_until?: number;
    last_updated?: number;
    counter?: number;
}
export interface IBuyMyHistory {
    success: boolean;
    history: History[];
}
export interface History {
    trade_id: null | string;
    token: string;
    partner: number;
    created: string;
    send_until: string;
    reason: Reason;
    id: number;
    item_id: string;
    image: string;
    price: number;
    name: string;
    status: number;
}
export declare enum Reason {
    Accepted = "Accepted",
    InvalidTradelink = "Invalid tradelink",
    BuyerFailedToAccept = "Buyer failed to accept",
    ItemPriceHasIncreasedOrItemIsNoLongerAvailable = "Item price has increased or item is no longer available",
    SellerFailedToAccept = "Seller failed to accept"
}
export interface IPrices {
    success: boolean;
    items: IPricesItem[];
}
interface IPricesItem {
    name: string;
    count: number;
    min: number;
    img?: string;
    steam_price?: string;
    rarity_color?: string;
    type?: string;
}
export interface IPricesDopplers {
    success: boolean;
    items: IPricesDopplersItem[];
    msg?: string;
}
interface IPricesDopplersItem {
    name: string;
    item_id: string;
    price: number;
    phase: string;
    steam_price: number;
    img: string;
    weapon: string;
    paint_index: number;
    float: number;
}
export interface IEditItemsReq {
    item_id: number | string;
    price: number;
}
export interface IResponseEdit {
    updated: IResponseEditItem[];
    success: boolean;
    failed: IFailedEdit[];
    removed: number[];
}
export interface IResponseEditItem {
    item_id: number;
    price: number;
    position: number;
}
interface IFailedEdit {
    item_id?: string | number;
    price?: number;
    msg: string;
    msBeforeNext?: number;
}
export interface IListedItem {
    item_id: number;
    price: number;
    position: number;
    name: string;
    market_name?: string;
    date: string;
    steam_price: SteamPrice;
}
export interface IGetSteamItems {
    success: boolean;
    items: IGetSteamItemsItem[];
}
interface IGetSteamItemsItem {
    name: string;
    average?: number;
    game_id: number;
    type?: string;
    collection?: string;
    ru_name?: string;
}
export interface IMerchantUser {
    success: boolean;
    user?: IMerchantUserObject;
    msg?: string;
}
interface IMerchantUserObject {
    steam_id: string;
    can_sell: boolean;
    can_p2p: boolean;
    tradelink: string;
}
export interface IMerchantInventoryUpate {
    success: boolean;
    msg?: string;
    count?: number;
}
export interface IMerchantInventory {
    success: boolean;
    items?: IMerchantInventoryItem[];
    count?: number;
    msg?: string;
}
export interface IMerchantListItem {
    item_id: string | number;
    price: number;
    instant?: boolean;
}
interface IMerchantInventoryItem {
    item_id: string;
    limit: number;
    instant_price?: number;
    type?: string;
    name: string;
    steam_price: SteamPrice;
}
export interface IMerchantDepositsHistory {
    success: boolean;
    msg?: string;
    data?: IMerchantDepositsHistoryDatum[];
}
interface IMerchantDepositsHistoryDatum {
    id: string;
    costum_id: string;
    trade_id: string;
    tradelink: string;
    steamid_seller: string;
    created: string;
    send_until: string;
    last_updated: string;
    reason: string;
    user: IMerchantDepositsHistoryUser;
    items: IMerchantDepositsHistoryItem[];
}
interface IMerchantDepositsHistoryItem {
    item_id: string;
    price: number;
    give_amount: number;
    name: string;
    status: number;
}
interface IMerchantDepositsHistoryUser {
    name: string;
    steam_id: string;
    steam_joined: number;
}
export interface IMerchantListItemsSteam {
    success: boolean;
    msg?: string;
    listed?: IMerchantListItemsSteamListed[];
    tx_id?: string;
}
interface IMerchantListItemsSteamListed {
    item_id: number;
    price: number;
    name: string;
}
export interface IAvailable {
    name: string;
    price: number;
    selling: true;
    image: string;
    item_id: string;
}
export interface IMyHistory {
    success: boolean;
    data: IMyHistoryData;
}
interface IMyHistoryData {
    trades: IMyHistoryTrade[];
    transactions: IMyHistoryTransaction[];
}
interface IMyHistoryTransaction {
    wallet: string;
    type: string;
    status: string;
    amount: string;
    give_amount: string;
    direction: string;
    date: string;
}
interface IMyHistoryTrade {
    date: string;
    created: string;
    id: number;
    item_id: string;
    give_amount: number;
    image: string;
    price: number;
    game: string;
    name: string;
    status: number;
    average: number;
    action: string;
}
export interface ICheckTradeLink {
    success: boolean;
    info?: string;
    msg?: ICheckTradeLinkMessages | string;
    steamid32?: string;
    link?: string;
    token?: string;
    steamid64?: string;
}
export interface IMassInfo {
    success: boolean;
    data: IMassInfoData;
}
interface IMassInfoData {
    item: IMassInfoItem;
}
interface IMassInfoItem {
    listings: IMassInfoListing[];
    orders: any;
    history: any;
    info: any;
}
interface IMassInfoListing {
    price: number;
    by: string;
    item_id: string;
    name: string;
    paint_index: number;
    steam_price: number;
    classid: string;
    image: string;
    phase?: keyof typeof EDopplersPhases;
}
export interface IReadyTransferTrade {
    id: number;
    costum_id: string;
    trade_id: string;
    tradelink: string;
    trade_message: string;
    done: boolean;
    stage: number;
    creator: string;
    send_until: string;
    last_updated: string;
    for_steamid64: string;
    user: IReadyTransferUser;
    seller: IReadyTransferUser;
    items: IReadyTransferItem[];
}
interface IReadyTransferItem {
    id: number;
    item_id: string;
    give_amount: number;
    merchant: string;
    image: string;
    price: number;
    game: string;
    name: string;
    status: number;
}
interface IReadyTransferUser {
    id: string;
    avatar?: string;
}
export interface ICheckWssUser {
    success: boolean;
    step?: number;
    msg: string;
}
export interface IGetItemsList {
    success: boolean;
    items?: IGetItemsListItem[];
    count?: number;
    msg?: string;
}
export interface IHistory {
    success: boolean;
    msg?: string;
    history?: IHistoryObject[];
}
interface IHistoryObject {
    item_id: string;
    trade_id: number;
    token: string;
    partner: number;
    created: string;
    send_until: string;
    reason: string;
    id: number;
    image: string;
    price: number;
    name: string;
    status: number;
}
interface IGetItemsListItem {
    name: string;
    price: number;
    float: number;
    best_deals: number;
    discount: number;
    steam_price: number;
    image: string;
    item_id: string;
    brand: string;
    type: string;
}
export declare enum ICheckTradeLinkMessages {
    'Invalid tradelink' = 0,
    'Missing partner' = 1,
    'Missing token' = 2,
    'Your tradelink is incorect, please update it' = 3,
    "You're banned for not accepting trades" = 4,
    "We couldn't validate your trade link, either your inventory is private or you can't trade" = 5,
    'Please set your steam inventory public' = 6,
    'User has VACBAN or Game Ban' = 7,
    'There was an error with tradelink,please try again' = 8
}
export declare enum EDopplersPhases {
    'any' = 0,
    'Emerald' = 1,
    'Ruby' = 2,
    'Sapphire' = 3,
    'Black Pearl' = 4,
    'Phase 1' = 5,
    'Phase 2' = 6,
    'Phase 3' = 7,
    'Phase 4' = 8
}
export declare enum EMinExteriors {
    'FN' = 0,
    'MW' = 1,
    'FT' = 2,
    'WW' = 3,
    'BS' = 4
}
export declare enum EWeapon {
    'Bayonet' = 0,
    'Bowie Knife' = 1,
    'Butterfly Knife' = 2,
    'Falchion Knife' = 3,
    'Flip Knife' = 4,
    'Glock-18' = 5,
    'Gut Knife' = 6,
    'Huntsman Knife' = 7,
    'Karambit' = 8,
    'M9 Bayonet' = 9,
    'Navaja Knife' = 10,
    'Shadow Daggers' = 11,
    'Stiletto Knife' = 12,
    'Talon Knife' = 13,
    'Ursus Knife' = 14
}
export declare enum EWeaponBrand {
    'knife' = 0,
    'pass' = 1,
    'key' = 2,
    'sticker' = 3,
    'pistol' = 4,
    'shotgun' = 5,
    'smg' = 6,
    'machinegun' = 7,
    'rifle' = 8,
    'sniper_rifle' = 9,
    'gloves' = 10,
    'AK47u' = 11,
    'Armored Metal Door' = 12,
    'Balaclava' = 13,
    'Bandana' = 14,
    'Beenie' = 15,
    'Bolt Rifle' = 16,
    'Bone Club' = 17,
    'Bone Knife' = 18,
    'Boonie' = 19,
    'Boots' = 20,
    'Bucket Helmet' = 21,
    'Burlap Gloves' = 22,
    'Burlap Headwrap' = 23,
    'Burlap Shirt' = 24,
    'Burlap Shoes' = 25,
    'Burlap Trousers' = 26,
    'Cap' = 27,
    'Coffeecan Helmet' = 28,
    'Collared Shirt' = 29,
    'Concrete Barricade' = 30,
    'Crossbow' = 31,
    'Deer Skull Mask' = 32,
    'Double Barrel Shotgun' = 33,
    'Grenade' = 34,
    'Guitar' = 35,
    'Hammer' = 36,
    'Hatchet' = 37,
    'Hide Halterneck' = 38,
    'Hide Pants' = 39,
    'Hide Poncho' = 40,
    'Hide Skirt' = 41,
    'Hoodie' = 42,
    'Jacket' = 43,
    'Large Wooden Box' = 44,
    'Long TShirt' = 45,
    'Longsword' = 46,
    'Metal Facemask' = 47,
    'Metal Torso Plate' = 48,
    "Miner's Hat" = 49,
    'Mp5' = 50,
    'Pants' = 51,
    'Pump Shotgun' = 52,
    'Reactive Sign' = 53,
    'Revolver' = 54,
    'Rifle Helmet' = 55,
    'Roadsign Jacket' = 56,
    'Roadsign Kilt' = 57,
    'Rock' = 58,
    'Rocket Launcher' = 59,
    'Salvaged Icepick' = 60,
    'Salvaged Sword' = 61,
    'Sandbag Barricade' = 62,
    'Satchel Explosives' = 63,
    'Semi Auto Pistol' = 64,
    'Semi Auto Rifle' = 65,
    'Sheet Metal Door' = 66,
    'Shorts' = 67,
    'Sleeping Bag' = 68,
    'SMG' = 69,
    'Snow Jacket' = 70,
    'Stone Hatchet' = 71,
    'Stone Pickaxe' = 72,
    'Tank Top' = 73,
    'Thompson' = 74,
    'TShirt' = 75,
    'Waterpipe Shotgun' = 76,
    'Wooden Box' = 77,
    'Wooden Door' = 78
}
export declare const EGameId: {
    readonly csgo: 730;
    readonly dota2: 570;
    readonly tf2: 440;
    readonly rust: 252490;
};
export {};
