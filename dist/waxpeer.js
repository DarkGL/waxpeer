import { Client } from 'undici';
import qs from 'qs';
export class Waxpeer {
    api;
    baseUrl = 'https://api.waxpeer.com';
    version = 'v1';
    apiClient;
    constructor(api, localAddress) {
        this.api = api;
        this.apiClient = new Client(this.baseUrl, {
            ...(localAddress ? { localAddress } : {}),
            keepAliveTimeout: 60000,
            connect: {
                rejectUnauthorized: false,
                keepAlive: true,
            },
        });
    }
    myHistory(skip, start, end, sort = 'DESC') {
        return this.post('my-history', { skip, start, end, sort });
    }
    changeTradeLink(tradelink) {
        return this.post('change-tradelink', { tradelink });
    }
    buyItemWithName(name, price, token, partner, project_id = undefined, game = 'csgo') {
        return this.get('buy-one-p2p-name', qs.stringify({
            name: encodeURIComponent(name),
            price,
            token,
            partner,
            project_id,
            game,
        }));
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
    UserSteamToken(token) {
        return this.post('user/steam-token', {
            token: Buffer.from(token).toString('base64'),
        });
    }
    steamTrade(tradeid, waxid) {
        return this.post('steam-trade', { tradeid, waxid });
    }
    fetchInventory(game = 'csgo') {
        return this.get('fetch-my-inventory', qs.stringify({ game }));
    }
    getPrices(game = 'csgo', min_price = undefined, max_price = undefined, search = undefined, minified = 1, highest_offer = 0, single = 0) {
        return this.get('prices', qs.stringify({
            game,
            min_price,
            max_price,
            search: typeof search === 'string' && search?.length
                ? encodeURIComponent(search)
                : undefined,
            minified,
            highest_offer,
            single,
        }));
    }
    getPricesDopplers(phase = 'any', exterior = undefined, weapon = undefined, minified = 1, min_price = undefined, max_price = undefined, search = undefined, single = 0) {
        return this.get('prices/dopplers', qs.stringify({
            phase,
            exterior,
            weapon,
            minified,
            min_price,
            max_price,
            search,
            single,
        }));
    }
    massInfo(names, game = 'csgo') {
        return this.post('mass-info', { name: names, sell: 1 }, qs.stringify({ game }));
    }
    validateTradeLink(tradelink) {
        return this.post('check-tradelink', { tradelink });
    }
    checkItemAvailability(item_id) {
        const ids = typeof item_id === 'object' ? item_id : [item_id];
        return this.get('check-availability', ids.map((i) => `item_id=${i}`).join('&'));
    }
    editItems(items, game = 'csgo') {
        return this.post('edit-items', {
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
        const nameSearch = typeof names === 'object' ? names : [names];
        const searchNames = nameSearch.map((i) => `names=${encodeURIComponent(i)}`).join('&');
        return this.get('search-items-by-name', `game=${game}&${searchNames}`);
    }
    myPurchases(skip = 0, partner = undefined, token = undefined) {
        return this.get('history', qs.stringify({ skip, partner, token }));
    }
    readyToTransferP2P(steam_api) {
        return this.get('ready-to-transfer-p2p', qs.stringify({ steam_api }));
    }
    checkWssUser(steamid) {
        return this.get('check-wss-user', qs.stringify({ steamid }));
    }
    getProfile() {
        return this.get('user');
    }
    removeAll(game = undefined) {
        return this.get('remove-all', qs.stringify({ game }));
    }
    removeItems(ids) {
        const removeId = typeof ids === 'object' ? ids : [ids];
        return this.get('remove-items', removeId.map((i) => `id=${i}`).join('&'));
    }
    buyOrderHistory(skip = 0, game, sort = 'ASC') {
        return this.get('buy-order-history', qs.stringify({ skip, game, sort }));
    }
    buyOrders(skip = 0, name, own = '0', game) {
        return this.get('buy-orders', qs.stringify({ skip, name, own, game }));
    }
    createBuyOrder(name, amount, price, game = 'csgo') {
        return this.post('create-buy-order', null, qs.stringify({ name, amount, price, game }));
    }
    editBuyOrder(id, amount, price) {
        return this.post('edit-buy-order', { id, amount, price });
    }
    removeBuyOrder(ids) {
        const removeIds = typeof ids === 'object' ? ids : [ids];
        return this.get('remove-buy-order', removeIds.map((i) => `id=${i}`).join('&'));
    }
    removeAllOrders(game = undefined) {
        return this.get('remove-all-orders', qs.stringify({ game }));
    }
    getItemsList(skip = 0, search = undefined, brand = undefined, order = 'DESC', order_by = 'price', exterior = undefined, max_price = undefined, min_price = undefined, game = 'csgo') {
        return this.get('get-items-list', qs.stringify({
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
        return this.get('get-steam-items', qs.stringify({ game, highest_offer }));
    }
    getMerchantUser(steam_id, merchant) {
        return this.get('merchant/user', qs.stringify({ steam_id, merchant }));
    }
    postMerchantUser(merchant, tradelink, steam_id) {
        return this.post('merchant/user', { tradelink, steam_id }, qs.stringify({ merchant }));
    }
    MerchantInventoryUpdate(steam_id, merchant) {
        return this.post('merchant/inventory', null, qs.stringify({ steam_id, merchant }));
    }
    MerchantInventory(steam_id, merchant, game = 730, skip = 0) {
        return this.get('merchant/inventory', qs.stringify({ steam_id, merchant, game, skip }));
    }
    MerchantListItemsSteam(merchant, steam_id, items) {
        return this.post('merchant/list-items-steam', { items }, qs.stringify({ merchant, steam_id }));
    }
    MerchantDepositsHistory(merchant, steam_id, tx_id) {
        return this.post('merchant/deposits', null, qs.stringify({ merchant, steam_id, tx_id }));
    }
    async post(url, body, token) {
        const path = `/${this.version}/${url}?api=${this.api}${token ? `&${token}` : ''}`;
        return this.apiClient
            .request({
            method: 'POST',
            path,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.body.json());
    }
    async get(url, token) {
        const path = `/${this.version}/${url}?api=${this.api}${token ? `&${token}` : ''}`;
        return this.apiClient
            .request({
            method: 'GET',
            path,
        })
            .then((response) => response.body.json());
    }
}
//# sourceMappingURL=waxpeer.js.map