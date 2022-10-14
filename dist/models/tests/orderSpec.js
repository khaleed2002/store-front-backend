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
var order_1 = require("../order");
var user_1 = require("../user");
var product_1 = require("../product");
var database_1 = __importDefault(require("../../database"));
var order = new order_1.OrderModel();
describe('order Model', function () {
    it('should have an current orders method', function () {
        expect(order.currentOrder).toBeDefined();
    });
    it('should have a create method', function () {
        expect(order.create).toBeDefined();
    });
    it('should have a add product method', function () {
        expect(order.addProductToOrder).toBeDefined();
    });
});
describe('Test methods results in order Model', function () { return __awaiter(void 0, void 0, void 0, function () {
    var Khaled, products, mouseOrder, user, product;
    return __generator(this, function (_a) {
        Khaled = {
            firstname: 'Khaled',
            lastname: 'Elgamal',
            username: 'Khaled123',
            password: 'khaled101010',
        };
        products = [
            {
                name: 'mouse',
                price: 20,
                category: 'computer',
            },
            {
                name: 'ipad',
                price: 20000,
                category: 'computer',
            },
            {
                name: 'labtop',
                price: 10000,
                category: 'computer',
            },
        ];
        mouseOrder = {
            user_id: 1,
            status: 'active',
        };
        user = new user_1.UserModel();
        product = new product_1.ProductModel();
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n\n        DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n\n        DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [4 /*yield*/, user.create(Khaled)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, product.create(products[0])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, product.create(products[1])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, product.create(products[2])];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('create method should add a new order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order.create(mouseOrder)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: 1,
                            user_id: 1,
                            status: 'active',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('create method should add product to order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order.addProductToOrder(1, 1, 3)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            product_id: 1,
                            order_id: 1,
                            name: 'mouse',
                            category: 'computer',
                            price: 20,
                            quantity: 3,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('currentOrders method should return a list of orders for specific user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order.addProductToOrder(1, 2, 1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, order.addProductToOrder(1, 3, 4)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, order.currentOrder(1)];
                    case 3:
                        result = _a.sent();
                        expect(result).toEqual([
                            { order_id: 1, product_id: 1, quantity: 3, status: 'active' },
                            { order_id: 1, product_id: 2, quantity: 1, status: 'active' },
                            { order_id: 1, product_id: 3, quantity: 4, status: 'active' },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n\n        DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n\n        DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
