#!/bin/bash

# Script para ejecutar la aplicación de Gestión de Abogados
# Compatible con macOS y Linux

echo "==================================================="
echo "  Iniciando servidor para Gestión de Abogados"
echo "==================================================="

# Función para verificar si un comando está disponible
command_exists() {
  command -v "$1" &> /dev/null
}

# Detectar la versión de Python disponible
if command_exists python3; then
  echo "Usando Python 3..."
  python3 -m http.server 8000
elif command_exists python; then
  # Verificar si es Python 2 o Python 3
  PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}' | cut -d. -f1)
  if [ "$PYTHON_VERSION" = "3" ]; then
    echo "Usando Python 3..."
    python -m http.server 8000
  else
    echo "Usando Python 2..."
    python -m SimpleHTTPServer 8000
  fi
else
  echo "Error: No se encontró Python instalado."
  echo "Por favor, instala Python 3 o Python 2 para ejecutar esta aplicación."
  exit 1
fi

# Este código no se ejecutará a menos que el servidor se detenga
echo "Servidor detenido." 