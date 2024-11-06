# Gestión de Alumnos

Este proyecto es una aplicación de gestión de alumnos desarrollada con Angular y Angular Material.

## Características

- Lista de alumnos con opciones para agregar, editar y eliminar.
- Formularios reactivos para la gestión de datos de alumnos.
- Uso de Angular Material para una interfaz de usuario moderna y responsiva.
- Implementación de pipes personalizados y directivas.
- Integración con JSON Server para simular una API REST.

## Requisitos previos

- Node.js
- Angular CLI

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/puzanowski/1PF_Puzanowski.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd 1PF_Puzanowski
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

1. Inicia el servidor de desarrollo de Angular:
   ```
   ng serve -o
   ```

2. En otra terminal, inicia JSON Server:
   ```
   json-server --watch src/app/data/db.json --middlewares src/app/middlewares/auth-middleware.js
   ```

3. Abre tu navegador y visita `http://localhost:4200`.

## Tecnologías utilizadas

- Angular 18
- Angular Material
- RxJS
- JSON Server