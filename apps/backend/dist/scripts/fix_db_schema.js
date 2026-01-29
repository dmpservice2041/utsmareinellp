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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("../models/User"));
const fixSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Authenticating with database...');
        yield database_1.default.authenticate();
        console.log('Database connection has been established successfully.');
        console.log('Syncing User model with database...');
        // Sync with alter: true adds missing columns without dropping tables
        yield User_1.default.sync({ alter: true });
        console.log('User table synced successfully!');
        // Log the table description to verify
        const [results] = yield database_1.default.query('DESCRIBE users');
        console.log('Current users table structure:', results);
        process.exit(0);
    }
    catch (error) {
        console.error('Unable to sync database:', error);
        process.exit(1);
    }
});
fixSchema();
