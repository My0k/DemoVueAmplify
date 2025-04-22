#!/bin/bash

# Crear estructura de carpetas si no existen
mkdir -p css
mkdir -p img

# Determinar qué comando usar para abrir el navegador según el sistema operativo
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OPEN_CMD="xdg-open"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OPEN_CMD="open"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    OPEN_CMD="start"
else
    echo "No se pudo determinar el comando para abrir el navegador"
    exit 1
fi

# Verificar si Python está instalado
if command -v python3 &>/dev/null; then
    echo "Iniciando servidor con Python 3..."
    # Abrir el navegador y luego iniciar el servidor
    $OPEN_CMD http://localhost:8000 &
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    echo "Iniciando servidor con Python..."
    # Abrir el navegador y luego iniciar el servidor
    $OPEN_CMD http://localhost:8000 &
    python -m http.server 8000
else
    echo "Python no está instalado. No se puede iniciar el servidor."
    exit 1
fi 