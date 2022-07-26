"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSettings = "Warning: No value specified   ";
const config = {
    PORT: process.env.PORT || missingSettings,
    SESSION_SECRET: process.env.SESSION_SECRET || missingSettings,
    CLIENT_ID: process.env.GITHUB_CLIENT_ID || missingSettings,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || missingSettings,
    CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || missingSettings,
};
exports.default = config;
