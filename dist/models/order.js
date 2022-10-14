"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var database_1 = __importDefault(require("../database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.currentOrder = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql1, result1, lastOrder_id, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql1 = 'SELECT id FROM orders WHERE user_id=$1';
                        return [4 /*yield*/, conn.query(sql1, [user_id])];
                    case 2:
                        result1 = _a.sent();
                        lastOrder_id = result1.rows[result1.rows.length - 1].id;
                        sql = 'SELECT order_id,product_id,quantity,status FROM orders o FULL OUTER JOIN orders_products o_p ON o.id=o_p.order_id WHERE order_id=$1';
                        return [4 /*yield*/, conn.query(sql, [lastOrder_id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Failed to get orders with following error:".concat(err_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    OrderModel.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO orders(user_id,status) VALUES($1,$2) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [order.user_id, order.status])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Failed to create orders with following error:".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    OrderModel.prototype.addProductToOrder = function (order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [order_id, product_id, quantity])];
                    case 2:
                        _a.sent();
                        sql = 'SELECT product_id,order_id,name,category,price,quantity FROM products p FULL OUTER JOIN orders_products o_p ON p.id=o_p.product_id';
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Failed to create orders with following error:".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.OrderModel = OrderModel;
