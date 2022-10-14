"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, ENV = _a.ENV, DB_HOST = _a.DB_HOST, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_NAME = _a.DB_NAME, DB_NAME_TEST = _a.DB_NAME_TEST;
var client = new pg_1.Pool;
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });
}
else if (ENV === 'test') {
    client = new pg_1.Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME_TEST,
    });
}
exports.default = client;
