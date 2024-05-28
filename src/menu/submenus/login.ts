import axios from "axios";
import { GLOBAL_CONFIG } from "../../config";
import path from 'path';
import fs from 'fs';

export async function login(username: string, password: string) {
    try {
        const response = await axios.post(`${GLOBAL_CONFIG.api.url}/auth`, { username, password });
        const token = response.data.body.token;
        const tokenFolder = path.join('tokens');
        const tokenFile = path.join(tokenFolder, 'token.txt');
        if (!fs.existsSync(tokenFolder)) {
            fs.mkdirSync(tokenFolder);
        }
        fs.writeFileSync(tokenFile, token);
        console.log('Inicio de sesión exitoso');
        console.log('Token guardado');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}