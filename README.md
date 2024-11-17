# Gestión de Alumnos y Cursos

Este proyecto es una aplicación de gestión académica desarrollada con Angular y Angular Material, implementando NgRx para el manejo del estado.

## Características

- Gestión completa de alumnos (CRUD)
- Gestión de cursos con profesores asignados
- Sistema de inscripciones/asignaciones
- Vistas detalladas de alumnos y cursos
- Formularios reactivos para todas las operaciones
- Interfaz de usuario moderna con Angular Material
- Manejo de estado centralizado con NgRx
- Sistema de autenticación y autorización
- Roles de usuario (admin/usuario)
- Pipes personalizados y directivas
- API REST con dos modos de operación:
  - Producción: API desplegada en Render
  - Testing: JSON Server local con middleware de autenticación

## Tecnologías utilizadas

- Angular 16
- Angular Material
- NgRx Store y Effects
- RxJS
- TypeScript
- JSON Server
- Angular Forms
- Angular Router

## Requisitos previos

- Node.js (v14 o superior)
- Angular CLI
- JSON Server (solo para entorno de testing)

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/puzanowski/1PF_Puzanowski.git
   ```

2. Navega al directorio:
   ```
   cd 1PF_Puzanowski
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

### Modo Producción
1. Inicia el servidor de desarrollo:
   ```
   ng serve -o
   ```
2. La aplicación se conectará automáticamente a la API desplegada en Render

### Modo Testing
1. Clona el repositorio del servidor:
   ```
   git clone https://github.com/puzanowski/json-server.git
   ```

2. Inicia JSON Server con el middleware de autenticación:
   ```
   json-server --watch db.json --middlewares auth-middleware.js
   ```

3. Inicia la aplicación en modo testing:
   ```
   ng serve -c test
   ```

4. Accede a `http://localhost:4200`

## Estructura del proyecto

- `/src/app/features` - Módulos principales de la aplicación
  - `/dashboard` - Componentes del panel principal
  - `/auth` - Autenticación y autorización
- `/src/app/shared` - Componentes, modelos y servicios compartidos
- `/src/app/core` - Servicios core y guards
- `/src/app/store` - Estado NgRx (actions, effects, reducers, selectors)
- `/environments` - Configuración de entornos
  - `environment.ts` - Configuración de producción (API Render)
  - `environment.test.ts` - Configuración de testing (JSON Server local)

## Funcionalidades principales

- Gestión de alumnos
  - Lista con búsqueda y filtrado
  - Creación y edición mediante modales
  - Vista detallada con cursos inscritos
  
- Gestión de cursos
  - CRUD completo de cursos
  - Asignación de profesores
  - Vista detallada con alumnos inscritos
  
- Sistema de inscripciones
  - Asignación de alumnos a cursos
  - Gestión de fechas de inscripción
  - Validaciones de capacidad

## Seguridad

- Autenticación mediante JWT
- Roles de usuario (admin/usuario)
- Rutas protegidas
- Middleware de autenticación en API (modo testing)

## API Backend

- **Producción**: [API desplegada en Render](https://github.com/puzanowski/json-server)
- **Testing**: JSON Server local con middleware personalizado