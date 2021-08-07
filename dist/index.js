"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Waxpeer = void 0;
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const axios_1 = __importDefault(require("axios"));
class Waxpeer {
    constructor(api, localAddress, family, baseUrl) {
        this.baseUrl = 'https://api.waxpeer.com';
        this.version = 'v1';
        this.api = api;
        if (baseUrl)
            this.baseUrl = baseUrl;
        let options = {};
        if (localAddress) {
            options = { localAddress, family };
        }
        this.httpAgent = new http.Agent(options);
        this.httpsAgent = new https.Agent(options);
    }
    sleep(timer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((res) => setTimeout(res, timer));
        });
    }
    /**
     *
     * @param name Market hash name of the item
     * @param price Price, should be greater than item price
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param project_id Your custom id string[50]
     */
    buyItemWithName(name, price, token, partner, project_id) {
        return this.get('buy-one-p2p-name', `name=${encodeURIComponent(name)}&price=${price}&token=${token}&partner=${partner}${project_id ? `&project_id=${project_id}` : ''}`);
    }
    /**
     *
     * @param item_id Item id from fetching items
     * @param price Price of the item 1$=1000
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param project_id Your custom id string[50]
     */
    buyItemWithId(item_id, price, token, partner, project_id) {
        return this.get('buy-one-p2p', `item_id=${item_id}&price=${price}&token=${token}&partner=${partner}${project_id ? `&project_id=${project_id}` : ''}`);
    }
    /**
     *
     * @param ids Ids or id that you recived when purchasing items
     */
    tradeRequestStatus(ids) {
        let id = [];
        if (typeof ids !== 'object')
            id = [ids];
        else
            id = [...ids];
        return this.get('check-many-steam', id.map((i) => `id=${i}`).join('&'));
    }
    /**
     *
     * @param ids Ids or id that you passed as project_id when making a purchase
     */
    customTradeRequest(ids) {
        let id = [];
        if (typeof ids !== 'object')
            id = [ids];
        else
            id = [...ids];
        return this.get('check-many-project-id', id.map((i) => `id=${i}`).join('&'));
    }
    /**
     *
     * @param steam_api (optional) you can pass a steam api to waxpeer
     */
    setMyKeys(steam_api) {
        return this.get('set-my-steamapi', `steam_api=${steam_api}&api=${this.api}`);
    }
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
    getItemsList(skip = 0, limit = 50, game = 'csgo', discount = 0, min_price = 0, max_price = 10000000, sort = 'desc', minified = 0) {
        return this.get('get-items-list', `game=${game}&skip=${skip}&limit=${limit}&discount=${discount}&min_price=${min_price}&max_price=${max_price}&sort=${sort}&minified=${minified}`);
    }
    /**
     * Fetches your steam inventory make sure your steamid is connected on waxpeer
     */
    fetchInventory() {
        return this.get('fetch-my-inventory');
    }
    getSteamItems(game = 'csgo') {
        let gameId = game === 'csgo' ? 730 : 570;
        return this.get('get-steam-items', `game=${gameId}`);
    }
    /**
     * Get min price,name,max_price,average price for all items
     * @param game Game csgo,dota2,gc
     * @param min_price Min price
     * @param max_price Max price
     * @param search search
     */
    getPrices(game = 'csgo', min_price, max_price, search) {
        return this.get(`prices`, `game=${game}&${min_price ? `min_price=${min_price}` : ''}${max_price ? `max_price=${max_price}` : ''}${search ? encodeURIComponent(search) : ''}`);
    }
    /**
     * It will validate tradelink and also cache it on waxpeer side so your purchase will be made instantly
     * @param tradelink Full tradelink that you want to validate
     */
    validateTradeLink(tradelink) {
        return this.post(`check-tradelink`, { tradelink });
    }
    /**
     * Check weather items are available by item_id max 50 items
     * @param item_id ItemIds that you want to check weather items are available
     */
    checkItemAvailability(item_id) {
        let ids = typeof item_id === 'object' ? item_id : [item_id];
        return this.get(`check-availability`, ids.map((i) => `item_id=${i}`).join('&'));
    }
    /**
     * Edit multiple items or set price to 0 to remove
     * @param items Array of items with item_id and price keys
     */
    editItems(items) {
        return this.post(`edit-items`, {
            items,
        });
    }
    /**
     *
     * @param items Items object  https://api.waxpeer.com/docs/#/Steam/post_list_items_steam
     */
    listItemsSteam(items) {
        return this.post('list-items-steam', {
            items,
        });
    }
    /**
     *
     */
    myListedItems(game = 'csgo') {
        return this.get('list-items-steam', `game=${game ? game : 'csgo'}`);
    }
    /**
     *
     * @param skip Skip items
     * @param game Game
     */
    getMyInventory(skip = 0, game = 'csgo') {
        let gameId = game === 'csgo' ? 730 : game === 'dota2' ? 570 : 440;
        return this.get('get-my-inventory', `game=${gameId}&skip=${skip}`);
    }
    /**
     *
     * @param names Array of item names
     */
    searchItems(names) {
        let nameSearch = typeof names === 'object' ? names : [names];
        let searchNames = nameSearch.map((i) => `names=${encodeURIComponent(i)}`).join('&');
        return this.get('search-items-by-name', searchNames);
    }
    /**
     *
     * @param skip skip since by default it returns 50 items
     * @param partner partner parameter that you passed when buying
     * @param token token parameter that you passed when buying
     */
    myPurchases(skip = 0, partner, token) {
        return this.get(`history`, `skip=${skip}${partner ? `&partner=${partner}` : ''}${token ? `&token=${token}` : ''}`);
    }
    /**
     * Get Profile data
     */
    getProfile() {
        return this.get('user');
    }
    /**
     * Removes all listed items
     */
    removeAll() {
        return this.get(`remove-all`);
    }
    /**
     *
     * @param ids Either array or one item_id that you want to remove from listing
     */
    removeItems(ids) {
        let removeId = typeof ids === 'object' ? ids : [ids];
        return this.get(`remove-items`, removeId.map((i) => `id=${i}`).join('&'));
    }
    post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { baseUrl, api, version } = this;
            let newUrl = `${baseUrl}/${version}/${url}?api=${api}`;
            return (yield axios_1.default.post(newUrl, body, { httpAgent: this.httpAgent, httpsAgent: this.httpsAgent })).data;
        });
    }
    get(url, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let { baseUrl, api, version } = this;
            let newUrl = `${baseUrl}/${version}/${url}?api=${api}`;
            if (token)
                newUrl += `&${token}`;
            try {
                return (yield axios_1.default.get(newUrl, { httpAgent: this.httpAgent, httpsAgent: this.httpsAgent })).data;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.Waxpeer = Waxpeer;
//# sourceMappingURL=index.js.map