
# Sistema de Gestión de Biblioteca Personal

## Descripción

Sistema de Gestión de Biblioteca Personal es un proyecto CRUD desarrollado completamente en TypeScript, con **Node.js** en el backend y **Next.js** en el frontend. Este proyecto permite:

- Mostrar, agregar, eliminar y editar libros.
- Etc.
- **(Proyecto no terminado).**

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v22)
- [npm](https://www.npmjs.com/) (v10)
- [Git](https://git-scm.com/)

## Instalación y uso

Sigue los pasos a continuación para clonar y ejecutar el proyecto.

### 1. Clonar el repositorio

Ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

```bash
git clone https://github.com/JoseAMota11/read-group-challenge.git
```

### 2. Configurar el Frontend

1. Accede al directorio del frontend:

   ```bash
   cd frontend/
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Esto levantará el frontend en `http://localhost:3000`.

### 3. Configurar el Backend

1. Accede al directorio del backend:

   ```bash
   cd backend/
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Genera el build del backend:

   ```bash
   npm run build
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   Esto levantará el backend en `http://localhost:4000`.

## Estructura del proyecto

```plaintext
read-group-challenge/
  backend/
    ├── dist/                   # Archivos generados tras la compilación
    ├── node_modules/           # Dependencias instaladas del proyecto
    ├── src/                    # Código fuente principal
    │   ├── config/             # Configuraciones de la aplicación (ej: DB, variables)
    │   ├── controllers/        # Controladores que manejan la lógica del negocio
    │   ├── middlewares/        # Middlewares para la app
    │   ├── models/             # Definición de modelos de datos
    │   ├── routes/             # Rutas y su conexión con controladores
    │   ├── types/              # Definiciones de tipos de TypeScript
    │   └── utils/              # Funciones de utilidad compartidas
    │   └── index.ts            # Punto de entrada principal del backend
    ├── .env                    # Variables de entorno
    ├── .gitignore              # Archivos y carpetas ignorados por Git
    ├── library.db              # Archivo de base de datos SQLite
    ├── package-lock.json       # Archivo de bloqueo de dependencias
    ├── package.json            # Archivo de configuración de dependencias
    └── tsconfig.json           # Configuración de TypeScript
  frontend/
    ├── node_modules/           # Dependencias instaladas del proyecto
    ├── app/                    # Carpetas relacionadas a rutas o páginas principales
    ├── components/             # Componentes reutilizables de React
    ├── context/                # Configuración de contextos globales
    ├── hooks/                  # Custom hooks de React
    ├── schemas/                # Validaciones o esquemas de datos
    ├── services/               # Lógica de conexión con la API
    ├── types/                  # Definiciones de tipos de TypeScript
    ├── utils/                  # Funciones de utilidad
    ├── App.tsx                 # Componente principal de la aplicación
    ├── config.json             # Configuraciones específicas de la app
    ├── index.css               # Estilos globales de la aplicación
    ├── main.tsx                # Archivo principal de entrada de React
    ├── nationalities.json      # Archivo JSON con datos de nacionalidades
    ├── vite-env.d.ts           # Definiciones de ambiente para Vite
    ├── .env.local              # Variables de entorno locales
    ├── .eslint.config.js       # Configuración de ESLint
    ├── .gitignore              # Archivos y carpetas ignorados por Git
    ├── index.html              # Archivo HTML principal
    ├── package-lock.json       # Archivo de bloqueo de dependencias
    ├── package.json            # Archivo de configuración de dependencias
    ├── postcss.config.js       # Configuración de PostCSS
    ├── tailwind.config.js      # Configuración de Tailwind CSS
    ├── tsconfig.app.json       # Configuración específica de TypeScript para la app
    ├── tsconfig.json           # Configuración global de TypeScript
    ├── tsconfig.node.json      # Configuración de TypeScript para Node.js
    └── vite.config.ts          # Configuración de Vite
```

## Características

*TODO.*

## Env

Backend: *.env*

```env
SECRET_KEY=READ_GROUP_CHALLENGE
PORT=4000
```

Frontend: *.env.local*

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

---

**Autor:** José A. Mota  
[Repositorio del proyecto](https://github.com/JoseAMota11/read-group-challenge)
