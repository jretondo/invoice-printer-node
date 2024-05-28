# Invoice Printer Centro Drugstore

Esta aplicación ligera, desarrollada en Node.js, establece una conexión con un servidor web a través de WebSockets. Su propósito principal es recibir señales que desencadenan la impresión de facturas de manera eficiente y rápida.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

invoice-printer-centro-drugstore/
├── .gitignore
├── package.json
├── src/
│ ├── menu/
│ │ ├── principal.ts
│ │ └── submenus/
│ │ ├── login.ts
│ │ └── printer.ts
│ ├── process/
│ │ ├── getInvoicePDF.ts
│ │ └── socket.ts
│ └── utils/
│ └── askQuestion.ts
└── .env

### .gitignore

- `node_modules`: Directorio de dependencias de Node.js.
- `tokens`: Archivos de tokens que podrían contener información sensible.
- `printer`: Archivos relacionados con la configuración de la impresora.
- `files`: Archivos temporales o de uso general.
- `dist`: Archivos compilados.
- `.env`: Archivo de configuración de variables de entorno.

### src

- `menu/`: Contiene los menús principales y submenús.
  - `principal.ts`: Archivo principal del menú.
  - `submenus/`: Submenús del sistema.
    - `login.ts`: Submenú de inicio de sesión.
    - `printer.ts`: Submenú de configuración de la impresora.

- `process/`: Contiene los procesos principales de la aplicación.
  - `getInvoicePDF.ts`: Proceso para obtener el PDF de la factura.
  - `socket.ts`: Proceso de conexión y comunicación vía WebSockets.

- `utils/`: Utilidades y funciones auxiliares.
  - `askQuestion.ts`: Función para realizar preguntas al usuario en la consola.

## Instalación

1. Clona este repositorio:
```bash
   git clone https://github.com/tu-usuario/invoice-printer-centro-drugstore.git
```
Navega al directorio del proyecto:

```bash
cd invoice-printer-centro-drugstore
```

Instala las dependencias:

```bash
npm install
```

Configura el archivo .env con las variables de entorno necesarias.

## Uso
### Modo Desarrollo
Para iniciar la aplicación en modo desarrollo, usa el siguiente comando:

```bash
npm run dev
```

### Modo Producción
Para compilar y ejecutar la aplicación en modo producción, sigue estos pasos:

Compila el proyecto (si es necesario):

```bash
npm run build
```

Inicia la aplicación:

```bash
npm start
```
## Funcionamiento
La aplicación presenta un menú principal con tres opciones:

1.Iniciar sesión
2.Activar impresora de tickets
3.Salir

### Iniciar sesión
Al seleccionar esta opción, deberás ingresar tus credenciales. El token de autenticación se guarda en la carpeta tokens.

### Activar impresora de tickets
Esta opción te permite elegir las impresoras disponibles en tu máquina. El nombre de la impresora seleccionada se guarda en la carpeta printer. Nota: Para acceder a esta opción, es obligatorio haber iniciado sesión previamente.

### Salir
Para salir de la aplicación, presiona Ctrl + C.

Dependencias
axios: Cliente HTTP para realizar solicitudes a servicios externos.
dotenv: Cargar variables de entorno desde un archivo .env.
pdf-to-printer: Biblioteca para enviar archivos PDF a la impresora.
readline: Módulo para interactuar con la entrada/salida de la consola.
ws: Biblioteca para implementar WebSockets.
Dependencias de Desarrollo
@types/axios: Tipos de TypeScript para axios.
@types/ws: Tipos de TypeScript para ws.
Licencia
Este proyecto está licenciado bajo la licencia ISC.

Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que te gustaría realizar.

Espero que este README te sea útil. Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar.

Este README proporciona una descripción clara y estructurada de tu proyecto, incluyendo la estructura del directorio, instrucciones de instalación y uso, y detalles sobre las dependencias. Puedes ajustarlo según sea necesario para reflejar mejor las particularidades de tu proyecto.
