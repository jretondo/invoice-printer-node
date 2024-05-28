import path from 'path';
import { Printer, getPrinters, print } from 'pdf-to-printer';
import { askQuestion } from '../../utils/askQuestion';
import fs from 'fs';
import { connectToSocketAPI } from '../../process/socket';

async function listPrinters() {
    const printers = await getPrinters();
    printers.forEach((printer: Printer, index: number) => {
        console.log(`${index + 1}. ${printer.name}`);
    });
    const printerResponse: number = Number(await askQuestion('Elige una impresora: '));
    return printers[printerResponse - 1];
}

async function printPDF(printerName: string, filePath: string) {
    try {
        await print(filePath, { printer: printerName });
        console.log('Documento enviado a la impresora con éxito');
    } catch (error) {
        console.error('Error al imprimir el documento:', error);
    }
}

const selectPrinter = async () => {
    const printer = await listPrinters();
    const printerName = printer.name;
    const printerFolder = path.join('printer');
    const printerFile = path.join(printerFolder, 'printer.txt');
    if (!fs.existsSync(printerFolder)) {
        fs.mkdirSync(printerFolder);
    }
    fs.writeFileSync(printerFile, printerName);
    console.log('Impresora guardada')
    connectToSocketAPI();
    console.log('Impresora: ', printerName);
    console.log('Para salir presiona Ctrl + C')
    console.log('En espera de tickets para imprimir...');
}

export {
    selectPrinter,
    printPDF
}