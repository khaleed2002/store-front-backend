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
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var user_1 = __importDefault(require("../user"));
var database_1 = __importDefault(require("../../database"));
var order_1 = require("../order");
var product_1 = __importDefault(require("../product"));
(0, user_1.default)(server_1.default);
(0, product_1.default)(server_1.default);
server_1.default.use(order_1.orderRoute);
var request = (0, supertest_1.default)(server_1.default);
describe('test user API routes', function () {
    var token;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/users').send({
                        username: 'khaled',
                        password: 'khaled123',
                        firstname: 'Khaled',
                        lastname: 'Abdelrahman',
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/users/auth')
                            .send({ username: 'khaled', password: 'khaled123' })];
                case 2:
                    response = _a.sent();
                    token = response.body;
                    return [4 /*yield*/, request
                            .post('/products')
                            .send({ name: 'mouse', price: 20, category: 'computer' })
                            .set('Authorization', "Bearer ".concat(token))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/products')
                            .send({ name: 'iPhone charger', price: 40, category: 'phone' })
                            .set('Authorization', "Bearer ".concat(token))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/products')
                            .send({ name: 'iPhone 14', price: 1000, category: 'phone' })
                            .set('Authorization', "Bearer ".concat(token))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/products')
                            .send({ name: 'Table', price: 110, category: 'home appliances' })
                            .set('Authorization', "Bearer ".concat(token))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/products')
                            .send({ name: 'Al-Ahly new T-shirt', price: 30, category: 'clothes' })
                            .set('Authorization', "Bearer ".concat(token))];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Test create order route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users/1/orders')
                        .set('Authorization', "Bearer ".concat(token))
                        .send({
                        status: 'active',
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(201);
                    expect(response.body.user_id).toEqual(1);
                    expect(response.body.id).toEqual(1);
                    expect(response.body.status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Test addProductToOrder route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users/1/orders/1')
                        .set('Authorization', "Bearer ".concat(token))
                        .send({
                        product_id: 2,
                        quantity: 4,
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(201);
                    expect(response.body.product_id).toEqual(2);
                    expect(response.body.order_id).toEqual(1);
                    expect(response.body.name).toEqual('iPhone charger');
                    expect(response.body.category).toEqual('phone');
                    expect(response.body.price).toEqual(40);
                    expect(response.body.quantity).toEqual(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('test current order route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //add another product to order
                return [4 /*yield*/, request
                        .post('/users/1/orders/1')
                        .set('Authorization', "Bearer ".concat(token))
                        .send({
                        product_id: 3,
                        quantity: 1,
                    })];
                case 1:
                    //add another product to order
                    _a.sent();
                    return [4 /*yield*/, request
                            .get('/users/1/orders/current')
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body[0].order_id).toEqual(1);
                    expect(response.body[0].product_id).toEqual(2);
                    expect(response.body[0].quantity).toEqual(4);
                    expect(response.body[0].status).toEqual('active');
                    expect(response.body[1].order_id).toEqual(1);
                    expect(response.body[1].product_id).toEqual(3);
                    expect(response.body[1].quantity).toEqual(1);
                    expect(response.body[1].status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
    it('test index order route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/orders')
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body[0].id).toEqual(1);
                    expect(response.body[0].user_id).toEqual(1);
                    expect(response.body[0].status).toEqual('active');
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
                    sql = "DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n\n        DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n        \nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n        \nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n        ";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
