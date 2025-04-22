# CRUD Básico de Abogados

Esta es una aplicación web que permite gestionar un directorio de abogados con operaciones CRUD (Crear, Leer, Actualizar, Eliminar), con un diseño inspirado en sitios web profesionales de bufetes legales.

## Características

- Crear nuevos registros de abogados
- Ver la lista completa de abogados
- Editar información de abogados existentes
- Eliminar abogados del registro
- Subir y mostrar imágenes de abogados
- Almacenamiento local en el navegador
- Diseño profesional inspirado en sitios web de bufetes legales
- Diseño totalmente responsivo para dispositivos móviles, tablets y pantallas grandes
- Panel de administración con autenticación básica
- Gestión de especialidades de abogados
- Estadísticas y gráficos de abogados por especialidad

## Tecnologías utilizadas

- HTML5
- CSS3 (con variables CSS y diseño responsivo)
- JavaScript
- Vue.js 3 (CDN)
- Chart.js para visualización de datos
- LocalStorage para persistencia de datos
- Fuentes de Google Fonts
- Base64 para almacenamiento de imágenes

## Credenciales de Administrador

Para acceder al panel de administración:
- Usuario: `admin`
- Contraseña: `myok123`

## Cómo ejecutar el proyecto

### Opción 1: Servidor local con Python

1. Clona o descarga este repositorio
2. Navega hasta la carpeta del proyecto en tu terminal
3. Ejecuta uno de los siguientes comandos para iniciar un servidor local:
   - Python 3: `python3 -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
4. Abre tu navegador y visita: `http://localhost:8000`

### Opción 2: Usando el script run.sh (Linux/Mac)

1. Clona o descarga este repositorio
2. Navega hasta la carpeta del proyecto en tu terminal
3. Dale permisos de ejecución al script: `chmod +x run.sh`
4. Ejecuta el script: `./run.sh`
5. El navegador se abrirá automáticamente con la aplicación

### Opción 3: Abrir directamente

Simplemente abre el archivo `index.html` en tu navegador web.

## Estructura del proyecto

- `index.html` - Estructura HTML y componentes de la interfaz
- `app.js` - Lógica de la aplicación Vue
- `css/` - Carpeta con archivos CSS
  - `main.css` - Estilos principales y variables
  - `form.css` - Estilos para formularios
  - `table.css` - Estilos para tablas
  - `manager.css` - Estilos para el panel de administración
- `run.sh` - Script para ejecutar la aplicación (opcional)

## Notas de aprendizaje

Durante el desarrollo de este proyecto, aprendí:
- Cómo implementar un CRUD completo con Vue.js
- Uso de localStorage para persistencia de datos sin backend
- Diseño responsivo con CSS Grid y Media Queries
- Organización de CSS en múltiples archivos para mejor mantenimiento
- Uso de variables CSS para mantener consistencia en el diseño
- Manejo de imágenes con FileReader y almacenamiento en base64
- Adaptación de interfaces para diferentes tamaños de pantalla
- Implementación de autenticación básica para el panel de administración
- Visualización de datos con Chart.js
- Gestión de especialidades con validación para evitar eliminaciones problemáticas

El mayor desafío fue implementar un diseño profesional que se asemejara a sitios web reales de bufetes legales, manteniendo la funcionalidad CRUD intuitiva y fácil de usar, además de lograr que la aplicación se vea bien en todo tipo de dispositivos. 