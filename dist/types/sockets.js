export var WebsiteSocketSubEvents;
(function (WebsiteSocketSubEvents) {
    WebsiteSocketSubEvents["add_item"] = "add_item";
    WebsiteSocketSubEvents["remove"] = "remove";
    WebsiteSocketSubEvents["csgo"] = "csgo";
    WebsiteSocketSubEvents["rust"] = "rust";
    WebsiteSocketSubEvents["dota2"] = "dota2";
    WebsiteSocketSubEvents["tf2"] = "tf2";
    WebsiteSocketSubEvents["update_item"] = "update_item";
})(WebsiteSocketSubEvents || (WebsiteSocketSubEvents = {}));
export var WebsiteSocketEvents;
(function (WebsiteSocketEvents) {
    WebsiteSocketEvents["add_item"] = "add_item";
    WebsiteSocketEvents["remove"] = "remove";
    WebsiteSocketEvents["update_item"] = "update_item";
    WebsiteSocketEvents["handshake"] = "handshake";
    WebsiteSocketEvents["updated_item"] = "updated_item";
    WebsiteSocketEvents["change_user"] = "change_user";
})(WebsiteSocketEvents || (WebsiteSocketEvents = {}));
//# sourceMappingURL=sockets.js.map