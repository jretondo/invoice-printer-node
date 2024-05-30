import axios from "axios";
import { GLOBAL_CONFIG } from "../config";
import path from 'path';
import fs from 'fs';

export async function downloadInvoice(invoiceId: number, ticket?: boolean): Promise<string> {
    try {
        const token = fs.readFileSync(path.join("tokens", "token.txt"), 'utf8').trim();
        const postfix = ticket ? 'tktDataPDF' : 'factDataPDF';
        console.log('Descargando factura...');
        const response = await axios.get(`${GLOBAL_CONFIG.api.url}/invoices/${postfix}/${invoiceId}`, {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${token}`,
                'accept': 'application/pdf',
                'Content-Type': 'application/json'
            }
        });
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filesFolder = path.join('files');
        const filePath = path.join(filesFolder, `${uniqueSuffix}-${invoiceId}.pdf`);
        if (!fs.existsSync(filesFolder)) {
            fs.mkdirSync(filesFolder);
        }
        fs.writeFileSync(filePath, response.data);
        setTimeout(() => {
           fs.unlinkSync(filePath);
        }, 5000);
        return filePath;
    } catch (error) {
        console.error('Error al descargar la factura: ', error);
        return "Error al descargar la factura"
    }
}