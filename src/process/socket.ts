import WebSocket from 'ws';
import { GLOBAL_CONFIG } from '../config';
import fs from 'fs';
import path from 'path';
import { downloadInvoice } from './getInvoicePDF';
import { printPDF } from '../menu/submenus/printer';

let tries = 0;

export function connectToSocketAPI() {
    const token = fs.readFileSync(path.join("tokens", "token.txt"), 'utf8').trim();
    const ws = new WebSocket(GLOBAL_CONFIG.socket.url, {
        handshakeTimeout: 10000,
        rejectUnauthorized: false,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    ws.on('open', () => {
        console.log('Conectado al servidor de impresión');
        ws.send('Cliente conectado');
    });

    ws.on('message', async (message) => {
        try {
            const printerName = fs.readFileSync(path.join('printer', 'printer.txt'), 'utf8').trim();
            const invoiceData = JSON.parse(message.toString());
            const invoicePath = await downloadInvoice(invoiceData.factId, invoiceData.ticket);
            await printPDF(printerName, invoicePath);
        } catch (error) {

        }
        console.log(`En espera de tickets/facturas para imprimir...`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });

    ws.on('close', () => {
        console.log('Desconectado del servidor');
        setTimeout(() => {
            tries++;
            if (tries > 5) {
                console.error('No se pudo reconectar al servidor');
                process.exit(1);
            }
            console.log('Reconectando al servidor...');
            connectToSocketAPI();
        }, 2000);
    });
}