"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEventStatus = void 0;
var OrderEventStatus;
(function (OrderEventStatus) {
    OrderEventStatus[OrderEventStatus["PENDING"] = 0] = "PENDING";
    OrderEventStatus[OrderEventStatus["ACCEPTED"] = 1] = "ACCEPTED";
    OrderEventStatus[OrderEventStatus["OUT_FOR_DELIVERY"] = 2] = "OUT_FOR_DELIVERY";
    OrderEventStatus[OrderEventStatus["DELIVERED"] = 3] = "DELIVERED";
    OrderEventStatus[OrderEventStatus["CANCELLED"] = 4] = "CANCELLED";
})(OrderEventStatus || (exports.OrderEventStatus = OrderEventStatus = {}));
