import { login } from './submenus/login';
import fs from 'fs';
import path from 'path';
import { selectPrinter } from './submenus/printer';
import { askQuestion, rl } from '../utils/askQuestion';

export async function mainMenu() {
    console.log('\nMenú Principal:');
    console.log('1. Iniciar sesión');
    console.log('2. Activar impresora de tikets');
    console.log('3. Salir');

    const answer = await askQuestion('Elige una opción: ');

    if (answer === '1') {
        const username = await askQuestion('Nombre de usuario: ');
        const password = await askQuestion('Contraseña: ');
        await login(username, password);
        await mainMenu();
    } else if (answer === '2') {     
        const tokenFile = path.join(__dirname, '..', '..', 'tokens', 'token.txt');
        if (fs.existsSync(tokenFile)) {
            console.log('Impresora de tickets activada');
            await selectPrinter()
        } else {
            console.log('Debes iniciar sesión primero');
            await mainMenu();
        }
    } else if (answer === '3') {
        console.log('Saliendo de la aplicación...');
        rl.close();
        process.exit(0);
    } else {
        console.log('Opción no válida. Intenta de nuevo.');
        await mainMenu();
    }
}