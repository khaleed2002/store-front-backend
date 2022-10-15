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
(0, user_1.default)(server_1.default);
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
                    return [2 /*return*/];
            }
        });
    }); });
    it('Test create user route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/users').send({
                        username: 'ali',
                        password: 'ali123',
                        firstname: 'Ali',
                        lastname: 'Ahmed',
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(201); //created
                    return [2 /*return*/];
            }
        });
    }); });
    it('Test show user route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/users/2')
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.body.username).toEqual('ali');
                    expect(response.body.id).toEqual(2);
                    expect(response.body.firstname).toEqual('Ali');
                    expect(response.body.lastname).toEqual('Ahmed');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Test index user route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/users')
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.body[0].username).toEqual('khaled');
                    expect(response.body[0].id).toEqual(1);
                    expect(response.body[0].firstname).toEqual('Khaled');
                    expect(response.body[0].lastname).toEqual('Abdelrahman');
                    expect(response.body[1].username).toEqual('ali');
                    expect(response.body[1].id).toEqual(2);
                    expect(response.body[1].firstname).toEqual('Ali');
                    expect(response.body[1].lastname).toEqual('Ahmed');
                    return [2 /*return*/];
            }
        });
    }); });
    it('test delete user route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/users')
                        .send({ id: 2 })
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.body.username).toEqual('ali');
                    return [4 /*yield*/, request
                            .get('/users')
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.body.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('test authenticate user route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users/auth')
                        .send({ username: 'khaled', password: 'khaled123' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).not.toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('test authenticate user route failure', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users/auth')
                        .send({ username: 'khaled', password: '12345' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    expect(response.body).toEqual(null);
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
                    sql = "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n        \nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n\n        DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
