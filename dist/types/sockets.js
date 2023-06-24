"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteSocketEvents = exports.WebsiteSocketSubEvents = void 0;
var WebsiteSocketSubEvents;
(function (WebsiteSocketSubEvents) {
    WebsiteSocketSubEvents["add_item"] = "add_item";
    WebsiteSocketSubEvents["remove"] = "remove";
    WebsiteSocketSubEvents["update_item"] = "update_item";
})(WebsiteSocketSubEvents || (exports.WebsiteSocketSubEvents = WebsiteSocketSubEvents = {}));
var WebsiteSocketEvents;
(function (WebsiteSocketEvents) {
    WebsiteSocketEvents["add_item"] = "add_item";
    WebsiteSocketEvents["remove"] = "remove";
    WebsiteSocketEvents["update_item"] = "update_item";
    WebsiteSocketEvents["handshake"] = "handshake";
    WebsiteSocketEvents["updated_item"] = "updated_item";
    WebsiteSocketEvents["change_user"] = "change_user";
})(WebsiteSocketEvents || (exports.WebsiteSocketEvents = WebsiteSocketEvents = {}));
//# sourceMappingURL=sockets.js.map