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
        const printOptions = {           
            silent: true
        };
        await print(filePath, { printer: printerName, ...printOptions });
        console.log('Documento enviado a la impresora con éxito');
    } catch (error) {
        console.error('Error al imprimir el documento:', error);
    }
}

const selectPrinter = async () => {
    const enabledPrinter = fs.existsSync(path.join('printer', 'printer.txt'));

    if (enabledPrinter) {
    const printerName = fs.readFileSync(path.join('printer', 'printer.txt'), 'utf8').trim();
        connectToSocketAPI();
    console.log('Impresora: ', printerName);
    console.log('Para salir presiona Ctrl + C')
    console.log('En espera de tickets para imprimir...');
    } else {
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
}

export {
    selectPrinter,
    printPDF
}