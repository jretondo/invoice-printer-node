@echo off
setlocal

:: Descargar los últimos cambios del repositorio git
echo Descargando los últimos cambios del repositorio git...
call git pull
if %errorlevel% neq 0 (
    echo Ocurrió un error durante git pull. Saliendo...
    pause
    exit /b %errorlevel%
)

:: Instalar dependencias npm
echo Instalando dependencias npm...
call npm install
if %errorlevel% neq 0 (
    echo Ocurrió un error durante npm install. Saliendo...
    pause
    exit /b %errorlevel%
)

:: Compilar archivos TypeScript
echo Compilando archivos TypeScript...
call tsc
if %errorlevel% neq 0 (
    echo Ocurrió un error durante la compilación de TypeScript. Saliendo...
    pause
    exit /b %errorlevel%
)

echo Todas las tareas se completaron correctamente.
pause
endlocal
