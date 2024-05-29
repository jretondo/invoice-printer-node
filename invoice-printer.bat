@echo off
setlocal

:: Título de la ventana
title Invoice Printer

:: Ruta de la aplicación
set APP_PATH=dist\app.js

:: Verificar si Node.js está instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js no está instalado. Por favor, instálalo desde https://nodejs.org/
    pause
    exit /b 1
)

:: Verificar si la aplicación existe
if not exist "%APP_PATH%" (
    echo No se encontro la aplicacion en la ruta especificada: %APP_PATH%
    pause
    exit /b 1
)

:: Ejecutar la aplicación
echo Iniciando la aplicación...
node "%APP_PATH%"
if %errorlevel% neq 0 (
    echo Ocurrio un error al ejecutar la aplicación.
    pause
    exit /b 1
)

echo Aplicacion finalizada.
pause
endlocal