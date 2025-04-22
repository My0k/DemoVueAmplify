# Gestión de Abogados - CRUD

Aplicación web para gestionar un directorio de abogados con funciones para crear, ver, editar y eliminar registros.

## Cómo ejecutar la aplicación

### Método simple (recomendado)

1. Haz doble clic en el archivo `run.sh`

2. Si no funciona, abre una terminal (o símbolo del sistema):
   - En Mac: Busca "Terminal" en Spotlight
   - En Linux: Usa Ctrl+Alt+T
   - En Windows: Busca "Símbolo del sistema" o "PowerShell"

3. Escribe estos comandos (uno por uno):
   ```
   cd ruta/a/la/carpeta/del/proyecto
   chmod +x run.sh
   ./run.sh
   ```

4. Abre tu navegador y ve a: http://localhost:8000

### Si nada funciona

Simplemente abre el archivo `index.html` haciendo doble clic en él.

## Acceso al panel de administración

- Usuario: `admin`
- Contraseña: `myok123`

## Tecnologías utilizadas

- **Frontend**: Vue.js 3 (versión CDN), HTML5, CSS3, Chart.js
- **Diseño**: Inspirado en Bootstrap, con estilos personalizados
- **Desarrollo**: Creado con asistencia de Claude 3.7
- **Despliegue**: Preparado para AWS y GitHub

## Estructura del proyecto

- `index.html` - Página principal
- `app.js` - Código Vue.js para la lógica de la aplicación
- `css/` - Estilos visuales organizados por componentes
- `run.sh` - Script para ejecutar la aplicación
