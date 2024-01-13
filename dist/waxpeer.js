import https from 'https';
import axios from 'axios';
import qs from 'qs';
import { RateLimiter } from 'limiter';
export class Waxpeer {
    api;
    baseUrl = 'https://api.waxpeer.com';
    version = 'v1';
    getPricesLimiter = new RateLimiter({ tokensPerInterval: 60, interval: 60 * 1000 });
    getPricesDopplersLimiter = new RateLimiter({ tokensPerInterval: 60, interval: 60 * 1000 });
    httpsAgent;
    constructor(api, localAddress) {
        this.api = api;
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
            keepAlive: true,
            ...(localAddress ? { localAddress } : {}),
        });
    }
    async sleep(timer) {
        await new Promise((res) => setTimeout(res, timer));
    }
    myHistory(skip, start, end, sort = 'DESC') {
        return this.post('my-history', { skip, start, end, sort });
    }
    changeTradeLink(tradelink) {
        return this.post('change-tradelink', { tradelink });
    }
    buyItemWithName(name, price, token, partner, project_id = undefined, game = 'csgo') {
        return this.get('buy-one-p2p-name', qs.stringify({ name: encodeURIComponent(name), price, token, partner, project_id, game }));
    }
    buyItemWithId(item_id, price, token, partner, project_id) {
        return this.get('buy-one-p2p', qs.stringify({ item_id, price, token, partner, project_id }));
    }
    getHistory(partner, token, skip) {
        return this.get('history', qs.stringify({ partner, token, skip }));
    }
    tradeRequestStatus(ids) {
        let id = [];
        if (typeof ids !== 'object')
            id = [ids];
        else
            id = [...ids];
        return this.get('check-many-steam', id.map((i) => `id=${i}`).join('&'));
    }
    customTradeRequest(ids) {
        let id = [];
        if (typeof ids !== 'object')
            id = [ids];
        else
            id = [...ids];
        return this.get('check-many-project-id', id.map((i) => `id=${i}`).join('&'));
    }
    setMyKeys(steam_api) {
        return this.get('set-my-steamapi', qs.stringify({ steam_api }));
    }
    fetchInventory(game = 'csgo') {
        return this.get('fetch-my-inventory', qs.stringify({ game }));
    }
    getPrices(game = 'csgo', min_price = undefined, max_price = undefined, search = undefined, minified = 1, highest_offer = 0, single = 0) {
        if (!this.getPricesLimiter.tryRemoveTokens(1))
            return Promise.reject(new Error('Too many requests, try again later'));
        return this.get(`prices`, qs.stringify({
            game,
            min_price,
            max_price,
            search: typeof search === 'string' && search?.length ? encodeURIComponent(search) : undefined,
            minified,
            highest_offer,
            single,
        }));
    }
    getPricesDopplers(phase = 'any', exterior = undefined, weapon = undefined, minified = 1, min_price = undefined, max_price = undefined, search = undefined, single = 0) {
        if (!this.getPricesDopplersLimiter.tryRemoveTokens(1))
            return Promise.reject(new Error('Too many requests, try again later'));
        return this.get(`prices/dopplers`, qs.stringify({ phase, exterior, weapon, minified, min_price, max_price, search, single }));
    }
    massInfo(names, game = 'csgo') {
        return this.post('mass-info', { name: names, sell: 1 }, qs.stringify({ game }));
    }
    validateTradeLink(tradelink) {
        return this.post(`check-tradelink`, { tradelink });
    }
    checkItemAvailability(item_id) {
        let ids = typeof item_id === 'object' ? item_id : [item_id];
        return this.get(`check-availability`, ids.map((i) => `item_id=${i}`).join('&'));
    }
    editItems(items, game = 'csgo') {
        return this.post(`edit-items`, {
            items,
        }, qs.stringify({ game }));
    }
    listItemsSteam(items, game = 'csgo') {
        return this.post('list-items-steam', {
            items,
        }, qs.stringify({ game }));
    }
    myListedItems(game = 'csgo') {
        return this.get('list-items-steam', qs.stringify({ game }));
    }
    getMyInventory(skip = 0, game = 'csgo') {
        return this.get('get-my-inventory', qs.stringify({ skip, game }));
    }
    searchItems(names, game = 'csgo') {
        let nameSearch = typeof names === 'object' ? names : [names];
        let searchNames = nameSearch.map((i) => `names=${encodeURIComponent(i)}`).join('&');
        return this.get('search-items-by-name', `game=${game}&${searchNames}`);
    }
    myPurchases(skip = 0, partner = undefined, token = undefined) {
        return this.get(`history`, qs.stringify({ skip, partner, token }));
    }
    readyToTransferP2P(steam_api) {
        return this.get(`ready-to-transfer-p2p`, qs.stringify({ steam_api }));
    }
    checkWssUser(steamid) {
        return this.get(`check-wss-user`, qs.stringify({ steamid }));
    }
    getProfile() {
        return this.get('user');
    }
    removeAll(game = undefined) {
        return this.get(`remove-all`, qs.stringify({ game }));
    }
    removeItems(ids) {
        let removeId = typeof ids === 'object' ? ids : [ids];
        return this.get(`remove-items`, removeId.map((i) => `id=${i}`).join('&'));
    }
    buyOrderHistory(skip = 0, game, sort = 'ASC') {
        return this.get(`buy-order-history`, qs.stringify({ skip, game, sort }));
    }
    buyOrders(skip = 0, name, own = '0', game) {
        return this.get(`buy-orders`, qs.stringify({ skip, name, own, game }));
    }
    createBuyOrder(name, amount, price, game = 'csgo') {
        return this.post(`create-buy-order`, null, qs.stringify({ name, amount, price, game }));
    }
    editBuyOrder(id, amount, price) {
        return this.post(`edit-buy-order`, { id, amount, price });
    }
    removeBuyOrder(ids) {
        let removeIds = typeof ids === 'object' ? ids : [ids];
        return this.get(`remove-buy-order`, removeIds.map((i) => `id=${i}`).join('&'));
    }
    removeAllOrders(game = undefined) {
        return this.get(`remove-all-orders`, qs.stringify({ game }));
    }
    getItemsList(skip = 0, search = undefined, brand = undefined, order = 'DESC', order_by = 'price', exterior = undefined, max_price = undefined, min_price = undefined, game = 'csgo') {
        return this.get(`get-items-list`, qs.stringify({
            skip,
            search,
            brand,
            order,
            order_by,
            exterior,
            max_price,
            min_price,
            game,
        }));
    }
    getSteamItems(game = 730, highest_offer = '0') {
        return this.get(`get-steam-items`, qs.stringify({ game, highest_offer }));
    }
    getMerchantUser(steam_id, merchant) {
        return this.get(`merchant/user`, qs.stringify({ steam_id, merchant }));
    }
    postMerchantUser(merchant, tradelink, steam_id) {
        return this.post(`merchant/user`, { tradelink, steam_id }, qs.stringify({ merchant }));
    }
    MerchantInventoryUpdate(steam_id, merchant) {
        return this.post(`merchant/inventory`, null, qs.stringify({ steam_id, merchant }));
    }
    MerchantInventory(steam_id, merchant, game = 730, skip = 0) {
        return this.get(`merchant/inventory`, qs.stringify({ steam_id, merchant, game, skip }));
    }
    MerchantListItemsSteam(merchant, steam_id, items) {
        return this.post(`merchant/list-items-steam`, { items }, qs.stringify({ merchant, steam_id }));
    }
    MerchantDepositsHistory(merchant, steam_id, tx_id) {
        return this.post(`merchant/deposits`, null, qs.stringify({ merchant, steam_id, tx_id }));
    }
    async post(url, body, token) {
        let { baseUrl, api, version } = this;
        let newUrl = `${baseUrl}/${version}/${url}?api=${api}`;
        if (token)
            newUrl += `&${token}`;
        try {
            return (await axios.post(newUrl, body, {
                headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
                cancelToken: this.newAxiosCancelationSource(60000),
                timeout: 60000,
                httpsAgent: this.httpsAgent,
            })).data;
        }
        catch (e) {
            throw e;
        }
    }
    async get(url, token) {
        let { baseUrl, api, version } = this;
        let newUrl = `${baseUrl}/${version}/${url}?api=${api}`;
        if (token)
            newUrl += `&${token}`;
        try {
            return (await axios.get(newUrl, {
                headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
                cancelToken: this.newAxiosCancelationSource(60000),
                timeout: 60000,
                httpsAgent: this.httpsAgent,
            })).data;
        }
        catch (e) {
            throw e;
        }
    }
    newAxiosCancelationSource(ms = 1) {
        const tokenSource = axios.CancelToken.source();
        setTimeout(() => {
            tokenSource.cancel();
        }, ms);
        return tokenSource.token;
    }
}
//# sourceMappingURL=waxpeer.js.map