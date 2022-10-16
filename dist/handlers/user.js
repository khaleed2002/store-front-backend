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
exports.verifyAuthToken = exports.authenticate = void 0;
var user_1 = require("../models/user");
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var users = new user_1.UserModel();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.index()];
            case 1:
                allUsers = _a.sent();
                res.json(allUsers);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.show(parseInt(req.params.id))];
            case 1:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Username, Password, Firstname, Lastname, newUser, JWT, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Username = req.body.username;
                Password = req.body.password;
                Firstname = req.body.firstname;
                Lastname = req.body.lastname;
                newUser = {
                    username: Username,
                    password: Password,
                    firstname: Firstname,
                    lastname: Lastname,
                };
                return [4 /*yield*/, users.create(newUser)];
            case 1:
                _a.sent();
                JWT = jsonwebtoken_1.default.sign({
                    user: {
                        Username: Username,
                    },
                }, process.env.TOKEN_SECRET);
                res.status(201).json(JWT);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.delete(req.body.id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, password, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userName = req.body.username;
                password = req.body.password;
                return [4 /*yield*/, users.authenticate(userName, password)];
            case 1:
                token = _a.sent();
                if (token === null) {
                    return [2 /*return*/, res.status(401).json(token)];
                }
                else {
                    return [2 /*return*/, res.json(token)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader === undefined) {
            return res.status(401).json("authorization Failed").errored;
        }
        var token = authorizationHeader.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, function (err) {
                if (err) {
                    return res.status(401).json("authorization failed: Invalid token");
                }
                else {
                    next();
                }
            });
        }
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.verifyAuthToken = verifyAuthToken;
var usersRoute = function (app) {
    app.get('/users', exports.verifyAuthToken, index);
    app.post('/users', create);
    app.get('/users/:id', exports.verifyAuthToken, show);
    app.delete('/users', exports.verifyAuthToken, destroy);
    app.post('/users/auth', exports.authenticate);
};
exports.default = usersRoute;
