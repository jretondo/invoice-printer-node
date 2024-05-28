import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, "..", ".env")
});

export const GLOBAL_CONFIG = {
    api: {
        url: process.env.API_URL || 'http://example.com/api',
    },
    socket: {
        url: process.env.API_WSS_URL || 'ws://example.com/ws',
    }
}